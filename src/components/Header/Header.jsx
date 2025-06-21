import React, { useContext } from "react";
import "./Header.css";
import olxLogo from "../../assets/images/olx-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/FirebaseContext";
import { getAuth, signOut } from "firebase/auth";

function Header() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                alert("Error signing out");
            });
    };
    return (
        <div className="header">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to="/">
                        <img src={olxLogo} alt="" />
                    </Link>
                </div>
                <div className="location">
                    <select name="loc" id="loc">
                        <option value="ind">India</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="uae">United Arab Emirates</option>
                    </select>
                </div>
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        placeholder="Search items"
                    />
                    <span className="search-icon">
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            className=""
                            fillRule="evenodd"
                        >
                            <path
                                className="rui-o3KKi"
                                d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div className="lang location">
                    <select name="lang-select" id="lng">
                        <option value="en">English</option>
                        <option value="ml">Malayalam</option>
                    </select>
                </div>
                <div className="buttons">
                    <div className="heart">
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 1024 1024"
                            data-aut-id="icon"
                            className=""
                            fillRule="evenodd"
                        >
                            <path
                                className="rui-w4DG7"
                                d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
                            ></path>
                        </svg>
                    </div>
                    {currentUser ? (
                        <>
                            {currentUser.displayName}
                            <Link
                                className="login"
                                to=""
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link className="login" to="/login">
                            Login
                        </Link>
                    )}
                    {currentUser ? (
                        <Link to="/create" className="btn-sell">
                            <div className="sell-button">
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 1024 1024"
                                    data-aut-id="icon"
                                    className=""
                                    fillRule="evenodd"
                                >
                                    <path
                                        className="rui-lquEm"
                                        d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"
                                    ></path>
                                </svg>
                                Sell
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login" className="btn-sell">
                            <div className="sell-button">
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 1024 1024"
                                    data-aut-id="icon"
                                    className=""
                                    fillRule="evenodd"
                                >
                                    <path
                                        className="rui-lquEm"
                                        d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"
                                    ></path>
                                </svg>
                                Sell
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <nav className="nav-menu">
                <select name="" id="" defaultValue="ALL CATEGORIES">
                    <option value="">ALL CATEGORIES</option>
                    <option value="">Cars</option>
                    <option value="">Bikes</option>
                    <option value="">Motorcylces</option>
                    <option value="">For Sale: Houses</option>
                    <option value="">For Rent: Houses & Apartments</option>
                </select>
                <ul>
                    <li>
                        <a href="#">Cars</a>
                    </li>
                    <li>
                        <a href="#">Motorcycles</a>
                    </li>
                    <li>
                        <a href="#">Mobile Phones</a>
                    </li>
                    <li>
                        <a href="#">For Sale: Houses & Apartments</a>
                    </li>
                    <li>
                        <a href="#">Scooters</a>
                    </li>
                    <li>
                        <a href="#">Commercial & Other Vehicles</a>
                    </li>
                    <li>
                        <a href="#">For Rent: Houses & Apartments</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
