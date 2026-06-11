import React from 'react';
import { motion } from "framer-motion"
import CustomSelect from '../../../components/elements/CustomSelect';

const UsedCar: React.FC = () => {

    const timeOptions = [];

for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMin = min.toString().padStart(2, "0");

        timeOptions.push({
            value: `${formattedHour}:${formattedMin}`,
            label: `${formattedHour}:${formattedMin}`,
        });
    }
}

    return (
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
                <div className="row">
                    <div className="col-xl-2 col-lg-4 col-md-4">
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
                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__input-box">
                            <p className="search-car__input-title">Pickup Date</p>
                            <input type="date" placeholder="mm/dd/yyy" name="date" id="datepicker" />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__input-box">
                            <p className="search-car__input-title">Pickup Time</p>
                             <CustomSelect optionArray={timeOptions}  />
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__input-box">
                            <p className="search-car__input-title"> Drop of Date</p>
                            <input type="date" placeholder="mm/dd/yyy" name="date" id="datepicker-2" />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__input-box">
                            <p className="search-car__input-title">Drop of Time</p>
                             <CustomSelect optionArray={timeOptions} />
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__input-box">
                            <p className="search-car__input-title">
                                {/* <span className="fas fa-tag"></span> */}
                                Promocodes
                            </p>

                            <input
                                type="text"
                                name="promocode"
                                placeholder="Enter Code"
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
                    <div className="col-xl-2 col-lg-4 col-md-4">
                        <div className="search-car__btn-box">
                            <p className="search-car__input-title"> <span></span></p>
                            <button type="submit" className="thm-btn text-white">
                                <span className="fas fa-search"></span></button>
                        </div>
                    </div>

                </div>
            </form>
            <div className="result"></div>
        </motion.div>
    );
};

export default UsedCar;