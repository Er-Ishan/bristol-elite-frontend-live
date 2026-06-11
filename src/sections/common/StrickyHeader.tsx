import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import MainManuList from '../../components/elements/MainManuList';
import logoOne from "../../assets/images/resources/brs-new-logo.png";
import { onePageManuListOne, onePageManuListThree } from '../../components/link-content/NavLink';
const StrickyHeader: React.FC = () => {
    // const { setIsSearch, setIsSidebar, cartCount } = useGorentContext();
    const [isStick, setIsSticky] = useState<boolean>(false);
    const pathName = useLocation()?.pathname;
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`stricky-header stricked-menu main-menu ${isStick ? 'stricky-fixed' : ''}`}>
            <div className="sticky-header__content">
                <div className="main-menu__wrapper">
                    <div className="main-menu__wrapper-inner">
                        <div className="main-menu__left">
                            <div className="main-menu__logo">
                                <Link to="/">
                                    <img
                                        src={logoOne}
                                        alt="Logo"
                                        style={{
                                            height: "60px",
                                            width: "auto",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="main-menu__middle-box">
                            <div className="main-menu__main-menu-box">
                                <a href="#" className="mobile-nav__toggler"><i className="fa fa-bars"></i></a>
                                <MainManuList onePageManuList={pathName === "/index-one-page" ? onePageManuListOne : onePageManuListThree} />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrickyHeader;