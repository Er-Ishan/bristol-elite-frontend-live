// import React, { useState } from 'react';
// import UsedCar from './search-car-tab/UsedCar';
// import NewCar from './search-car-tab/NewCar';
// import SportsCar from './search-car-tab/SportsCar';
// import LuxuryCar from './search-car-tab/LuxuryCar';
// interface TabItem {
//     tabId: string;
//     text: string;
// }
// const tab: TabItem[] = [
//     { tabId: 'usedcar', text: 'Used car' },
//     { tabId: 'newcar', text: 'New car' },
//     { tabId: 'sportscars', text: 'Sports car' },
//     { tabId: 'luxurycars', text: 'Luxury Sedans' },
// ]
const SearchCarThree: React.FC = () => {
    // const [activeTab, setActiveTab] = useState('usedcar')
    return (
        <>
        {/* <section className="search-car">
            <div className="search-car__shape-1"></div>
            <div className="search-car__shape-2"></div>
            <div className="container">
                <div className="search-car__inner">
                    <div className="search-car__tab-box tabs-box">
                       
                        <div className="tabs-content">
                            <div className={`tab ${activeTab === "usedcar" ? "active-tab" : ""}`} style={{ display: `${activeTab === "usedcar" ? "block" : 'none'}` }}>
                                <UsedCar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        </>
    );
};

export default SearchCarThree;