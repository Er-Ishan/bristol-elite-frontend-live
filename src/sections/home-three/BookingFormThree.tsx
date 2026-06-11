import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import type { BookingLocationState } from "../../utils/parkingSearch";
import {
    createBooking,
    fetchBookingFees,
    fetchCancellationCharge,
    fetchProductById,
    fetchTerminalsByProduct,
    type CancellationCharge,
} from "../../services/parkingApi";
import type { Terminal } from "../../utils/parkingSearch";

const BookingFormThree: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = (location.state || {}) as BookingLocationState;

    const {
        productId,
        dropDate,
        returnDate,
        travelling_from,
        basePrice,
        discountAmount = 0,
        finalPrice,
    } = bookingData;

    const [product, setProduct] = useState<Record<string, unknown> | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [showTravel, setShowTravel] = useState(true);
    const [showVehicle, setShowVehicle] = useState(true);
    const [departTerminals, setDepartTerminals] = useState<Terminal[]>([]);
    const [loading, setLoading] = useState(false);
    const [bookingFee, setBookingFee] = useState(0);
    const [cancellationCharge, setCancellationCharge] = useState<CancellationCharge | null>(null);
    const [formError, setFormError] = useState("");

    const [addons, setAddons] = useState({
        cancellation_cover: false,
        sms_confirmation: false,
    });

    const [formData, setFormData] = useState({
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        depart_terminal: "",
        depart_flight: "",
        return_terminal: "",
        return_flight: "",
        vehicle_make: "",
        vehicle_model: "",
        vehicle_colour: "",
        vehicle_registration: "",
        passengers: "1",
        terms_accepted: false,
    });

    useEffect(() => {
        if (!productId) {
            navigate("/pricing-quotes", { replace: true });
        }
    }, [productId, navigate]);

    useEffect(() => {
        fetchCancellationCharge().then(setCancellationCharge);
        fetchBookingFees().then(setBookingFee);
    }, []);

    useEffect(() => {
        if (!productId) return;
        fetchProductById(productId).then(setProduct);
        fetchTerminalsByProduct(productId).then((data) => {
            if (Array.isArray(data)) {
                setDepartTerminals(data);
            }
        });
    }, [productId]);

    useEffect(() => {
        if (finalPrice !== undefined && finalPrice !== null) {
            setPrice(Number(finalPrice));
        } else if (basePrice !== undefined && basePrice !== null) {
            setPrice(Number(basePrice));
        }
    }, [finalPrice, basePrice]);

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        setFormData({
            ...formData,
            [target.name]:
                target.type === "checkbox"
                    ? (target as HTMLInputElement).checked
                    : target.value,
        });
    };

    const handleAddonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setAddons((prev) => ({ ...prev, [name]: checked }));
    };

    const cancellationPrice =
        addons.cancellation_cover && cancellationCharge?.is_enabled === 1
            ? Number(cancellationCharge.price)
            : 0;

    const addonsTotal = cancellationPrice;

    const getDaysDiff = () => {
        const d1 = new Date(dropDate);
        const d2 = new Date(returnDate);
        return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    };

    const totalPayable = (
        Number(price || 0) + Number(bookingFee || 0) + addonsTotal
    ).toFixed(2);

    const saveBookingAndProceedToPayment = async () => {
        setFormError("");

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.mobile) {
            setFormError("Please fill all required fields.");
            return;
        }
        if (!formData.terms_accepted) {
            setFormError("Please accept Terms & Conditions.");
            return;
        }

        setLoading(true);

        const payload = {
            ...formData,
            product_name: product?.product_name,
            product_flexibility: product?.nonflex,
            travelling_from,
            service_provider: product?.service_provider,
            service: product?.service_type,
            addons,
            addons_total: addonsTotal,
            drop_off_date: dropDate,
            return_date: returnDate,
            no_of_days: getDaysDiff(),
            quote_amount: price,
            discount: discountAmount || 0,
            booking_fee: bookingFee,
            total_payable: totalPayable,
            status: "Pending",
            source: "Website",
            website_name: "Bristol Elite Parking",
            transaction_source: "Online",
            transaction_id: null,
        };

        try {
            const data = await createBooking(payload);

            if (data.success) {
                navigate("/payment", {
                    state: {
                        bookingData: {
                            ...payload,
                            booking_id: data.booking_id,
                        },
                    },
                });
            } else {
                setFormError(data.message || "Failed to save booking.");
            }
        } catch {
            setFormError("Error saving booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!productId) return null;

    return (
        <>
            <HeaderThree />
            <section className="pricing-two" style={{ paddingTop: "30px" }}>
                <div
                    className="container text-center mb-4"
                    style={{
                        background: "var(--gorent-base)",
                        borderRadius: "16px",
                        padding: "28px 20px",
                        color: "#fff",
                    }}
                >
                    <h2 className="mb-2" style={{ color: "#fff", fontSize: "28px" }}>
                        Book <span style={{ opacity: 0.9 }}>{String(product?.product_name || "Parking")}</span>
                    </h2>
                    <p className="mb-0 small">
                        All booking details and parking instructions will be sent to the email below.
                        Fields marked * are required.
                    </p>
                </div>

                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div
                                className="p-4"
                                style={{
                                    background: "#fff",
                                    borderRadius: "20px",
                                    border: "1px solid #e5e5e5",
                                }}
                            >
                                {formError && (
                                    <div className="alert alert-warning">{formError}</div>
                                )}

                                <h4 className="mb-3">Personal Information</h4>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-2">
                                        <label className="form-label">Title *</label>
                                        <select
                                            name="title"
                                            className="form-select"
                                            onChange={handleInput}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option>Mr.</option>
                                            <option>Mrs.</option>
                                            <option>Miss</option>
                                            <option>Ms.</option>
                                            <option>Dr.</option>
                                        </select>
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label">First Name *</label>
                                        <input
                                            name="first_name"
                                            className="form-control"
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label">Last Name *</label>
                                        <input
                                            name="last_name"
                                            className="form-control"
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email *</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile *</label>
                                        <input
                                            name="mobile"
                                            className="form-control"
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>

                                <h5 className="mb-2">Do you have travel details?</h5>
                                <div className="d-flex gap-3 mb-3">
                                    <label className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            checked={showTravel}
                                            onChange={() => setShowTravel(true)}
                                        />
                                        Yes
                                    </label>
                                    <label className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            checked={!showTravel}
                                            onChange={() => setShowTravel(false)}
                                        />
                                        No
                                    </label>
                                </div>

                                {showTravel && (
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label">Depart Terminal</label>

                                            <select
                                                name="depart_terminal"
                                                className="form-select"
                                                onChange={handleInput}
                                            >
                                                <option value="">Select</option>

                                                {/* Manual Option */}
                                                <option value="Main Terminal">Main Terminal</option>

                                                {/* Dynamic Terminals */}
                                                {departTerminals.map((t) => (
                                                    <option key={t.terminal_id} value={t.terminal_name}>
                                                        {t.terminal_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Depart Flight</label>
                                            <input
                                                name="depart_flight"
                                                className="form-control"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Return Terminal</label>

                                            <select
                                                name="return_terminal"
                                                className="form-select"
                                                onChange={handleInput}
                                            >
                                                <option value="">Select</option>

                                                {/* Manual Option */}
                                                <option value="Main Terminal">Main Terminal</option>

                                                {/* Dynamic Terminals */}
                                                {departTerminals.map((t) => (
                                                    <option key={t.terminal_id} value={t.terminal_name}>
                                                        {t.terminal_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Return Flight</label>
                                            <input
                                                name="return_flight"
                                                className="form-control"
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>
                                )}

                                <h5 className="mb-2">Do you have vehicle details?</h5>
                                <div className="d-flex gap-3 mb-3">
                                    <label className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            checked={showVehicle}
                                            onChange={() => setShowVehicle(true)}
                                        />
                                        Yes
                                    </label>
                                    <label className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            checked={!showVehicle}
                                            onChange={() => setShowVehicle(false)}
                                        />
                                        No
                                    </label>
                                </div>

                                {showVehicle && (
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-3">
                                            <label className="form-label">Make</label>
                                            <input
                                                name="vehicle_make"
                                                className="form-control"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Model</label>
                                            <input
                                                name="vehicle_model"
                                                className="form-control"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Colour</label>
                                            <input
                                                name="vehicle_colour"
                                                className="form-control"
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Registration *</label>
                                            <input
                                                name="vehicle_registration"
                                                className="form-control"
                                                onChange={handleInput}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Passengers</label>
                                            <select
                                                name="passengers"
                                                className="form-select"
                                                onChange={handleInput}
                                            >
                                                {["1", "2", "3", "4", "5"].map((n) => (
                                                    <option key={n}>{n}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {cancellationCharge?.is_enabled === 1 &&
                                    product?.nonflex === "Refundable" && (
                                        <div className="form-check mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="cancellation_cover"
                                                name="cancellation_cover"
                                                checked={addons.cancellation_cover}
                                                onChange={handleAddonChange}
                                            />
                                            <label className="form-check-label" htmlFor="cancellation_cover">
                                                <strong>Cancellation Cover</strong> £{cancellationCharge.price} — Protect your booking
                                            </label>
                                        </div>
                                    )}

                                <div className="form-check mb-4">
                                    <input
                                        name="terms_accepted"
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={handleInput}
                                        required
                                    />
                                    <label className="form-check-label ms-2">
                                        I agree to the Terms & Conditions *
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    className="thm-btn text-white w-100"
                                    onClick={saveBookingAndProceedToPayment}
                                    disabled={loading}
                                >
                                    {loading ? "Saving booking..." : "Book Your Parking"}
                                    <span className="fas fa-arrow-right ms-2"></span>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div
                                className="p-4 sticky-top"
                                style={{
                                    top: "100px",
                                    background: "#fff",
                                    borderRadius: "20px",
                                    border: "2px solid var(--gorent-base)",
                                }}
                            >
                                <h5 className="text-center fw-bold mb-3">
                                    {String(product?.product_name || "Parking")}
                                </h5>
                                <ul className="list-unstyled small mb-3">
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Travelling From</span>
                                        <strong>{travelling_from}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Provider</span>
                                        <strong>{String(product?.service_provider || "N/A")}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Service</span>
                                        <strong>{String(product?.service_type || "N/A")}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Booking Type</span>
                                        <strong>{String(product?.nonflex || "N/A")}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Drop-off</span>
                                        <strong>{dropDate}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Return</span>
                                        <strong>{returnDate}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Quote</span>
                                        <strong>£{Number(basePrice || 0).toFixed(2)}</strong>
                                    </li>
                                    {discountAmount > 0 && (
                                        <li className="d-flex justify-content-between mb-2 text-success">
                                            <span>Discount</span>
                                            <strong>-£{discountAmount.toFixed(2)}</strong>
                                        </li>
                                    )}
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Final Price</span>
                                        <strong>£{Number(price || 0).toFixed(2)}</strong>
                                    </li>
                                    <li className="d-flex justify-content-between mb-2">
                                        <span>Booking Fee</span>
                                        <strong>£{bookingFee.toFixed(2)}</strong>
                                    </li>
                                    {addonsTotal > 0 && (
                                        <li className="d-flex justify-content-between mb-2">
                                            <span>Add-ons</span>
                                            <strong>£{addonsTotal.toFixed(2)}</strong>
                                        </li>
                                    )}
                                </ul>
                                <div
                                    className="text-center fw-bold py-3"
                                    style={{
                                        background: "var(--gorent-base)",
                                        color: "#fff",
                                        borderRadius: "12px",
                                        fontSize: "20px",
                                    }}
                                >
                                    Total: £{totalPayable}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BookingFormThree;
