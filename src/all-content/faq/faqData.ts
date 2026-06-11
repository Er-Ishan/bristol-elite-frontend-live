import type { FaqItem } from "./faqType";


export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "How does Bristol Airport Meet & Greet parking work?",
    answer:
      "Simply drive to the designated meeting point at Bristol Airport, hand your keys to our insured driver, and proceed directly to the terminal. Your vehicle will be parked securely and returned upon your arrival.",
  },
  {
    id: 2,
    question: "How far in advance should I book airport parking?",
    answer:
      "We recommend booking as early as possible to secure the best prices and guarantee availability, especially during holidays and peak travel periods.",
    active: true,
  },
  {
    id: 3,
    question: "Is my vehicle insured while in your care?",
    answer:
      "Yes, all vehicles are fully insured while being driven and parked by our trained and insured staff members.",
  },
  {
    id: 4,
    question: "Do you offer cancellation protection?",
    answer:
      "Yes, cancellation protection can be added during booking, allowing you to cancel or amend your reservation according to our terms and conditions.",
  },
  {
    id: 5,
    question: "Are your parking facilities secure?",
    answer:
      "Yes, our parking facilities are monitored with CCTV, secure fencing, controlled access systems, and regular security patrols.",
  },
];

interface FaqTwo {
    id: number;
    question: string;
    description: string;
}

export const faqTwo: FaqTwo[] = [
  {
    id: 1,
    question: "What parking services do you offer at Bristol Airport?",
    description:
      "We offer Meet & Greet, Park & Ride, and secure long-stay airport parking solutions designed to suit different budgets and travel requirements.",
  },
  {
    id: 2,
    question: "How do I find the meeting point?",
    description:
      "Full arrival instructions and meeting point details are provided in your booking confirmation email after completing your reservation.",
  },
  {
    id: 3,
    question: "Can I amend my booking after payment?",
    description:
      "Yes, bookings can usually be amended before your travel date. Contact our customer support team for assistance.",
  },
  {
    id: 4,
    question: "What happens if my flight is delayed?",
    description:
      "We monitor flight information where possible and work to ensure your vehicle is returned promptly, even if your flight arrives later than expected.",
  },
  {
    id: 5,
    question: "Are there any hidden charges?",
    description:
      "No. All charges are clearly displayed during the booking process before payment is made.",
  },
  {
    id: 6,
    question: "Can I book parking for someone else?",
    description:
      "Yes, you can make a booking on behalf of another driver by entering their vehicle and travel details during checkout.",
  },
];


export const faqsOne: FaqTwo[] = [
  {
    id: 1,
    question: "How secure is your parking facility?",
    description:
      "Our facilities feature CCTV monitoring, secure fencing, and controlled access for maximum vehicle security.",
  },
  {
    id: 2,
    question: "Do I keep my keys?",
    description:
      "For most Meet & Greet services, keys are securely stored while your vehicle is parked.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    description:
      "We accept major debit cards, credit cards, and secure online payments.",
  },
  {
    id: 4,
    question: "Can I get a receipt for my booking?",
    description:
      "Yes, a booking confirmation and receipt are automatically sent via email.",
  },
  {
    id: 5,
    question: "Is customer support available?",
    description:
      "Our support team is available to assist with bookings, amendments, and travel queries.",
  },
];

export const faqsTwo: FaqTwo[] = [
  {
    id: 6,
    question: "How early should I arrive at Bristol Airport?",
    description:
      "We recommend arriving at least 2–3 hours before your flight departure time.",
  },
  {
    id: 7,
    question: "Can I make a last-minute booking?",
    description:
      "Yes, subject to availability, we accept same-day and last-minute reservations.",
  },
  {
    id: 8,
    question: "Do you provide airport transfers?",
    description:
      "Transfers are included with applicable Park & Ride services and operate regularly.",
  },
  {
    id: 9,
    question: "What if I return earlier than planned?",
    description:
      "Please contact our support team so we can arrange the return of your vehicle accordingly.",
  },
  {
    id: 10,
    question: "Why choose Bristol Elite Parking?",
    description:
      "We provide secure parking, competitive pricing, professional drivers, and exceptional customer service for stress-free airport travel.",
  },
];











