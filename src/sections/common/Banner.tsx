import React from 'react';
// import { Link } from 'react-router';

import video from "../../assets/images/videos/video-5.mp4"

interface BannerProps {
    breadcrumb: string;
}
const Banner: React.FC<BannerProps> = ({ breadcrumb }) => {
    return (
        <section className="page-header">
            <video className="page-header__video" autoPlay muted loop playsInline>
                <source src={video} type="video/mp4" />
            </video>

            {/* <div className="page-header__bg"></div> */}
            <div className="page-header__shape-1"></div>
            <div className="container">
                <div className="page-header__inner">
                    <h3>{breadcrumb}</h3>
                    <div className="thm-breadcrumb__inner">
                        {/* <ul className="thm-breadcrumb list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><span className="icon-arrow-left"></span></li>
                            <li>{breadcrumb}</li>
                        </ul> */}
                    </div>
                </div>
            </div>

            <style>{`
    .page-header {
        position: relative;
        overflow: hidden;
        background-image: none !important;
    }

    .page-header__bg {
        display: none !important;
        background-image: none !important;
    }

    .page-header__video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -2;
    }

    .page-header::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        z-index: -1;
    }

    .page-header .container {
        position: relative;
        z-index: 2;
    }
`}</style>
        </section>
    );
};

export default Banner;