import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion"
import Footer from '../common/Footer';
import HeaderThree from './HeaderThree';
import ParkingSearchEditForm from '../../components/parking/ParkingSearchEditForm';
import {
    formatDateDisplay,
    getStoredDateTime,
    splitDateTime,
    type ParkingProduct,
    type PromoData,
    type BookingLocationState,
} from '../../utils/parkingSearch';
import {
    applyPromoDiscount,
    searchParkingDeals,
} from '../../services/parkingApi';

const DEFAULT_DROP = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return `${d.toISOString().split("T")[0]} 10:00`;
})();

const DEFAULT_RETURN = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    return `${d.toISOString().split("T")[0]} 10:00`;
})();

const FALLBACK_IMAGE =
    "https://blog.getmyparking.com/wp-content/uploads/2018/07/airport-parking-1.jpg";

const PricingThree: React.FC = () => {
    const navigate = useNavigate();

    const [showSearchForm, setShowSearchForm] = useState(false);
    const [airport, setAirport] = useState("Bristol");
    const [dropDateState, setDropDateState] = useState(DEFAULT_DROP);
    const [returnDateState, setReturnDateState] = useState(DEFAULT_RETURN);
    const [promoCode, setPromoCode] = useState("");
    const [promoData, setPromoData] = useState<PromoData | null>(null);
    const [promoError, setPromoError] = useState("");
    const [returnManuallySet, setReturnManuallySet] = useState(false);

    const [products, setProducts] = useState<ParkingProduct[]>([]);
    const [pricing, setPricing] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const runSearch = useCallback(async (
        drop: string,
        ret: string,
        selectedAirport: string,
        promo: string
    ) => {
        setLoading(true);
        setLoadError("");

        const result = await searchParkingDeals(drop, ret, selectedAirport, promo);

        setProducts(result.products);
        setPricing(result.pricing);
        setPromoData(result.promoData);
        setPromoError(result.promoError);
        setLoadError(result.loadError);
        setLoading(false);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const drop = getStoredDateTime("dropDate", DEFAULT_DROP);
        const ret = getStoredDateTime("returnDate", DEFAULT_RETURN);
        const selectedAirport = localStorage.getItem("selectedAirport") || "Bristol";
        const storedPromo = localStorage.getItem("promoCode") || "";

        setDropDateState(drop);
        setReturnDateState(ret);
        setAirport(selectedAirport);
        setPromoCode(storedPromo);

        (async () => {
            setLoading(true);
            setLoadError("");
            const result = await searchParkingDeals(drop, ret, selectedAirport, storedPromo);
            if (cancelled) return;
            setProducts(result.products);
            setPricing(result.pricing);
            setPromoData(result.promoData);
            setPromoError(result.promoError);
            setLoadError(result.loadError);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- initial load only
    }, []);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!dropDateState || !returnDateState) {
            setLoadError("Please select both drop-off and return dates.");
            return;
        }

        const dropParts = splitDateTime(dropDateState);
        const returnParts = splitDateTime(returnDateState);

        if (returnParts.date < dropParts.date) {
            setLoadError("Return date must be on or after drop-off date.");
            return;
        }

        localStorage.setItem("dropDate", dropDateState);
        localStorage.setItem("returnDate", returnDateState);
        localStorage.setItem("selectedAirport", airport);

        if (promoCode.trim()) {
            localStorage.setItem("promoCode", promoCode.trim());
        } else {
            localStorage.removeItem("promoCode");
        }

        setShowSearchForm(false);
        await runSearch(dropDateState, returnDateState, airport, promoCode.trim());
    };

    const getFinalPrice = (item: ParkingProduct): number => {
        const basePrice = Number(pricing[item.id] || 0);
        if (!basePrice) return Infinity;
        return applyPromoDiscount(basePrice, promoData);
    };

    const sortedProducts = [...products].sort(
        (a, b) => getFinalPrice(a) - getFinalPrice(b)
    );

    // const productFeatures = (item: ParkingProduct): string[] => {
    //     return [
    //         item.point_1,
    //         item.point_2,
    //         item.point_3,
    //         item.point_4,
    //         item.point_5,
    //         item.point_6,
    //     ].filter((p): p is string => Boolean(p));
    // };

    const handleBookNow = (item: ParkingProduct) => {
        const basePrice = Number(pricing[item.id] || 0);
        const finalPrice = applyPromoDiscount(basePrice, promoData);
        const discountAmount = basePrice - finalPrice;

        const state: BookingLocationState = {
            productId: item.id,
            dropDate: dropDateState,
            returnDate: returnDateState,
            travelling_from: airport,
            basePrice,
            discountAmount,
            finalPrice: Math.max(0, finalPrice),
            promo: promoData,
            product_overview: item.product_overview,
            product_description: item.product_description,
            dropoff_procedure: item.dropoff_procedure,
        };

        navigate("/booking-form", { state });
    };

    

    return (
        <>
            <HeaderThree />
            <section className="pricing-two pricing-quotes-page" style={{ paddingTop: "40px" }}>
                <div style={{ marginBottom: "40px", textAlign: "center" }}>
                    <h2
                        style={{
                            fontSize: "42px",
                            fontWeight: "700",
                            marginBottom: "10px"
                        }}
                    >
                        <span style={{ color: "var(--gorent-base)" }}>{airport}</span> Airport Parking Deals
                    </h2>

                    {dropDateState && returnDateState && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                flexWrap: "wrap",
                                marginBottom: "20px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {formatDateDisplay(dropDateState)} {splitDateTime(dropDateState).time}
                                {" — "}
                                {formatDateDisplay(returnDateState)} {splitDateTime(returnDateState).time}
                            </span>

                            <button
                                type="button"
                                onClick={() => setShowSearchForm((prev) => !prev)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "var(--gorent-base)",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: 0,
                                }}
                            >
                                <span className="fas fa-edit"></span>
                                Edit
                            </button>
                        </div>
                    )}
                    {promoData && (
                        <p className="text-success mb-2">
                            Promo applied: {promoData.discount_value}
                            {promoData.discount_type === "percentage" ? "%" : "£"} off
                        </p>
                    )}

                    {promoError && (
                        <p className="text-danger mb-2">{promoError}</p>
                    )}
                </div>

                {showSearchForm && (
                    <ParkingSearchEditForm
                        selectedAirport={airport}
                        dropDateState={dropDateState}
                        returnDateState={returnDateState}
                        promoCode={promoCode}
                        promoError={promoError}
                        promoData={promoData}
                        returnManuallySet={returnManuallySet}
                        searching={loading}
                        onAirportChange={setAirport}
                        onDropDateStateChange={setDropDateState}
                        onReturnDateStateChange={setReturnDateState}
                        onPromoCodeChange={setPromoCode}
                        onReturnManuallySet={setReturnManuallySet}
                        onSubmit={handleSearch}
                    />
                )}

                <div className="container">
                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 fw-semibold">Searching parking deals...</p>
                        </div>
                    )}

                    {!loading && loadError && (
                        <div className="alert alert-warning text-center mb-4" role="alert">
                            {loadError}
                        </div>
                    )}

                    {!loading && !loadError && sortedProducts.length === 0 && (
                        <p className="text-center text-muted py-4">
                            No products available. Click Edit Search to try different dates or times.
                        </p>
                    )}

                    {!loading && sortedProducts.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "flex-start",
                                gap: "20px",
                            }}
                        >
                            {sortedProducts.map((plan) => {
                                const basePrice = Number(pricing[plan.id] || 0);
                                const finalPrice = applyPromoDiscount(basePrice, promoData);
                                // const features = productFeatures(plan);

                                return (
                                    <div
                                        key={plan.id}
                                        style={{
                                            width: "100%",
                                            maxWidth: "350px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                background: "#fff",
                                                borderRadius: "20px",
                                                overflow: "hidden",
                                                border: "1px solid #e8e8e8",
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "15px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}
                                            >
                                                <motion.div
                                                    initial={{ x: -80, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeOut"
                                                    }}
                                                    viewport={{ amount: 0.01, once: true }}
                                                    className=""
                                                >
                                                    <img
                                                        src={plan.image_data || FALLBACK_IMAGE}
                                                        alt={plan.product_name}
                                                        style={{
                                                            width: "100%",
                                                            height: "120px",
                                                            objectFit: "contain",
                                                            background: "#fff",
                                                            padding: "5px",
                                                            borderRadius: "12px",
                                                        }}
                                                    />
                                                </motion.div>
                                                <div className=" text-center">
                                                    <h3
                                                        style={{
                                                            fontSize: "20px",
                                                            fontWeight: 700,
                                                            lineHeight: "26px",
                                                            marginBottom: "8px",
                                                        }}
                                                    >
                                                        {plan.product_name}
                                                    </h3>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: "8px",
                                                            flexWrap: "wrap",
                                                            marginTop: "8px",
                                                        }}
                                                    >
                                                        {plan.service_type && (
                                                            <div
                                                                title={plan.service_type}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    gap: "6px",
                                                                    background: "#eef6ff",
                                                                    color: "#0d6efd",
                                                                    padding: "6px 12px",
                                                                    borderRadius: "999px",
                                                                    fontSize: "12px",
                                                                    fontWeight: 600,
                                                                    minHeight: "32px",
                                                                }}
                                                            >
                                                                <span className="fas fa-car"></span>
                                                                <span>{plan.service_type}</span>
                                                            </div>
                                                        )}

                                                        {plan.nonflex && (
                                                            <div
                                                                title={plan.nonflex}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    gap: "6px",
                                                                    background:
                                                                        plan.nonflex === "Refundable"
                                                                            ? "#eafaf1"
                                                                            : "#fff1f0",
                                                                    color:
                                                                        plan.nonflex === "Refundable"
                                                                            ? "#198754"
                                                                            : "#dc3545",
                                                                    padding: "6px 12px",
                                                                    borderRadius: "999px",
                                                                    fontSize: "12px",
                                                                    fontWeight: 700,
                                                                    minHeight: "32px",
                                                                }}
                                                            >
                                                                <span
                                                                    className={
                                                                        plan.nonflex === "Refundable"
                                                                            ? "fas fa-check-circle"
                                                                            : "fas fa-times-circle"
                                                                    }
                                                                ></span>

                                                                <span>{plan.nonflex}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    padding: "0 20px 20px",
                                                }}
                                            >
                                                <ul
                                                    style={{
                                                        listStyle: "none",
                                                        padding: 0,
                                                        margin: 0,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "12px",
                                                    }}
                                                >
                                                    {[
                                                        plan?.point_1,
                                                        plan?.point_2,
                                                        plan?.point_3,
                                                        plan?.point_4,
                                                        plan?.point_5,
                                                        plan?.point_6,
                                                    ]
                                                        .filter(Boolean)
                                                        .map((feature, index) => (
                                                            <li
                                                                key={index}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    gap: "10px",
                                                                    fontSize: "14px",
                                                                    lineHeight: "22px",
                                                                }}
                                                            >
                                                                <div className="icon">
                                                                    <span
                                                                        className="fas fa-check"
                                                                        style={{ color: "#22c55e" }}
                                                                    ></span>
                                                                </div>
                                                                <div className="text">
                                                                    <p
                                                                        style={{
                                                                            color: "#222",
                                                                            margin: 0,
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {feature}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </ul>



                                                <div
                                                    style={{
                                                        marginTop: "16px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        gap: "12px",
                                                    }}
                                                >
                                                    <div>
                                                        {basePrice ? (
                                                            <>
                                                                {promoData && (
                                                                    <div
                                                                        style={{
                                                                            fontSize: "13px",
                                                                            textDecoration: "line-through",
                                                                            color: "#999",
                                                                        }}
                                                                    >
                                                                        £{basePrice.toFixed(2)}
                                                                    </div>
                                                                )}

                                                                <div
                                                                    style={{
                                                                        fontSize: "28px",
                                                                        fontWeight: 800,
                                                                        color: "var(--gorent-base)",
                                                                        lineHeight: 1,
                                                                    }}
                                                                >
                                                                    £{finalPrice.toFixed(2)}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <span>Loading...</span>
                                                        )}
                                                    </div>
                                                    

                                                    <div className="d-flex align-items-center gap-2">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth="0"
                                                            viewBox="0 0 512 512"
                                                            height="30"
                                                            width="30"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{
                                                                color: "var(--gorent-base)",
                                                                cursor: "pointer",
                                                                transition: "transform 0.2s, color 0.2s",
                                                                transform: "scale(1)",
                                                            }}
                                                            onClick={() => navigate(`/product-details/${plan.id}`, {
                                                                state: {
                                                                    product: plan,
                                                                    pricing: getFinalPrice(plan),
                                                                    dropDate: dropDateState,
                                                                    returnDate: returnDateState,
                                                                    airport,
                                                                },
                                                            })}
                                                        >
                                                            <title>Read more</title>
                                                            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                                                        </svg>
                                                        <button
                                                            type="button"
                                                            style={{
                                                                height: "48px",
                                                                minWidth: "150px",
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                background: "var(--gorent-base)",
                                                                color: "#fff",
                                                                fontWeight: 700,
                                                                fontSize: "15px",
                                                                cursor: "pointer",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "8px",
                                                                padding: "0 20px",
                                                            }}
                                                            disabled={!basePrice}
                                                            onClick={() => handleBookNow(plan)}
                                                        >
                                                            Book Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PricingThree;
