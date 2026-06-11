import React, { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
// Images
// import taglineShape from '../../assets/images/shapes/section-title-tagline-shape-1.png';
import testi1 from '../../assets/images/testimonial/testimonial-3-1.jpg';
import testi2 from '../../assets/images/testimonial/testimonial-3-2.jpg';
import testi3 from '../../assets/images/testimonial/testimonial-3-3.jpg';
import TextAnimation from '../../components/elements/TextAnimation';

// Types
interface TestimonialItem {
    id: number;
    image: string;
    name: string;
    role: string;
    text: string;
    rating: number;
}

// Data
const testimonialsData: TestimonialItem[] = [
    {
        id: 1,
        image: testi1,
        name: 'James Walker',
        role: 'Business Traveler',
        rating: 5,
        text: `Bristol Airport Parking made my trip completely stress free.
        The online booking process was quick, the parking area felt very secure,
        and the shuttle service to the terminal was fast and reliable. Highly recommended.`,
    },
    {
        id: 2,
        image: testi2,
        name: 'Sarah Mitchell',
        role: 'Frequent Flyer',
        rating: 5,
        text: `Excellent service from start to finish. The staff were very helpful,
        the parking facility was easy to access, and I felt confident leaving my car
        there during my holiday. I will definitely use Bristol Airport Parking again.`,
    },
    {
        id: 3,
        image: testi3,
        name: 'Daniel Roberts',
        role: 'Holiday Traveler',
        rating: 5,
        text: `Very affordable airport parking with great customer support.
        The shuttle arrived within minutes and the entire experience was smooth
        and professional. Perfect option for anyone flying from Bristol Airport.`,
    },
];

const TestimonialsThree: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    return (
        <section className="testimonial-three">
            <div className="container">
                <div className="row">
                    {/* Left */}
                    <div className="col-xl-5 col-lg-5">
                        <div className="testimonial-three__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    
                                    <span className="section-title__tagline">
                                        Our Testimonial
                                    </span>
                                </div>
                                <h2 className="section-title__title title-animation">
                                    <TextAnimation text='What Peoples Say' />
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="col-xl-7 col-lg-7">
                        <div className="testimonial-three__right">
                            <div className="testimonial-three__carousel owl-theme owl-carousel">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={30}
                                    loop={true}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    onSwiper={setSwiperInstance}
                                    speed={1000}
                                    modules={[Navigation, Autoplay]}
                                    breakpoints={{
                                        0: { slidesPerView: 1, spaceBetween: 10 },
                                        770: { slidesPerView: 2, spaceBetween: 10 }, 
                                    }}
                                >
                                    {testimonialsData.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <div className="item" key={item.id}>
                                                <div className="testimonial-three__single">
                                                    <div className="testimonial-three__img">
                                                        {/* <img
                                                            src={item.image}
                                                            alt={item.name}
                                                        /> */}
                                                        <div className="testimonial-three__rating">
                                                            {Array.from({
                                                                length: item.rating,
                                                            }).map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="fas fa-star"
                                                                ></span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="testimonial-three__client-info">
                                                        <div className="testimonial-three__client-content">
                                                            <h4 className="testimonial-three__client-name">
                                                                <Link to="/inner/testimonials">
                                                                    {item.name}
                                                                </Link>
                                                            </h4>
                                                            <p className="testimonial-three__client-sub-title">
                                                                {item.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="testimonial-three__text">
                                                        {item.text}
                                                    </p>
                                                </div>

                                                <div className="testimonial-three__quote">
                                                    <span className="icon-quote"></span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="owl-nav" style={{ zIndex: '105' }}>
                                    <button type="button"
                                        className="owl-prev"
                                        onClick={() => swiperInstance?.slidePrev()}
                                    >
                                        <span className="far fa-long-arrow-left"></span>
                                    </button>
                                    <button type="button" className="owl-next"
                                        onClick={() => swiperInstance?.slideNext()}
                                    >
                                        <span className="far fa-long-arrow-right"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Right */}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsThree;
