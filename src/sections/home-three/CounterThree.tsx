import React from 'react';
import AdvanceCountUp from '../../components/elements/AdvanceCountUp';

// Types
interface CounterItem {
    id: number;
    iconClass: string;
    count: number;
    suffix: string;
    label: string;
}

// Data Array
const counterData: CounterItem[] = [
    {
        id: 1,
        iconClass: 'icon-car',
        count: 2500,
        suffix: '+',
        label: 'Parking Spaces',
    },
    {
        id: 2,
        iconClass: 'icon-mileage',
        count: 24,
        suffix: '/7',
        label: 'Customer Support',
    },
    {
        id: 3,
        iconClass: 'icon-reviews',
        count: 150,
        suffix: 'K',
        label: 'Happy Travelers',
    },
    {
        id: 4,
        iconClass: 'icon-pin-2',
        count: 15,
        suffix: '+',
        label: 'Airport Locations',
    },
];
const CounterThree: React.FC = () => {
    return (
        <section className="counter-three">
            <div className="counter-three__bg jarallax"></div>

            <div className="container">
                <ul className="row list-unstyled">
                    {counterData.map((item) => (
                        <li
                            key={item.id}
                            className="col-xl-3 col-lg-6 col-md-6"
                        >
                            <div className="counter-three__single">
                                <div className="counter-three__icon">
                                    <span className={item.iconClass}></span>
                                </div>

                                <div className="counter-three__count-box">
                                    <h3
                                        className="odometer"
                                    >
                                        <AdvanceCountUp ending={item?.count} />
                                    </h3>
                                    <span>{item.suffix}</span>
                                </div>

                                <p className="counter-three__count-text">
                                    {item.label}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CounterThree;
