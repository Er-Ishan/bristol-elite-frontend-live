import React from "react";
import HeaderThree from "./HeaderThree";
import Footer from "../common/Footer";
import Banner from "../common/Banner";
import {
    FaFileContract,
    FaCar,
    FaPlaneDeparture,
    FaClock,
    FaMoneyBillWave,
    FaExclamationTriangle,
    FaShieldAlt
} from "react-icons/fa";

const Terms: React.FC = () => {
    return (
        <>
            <HeaderThree />
            <Banner breadcrumb="Terms & Conditions" />

            <section className="terms-page">
                <div className="container">
                    <div className="terms-header">
                        <p>
                            PLEASE ENSURE THAT YOU HAVE READ THE TERMS & CONDITIONS ON OUR WEBSITE bristoleliteparking.co.uk
                        </p>
                    </div>

                    <div className="terms-grid">
                        <div className="terms-card">
                            <h2>
                                <span className="term-number">1</span>
                                <FaCar />
                                BOOKINGS AND SERVICE
                            </h2>

                            <p>
                                <strong>1.1</strong> Booking through our website or Consolidators are deemed to be the booking is confirmed when final booking confirmation has been sent via e-mail. All terms and conditions are deemed to have been accepted at the point confirmation is made.
                            </p>

                            <p>
                                <strong>1.2</strong> Whilst every effort is made to ensure that collections and deliveries of the vehicle are made at the requested times. We do not accept any responsibility for delays of its service, caused as a result of circumstances beyond our control, such as traffic congestion, delayed flights, road accidents, security alerts, severe weather conditions, luggage delays and immigration delays. This list is not exhausted.
                            </p>

                            <p>
                                <strong>1.3</strong> Where a third-party service provider is used, they will have their own terms and conditions. If you require a copy of these, please request it from the agent. However, we will do our best to make you aware of anything you need to know. Once your booking is complete, our role will be as an intermediary between you and the service provider, booking details will be provided with the supplier and we will send you a booking reference number by email on behalf of the supplier.
                            </p>
                        </div>

                        <div className="terms-card">
                            <h2>
                                <span className="term-number">2</span>
                                <FaMoneyBillWave />
                                PAYMENT
                            </h2>

                            <p>
                                <strong>2.1</strong> Increased duration of the stay will be debited from the client's account and payment collected prior to the return of the vehicle. Any extended days will be charged at a daily rate of £25.00 for Meet & Greet and a daily rate of £20.00 for Park & Ride.
                            </p>

                            <p>
                                <strong>2.2</strong> Full payment of booked service is due prior to the commencement of the service.
                            </p>

                            <p>
                                <strong>2.3</strong> If your return time passes midnight from your actual paid booking date, and your car needs to be delivered after midnight, an additional charge of £40.00 is applied.
                            </p>

                            <p>
                                (We Operates From 4:30 to 23:59 vehicles picked or dropped out of these hours will be charged £40)
                            </p>

                            <p>
                                <strong>2.4</strong> If any booking that is made in the last 6 hours or customers arrive more than 30 minutes outside of booked times without at least 2 hours notice, the full short stay car park costs will be referred to the customer to pay in addition to a £20.00 fee, which also applies to early returns. Additional work may be required to dispatch staff and/ or customer vehicles if a customer arrives out of their scheduled and/ or booked times. In cases where a wait is involved, we always recommend that customers wait inside terminals until such a time as staff update you with a realistic time to meet you.
                            </p>

                            <p>
                                <strong>2.5</strong> We will have to assign a new driver for you if you do not arrive at the Terminal at the booked time and we expect you to inform us in advance (at least 2 hours notice) if you are going to be late from the scheduled time. Assigning a new driver might take time and sometimes will not be able to arrange the driver promptly.
                            </p>

                            <p>
                                <strong>2.6</strong> If the departure or return terminal is changed after booking confirmation, a £10.00 fee will be charged per terminal change.
                            </p>

                        </div>

                        <div className="terms-card">
                            <h2>
                                <span className="term-number">3</span>
                                <FaFileContract />
                                CANCELLATIONS AND CURTAILMENT
                            </h2>

                            <p>
                                <strong>3.1</strong> Flexible products may be cancelled up to 48 hours prior to the date for which the service has been booked and a full refund, with a £15.00 administration cost which will be charged.
                            </p>

                            <p>
                                <strong>3.2</strong> No refunds will be given for any cancellations or none-use of our service made within 48 hours of the day of travel.
                            </p>

                            <p>
                                <strong>3.3</strong> Any customer wishing to curtail the length of stay for a service once that service has commenced will be liable to pay the fee for the whole of the service booked. The days curtailed cannot be transferred to another booking.
                            </p>

                            <p>
                                <strong>3.4</strong> Any alterations made within 24 hours of departure and during the duration of stay will incur a charge of £10.00 for each and every amendment made. All amendments must be sent via e-mail and will only be acknowledged once a confirmation e-mail is received.
                            </p>

                            <p>
                                <strong>3.5</strong> Cancellations or amendments cannot be accepted if you book a supersaver, saver or non-flexible parking product.
                            </p>
                        </div>

                        <div className="terms-card">
                            <h2>
                                <span className="term-number">4</span>
                                <FaPlaneDeparture />
                                LIABILITIES AND OTHER TERMS
                            </h2>

                            <p>
                                <strong>4.1</strong> Where a third-party service provider is used, the company acts only as a booking agent for the service provider. Any claims by the customer in respect of the delivery of the product must be made against the service provider and subject to its terms and conditions.
                            </p>

                            <p>
                                <strong>4.2</strong> Where we are the service provider, our insurance covers our legal liabilities.
                            </p>

                            <p>
                                <strong>4.3</strong> Vehicles and moveable items which are left unattended are left at the owner’s risk whilst the vehicle is in our possession.
                            </p>

                            <p>
                                <strong>4.4</strong> No claim for damage can be made unless that damage was brought to the attention of our representative upon collection of your vehicle on your return and written notification is given to you at the time. In the unlike event of a claim for damage, will not accept any claim without clear photographs from prior to departure which confirm that damage was not in place prior to drop-off. It is the customer's responsibility to take clear images to support any claim. this applies to all customers however the original booking has been made and the photographs must be taken in the meet and greet drop-off area/shorts stay car park and for Park & Rides it will be at the car park.
                            </p>

                            <p>
                                <strong>4.5</strong> We only check for major damages and any minor damages including stone chip and minor paint damages will not be accepted. No liablity will be accepted of the damages that are clearly seen after a rain or a car wash. We will not take any responsiblities for any damages that are not visible to eye level (when standing) specially under the vehicle or the lower part of the bumber that is not visible and that cannot be covered in a photo/image taken.
                            </p>

                            <p>
                                <strong>4.6</strong> We accept no liability for the mechanical, structural and electrical failure of any part of your vehicle including windscreens, glass chips, clutches, tyres, stone chip damages to body and alloy wheels. This list is not exhaustive.
                            </p>

                            <p>
                                <strong>4.7</strong> Make sure your vehicle is in a roadworthy, safe and legal condition with full insurance, road tax, MOT and comply with the Road Traffic Act 1988. This is deemed by us to be the case for the whole duration while the vehicle is in our possession.
                            </p>

                            <p>
                                <strong>4.8</strong> We accept no liability for any faulty keys, alarm fobs, house or other keys left on the key ring. We, therefore, advise that only the car key should be given. In the event of vehicles not starting, we reserve the right to charge for our time.
                            </p>

                            <p>
                                <strong>4.9</strong> In the event that the car acquires a puncture whilst in our possession, (including slow punctures) we reserve the right to charge either to inflate the tyre or for the changing of the tyre. We do not accept liability for punctures whilst in our custody. We also do not take liability for tyre burst and damages caused by tyre bursts.
                            </p>

                            <p>
                                <strong>4.10</strong> In the event that the vehicle does not start due to a flat battery, we reserve the right to charge for our time in attempting to start the vehicle. Please note that we cannot be held responsible for any consequences that may result as a direct result of us having to jump-start your vehicle.
                            </p>

                            <p>
                                <strong>4.11</strong> During busy periods your car may be stored in any one of our secondary compounds, (within a 15-mile radius of our main car park). Please note that security levels may vary.
                            </p>

                            <p>
                                <strong>4.12</strong> In the event that your vehicle needs to be repaired as a result of an accident, it must only be carried out by our own approved organisation. It will be your responsibility to deliver and collect the car from the garage at your own cost. We cannot authorise or agree for any works to be carried out by dealerships and garages that have not been approved by us, even in the event of the vehicle forgoing its warranty. The company reserves the right to undertake repairs to your vehicle on your behalf in a manner that restores it to the condition in which it arrived at the car park.
                            </p>

                            <p>
                                <strong>4.13</strong> Our drivers do not consent to be filmed. Therefore, in some cases, dash cams may be disconnected. Dash cams will also be disconnected to avert any situation causing an electrical shortage leading to a fire.
                            </p>

                            <p>
                                <strong>4.14</strong> If you are driving an electric-only vehicle (EV) please inform the driver when handing over the vehicle and ensure that minimum 25 miles range left in the vehicle for us to do our operations.
                            </p>

                            <p>
                                <strong>4.15</strong> Please pay the necessary amount if you need charge the EV vehicle if you haven't booked a EV parking product.
                            </p>

                            <p>
                                <strong>4.16</strong> The customer must provide the necessary adapters/home chargers to charge the vehicle if booked for an EV product.
                            </p>

                            <p>
                                <strong>4.17</strong> There might be an addional charge of we have to charge your vehile at a super charge point.
                            </p>

                            <p>
                                <strong>4.18</strong> Only £40 will be refunded if we fail to charge the EV vehicle due to unforceen circumstances and we will take no liablity for any inconveninece the customer will has to encounter including any taxi charges or any other charges.
                            </p>

                            <p>
                                <strong>4.19</strong> The company will not take any liabilites for any damages caused by any malfucntions including electrical malfuctions during the charging process.
                            </p>

                            <p>
                                <strong>4.20</strong> We do not take any liablity for EV battery damage caused by any reason.
                            </p>

                            <p>
                                <strong>4.21</strong> We advise that the customer have a record/photograph of the mileage and fuel level of the vehicle at the point of handing over the vehicle to our company driver.
                            </p>
                        </div>

                        <div className="terms-card">
                            <h2>
                                <span className="term-number">5</span>
                                <FaClock />
                                EXCLUSION AND LIMITS OF OUR RESPONSIBILITY
                            </h2>

                            <p>
                                <strong>5.1</strong> Vehicles parked by the customer personally at a Car park/Hotel do so entirely at their own risk.
                            </p>

                            <p>
                                <strong>5.2</strong> Loss or damage should be covered by your own insurance. No vehicles will be covered for Theft/Fire/Flood/Malicious damage or any other intervening act of nature whilst the vehicle is parked in our custody.
                            </p>

                            <p>
                                <strong>5.3</strong> Any indirect/direct loss as a result of damage or loss to the vehicle will not be accepted (such as loss of earnings/missed flights etc.).
                            </p>

                            <p>
                                <strong>5.4</strong> We cannot pay more than £20,000 for loss of or damage to the vehicle.
                            </p>

                            <p>
                                <strong>5.5</strong> We will endeavour to deliver your vehicle back to you within 60 mins depending on traffic, weather conditions.
                            </p>

                            <p>
                                <strong>5.6</strong> We cannot be held liable for any delayed or missed flights/car hire charges as a direct or indirect result of our service. We expect that the customer to drop the vehicle with us three hours before the scheduled flight time.
                            </p>

                            <p>
                                <strong>5.7</strong> We will not be responsible for any discolour of paintwork or dents or scratches that may become visible after a Car wash/rainfall. This is regardless of whether the dents or scratches are mentioned in this document or not.
                            </p>

                            <p>
                                <strong>5.8</strong> We are unable to accept vehicles that are fitted with a roof luggage box that do not fall under the height restrictions within the airport car parks. In the event of a customer booking the service with a vehicle fitted with a roof luggage box, the Company cannot accept liability for any damage.
                            </p>

                            <p>
                                <strong>5.9</strong> It is not always possible to check the internal condition of the car and therefore we will not accept responsibility for the interior condition.
                            </p>

                            <p>
                                <strong>5.10</strong> Minor claims, those below £750 may not be accepted.
                            </p>

                            <p>
                                <strong>5.11</strong> Electric vehicles will be only power charged once and maximum 70% will be charged.
                            </p>

                            <p>
                                <strong>5.12</strong> Any issues/malfunctions arising from charging will not accepted by the company.
                            </p>

                            <p>
                                <strong>5.13</strong> We will not take responsibility or we will not be held accountable for any issues that arise from the negligence of the booking agents and third party websites, these must be resolved with them.
                            </p>

                            <p>
                                <strong>5.14</strong> Customer/ vehicle owner has the bear the cost of paying the ULEZ if the vehicle does not meet the ULEZ standards. The customer has to pay ULEZ for both days (the day of drop off and the day of collection ) if the customer vehicle does not meet the ULEZ standards.
                            </p>

                            <p>
                                <strong>5.15</strong> Bristol Elite Parking will not bear the cost of ULEZ at any circumstances.
                            </p>
                        </div>

                        <div className="terms-card">
                            <h2>
                                <span className="term-number">3</span>
                                <FaShieldAlt />
                                CUSTOMER RELATIONS PROCEDURE
                            </h2>

                            <p>
                                If you should have any concerns or issues you wish to raise or investigate further, the following procedure needs to take effect.- A written correspondence needs to be made via email/letter / to our office (all correspondence details are available on the customer copy coupon receipt).- Our customer relations team shall endeavour to respond to your query within a maximum of 7 working days.- Please note that all matters need to be dealt with in writing. Any incidents/issues raised whilst picking or dropping your vehicle need to be made apparent to a Bristol Elite Parking member of staff which will be reported/logged back to the Duty Manager. No acceptance of liability can be made until the matter is thoroughly investigated..
                            </p>

                            
                        </div>

                        <div className="terms-card">
                            <h2><FaExclamationTriangle /> CHANGING THE CONDITIONS</h2>
                            <p>
                                These conditions will remain in force unless the change is made in writing directly by Bristol Elite Parking If you have a question to raise about our Terms and Conditions. Please do not hesitate to get in touch with us”. – Bristol Elite Parking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`

.terms-card p {
  margin-bottom: 12px;
  line-height: 1.8;
  color: #475569;
}

.terms-card p strong {
  color: #0284c7;
  font-weight: 700;
  margin-right: 6px;
}

        .terms-page {
          padding: 80px 0;
          background: #f8fafc;
        }

        .terms-header {
          max-width: 850px;
          margin: 0 auto 45px;
          text-align: center;
        }

        .terms-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: #e0f2fe;
          color: #0369a1;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .terms-header h1 {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
        }

        .terms-header p {
          font-size: 17px;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        .terms-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
        .terms-card {
          background: #ffffff;
          padding: 28px;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .terms-card:hover {
          transform: translateY(-4px);
        }

        .terms-card h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
        }

        .terms-card h2 svg {
          color: #0284c7;
          min-width: 22px;
        }

        .terms-card p {
          font-size: 15.5px;
          line-height: 1.8;
          color: #475569;
          margin: 0;
        }

        .terms-important {
          margin-top: 30px;
          background: #0f172a;
          color: #ffffff;
          padding: 34px;
          border-radius: 20px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
        }

        .terms-important h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 18px;
          color: #ffffff;
        }

        .terms-important h2 svg {
          color: #22c55e;
        }

        .terms-important ul {
          padding-left: 20px;
          margin: 0;
        }

        .terms-important li {
          margin-bottom: 12px;
          line-height: 1.7;
          color: #e2e8f0;
        }

        @media (max-width: 991px) {
          .terms-grid {
            grid-template-columns: 1fr;
          }

          .terms-header h1 {
            font-size: 36px;
          }
        }

        @media (max-width: 576px) {
          .terms-page {
            padding: 50px 0;
          }

          .terms-header {
            margin-bottom: 30px;
          }

          .terms-header h1 {
            font-size: 30px;
          }

          .terms-header p {
            font-size: 15px;
          }

          .terms-card {
  width: 100%;
  background: #ffffff;
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

          .terms-card h2 {
            font-size: 19px;
            align-items: flex-start;
          }

          .terms-important {
            padding: 24px;
            border-radius: 16px;
          }

          .terms-important h2 {
            font-size: 22px;
          }
        }
      `}</style>

            <Footer />
        </>
    );
};

export default Terms;