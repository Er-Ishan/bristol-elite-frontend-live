import React from 'react';
import { Link } from 'react-router';
import MainManuList from '../../components/elements/MainManuList';
import logoOne from "../../assets/images/resources/brs-new-logo.png";
import useGorentContext from '../../components/context/useGorentContext';
import { onePageManuListThree } from '../../components/link-content/NavLink';

const HeaderThree: React.FC = () => {
    const { setIsMobileManu } = useGorentContext();

    return (
        <header className="main-header">
            <nav className="main-menu" >
                <div className="main-menu__wrapper" >
                    <div className="main-menu__wrapper-inner" >
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
                                <a className="mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}><i className="fa fa-bars"></i></a>
                                <MainManuList onePageManuList={onePageManuListThree} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderThree;