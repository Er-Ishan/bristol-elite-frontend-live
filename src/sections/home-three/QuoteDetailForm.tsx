import React from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router';
// import imageOne from "../../assets/images/resources/banner-one-img-1.png"
import TypingEffect from '../../components/elements/TypingEffect';
// import UsedCar from './search-car-tab/UsedCar';
import CustomSelect from '../../components/elements/CustomSelect';
import Footer from '../common/Footer';
import HeaderThree from './HeaderThree';
const QuoteDetailForm: React.FC = () => {
    return (
        <>
        <HeaderThree></HeaderThree>
            <section
                className="banner-one"
                id='home'
                style={{
                    overflow: "hidden",
                    height: "auto",
                    padding: "80px 0"
                }}
            >
                <div className="banner-one__shape-bg" ></div>
                {/* <div className="banner-one__shape-1">
                <div className="banner-one__shape-1-bg" ></div>
            </div> */}
                <div className="banner-one__shape-2"></div>
                <div className="container">
                    <div
                        className="banner-one__inner d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5"
                        style={{ width: "100%" }}
                    >
                        <div
                            className="banner-one__content w-100"
                            style={{ flex: 1 }}
                        >
                            <p className="banner-one__sub-title">Secure & Affordable Airport Parking at Bristol Airport</p>
                            <h2 className="banner-one__title">
                                Hassle-Free
                                <br />
                                <span> Airport Parking </span>
                                <span className="typed-effect" >
                                    <TypingEffect stringArray={['Rental', 'Booking']} />
                                </span>
                            </h2>
                            <p className="banner-one__text">Book safe, convenient, and affordable parking spaces near Bristol Airport.
                                <br />
                                Enjoy stress-free travel with secure parking, easy access to terminals,
                                <br />
                                and reliable customer support available whenever you need it.</p>
                            <div className="banner-one__btn-box">
                                <Link to="/" className="thm-btn text-white">Book Parking<span className="fas fa-arrow-right"></span></Link>
                            </div>
                        </div>
                        <div
                            className="tabs-content w-100 w-xl-auto"
                            style={{ maxWidth: "420px" }}
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
                                <form className="contact-form-validated search-car__form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="d-flex flex-column gap-3 w-100">
                                        <div className="w-100">
                                            <div className="search-car__input-box">
                                                <p className="search-car__input-title">
                                                    Airport</p>
                                                <div className="select-box">
                                                    <CustomSelect optionArray={[
                                                        { value: "Bristol", label: "Bristol" }
                                                    ]} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <div className="search-car__input-box">
                                                <p className="search-car__input-title"> <span
                                                    className="icon-date"></span>Pickup Date</p>
                                                <input type="date" placeholder="mm/dd/yyy" name="date" id="datepicker" />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <div className="search-car__input-box">
                                                <p className="search-car__input-title"> <span
                                                    className="icon-clock"></span>Pickup Time</p>
                                                <input type="time" name="time" placeholder="Chose A Time" />
                                            </div>
                                        </div>

                                        <div className="w-100">
                                            <div className="search-car__input-box">
                                                <p className="search-car__input-title"> <span
                                                    className="icon-date"></span>Drop of Date</p>
                                                <input type="date" placeholder="mm/dd/yyy" name="date" id="datepicker-2" />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <div className="search-car__input-box">
                                                <p className="search-car__input-title"> <span
                                                    className="icon-clock"></span>Drop of Time</p>
                                                <input type="time" name="time" placeholder="Chose A Time" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12">
                                            <div className="search-car__btn-box">
                                                <button type="submit" className="thm-btn text-white">Get Parking Quote
                                                    <span className="fas fa-search"></span></button>
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
            <Footer></Footer>
        </>
    );
};


<style>
    {`
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
`}
</style>
export default QuoteDetailForm;