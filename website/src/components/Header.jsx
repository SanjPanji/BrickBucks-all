import { Link } from "react-router-dom";
import header from "../static/img/home.svg"
import heart from "../static/img/heart.svg"
import { COFFEE_CATEGORIES, FAVORITES, GIFT_CARD, HOME, JOIN_NOW, SIGN_IN, SUSTAINABILITY } from "../utils/consts";
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
            <Link to={FAVORITES} class="icon"><img src={heart} alt="" /></Link>
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