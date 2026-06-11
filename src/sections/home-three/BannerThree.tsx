import React, { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import video from "../../assets/images/videos/video-4.mov"
import { motion } from "framer-motion"
// import { Link } from 'react-router';
// import TypingEffect from '../../components/elements/TypingEffect';
import CustomSelect from '../../components/elements/CustomSelect';
import { useNavigate } from "react-router-dom";

import {
    addDaysToDateString,
    formatDateForInput,
    getDefaultDropDate,
    getDefaultReturnDate,
} from '../../utils/parkingSearch';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BannerMobileDateInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { onClick?: () => void }
>(function BannerMobileDateInput({ onClick, onFocus, className, ...rest }, ref) {
    return (
        <input
            {...rest}
            ref={ref}
            readOnly
            inputMode="none"
            autoComplete="off"
            onClick={onClick}
            onFocus={(e) => {
                onFocus?.(e);
                onClick?.();
            }}
            onKeyDown={(e) => e.preventDefault()}
            className={className ?? "custom-datepicker-input"}
        />
    );
});

const BannerThree: React.FC = () => {
    const isMobile = useIsMobile();
    const [airport, setAirport] = useState("Bristol");
    const [dropDate, setDropDate] = useState(getDefaultDropDate);
    const [returnDate, setReturnDate] = useState(getDefaultReturnDate);
    const [dropTime, setDropTime] = useState("10:00");
    const [returnTime, setReturnTime] = useState("10:00");
    const [promoCode, setPromoCode] = useState("");
    const [returnManuallySet, setReturnManuallySet] = useState(false);
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    const timeOptions = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 15) {
            const hh = String(hour).padStart(2, "0");
            const mm = String(min).padStart(2, "0");

            timeOptions.push({
                value: `${hh}:${mm}`,
                label: `${hh}:${mm}`,
            });
        }
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        if (!dropDate || !returnDate) {
            setFormError("Please select both drop-off and return dates.");
            return;
        }

        if (returnDate < dropDate) {
            setFormError("Return date must be on or after drop-off date.");
            return;
        }

        localStorage.setItem("dropDate", `${dropDate} ${dropTime}`);
        localStorage.setItem("returnDate", `${returnDate} ${returnTime}`);
        localStorage.setItem("selectedAirport", airport);

        if (promoCode.trim()) {
            localStorage.setItem("promoCode", promoCode.trim().toUpperCase());
        } else {
            localStorage.removeItem("promoCode");
        }

        navigate("/pricing-quotes");
    };

    const minReturnDate = dropDate || getDefaultDropDate();

    return (
        <section
            className="banner-one"
            id='home'
            style={{
                overflow: "hidden",
                height: "auto",
                padding: "80px 0"
            }}
        >

            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="banner-video-bg"
            >
                <source src={video} type="video/mp4" />
            </video>
            <div className="banner-video-overlay"></div>

            <style>{`

            .banner-one {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
}

.banner-video-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
}

.banner-video-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: -1;
}

                .banner-one {
    position: relative;
    overflow: hidden;
}

.banner-video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

.banner-video-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
}

.container {
    position: relative;
    z-index: 2;
}

@media (max-width: 991px) {
    .banner-one {
        padding-top: 120px !important;
        padding-bottom: 80px !important;
        height: auto !important;
    }
    .banner-one__inner {
        flex-direction: column !important;
    }
    .banner-one__content {
        width: 100% !important;
        display: block !important;
        text-align: center;
    }
    .banner-one__title {
        font-size: 38px !important;
        line-height: 48px !important;
    }
    .banner-one__text br {
        display: none;
    }
    .tabs-content {
        width: 100% !important;
        max-width: 100% !important;
        margin-top: 30px;
    }
}
@media (max-width: 767px) {
    .banner-one__title {
        font-size: 30px !important;
        line-height: 40px !important;
    }
    .search-car__form {
        width: 100%;
    }
    .search-car__input-box input,
    .search-car__input-box select {
        width: 100%;
    }
}

.banner-one__content {
  flex: 1;
}

/* MOBILE HIDE */
@media (max-width: 767px) {
  .banner-one__content {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .banner-one {
    padding-top: 0 !important;
    min-height: auto !important;
  }
}

@media (max-width: 767px) {

  /* Fix input width */
  .tg-booking-add-input-field input,
  .tg-booking-add-input-field select {
    width: 100% !important;
    min-width: 100% !important;
    font-size: 16px !important;
  }

  /* Remove mobile date icon */
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    display: none;
  }

  /* Remove extra appearance */
  input[type="date"] {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 15px !important;
  }

  /* Fix form overflow */
  .tg-booking-form-parent,
  .tg-booking-form-parent-inner {
    width: 100% !important;
    overflow: hidden !important;
  }
}

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

.react-datepicker-popper {
    z-index: 9999 !important;
}

.react-datepicker {
    border-radius: 16px !important;
    overflow: hidden;
    border: 1px solid #eee !important;
}
    
`}</style>
            <div className="banner-one__shape-bg" ></div>
            <div className="banner-one__shape-2"></div>
            <div className="container">
                <div
                    className="banner-one__inner d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5"
                    style={{ width: "100%" }}
                >


                    <div
                        className="banner-one__content w-100 d-none d-md-block"
                        style={{ flex: 1 }}
                    >
                        {/* <p className="banner-one__sub-title text-white">Secure & Affordable Airport Parking at Bristol Airport</p> */}
                        <h1 className="banner-one__title text-white">
                            Hassle-Free
                            <br />
                            <span> Airport Parking </span>
                            <span className="typed-effect" >
                                {/* <TypingEffect stringArray={['Booking']} /> */}
                                Booking
                            </span>
                        </h1>
                        {/* <p className="banner-one__text text-white">Book safe, convenient, and affordable parking spaces near Bristol Airport.
                            <br />
                            Enjoy stress-free travel with secure parking, easy access to terminals,
                            <br />
                            and reliable customer support available whenever you need it.</p> */}
                    </div>

                    <div
                        className="tabs-content w-100 w-xl-auto"
                        style={{
                            maxWidth: "420px",
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            borderRadius: "28px",
                            padding: "30px",
                            boxShadow: `
            0 10px 40px rgba(255,255,255,0.35),
            0 15px 60px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.7)
        `,
                            border: "1px solid rgba(255,255,255,0.6)"
                        }}
                    >
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            viewport={{ amount: 0.1 }}
                            className="tabs-content__inner">
                            <form className="contact-form-validated search-car__form" onSubmit={handleSearch}>
                                {formError && (
                                    <div
                                        className="alert alert-warning mb-3"
                                        role="alert"
                                        style={{ fontSize: "14px", borderRadius: "12px" }}
                                    >
                                        {formError}
                                    </div>
                                )}
                                <div className="d-flex flex-column gap-3 w-100">
                                    <div className="w-100">
                                        <div className="search-car__input-box">
                                            <p
                                                className="search-car__input-title"
                                                style={{
                                                    fontWeight: 700,
                                                    color: "#111",
                                                    fontSize: "15px",
                                                    marginBottom: "8px"
                                                }}
                                            >
                                                <span className="fas fa-plane"></span>Airport</p>
                                            <div className="select-box">
                                                <CustomSelect
                                                    optionArray={[
                                                        { value: "Bristol", label: "Bristol" }
                                                    ]}
                                                    value={airport}
                                                    onChange={(val) => setAirport(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <div className="search-car__input-box">
                                                <p
                                                    className="search-car__input-title"
                                                    style={{
                                                        fontWeight: 700,
                                                        color: "#111",
                                                        fontSize: "15px",
                                                        marginBottom: "8px"
                                                    }}
                                                >
                                                    <span className="icon-date"></span>Drop off date
                                                </p>

                                                <DatePicker
                                                    selected={dropDate ? new Date(dropDate) : null}
                                                    onChange={(date: Date | null) => {
                                                        if (!date) return;
                                                        const formatted = formatDateForInput(date);
                                                        setDropDate(formatted);
                                                        if (!returnManuallySet) {
                                                            setReturnDate(addDaysToDateString(formatted, 7));
                                                        }
                                                    }}
                                                    minDate={new Date()}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="custom-datepicker-input"
                                                    wrapperClassName="w-100"
                                                    shouldCloseOnSelect
                                                    // readOnly={isMobile}
                                                    customInput={
                                                        isMobile ? (
                                                            <BannerMobileDateInput className="custom-datepicker-input" />
                                                        ) : undefined
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="search-car__input-box">
                                                <p
                                                    className="search-car__input-title"
                                                    style={{
                                                        fontWeight: 700,
                                                        color: "#111",
                                                        fontSize: "15px",
                                                        marginBottom: "8px"
                                                    }}
                                                >
                                                    <span className="icon-clock"></span>Drop off Time
                                                </p>

                                                <CustomSelect
                                                    optionArray={timeOptions}
                                                    value={dropTime}
                                                    onChange={(val) => setDropTime(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <div className="search-car__input-box">
                                                <p
                                                    className="search-car__input-title"
                                                    style={{
                                                        fontWeight: 700,
                                                        color: "#111",
                                                        fontSize: "15px",
                                                        marginBottom: "8px"
                                                    }}
                                                >
                                                    <span className="icon-date"></span>Return date
                                                </p>

                                                <DatePicker
                                                    className="custom-datepicker-input"
                                                    selected={returnDate ? new Date(returnDate) : null}
                                                    onChange={(date: Date | null) => {
                                                        if (!date) return;
                                                        const formatted = formatDateForInput(date);
                                                        setReturnDate(formatted);
                                                        setReturnManuallySet(true);
                                                    }}
                                                    minDate={new Date(minReturnDate)}
                                                    dateFormat="dd/MM/yyyy"
                                                    wrapperClassName="w-100"
                                                    placeholderText="Select Return Date"
                                                    shouldCloseOnSelect
                                                    // readOnly={isMobile}
                                                    customInput={
                                                        isMobile ? (
                                                            <BannerMobileDateInput className="custom-datepicker-input" />
                                                        ) : undefined
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="search-car__input-box">
                                                <p
                                                    className="search-car__input-title"
                                                    style={{
                                                        fontWeight: 700,
                                                        color: "#111",
                                                        fontSize: "15px",
                                                        marginBottom: "8px"
                                                    }}
                                                >
                                                    <span className="icon-clock"></span>Return Time
                                                </p>

                                                <CustomSelect
                                                    optionArray={timeOptions}
                                                    value={returnTime}
                                                    onChange={(val) => setReturnTime(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-100">
                                        <div className="search-car__input-box">
                                            <p
                                                className="search-car__input-title"
                                                style={{
                                                    fontWeight: 700,
                                                    color: "#111",
                                                    fontSize: "15px",
                                                    marginBottom: "8px"
                                                }}
                                            >
                                                <span className="fas fa-tag"></span>
                                                Promo code (optional)
                                            </p>

                                            <input
                                                type="text"
                                                name="promocode"
                                                placeholder="Enter Code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                style={{
                                                    height: "50px",
                                                    width: "100%",
                                                    backgroundColor: "transparent",
                                                    border: "1px solid rgba(var(--gorent-black-rgb), .10)",
                                                    borderRadius: "25px",
                                                    paddingLeft: "20px",
                                                    paddingRight: "20px",
                                                    outline: "none",
                                                    fontSize: "16px",
                                                    fontWeight: 400,
                                                    color: "var(--gorent-gray)",
                                                    display: "block"
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <div className="search-car__btn-box">
                                            <button type="submit" className="thm-btn text-white w-100">
                                                Get Parking Quote
                                                <span className="fas fa-search"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="result"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerThree;
