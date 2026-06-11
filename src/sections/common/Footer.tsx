import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion"
import footerLogo from "../../assets/images/resources/brs-new-logo.png"
// import footerVideo from "../../assets/images/videos/video-1.mp4";
interface LinkItem {
    id: number;
    link: string;
    title: string;
}

const linkOne: LinkItem[] = [
    { id: 1, link: "/about-us", title: "About Us" },
    { id: 2, link: "/how-it-works", title: "How Works" },
    // { id: 3, link: "/blog-data", title: "Our Blog" },
    { id: 4, link: "/contact-form", title: "Contact Us" },
    { id: 5, link: "/faq", title: "FAQ" },
    { id: 6, link: "/terms-condition", title: "Terms & Condition" },
    { id: 7, link: "/private-policy", title: "Privacy Policy" }
];

const Footer: React.FC = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const email = form.email.value;

        if (email) {
            form.reset();
        };

    };
    return (
        <footer className="site-footer">
            <div className="site-footer__bg"></div>
            <div className="site-footer__top">
                <div className="container">
                    <div className="site-footer__top-inner">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                <div className="footer-widget__about">
                                    <div className="main-menu__left">
                                        <div className="main-menu__logo">
                                            <Link to="/">
                                                <img
                                                    src={footerLogo}
                                                    alt="Logo"
                                                    style={{
                                                        height: "80px",
                                                        width: "auto",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <p className="footer-widget__about-text">Car Is Where Secure & Affordable Airport Parking at Bristol Airport</p>
                                    <form className="footer-widget__form" onSubmit={handleSubmit}>
                                        <div className="footer-widget__input">
                                            <input type="email" name='email' placeholder="Your Email" />
                                        </div>
                                        <button type="submit" className="footer-widget__btn"><i className="icon-right-arrow"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                <div className="footer-widget__links">
                                    <h4 className="footer-widget__title">Quick links</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {
                                            linkOne.map((item: LinkItem) => <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.2 * item.id,
                                                    ease: "easeOut"
                                                }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}><Link to={item.link}>{item.title}</Link></motion.li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                                <div className="footer-widget__services">
                                    <h4 className="footer-widget__title">Services</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {
                                            linkTwo.map((item: LinkItem) => <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.2 * item.id,
                                                    ease: "easeOut"
                                                }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}><Link to={item.link}>{item.title}</Link></motion.li>)
                                        }
                                    </ul>
                                </div>
                            </div> */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                                <div className="footer-widget__contact">
                                    <h3 className="footer-widget__title">Contact Us</h3>
                                    <ul className="footer-widget__contact-list list-unstyled">

                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-call"></span>
                                            </div>
                                            <p><a href="tel:02046415437">02046415437</a></p>
                                        </motion.li>
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.9,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-envelope"></span>
                                            </div>
                                            <p><a href="mailto:support@bristoleliteparking.co.uk">support@bristoleliteparking.co.uk</a></p>
                                        </motion.li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="site-footer__bottom-inner">
                                <div
                                    className="site-footer__bottom-inner"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                    }}
                                >
                                    <p className="site-footer__bottom-text">
                                        © Copyright 2026 Bristol Elite Parking
                                    </p>


                                </div>
                                <div className="site-footer__bottom-menu-box">
                                    {/* <ul className="list-unstyled site-footer__bottom-menu">
                                        <li><Link to="/inner/about">Terms of Service</Link></li>
                                        <li><Link to="/inner/about">Privacy policy</Link></li>
                                    </ul> */}

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#ffffff",
                                            textAlign: "right",
                                        }}
                                    >
                                        This site is developed and maintained by{" "}

                                        <a
                                            href="https://techbaba.co.uk/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "#fbbf24",
                                                textDecoration: "none",
                                                fontWeight: "700",
                                            }}
                                        >
                                            Tech Baba
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    );
};

export default Footer;