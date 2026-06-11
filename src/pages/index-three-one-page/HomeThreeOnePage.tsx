import React, { useEffect } from 'react';
import useGorentContext from '../../components/context/useGorentContext';
import HeaderThree from '../../sections/home-three/HeaderThree';
import BannerThree from '../../sections/home-three/BannerThree';
import AboutThree from '../../sections/home-three/AboutThree';
import ServiceThree from '../../sections/home-three/ServiceThree';
import ProcessThree from '../../sections/home-three/ProcessThree';
import CounterThree from '../../sections/home-three/CounterThree';
import TestimonialsThree from '../../sections/home-three/TextimonialsThree';
import Footer from '../../sections/common/Footer';
import StrickyHeader from '../../sections/common/StrickyHeader';
import Gallery from '../../sections/common/Gallery';
// import BrandThree from '../../sections/home-three/BrandThree';
import FeaturesThree from '../../sections/home-three/FeaturesThree';
// import BlogThree from '../../sections/home-three/BlogThree';
// import PricingThree from '../../sections/home-three/PricingThree';

const HomeThreeOnePage: React.FC = () => {
    const { setActiveSection } = useGorentContext();
    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.7,
            }
        );
        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, [setActiveSection]);
    return (
        <div className='page-wrapper'>
            <HeaderThree />
            <BannerThree />
            {/* <SearchCarThree /> */}
            <AboutThree />
            <ServiceThree />
            <ProcessThree />
            <CounterThree />
            {/* <ListingThree /> */}
            {/* <VideoThree /> */}
            {/* <PricingThree /> */}
            {/* <LetsTalk /> */}
            <TestimonialsThree />
            {/* <TeamThree /> */}
            {/* <ContactThree /> */}
            <Gallery />
            <FeaturesThree />
            {/* <BrandThree /> */}
            {/* <DownloadApp /> */}
            {/* <BlogThree /> */}
            
            <Footer />
            {/* <Faq></Faq> */}
            <StrickyHeader />
        </div>
    );
};

export default HomeThreeOnePage;