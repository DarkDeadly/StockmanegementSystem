import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link , useNavigate } from "react-router";

import "./header.css";
import Btn from '../button/Btn';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const openHamburger = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const AuthNavigation = () => {
        navigate("/Authentication")
    }
    return (
        <header>
            <nav>
                <h1>Stock <span>Master</span></h1>
                <ul className={`Header__nav ${isMenuOpen ? 'open' : ''}`}>
                    <Link to='/'>Home</Link>
                    <Link to="/Products">Products</Link>
                    <Link to='/Analytics'>Analytics</Link>
                    <Link to='/Users'>Users</Link>
                    <Link to='/About'>About US</Link>
                    <div className="Nav__Button">
                    <Btn btnClick={AuthNavigation}/>
                    <Btn btnText='Join Now' btnClass='navBtn JoinBtn' btnClick={AuthNavigation}/>
                </div>
                </ul>
            </nav>
            <div className="Nav__RightSide">
                <div className="Nav__Button">
                    <Btn btnClick={AuthNavigation}/>
                    <Btn btnText='Join Now' btnClass='navBtn JoinBtn' btnClick={AuthNavigation}/>
                </div>

                <div className="hamburger" onClick={openHamburger}>
                    {isMenuOpen ? <RxCross1 size="35px" /> : <IoMdMenu size="35px" />}
                </div>
            </div>
        </header>
    );
};

export default Header;
