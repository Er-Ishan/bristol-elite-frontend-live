import React from 'react';
import { Link } from "react-router";
import { motion } from "framer-motion"
// import bg1 from "../../assets/images/backgrounds/feature-1.png";
// import bg2 from "../../assets/images/backgrounds/feature-2.png";
interface FeatureItem {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const featureItems: FeatureItem[] = [
    {
        id: 1,
        title: "Need Secure \nAirport Parking ?",
        description:
            "Book safe, affordable, and convenient airport parking spaces near your terminal with 24/7 security and easy shuttle access.",
        buttonText: "Book Parking",
        link: "/quote-form",
    },
    {
        id: 2,
        title: "Looking for \nLong Stay Parking ?",
        description:
            "Enjoy hassle-free long-term airport parking with flexible plans, competitive rates, and reliable customer support.",
        buttonText: "Reserve Now",
        link: "/quote-form",
    },
];

const FeaturesThree: React.FC = () => {
    return (
        <section className="feature-one feature-two">
            <div className="container">
                <div className="feature-one__inner">
                    <div className="row">
                        {featureItems.map((item) => (
                            <motion.div
                                initial={{ x: item?.id % 2 === 0 ? 90 : -90, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut"
                                }}
                                viewport={{ amount: 0.1, once: true }}
                                className="col-xl-6 col-lg-6" key={item.id}>
                                <div
                                    className={`feature-one__inner-single ${item.id === 2 ? "feature-one__inner-single--two" : ""
                                        } wow`}
                                >
                                    <div
                                        className="feature-one__inner-single-bg"
                                        //style={{ backgroundImage: `url(${item.bgImage})` }}
                                    ></div>

                                    <h3 className="feature-one__inner-title">
                                        {item.title.split("\n").map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </h3>

                                    <p className="feature-one__inner-text">
                                        {item.description}
                                    </p>

                                    <div className="feature-one__inner-btn-box">
                                        <Link to={item.link} className="thm-btn">
                                            {item.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesThree;
