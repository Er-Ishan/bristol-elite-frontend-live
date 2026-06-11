import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import bristolLogo from "../../assets/images/resources/brs-new-logo.png";
import type { BookingReceiptData } from "../../types/booking";
import {
    downloadPdfFromElement,
    formatBookingDate,
    scheduleReceiptSave,
} from "../../utils/bookingPdf";

const ReceiptThree: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptRef = useRef<HTMLDivElement>(null);

    const bookingData = location.state?.bookingData as BookingReceiptData | null;
    const addons = bookingData?.addons || {};
    const currentTransactionDate = formatBookingDate(new Date());

    useEffect(() => {
        if (!bookingData) {
            navigate("/thank-you", { replace: true });
        }
    }, [bookingData, navigate]);

    useEffect(() => {
        return scheduleReceiptSave(bookingData, receiptRef);
    }, [bookingData]);

    if (!bookingData) return null;

    const handleDownload = () => {
        if (receiptRef.current) {
            downloadPdfFromElement(
                receiptRef.current,
                `receipt_${bookingData.booking_id}.pdf`
            );
        }
    };

    return (
        <>
            <HeaderThree />
            <section className="pricing-two" style={{ paddingTop: "30px", paddingBottom: "40px" }}>
                <div
                    ref={receiptRef}
                    className="container"
                    style={{
                        maxWidth: "900px",
                        padding: "24px",
                        fontFamily: "Arial, sans-serif",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "20px",
                            justifyContent: "space-between",
                            marginBottom: "30px",
                        }}
                    >
                        <div style={{ flex: "1 1 250px" }}>
                            <img src={bristolLogo} alt="Bristol Airport Parking" style={{ width: "200px" }} />
                            <p style={{ fontSize: "14px", lineHeight: "20px", marginTop: "10px" }}>
                                02046415437 | support@bristoleliteparking.co.uk
                            </p>
                        </div>

                        <div
                            style={{
                                flex: "1 1 260px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "var(--gorent-base, #6dbb2c)",
                                    padding: "12px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Receipt #{bookingData.booking_id}
                            </div>
                            <div style={{ padding: "12px", fontSize: "14px" }}>
                                <p>
                                    <strong>Transaction Date:</strong>
                                    <br />
                                    {currentTransactionDate}
                                </p>
                                {bookingData.transaction_id && (
                                    <p>
                                        <strong>Transaction ID:</strong>
                                        <br />
                                        <span
                                            style={{
                                                wordBreak: "break-all",
                                                fontFamily: "monospace",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {bookingData.transaction_id}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h3>Bill To</h3>
                        <p style={{ fontSize: "14px" }}>
                            <strong>
                                {bookingData.first_name} {bookingData.last_name}
                            </strong>
                            <br />
                            {bookingData.email}
                            <br />
                            {bookingData.mobile}
                            <br />
                            {bookingData.vehicle_make || "-"} {bookingData.vehicle_registration || ""}
                        </p>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h3>Booking Details</h3>
                        <table style={{ width: "280px", fontSize: "15px" }}>
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td style={{ textAlign: "right" }}>
                                        £{Number(bookingData.quote_amount || 0).toFixed(2)}
                                    </td>
                                </tr>
                                {Number(bookingData.discount) > 0 && (
                                    <tr style={{ color: "#28a745" }}>
                                        <td>Discount</td>
                                        <td style={{ textAlign: "right" }}>
                                            -£{Number(bookingData.discount).toFixed(2)}
                                        </td>
                                    </tr>
                                )}
                                {Number(bookingData.booking_fee) > 0 && (
                                    <tr>
                                        <td>Booking Fee</td>
                                        <td style={{ textAlign: "right" }}>
                                            £{Number(bookingData.booking_fee).toFixed(2)}
                                        </td>
                                    </tr>
                                )}
                                {addons.cancellation_cover && (
                                    <tr>
                                        <td>Cancellation Cover</td>
                                        <td style={{ textAlign: "right" }}>£1.49</td>
                                    </tr>
                                )}
                                <tr style={{ fontWeight: "bold", borderTop: "1px solid #ddd" }}>
                                    <td>Total Paid</td>
                                    <td style={{ textAlign: "right" }}>
                                        £{Number(bookingData.total_payable || 0).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: "14px",
                            }}
                        >
                            <thead>
                                <tr style={{ backgroundColor: "var(--gorent-base, #6dbb2c)", color: "#fff" }}>
                                    <th style={{ padding: "10px" }}>Product</th>
                                    <th style={{ padding: "10px" }}>Airport</th>
                                    <th style={{ padding: "10px" }}>Drop-off</th>
                                    <th style={{ padding: "10px" }}>Return</th>
                                    <th style={{ padding: "10px" }}>Days</th>
                                    <th style={{ padding: "10px" }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: "10px" }}>{bookingData.product_name}</td>
                                    <td style={{ padding: "10px" }}>{bookingData.travelling_from}</td>
                                    <td style={{ padding: "10px" }}>
                                        {formatBookingDate(bookingData.drop_off_date)}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        {formatBookingDate(bookingData.return_date)}
                                    </td>
                                    <td style={{ padding: "10px", textAlign: "center" }}>
                                        {bookingData.no_of_days}
                                    </td>
                                    <td style={{ padding: "10px", fontWeight: "bold" }}>
                                        £{bookingData.total_payable}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p style={{ marginTop: "40px", fontSize: "14px" }}>
                        Thank you for your business!
                    </p>
                </div>

                <div
                    className="d-flex justify-content-center gap-3 flex-wrap mt-4"
                    style={{ maxWidth: "900px", margin: "0 auto" }}
                >
                    <button type="button" className="thm-btn text-white" onClick={handleDownload}>
                        Download Receipt (PDF)
                        <span className="fas fa-download ms-2"></span>
                    </button>
                    <Link to="/thank-you" state={{ bookingData }} className="thm-btn" style={{ background: "#333", color: "#fff" }}>
                        Back to Confirmation
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ReceiptThree;
