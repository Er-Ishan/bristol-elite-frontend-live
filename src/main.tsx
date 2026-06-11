import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "swiper/swiper-bundle.css";
import './assets/css/style.css'
import ContextProvider from './components/context/ContextProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ContactThree from './sections/home-three/ContactThree.tsx';
import HomeThreeOnePage from './pages/index-three-one-page/HomeThreeOnePage.tsx';
import Faq from './pages/faq/Faq.tsx';
import AboutDetails from './sections/home-three/AboutDetails.tsx';
import ProcessDetails from './sections/home-three/ProcessDetails.tsx';
import QuoteDetailForm from './sections/home-three/QuoteDetailForm.tsx';
import PricingThree from './sections/home-three/PricingThree.tsx';
import BlogThree from './sections/home-three/BlogThree.tsx';
import BookingFormThree from './sections/home-three/BookingFormThree.tsx';
import PaymentThree from './sections/home-three/PaymentThree.tsx';
import ThankYouThree from './sections/home-three/ThankYouThree.tsx';
import ReceiptThree from './sections/home-three/ReceiptThree.tsx';
import BookingDetailsThree from './sections/home-three/BookingDetailsThree.tsx';
import RetryPaymentThree from './sections/home-three/RetryPaymentThree.tsx';
import AirportProcedure from './sections/home-three/AirportProcedure.tsx';
import ProductDetailsPage from './sections/home-three/ProductDetailsPage';

import "react-datepicker/dist/react-datepicker.css";
import Terms from './sections/home-three/Terms.tsx';
import PrivatePolicy from './sections/home-two/PrivatePolicy.tsx';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <AppRoutes />
          </Elements>
        ) : (
          <AppRoutes />
        )}
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)

function AppRoutes() {
  return (
    <Routes>
      <Route path='/contact-form' element={<ContactThree></ContactThree>}></Route>
      <Route path='/quote-form' element={<QuoteDetailForm></QuoteDetailForm>}></Route>
      <Route path='/' element={<HomeThreeOnePage></HomeThreeOnePage>}></Route>
      <Route path='/about-us' element={<AboutDetails></AboutDetails>}></Route>
      <Route path='/pricing-quotes' element={<PricingThree></PricingThree>}></Route>
      <Route path='/booking-form' element={<BookingFormThree></BookingFormThree>}></Route>
      <Route path='/payment' element={<PaymentThree></PaymentThree>}></Route>
      <Route path='/thank-you' element={<ThankYouThree></ThankYouThree>}></Route>
      <Route path='/receipt' element={<ReceiptThree></ReceiptThree>}></Route>
      <Route path='/booking-details' element={<BookingDetailsThree></BookingDetailsThree>}></Route>
      <Route path='/retry-payment/:bookingId' element={<RetryPaymentThree></RetryPaymentThree>}></Route>
      <Route path='/how-it-works' element={<ProcessDetails></ProcessDetails>}></Route>
      <Route path='/faq' element={<Faq></Faq>}></Route>
      <Route path='/blog-data' element={<BlogThree></BlogThree>}></Route>
      <Route path='/airport-procedure' element={<AirportProcedure></AirportProcedure>}></Route>
      <Route path='/product-details/:id' element={<ProductDetailsPage />}></Route>
      <Route path='/terms-condition' element={<Terms></Terms>}></Route>
      <Route path='/private-policy' element={<PrivatePolicy></PrivatePolicy>}></Route>
    </Routes>
  );
}
