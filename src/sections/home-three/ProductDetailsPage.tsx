import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import type { ParkingProduct, BookingLocationState } from "../../utils/parkingSearch";

const FALLBACK_IMAGE =
    "https://blog.getmyparking.com/wp-content/uploads/2018/07/airport-parking-1.jpg";

interface ProductDetailsState {
    product: ParkingProduct;
    pricing: number;
    dropDate: string;
    returnDate: string;
    airport: string;
}

type TabKey = "overview" | "dropoff" | "return";

const TABS: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "dropoff", label: "Drop off Procedure" },
    { key: "return", label: "Return Procedure" },
];

const ProductDetailsPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    const pageState = state as ProductDetailsState | null;

    if (!pageState?.product) {
        return (
            <>
                <HeaderThree />
                <div
                    style={{
                        minHeight: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "16px",
                        padding: "20px",
                    }}
                >
                    <p style={{ fontSize: "18px", color: "#555", textAlign: "center" }}>No product data found.</p>
                    <button
                        onClick={() => navigate("/pricing-quotes")}
                        style={{
                            padding: "12px 28px",
                            background: "var(--gorent-base)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: 700,
                            fontSize: "15px",
                            cursor: "pointer",
                        }}
                    >
                        View Parking Deals
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    const { product, pricing, dropDate, returnDate, airport } = pageState;

    const features = [
        product.point_1,
        product.point_2,
        product.point_3,
        product.point_4,
        product.point_5,
        product.point_6,
    ].filter((p): p is string => Boolean(p));

    const handleBookNow = () => {
        const basePrice = Number(pricing || 0);
        const bookingState: BookingLocationState = {
            productId: product.id,
            dropDate,
            returnDate,
            travelling_from: airport,
            basePrice,
            discountAmount: 0,
            finalPrice: basePrice,
            product_overview: product.product_overview,
            product_description: product.product_description,
            dropoff_procedure: product.dropoff_procedure,
        };
        navigate("/booking-form", { state: bookingState });
    };

    const tabContent: Record<TabKey, { heading: string; html: string | undefined }> = {
        overview: { heading: "Overview", html: product.product_overview },
        dropoff: { heading: "Drop-off Procedure", html: product.dropoff_procedure },
        return: { heading: "Return Procedure", html: product.return_procedure },
    };

    return (
        <>
            <HeaderThree />

            {/* Page Hero Strip */}
            <div
                style={{
                    background: "var(--gorent-base)",
                    padding: "28px 16px 22px",
                    textAlign: "center",
                    marginBottom: "40px",
                }}
            >
                <h1
                    style={{
                        color: "#fff",
                        fontSize: "clamp(20px, 4vw, 34px)",
                        fontWeight: 700,
                        margin: 0,
                    }}
                >
                    {product.product_name}
                </h1>
                {product.service_type && (
                    <p style={{ color: "rgba(255,255,255,0.85)", margin: "6px 0 0", fontSize: "15px" }}>
                        {product.service_type}
                    </p>
                )}
            </div>

            {/* Main Layout */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 16px 60px",
                    display: "flex",
                    gap: "28px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* ── LEFT PANEL (Tabs + Content) ── */}
                <div style={{ flex: "1 1 min(100%, 560px)", minWidth: 0 }}>

                    {/* Tab Bar */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            marginBottom: "16px",
                            flexWrap: "wrap",
                        }}
                    >
                        {TABS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                style={{
                                    flex: "1 1 auto",
                                    padding: "12px 16px",
                                    border: `1px solid ${activeTab === key ? "var(--gorent-base)" : "#e3e3e3"}`,
                                    borderRadius: "10px",
                                    background: activeTab === key ? "var(--gorent-base)" : "#fff",
                                    color: activeTab === key ? "#fff" : "var(--gorent-base)",
                                    fontWeight: 600,
                                    fontSize: "clamp(12px, 2vw, 14px)",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Box */}
                    <div
                        style={{
                            minHeight: "280px",
                            background: "#f8f9fa",
                            border: "1px solid #e8e8e8",
                            borderRadius: "14px",
                            padding: "clamp(16px, 4vw, 28px)",
                        }}
                    >
                        <h5
                            style={{
                                fontWeight: 700,
                                marginBottom: "16px",
                                color: "var(--gorent-base)",
                                fontSize: "17px",
                            }}
                        >
                            {tabContent[activeTab].heading}
                        </h5>

                        {tabContent[activeTab].html ? (
                            <div
                                style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}
                                dangerouslySetInnerHTML={{ __html: tabContent[activeTab].html as string }}
                            />
                        ) : (
                            <p style={{ fontSize: "15px", color: "#999" }}>
                                No information available.
                            </p>
                        )}
                    </div>
                </div>

                {/* ── RIGHT PANEL (Booking Card) ── */}
                <div style={{ flex: "1 1 300px", maxWidth: "400px", width: "100%" }}>
                    <div
                        style={{
                            background: "#fff",
                            border: "1px solid #e8e8e8",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                        }}
                    >
                        {/* Product Image */}
                        <div
                            style={{
                                padding: "20px",
                                borderBottom: "1px solid #f0f0f0",
                                textAlign: "center",
                                background: "#fafafa",
                            }}
                        >
                            <img
                                src={product.image_data || FALLBACK_IMAGE}
                                alt={product.product_name}
                                style={{
                                    maxHeight: "130px",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        <div style={{ padding: "20px 24px 24px" }}>

                            {/* Badges */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    marginBottom: "18px",
                                }}
                            >
                                {product.service_type && (
                                    <span
                                        style={{
                                            background: "rgba(0, 92, 37, 0.08)",
                                            color: "var(--gorent-base)",
                                            padding: "5px 12px",
                                            borderRadius: "999px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        <span className="fas fa-car" style={{ marginRight: "5px" }} />
                                        {product.service_type}
                                    </span>
                                )}
                                {product.nonflex && (
                                    <span
                                        style={{
                                            background: product.nonflex === "Refundable"
                                                ? "rgba(0, 92, 37, 0.08)"
                                                : "#fff1f0",
                                            color: product.nonflex === "Refundable"
                                                ? "var(--gorent-base)"
                                                : "#dc3545",
                                            padding: "5px 12px",
                                            borderRadius: "999px",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {product.nonflex}
                                    </span>
                                )}
                            </div>

                            {/* Feature Points */}
                            {features.length > 0 && (
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "0 0 18px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    {features.map((feat, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "10px",
                                                fontSize: "14px",
                                                lineHeight: "20px",
                                                color: "#333",
                                            }}
                                        >
                                            <IoIosCheckmarkCircle
                                                size={18}
                                                style={{ color: "var(--gorent-base)", flexShrink: 0, marginTop: "1px" }}
                                            />
                                            {feat}
                                        </li>
                                    ))}

                                    {/* Status Row */}
                                    {product.status && (
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "10px",
                                                fontSize: "14px",
                                                lineHeight: "20px",
                                            }}
                                        >
                                            {product.status === "Active" ? (
                                                <IoIosCheckmarkCircle
                                                    size={18}
                                                    style={{ color: "var(--gorent-base)", flexShrink: 0, marginTop: "1px" }}
                                                />
                                            ) : (
                                                <IoIosCloseCircle
                                                    size={18}
                                                    style={{ color: "#dc3545", flexShrink: 0, marginTop: "1px" }}
                                                />
                                            )}
                                            <span>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                        color: product.status === "Active"
                                                            ? "var(--gorent-base)"
                                                            : "#dc3545",
                                                    }}
                                                >
                                                    {product.status}
                                                </span>
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            )}

                            {/* Price */}
                            <div
                                style={{
                                    fontSize: "clamp(28px, 5vw, 36px)",
                                    fontWeight: 800,
                                    color: "var(--gorent-base)",
                                    textAlign: "center",
                                    marginBottom: "16px",
                                    lineHeight: 1,
                                }}
                            >
                                £{Number(pricing || 0).toFixed(2)}
                            </div>

                            {/* Book Now */}
                            <button
                                onClick={handleBookNow}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    background: "var(--gorent-base)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    marginBottom: "10px",
                                    transition: "opacity 0.2s",
                                }}
                            >
                                Book Now
                            </button>

                            {/* Back */}
                            <button
                                onClick={() => navigate(-1)}
                                style={{
                                    width: "100%",
                                    padding: "13px",
                                    background: "transparent",
                                    color: "var(--gorent-base)",
                                    border: "2px solid var(--gorent-base)",
                                    borderRadius: "10px",
                                    fontWeight: 600,
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                            >
                                Back
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetailsPage;
