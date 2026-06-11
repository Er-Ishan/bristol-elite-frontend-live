import React, { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import HeaderThree from "./HeaderThree";

import Footer from "../common/Footer";

import {

    completeBookingAfterPayment,

    notifyPaymentSessionExpired,

} from "../../services/parkingApi";



const API = import.meta.env.VITE_API_URL as string;



interface BookingPayload {

    booking_id: number;

    product_name?: string;

    drop_off_date?: string;

    return_date?: string;

    first_name?: string;

    last_name?: string;

    email?: string;

    mobile?: string;

    quote_amount?: number | string;

    discount?: number | string;

    booking_fee?: number | string;

    total_payable?: number | string;

    payment_intent_id?: string;

    vehicle_make?: string;

    vehicle_registration?: string;

    [key: string]: unknown;

}



const SESSION_SECONDS = 300;



const PaymentThree: React.FC = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const stripe = useStripe();

    const elements = useElements();

    const expiryHandled = useRef(false);



    const bookingData = (location.state?.bookingData || null) as BookingPayload | null;



    const [clientSecret, setClientSecret] = useState("");

    const [loading, setLoading] = useState(false);

    const [timeLeft, setTimeLeft] = useState(SESSION_SECONDS);

    const [sessionExpired, setSessionExpired] = useState(false);

    const [payError, setPayError] = useState("");

    const [retryLink, setRetryLink] = useState<string | null>(null);



    useEffect(() => {

        if (!bookingData) {

            navigate("/pricing-quotes", { replace: true });

        }

    }, [bookingData, navigate]);



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



        notifyPaymentSessionExpired(bookingData.booking_id).then((result) => {

            if (result.payment_link) {

                setRetryLink(result.payment_link);

            } else {

                setRetryLink(`/retry-payment/${bookingData.booking_id}`);

            }

        });

    }, [timeLeft, sessionExpired, bookingData]);



    useEffect(() => {

        if (!bookingData?.booking_id || sessionExpired) return;



        (async () => {

            const resp = await fetch(`${API}/api/stripe/create-payment-intent`, {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({

                    amount: Math.round(Number(bookingData.total_payable) * 100),

                    payment_intent_id: bookingData.payment_intent_id || null,

                    booking_id: bookingData.booking_id,

                }),

            });



            const data = await resp.json();

            if (data.clientSecret) {

                setClientSecret(data.clientSecret);

                if (data.paymentIntentId) {

                    bookingData.payment_intent_id = data.paymentIntentId;

                }

            } else if (data.error) {

                setPayError(data.error);

            }

        })();

    }, [bookingData, sessionExpired]);



    const formatTime = (sec: number) => {

        const minutes = Math.floor(sec / 60);

        const seconds = sec % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    };



    const goToRetryPayment = () => {

        if (!bookingData?.booking_id) return;

        const link = retryLink || `/retry-payment/${bookingData.booking_id}`;

        if (link.startsWith("http")) {

            navigate(new URL(link).pathname);

        } else {

            navigate(link);

        }

    };



    const completePayment = async (paymentIntent: {

        id: string;

        payment_method: string | { id: string } | null;

    }) => {

        const paymentMethodId =

            typeof paymentIntent.payment_method === "string"

                ? paymentIntent.payment_method

                : paymentIntent.payment_method?.id ?? null;



        const payload = {

            booking_id: bookingData!.booking_id,

            transaction_id: paymentIntent.id,

            payment_method_id: paymentMethodId,

        };



        const result = await completeBookingAfterPayment(payload);



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

            setPayError("Payment succeeded but failed to save booking.");

        }

    };



    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setPayError("");



        if (sessionExpired || timeLeft <= 0) {

            setPayError("Payment session expired. Use Retry Payment below.");

            return;

        }

        if (!stripe || !elements || !clientSecret) {

            setPayError("Payment is not ready. Please wait or refresh.");

            return;

        }



        setLoading(true);

        const cardElement = elements.getElement(CardElement);



        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {

                card: cardElement!,

                billing_details: {

                    name: `${bookingData?.first_name || ""} ${bookingData?.last_name || ""}`,

                    email: bookingData?.email || "",

                },

            },

        });



        if (error) {

            setPayError(error.message || "Payment failed.");

            setLoading(false);

            return;

        }



        if (paymentIntent?.status === "succeeded") {

            await completePayment(paymentIntent);

        }



        setLoading(false);

    };



    if (!bookingData) return null;



    return (

        <>

            <HeaderThree />

            <section className="pricing-two" style={{ paddingTop: "40px" }}>

                <div className="container">

                    <div className="text-center mb-4">

                        <h2 style={{ fontWeight: 700 }}>Confirm & Secure Your Payment</h2>

                        <p className="text-muted">Complete your purchase using the card form below.</p>

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

                                Your payment window on this page has ended.

                            </p>

                            <p className="small text-muted mb-3">

                                Your booking is still saved. Complete payment using the retry

                                link below (valid for 1 hour). A retry link may also be sent to

                                your email.

                            </p>

                            <button

                                type="button"

                                className="thm-btn text-white"

                                onClick={goToRetryPayment}

                            >

                                Retry Payment

                                <span className="fas fa-redo ms-2"></span>

                            </button>

                        </div>

                    )}



                    {payError && !sessionExpired && (

                        <div className="alert alert-danger text-center">{payError}</div>

                    )}



                    <div className="row g-4 justify-content-center pb-5">

                        <div className="col-lg-5">

                            <div

                                className="p-4 h-100"

                                style={{

                                    background: "#fff",

                                    borderRadius: "20px",

                                    border: "1px solid #e5e5e5",

                                }}

                            >

                                <h5 className="fw-bold mb-3">Booking Information</h5>

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

                                        <tr>

                                            <th className="text-muted">Mobile</th>

                                            <td>{bookingData.mobile}</td>

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

                                className="p-4"

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

                                            onClick={goToRetryPayment}

                                        >

                                            Retry Payment

                                            <span className="fas fa-arrow-right ms-2"></span>

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

                                            disabled={loading || timeLeft <= 0 || !clientSecret}

                                        >

                                            {loading

                                                ? "Processing..."

                                                : `Pay £${bookingData.total_payable}`}

                                        </button>

                                    </form>

                                )}



                                <p className="text-muted text-center small mt-3 mb-0">

                                    100% Secure Payment

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



export default PaymentThree;


