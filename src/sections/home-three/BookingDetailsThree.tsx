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

const BookingDetailsThree: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptRef = useRef<HTMLDivElement>(null);

    const bookingData = location.state?.bookingData as BookingReceiptData | null;
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
                `Booking_${bookingData.booking_id}.pdf`,
                0.4
            );
        }
    };

    const cell = { padding: "8px", fontSize: "13px" as const };

    return (
        <>
            <HeaderThree />
            <section className="pricing-two" style={{ paddingTop: "30px", paddingBottom: "40px" }}>
                <div
                    ref={receiptRef}
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        background: "#fff",
                        border: "1px solid #000",
                        padding: "20px",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
                        <div style={{ flex: "1 1 260px" }}>
                            <img src={bristolLogo} alt="Bristol Airport Parking" style={{ width: "200px" }} />
                            <p style={{ fontSize: "12px", marginTop: "6px" }}>Bristol Airport Parking</p>
                        </div>
                        <div style={{ flex: "1 1 200px", textAlign: "right" }}>
                            <h3 style={{ marginBottom: "6px" }}>BOOKING DETAILS</h3>
                            <p style={{ fontSize: "12px" }}>Date: {currentTransactionDate}</p>
                            <p style={{ fontSize: "12px" }}>Ref: {bookingData.booking_id}</p>
                        </div>
                    </div>

                    <div style={{ overflowX: "auto", marginTop: "12px" }}>
                        <table width="100%" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                            <tbody>
                                <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                    <td colSpan={5} style={cell}>CUSTOMER DETAILS</td>
                                </tr>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td style={cell}>Title</td>
                                    <td style={cell}>First Name</td>
                                    <td style={cell}>Last Name</td>
                                    <td style={cell}>Email</td>
                                    <td style={cell}>Mobile</td>
                                </tr>
                                <tr>
                                    <td style={cell}>{bookingData.title || "-"}</td>
                                    <td style={cell}>{bookingData.first_name}</td>
                                    <td style={cell}>{bookingData.last_name}</td>
                                    <td style={cell}>{bookingData.email}</td>
                                    <td style={cell}>{bookingData.mobile}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ overflowX: "auto", marginTop: "16px" }}>
                        <table width="100%" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                            <tbody>
                                <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                    <td colSpan={5} style={cell}>VEHICLE DETAILS</td>
                                </tr>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td style={cell}>Reg.No.</td>
                                    <td style={cell}>Make</td>
                                    <td style={cell}>Model</td>
                                    <td style={cell}>Color</td>
                                    <td style={cell}>Passengers</td>
                                </tr>
                                <tr>
                                    <td style={cell}>{bookingData.vehicle_registration || "-"}</td>
                                    <td style={cell}>{bookingData.vehicle_make || "-"}</td>
                                    <td style={cell}>{bookingData.vehicle_model || "-"}</td>
                                    <td style={cell}>{bookingData.vehicle_colour || "-"}</td>
                                    <td style={cell}>{bookingData.passengers || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ overflowX: "auto", marginTop: "16px" }}>
                        <table width="100%" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                            <tbody>
                                <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                    <td colSpan={2} style={cell}>FLIGHT DETAILS</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Depart Flight</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.depart_flight || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Depart Terminal</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.depart_terminal || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Return Flight</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.return_flight || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Return Terminal</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.return_terminal || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ overflowX: "auto", marginTop: "16px" }}>
                        <table width="100%" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
                            <tbody>
                                <tr style={{ background: "#eee", fontWeight: "bold" }}>
                                    <td colSpan={2} style={cell}>BOOKING DETAILS</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Travelling From</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.travelling_from}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Service</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.service || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Product</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.product_name}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Drop Off Date</td>
                                    <td style={{ ...cell, textAlign: "right" }}>
                                        {formatBookingDate(bookingData.drop_off_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={cell}>Return Date</td>
                                    <td style={{ ...cell, textAlign: "right" }}>
                                        {formatBookingDate(bookingData.return_date)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={cell}>Days</td>
                                    <td style={{ ...cell, textAlign: "right" }}>{bookingData.no_of_days}</td>
                                </tr>
                                <tr>
                                    <td style={cell}>Total Paid</td>
                                    <td style={{ ...cell, textAlign: "right", fontWeight: "bold" }}>
                                        £{Number(bookingData.total_payable || 0).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p style={{ marginTop: "30px", fontSize: "12px", textAlign: "center" }}>
                        Thank you for your booking. Please keep this document for your records.
                    </p>
                </div>

                <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                    <button type="button" className="thm-btn text-white" onClick={handleDownload}>
                        Download Booking PDF
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

export default BookingDetailsThree;
