import React from "react";
import CustomSelect from "../elements/CustomSelect";
// import ParkingDatePicker from "./ParkingDatePicker";
import {
    TIME_OPTIONS,
    addDaysToDateString,
    type PromoData,
} from "../../utils/parkingSearch";
import DatePicker from "react-datepicker";

interface ParkingSearchEditFormProps {
    selectedAirport: string;
    dropDateState: string;
    returnDateState: string;
    promoCode: string;
    promoError: string;
    promoData: PromoData | null;
    returnManuallySet: boolean;
    searching?: boolean;
    onAirportChange: (airport: string) => void;
    onDropDateStateChange: (value: string) => void;
    onReturnDateStateChange: (value: string) => void;
    onPromoCodeChange: (code: string) => void;
    onReturnManuallySet: (value: boolean) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ParkingSearchEditForm: React.FC<ParkingSearchEditFormProps> = ({
    // selectedAirport,
    dropDateState,
    returnDateState,
    promoCode,
    promoError,
    promoData,
    returnManuallySet,
    searching = false,
    // onAirportChange,
    onDropDateStateChange,
    onReturnDateStateChange,
    onPromoCodeChange,
    onReturnManuallySet,
    onSubmit,
}) => {
    const dropDatePart = dropDateState.split(" ")[0] || "";
    const dropTimePart = dropDateState.split(" ")[1] || "10:00";
    const returnDatePart = returnDateState.split(" ")[0] || "";
    const returnTimePart = returnDateState.split(" ")[1] || "10:00";

    const updateDropDate = (date: string) => {
        onDropDateStateChange(`${date} ${dropTimePart}`);
        if (!returnManuallySet) {
            onReturnDateStateChange(`${addDaysToDateString(date, 7)} ${returnTimePart}`);
        }
    };

    const updateDropTime = (time: string) => {
        onDropDateStateChange(`${dropDatePart} ${time}`);
    };

    const updateReturnDate = (date: string) => {
        onReturnManuallySet(true);
        onReturnDateStateChange(`${date} ${returnTimePart}`);
    };

    const updateReturnTime = (time: string) => {
        onReturnDateStateChange(`${returnDatePart} ${time}`);
    };

    return (
        <div className="container my-4">
            <style>
                {`
                .custom-datepicker-input {
    height: 50px;
    width: 100%;
    background-color: transparent;
    border: 1px solid rgba(var(--gorent-black-rgb), .10);
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    color: var(--gorent-gray);
    display: block;
}

                `}
            </style>
            <div
                className="p-4 bg-white shadow-sm text"
                style={{ borderRadius: "20px", border: "1px solid #e5e5e5" }}
            >
                <form className="search-car__form pricing-quotes-search " onSubmit={onSubmit}>
                    <div className="row g-3 align-items-end">
                        {/* <div className="col-12 col-md-6 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Airport</p>
                                <CustomSelect
                                    optionArray={[{ value: "Bristol", label: "Bristol" }]}
                                    value={selectedAirport}
                                    onChange={onAirportChange}
                                />
                            </div>
                        </div> */}

                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Drop-off date</p>

                                <DatePicker
                                    className="custom-datepicker-input"
                                    selected={dropDatePart ? new Date(dropDatePart) : null}
                                    onChange={(date: Date | null) => {
                                        if (!date) return;

                                        const formattedDate = date.toISOString().split("T")[0];
                                        updateDropDate(formattedDate);
                                    }}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    required
                                />
                            </div>
                        </div>


                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Drop-off time</p>
                                <CustomSelect
                                    optionArray={TIME_OPTIONS}
                                    value={dropTimePart}
                                    onChange={updateDropTime}
                                />
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Return date</p>

                                <DatePicker
                                    className="custom-datepicker-input"
                                    selected={returnDatePart ? new Date(returnDatePart) : null}
                                    onChange={(date: Date | null) => {
                                        if (!date) return;

                                        const formattedDate = date.toISOString().split("T")[0];
                                        updateReturnDate(formattedDate);
                                    }}
                                    minDate={
                                        dropDatePart
                                            ? new Date(dropDatePart)
                                            : new Date()
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-6 col-md-4 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Return time</p>
                                <CustomSelect
                                    optionArray={TIME_OPTIONS}
                                    value={returnTimePart}
                                    onChange={updateReturnTime}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-2">
                            <div className="search-car__input-box">
                                <p className="search-car__input-title">Promo code</p>
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    value={promoCode}
                                    onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
                                    style={{
                                        height: "50px",
                                        width: "95%",
                                        border: "1px solid rgba(var(--gorent-black-rgb), .10)",
                                        borderRadius: "25px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                        outline: "none",
                                    }}
                                />
                                {promoError && (
                                    <small className="text-danger d-block mt-1">{promoError}</small>
                                )}
                                {promoData && (
                                    <small className="text-success d-block mt-1">
                                        Promo applied: {promoData.discount_value}
                                        {promoData.discount_type === "percentage" ? "%" : "£"} off
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-1">
                            <div className="search-car__input-box">
                                <button
                                    type="submit"
                                    className="search-btn text-white w-100"
                                    disabled={searching}
                                >
                                    Update
                                    {/* <span className="fas fa-search ms-2"></span> */}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

            <style>
                {`
                .search-btn {
    width: 100px;
    height:48px;
    border: none;
    border-radius: 9px;
    background: #fd4b1d;
    color: #fff;
    font-size: 17px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
}

.search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(37, 99, 235, 0.35);
}

.search-btn:active:not(:disabled) {
    transform: translateY(0);
}

.search-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.search-btn .fa-search {
    font-size: 20px;
}

@media (max-width: 991px) {
    .search-btn {
        width: 100%;
        height: 55px;
        border-radius: 12px;
    }
}
                `}
            </style>
        </div>
    );
};

export default ParkingSearchEditForm;
