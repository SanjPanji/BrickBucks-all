import { Link } from "react-router-dom";
import header from "../static/img/home.svg"
import heart from "../static/img/heart.svg"
import { CART, COFFEE_CATEGORIES, FAVORITES, GIFT_CARD, HOME, JOIN_NOW, SIGN_IN, SUSTAINABILITY } from "../utils/consts";
import { useEffect, useState } from "react";
import { logoutUser } from "../services/auth";

function Header ({hideActions = false}) {

const[isAuthenticated, SetIsAuthenticated] = useState([]);
useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        SetIsAuthenticated(true);
    }
},[]);

    return (
        <header class="navbar">
        <nav class="menu">
            <Link to={HOME}><img src={header} alt="Brickbucks Logo"/></Link>
            <Link to={COFFEE_CATEGORIES}>MENU</Link>
            <Link to={SUSTAINABILITY}>SUSTAINABILITY</Link>
            <Link to={GIFT_CARD}>GIFT CARD</Link>
        </nav>
        {!hideActions && (
        <div className="actions">
            <Link to={CART} className="icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.875 13.3777L17.3225 1.81716H20V0H16.1525L15.5756 2.7252L0 2.71176L1.65592 13.3777H14.875V13.3777ZM15.191 4.54204L13.7051 11.5606H2.9063L1.81486 4.5305L15.191 4.54204Z" fill="white"/>
            <path d="M12.8136 20C14.1419 20 15.2225 18.6963 15.2225 17.094C15.2225 15.4917 14.1419 14.1881 12.8136 14.1881H3.73798C2.40973 14.1881 1.3291 15.4917 1.3291 17.094C1.3291 18.6963 2.40971 20 3.73798 20C5.06625 20 6.14684 18.6963 6.14684 17.094C6.14684 16.7092 6.08435 16.3417 5.97124 16.0053H10.5803C10.4672 16.3417 10.4047 16.7092 10.4047 17.094C10.4048 18.6963 11.4854 20 12.8136 20ZM4.64051 17.094C4.64051 17.6944 4.23564 18.1828 3.73798 18.1828C3.24032 18.1828 2.83543 17.6944 2.83543 17.094C2.83543 16.4937 3.24029 16.0053 3.73798 16.0053C4.23564 16.0053 4.64051 16.4937 4.64051 17.094ZM13.7162 17.094C13.7162 17.6944 13.3113 18.1828 12.8136 18.1828C12.316 18.1828 11.9111 17.6944 11.9111 17.094C11.9111 16.4937 12.316 16.0053 12.8136 16.0053C13.3113 16.0053 13.7162 16.4937 13.7162 17.094Z" fill="white"/>
            </svg></Link>

                
            <Link to={FAVORITES} className="icon"><img src={heart} alt="heart" /></Link>
            {isAuthenticated ? (
                <>
                <button onClick={() => {
                    logoutUser();
                    SetIsAuthenticated(false);
                }} className="logout">logout</button>
                </>
            ) : (
                <>
                    <Link to={SIGN_IN} class="sign-in">Sign in</Link>
                    <Link to={JOIN_NOW} class="join-now">Join now</Link>
                </>
            )}
        </div>
        )}
    </header>
    );
}

export default Header;