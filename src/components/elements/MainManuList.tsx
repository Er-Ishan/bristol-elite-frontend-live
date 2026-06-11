import React from 'react';
import { Link, useLocation } from 'react-router';
// import { blogs_link, cars_link, home_link, pages_link, shops_link } from '../link-content/NavLink';
import type { ManuItemOnePage } from '../link-content/LinkType';
import MobileManuListSingle from './MobileManuListSingle';


interface ComponentProps {
    onePageManuList: ManuItemOnePage[]
}

const MainManuList: React.FC<ComponentProps> = ({ onePageManuList }) => {
    const currentPath = useLocation().pathname;
    // const findLocation = (array: NavItem[]): boolean => {
    //     return array.some(item => item?.link === currentPath);
    // };
    const isOnePage = currentPath.includes("one-page")




    if (isOnePage) {
        return <MobileManuListSingle onePageManuListProp={onePageManuList} />
    }

    return (
        <ul className="main-menu__list">
            <li>
                <a href="/">Home</a>
                {/* <ul className="shadow-box">
                    {
                        home_link.map((Item: NavItem) => <li key={Item?.id} className={currentPath === Item?.link ? "current" : ""}>
                            <Link to={Item?.link}>{Item?.value}</Link>
                        </li>)
                    }
                </ul> */}
            </li>
            <li className={currentPath === "/inner/about" ? "current" : ""}>
                <Link to="/about-us">About Us</Link>
            </li>
            <li>
                <a href="/airport-procedure">Airport Procedure</a>
                {/* <ul className="shadow-box">
                    {
                        pages_link.map((Item: NavItem) => <li key={Item?.id} className={currentPath === Item?.link ? "current" : ""} >
                            <Link to={Item?.link}>{Item?.value}</Link>
                        </li>)
                    }
                </ul> */}
            </li>
            {/* <li>
                <a href="#">Main Terminal</a>
            </li> */}
            <li>
                <a href="/how-it-works">How It Works</a>
            </li>
            {/* <li>
                <a href="/blog-data">Blogs</a>
            </li> */}
            <li>
                <a href="/faq">FAQ</a>
            </li>
            <li>
                <Link to="/contact-form">Contact</Link>
            </li>
        </ul>
    );
};

export default MainManuList;