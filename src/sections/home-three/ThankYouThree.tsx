import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import type { BookingReceiptData } from "../../types/booking";

const ThankYouThree: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData as BookingReceiptData | null;

    if (!bookingData) {
        return (
            <>
                <HeaderThree />
                <section className="pricing-two py-5">
                    <div className="container text-center">
                        <h3>No booking data found.</h3>
                        <Link to="/" className="thm-btn text-white mt-3">
                            Back to Home
                        </Link>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <HeaderThree />
            <section className="pricing-two" style={{ paddingTop: "50px", paddingBottom: "60px" }}>
                <div className="container">
                    <div
                        className="mx-auto text-center p-5"
                        style={{
                            maxWidth: "800px",
                            background: "#fff",
                            borderRadius: "20px",
                            border: "1px solid #e5e5e5",
                        }}
                    >
                        <div
                            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: "#d4edda",
                                fontSize: "42px",
                                color: "#198754",
                            }}
                        >
                            ✔
                        </div>
                        <h2 className="text-success fw-bold">Payment Successful!</h2>
                        <p className="text-muted">
                            Thank you for your booking — your reservation has been confirmed.
                        </p>

                        {bookingData.transaction_id ? (
                            <p
                                className="fw-bold small mt-3"
                                style={{
                                    wordBreak: "break-all",
                                    background: "#f8f9fa",
                                    padding: "10px 14px",
                                    borderRadius: "8px",
                                    fontFamily: "monospace",
                                }}
                            >
                                {String(bookingData.transaction_id)}
                            </p>
                        ) : null}

                        <div className="row g-3 text-start mt-4 small">
                            <div className="col-md-6">
                                <p className="font-black"><strong>Booking ID:</strong> {String(bookingData.booking_id)}</p>
                                <p><strong>Product:</strong> {String(bookingData.product_name)}</p>
                                <p><strong>Drop-off:</strong> {String(bookingData.drop_off_date)}</p>
                                <p><strong>Return:</strong> {String(bookingData.return_date)}</p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    <strong>Name:</strong> {String(bookingData.first_name)}{" "}
                                    {String(bookingData.last_name)}
                                </p>
                                <p><strong>Email:</strong> {String(bookingData.email)}</p>
                                <p><strong>Total Paid:</strong> £{String(bookingData.total_payable)}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Make:</strong> {String(bookingData.vehicle_make)}</p>
                                <p><strong>Model:</strong> {String(bookingData.vehicle_model)}</p>
                                <p><strong>Color:</strong> {String(bookingData.vehicle_colour)}</p>
                                <p><strong>Reg. No.:</strong> {String(bookingData.vehicle_registration)}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Depart Flight:</strong> {String(bookingData.depart_flight)}</p>
                                <p><strong>Depart Terminal:</strong> {String(bookingData.depart_terminal)}</p>
                                <p><strong>Return Flight:</strong> {String(bookingData.return_flight)}</p>
                                <p><strong>Return Terminal:</strong> {String(bookingData.return_terminal)}</p>
                            </div>
                            
                        </div>

                        <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
                            <button
                                type="button"
                                className="thm-btn text-white"
                                onClick={() =>
                                    navigate("/receipt", { state: { bookingData } })
                                }
                            >
                                View Receipt
                                <span className="fas fa-file-invoice ms-2"></span>
                            </button>
                            <button
                                type="button"
                                className="thm-btn text-white"
                                onClick={() =>
                                    navigate("/booking-details", { state: { bookingData } })
                                }
                            >
                                Download Booking
                                <span className="fas fa-download ms-2"></span>
                            </button>
                            <Link to="/" className="thm-btn" style={{ background: "#333", color: "#fff" }}>
                                Back to Home
                            </Link>
                            {/* <Link to="/pricing-quotes" className="thm-btn" style={{ background: "#555", color: "#fff" }}>
                                New Search
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ThankYouThree;
