
import React from "react";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import {
    FaPhoneAlt,
    FaCar,
    FaHandshake,
    FaPoundSign,
    FaMapMarkerAlt,
    FaShuttleVan,
    FaCreditCard,
    FaPlaneArrival,
    FaPlaneDeparture,
    FaExclamationTriangle,
    FaCheckCircle,
} from "react-icons/fa";
import Banner from "../common/Banner";

const AirportProcedure: React.FC = () => {
    return (
        <>
            <HeaderThree />
            <Banner breadcrumb='Airport Procedure' />

            <section className="airport-procedure">
                <div className="container">

                    <div className="airport-procedure__header">
                        <h1>Bristol Elite Parking – Meet & Greet Instructions</h1>
                    </div>

                    <div className="airport-card">
                        <h2><FaMapMarkerAlt className="heading-icon" /> Location</h2>

                        <p>
                            <strong>Bristol Airport</strong>
                        </p>

                        <p>
                            <strong>Postcode:</strong> BS48 3DY
                        </p>

                        <p>
                            Enter via the A38 and follow signs for the Drop & Go Car Park.
                        </p>
                    </div>

                    <div className="airport-card">
                        <h2><FaPlaneDeparture className="heading-icon" /> On Arrival (Drop-Off)</h2>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaPhoneAlt />
</div>
                            <div>
                                <strong>Call 02046415437</strong>
                                <p>Do this 30 minutes before arriving at the airport.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaCar />
</div>
                            <div>
                                <strong>Drive to the Drop & Go Car Park</strong>
                                <p>Located next to Departures and clearly signposted.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaHandshake />
</div>
                            <div>
                                <strong>A Bristol Elite Parking driver will meet you there.</strong>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaPoundSign />
</div>
                            <div>
                                <strong>Leave £8.50 cash in your car</strong>
                                <p>
                                    This covers the airport exit fee (not included in your booking).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="airport-card">
                        <h2><FaPlaneArrival className="heading-icon" /> On Return (Pick-Up)</h2>

                        <ul className="airport-list">
                            <li>Collected your luggage</li>
                            <li>Cleared customs/security</li>
                        </ul>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaPhoneAlt />
</div>
                            <div>
                                <strong>Call 02046415437</strong>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaMapMarkerAlt />
</div>
                            <div>
                                <strong>
                                    Go to the Drop & Go Car Park (same place you dropped off your car).
                                </strong>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaShuttleVan />
</div>
                            <div>
                                <strong>Your vehicle will be returned to you by a driver.</strong>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="airport-icon">
    <FaCreditCard />
</div>
                            <div>
                                <strong>You will need £8.50 to exit the car park</strong>
                                <p>Debit cards are also accepted.</p>
                            </div>
                        </div>
                    </div>

                    <div className="airport-card airport-warning">
                        <h2><FaExclamationTriangle className="heading-icon" /> Important Information</h2>

                        <ul className="airport-list">
                            <li>No vans or commercial vehicles accepted</li>
                            <li> Flights are not monitored — Please call when you land</li>
                            <li>
                                If your booking time or date changes last minute,
                                call 02046415437 to inform the team
                            </li>
                            <li>
                                Entry and exit fees for the car park are not included
                                and must be paid by you
                            </li>
                        </ul>
                    </div>

                    <div className="airport-card airport-summary">
                        <h2><FaCheckCircle className="heading-icon" /> Quick Summary</h2>

                        <ul className="airport-list">
                            <li>✅ Call 30 minutes before arrival</li>
                            <li>✅ Meet at Drop & Go Car Park</li>
                            <li>✅ Call again after collecting luggage</li>
                            <li>✅ Car returned at the same location</li>
                        </ul>
                    </div>

                </div>
            </section>

            <style>{`
                .airport-procedure{
                    padding:80px 0;
                    background:#f8fafc;
                }

                .airport-procedure__header{
                    text-align:center;
                    margin-bottom:40px;
                }

                .airport-procedure__header h1{
                    font-size:42px;
                    font-weight:700;
                    line-height:1.3;
                }

                .airport-card{
                    background:#fff;
                    border-radius:16px;
                    padding:30px;
                    margin-bottom:25px;
                    box-shadow:0 10px 30px rgba(0,0,0,.08);
                }

                .airport-card h2{
                    margin-bottom:20px;
                    font-size:28px;
                    font-weight:700;
                }

                .step-item{
                    display:flex;
                    gap:16px;
                    margin-bottom:20px;
                    align-items:flex-start;
                }

                .step-item span{
                    font-size:30px;
                    min-width:40px;
                }

                .step-item p{
                    margin-top:6px;
                    margin-bottom:0;
                }

                .airport-list{
                    padding-left:20px;
                    margin:0;
                }

                .airport-list li{
                    margin-bottom:12px;
                    line-height:1.7;
                }

                .airport-warning{
                    border-left:5px solid #f59e0b;
                }

                .airport-summary{
                    border-left:5px solid #10b981;
                }

                @media(max-width:768px){

                    .airport-procedure{
                        padding:50px 0;
                    }

                    .airport-card{
                        padding:20px;
                    }

                    .airport-procedure__header h1{
                        font-size:28px;
                    }

                    .airport-card h2{
                        font-size:22px;
                    }

                    .step-item{
                        gap:12px;
                    }

                    .step-item span{
                        font-size:24px;
                    }
                }
            `}</style>

            <Footer />
        </>
    );
};

export default AirportProcedure;

