import React, { useEffect, useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../../util/firebase"
import "./header.css";
import Btn from '../button/Btn';
import { onAuthStateChanged , signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            setIsLoggedIn(true);

            try {
                const userSnap = await getDoc(doc(db, "Users", user.uid));
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setIsAdmin(userData.role === "admin");
                } else {
                    console.warn("User document does not exist in Firestore.");
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsAdmin(false);
            }

        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    });

    return () => unsubscribe();
}, []);

    const SignOut = async() => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
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
                <ul className={`Header__nav ${isMenuOpen ? 'open' : '' }`}>
                    <Link to='/'>Home</Link>
                    {
                        isLoggedIn && (<>
                            <Link to="/Products" >Products</Link>
                            <Link to="/Profile" >Profile</Link>
                            {
                                isAdmin && (
                                    <>
                                     <Link to='/Analytics' >Analytics</Link>
                                     <Link to='/Users' >Users</Link>
                                    </>
                                )
                            }
                        </>)
                    }
                    <Link to='/About'>About US</Link>
                    {
                        !isLoggedIn ? (

                            <div className="Nav__Button">
                                <Btn btnClick={AuthNavigation} />
                                <Btn btnText='Join Now' btnClass='navBtn JoinBtn' btnClick={AuthNavigation} />
                            </div>

                        ) : (
                            <Btn btnText='Logout' btnClass='navBtn LogoutBtn' btnClick={SignOut}/>
                        )
                        
                    }
                </ul>
            </nav>
            <div className="Nav__RightSide">
                {
                    !isLoggedIn ? (
                        <div className="Nav__Button">
                            <Btn btnClick={AuthNavigation} />
                            <Btn btnText='Join Now' btnClass='navBtn JoinBtn' btnClick={AuthNavigation} />
                        </div>
                    ): (
                        <Btn btnText='Logout' btnClass='navBtn SIgnoutBtn' btnClick={SignOut}/>
                    )
                }

                <div className="hamburger" onClick={openHamburger}>
                    {isMenuOpen ? <RxCross1 size="35px" /> : <IoMdMenu size="35px" />}
                </div>
            </div>
        </header>
    );
};

export default Header;
