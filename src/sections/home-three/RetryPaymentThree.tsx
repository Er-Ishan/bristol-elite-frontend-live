import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import type { BookingReceiptData } from "../../types/booking";
import {
    completeBookingAfterPayment,
    fetchBookingByIdentifier,
    notifyPaymentSessionExpired,
} from "../../services/parkingApi";

const API = import.meta.env.VITE_API_URL as string;
const SESSION_SECONDS = 300;

const RetryPaymentThree: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const expiryHandled = useRef(false);

    const [bookingData, setBookingData] = useState<BookingReceiptData | null>(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [payError, setPayError] = useState("");
    const [fetchError, setFetchError] = useState("");

    const [timeLeft, setTimeLeft] = useState(SESSION_SECONDS);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        if (!bookingId) {
            navigate("/pricing-quotes", { replace: true });
            return;
        }

        setTimeLeft(SESSION_SECONDS);
        setSessionExpired(false);
        expiryHandled.current = false;

        fetchBookingByIdentifier(bookingId).then((result) => {
            if (!result.success || !result.data) {
                setFetchError(result.message || "Booking not found.");
                return;
            }
            setBookingData(result.data);
        });
    }, [bookingId, navigate]);

    useEffect(() => {
        if (sessionExpired || timeLeft <= 0) return;
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, sessionExpired]);

    useEffect(() => {
        if (timeLeft > 0 || sessionExpired || !bookingData?.booking_id) return;
        if (expiryHandled.current) return;
        expiryHandled.current = true;

        setSessionExpired(true);
        notifyPaymentSessionExpired(bookingData.booking_id);
    }, [timeLeft, sessionExpired, bookingData]);

    useEffect(() => {
        if (!bookingData?.booking_id || sessionExpired) return;

        (async () => {
            const resp = await fetch(`${API}/api/stripe/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Math.round(Number(bookingData.total_payable) * 100),
                    payment_intent_id:
                        (bookingData.payment_intent_id as string) || null,
                    booking_id: bookingData.booking_id,
                }),
            });

            const data = await resp.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else if (data.error) {
                setPayError(String(data.error));
            }
        })();
    }, [bookingData, sessionExpired]);

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const restartRetrySession = () => {
        if (!bookingId) return;
        navigate(`/retry-payment/${bookingId}`, { replace: true });
    };

    const handleSuccess = async (paymentIntent: {
        id: string;
        payment_method: string | { id: string } | null;
    }) => {
        if (!bookingData) return;

        const paymentMethodId =
            typeof paymentIntent.payment_method === "string"
                ? paymentIntent.payment_method
                : paymentIntent.payment_method?.id ?? null;

        const result = await completeBookingAfterPayment({
            booking_id: bookingData.booking_id,
            transaction_id: paymentIntent.id,
            payment_method_id: paymentMethodId,
        });

        if (result.success) {
            navigate("/thank-you", {
                state: {
                    bookingData: {
                        ...bookingData,
                        transaction_id: paymentIntent.id,
                        status: "Active",
                        ref_no: result.ref_no,
                    },
                },
            });
        } else {
            setPayError("Payment succeeded but failed to update booking.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPayError("");

        if (sessionExpired || timeLeft <= 0) {
            setPayError("Payment session expired. Use the options below.");
            return;
        }
        if (!stripe || !elements || !clientSecret || !bookingData) {
            setPayError("Payment is not ready. Please wait or refresh.");
            return;
        }

        setLoading(true);
        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement!,
                billing_details: {
                    name: `${bookingData.first_name || ""} ${bookingData.last_name || ""}`,
                    email: bookingData.email || "",
                },
            },
        });

        if (error) {
            setPayError(error.message || "Payment failed.");
            setLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            await handleSuccess(paymentIntent);
        }

        setLoading(false);
    };

    if (fetchError) {
        return (
            <>
                <HeaderThree />
                <section className="pricing-two py-5">
                    <div className="container text-center">
                        <div className="alert alert-warning">{fetchError}</div>
                        <button
                            type="button"
                            className="thm-btn text-white mt-3"
                            onClick={() => navigate("/pricing-quotes")}
                        >
                            Start New Search
                        </button>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (!bookingData) {
        return (
            <>
                <HeaderThree />
                <section className="pricing-two py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading booking...</p>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <HeaderThree />
            <section className="pricing-two" style={{ paddingTop: "40px", paddingBottom: "50px" }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 style={{ fontWeight: 700 }}>Retry & Complete Payment</h2>
                        <p className="text-muted">
                            Secure your booking by completing the payment below.
                        </p>
                        {bookingData.ref_no && (
                            <p className="small text-muted mb-1">
                                Reference: <strong>{bookingData.ref_no}</strong>
                            </p>
                        )}
                        {!sessionExpired ? (
                            <p className="fw-bold text-danger mb-0">
                                Session expires in: {formatTime(timeLeft)}
                            </p>
                        ) : (
                            <p className="fw-bold text-danger mb-0">
                                Payment session has expired.
                            </p>
                        )}
                    </div>

                    {sessionExpired && (
                        <div
                            className="alert text-center mx-auto mb-4"
                            style={{
                                maxWidth: "640px",
                                background: "#fff3cd",
                                border: "1px solid #ffc107",
                                borderRadius: "12px",
                            }}
                            role="alert"
                        >
                            <p className="mb-2 fw-semibold">
                                Your 5-minute payment window has ended.
                            </p>
                            <p className="small text-muted mb-3">
                                Start a new retry session or search for parking again.
                            </p>
                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <button
                                    type="button"
                                    className="thm-btn text-white"
                                    onClick={restartRetrySession}
                                >
                                    Retry Payment Again
                                    <span className="fas fa-redo ms-2"></span>
                                </button>
                                <button
                                    type="button"
                                    className="thm-btn"
                                    style={{ background: "#333", color: "#fff" }}
                                    onClick={() => navigate("/pricing-quotes")}
                                >
                                    New Search
                                </button>
                            </div>
                        </div>
                    )}

                    {payError && !sessionExpired && (
                        <div className="alert alert-danger text-center">{payError}</div>
                    )}

                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-5">
                            <div
                                className="p-4 h-100"
                                style={{
                                    background: "#fff",
                                    borderRadius: "20px",
                                    border: "1px solid #e5e5e5",
                                }}
                            >
                                <h5 className="fw-bold mb-3 text-center">Booking Summary</h5>
                                <table className="table table-borderless small mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="text-muted">Booking ID</th>
                                            <td>{bookingData.booking_id}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Product</th>
                                            <td className="fw-semibold">{bookingData.product_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Drop-off</th>
                                            <td>{bookingData.drop_off_date}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Return</th>
                                            <td>{bookingData.return_date}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Name</th>
                                            <td>
                                                {bookingData.first_name} {bookingData.last_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">Email</th>
                                            <td>{bookingData.email}</td>
                                        </tr>
                                        <tr className="border-top">
                                            <th className="fw-bold">Total Payable</th>
                                            <td className="fw-bold text-success fs-5">
                                                £{bookingData.total_payable}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div
                                className="p-4 h-100"
                                style={{
                                    background: "#fff",
                                    borderRadius: "20px",
                                    border: "2px solid var(--gorent-base)",
                                    opacity: sessionExpired ? 0.65 : 1,
                                }}
                            >
                                <h5 className="fw-bold text-center mb-3">Payment Details</h5>

                                {sessionExpired ? (
                                    <div className="text-center py-4">
                                        <p className="text-muted small mb-3">
                                            Card payment is disabled because this session expired.
                                        </p>
                                        <button
                                            type="button"
                                            className="thm-btn text-white w-100"
                                            onClick={restartRetrySession}
                                        >
                                            Retry Payment Again
                                            <span className="fas fa-redo ms-2"></span>
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <label className="form-label fw-semibold">Card Details</label>
                                        <div
                                            className="form-control p-3 mb-3"
                                            style={{ borderRadius: "12px", minHeight: "48px" }}
                                        >
                                            <CardElement options={{ hidePostalCode: true }} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="thm-btn text-white w-100"
                                            disabled={
                                                loading ||
                                                timeLeft <= 0 ||
                                                !clientSecret ||
                                                !stripe
                                            }
                                        >
                                            {loading
                                                ? "Processing..."
                                                : `Pay £${bookingData.total_payable}`}
                                        </button>
                                    </form>
                                )}

                                <p className="text-muted text-center small mt-3 mb-0">
                                    100% Secure Stripe Payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default RetryPaymentThree;
