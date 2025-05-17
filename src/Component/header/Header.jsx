import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import "./header.css";
import Btn from '../button/Btn';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openHamburger = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <h1>Stock <span>Master</span></h1>
                <ul className={`Header__nav ${isMenuOpen ? 'open' : ''}`}>
                    <li>Home</li>
                    <li>Analytics</li>
                    <li>Users</li>
                    <li>About US</li>
                    <div className="Nav__Button">
                    <Btn />
                    <Btn btnText='Join Now' btnClass='navBtn JoinBtn' />
                </div>
                </ul>
            </nav>
            <div className="Nav__RightSide">
                <div className="Nav__Button">
                    <Btn />
                    <Btn btnText='Join Now' btnClass='navBtn JoinBtn' />
                </div>

                <div className="hamburger" onClick={openHamburger}>
                    {isMenuOpen ? <RxCross1 size="35px" /> : <IoMdMenu size="35px" />}
                </div>
            </div>
        </header>
    );
};

export default Header;
