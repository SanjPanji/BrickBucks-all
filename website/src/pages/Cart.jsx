import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import latte from "../static/img/image 8.png";



function Cart () {
    const [count, setCount] = useState(1);
    const increase = () => setCount(count + 1);
    const decrease = () => {
        if (count > 1) setCount(count - 1);
    };
    return (
        <block>
            <Header />
            <main>
                <div className="Cart">
                    <div className="Cart-list">
                    <div className="Cart-item">
                            <img src={latte} alt="" />
                            <div className="Cart-item-info">
                                <h2 className="Cart-item-title">Latte</h2>
                                <p className="Cart-item-description">little description mb</p>
                                <div className="Cart-item-action">
                                    <div className="quantity">
                                        <button className="decrease" onClick={decrease}>-</button>
                                        <span className="count">{count}</span>
                                        <button className="increase" onClick={increase}>+</button>
                                    </div>
                                    <button className="icon-2"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                                    <button className="remove-btn">remove</button>
                                </div>
                                <h3 className="Cart-item-price">4.99$</h3>
                            </div>
                        </div>
                        <div className="Cart-item">
                            <img src={latte} alt="" />
                            <div className="Cart-item-info">
                                <h2 className="Cart-item-title">Latte</h2>
                                <p className="Cart-item-description">little description mb</p>
                                <div className="Cart-item-action">
                                    <div className="quantity">
                                        <button className="decrease" onClick={decrease}>-</button>
                                        <span className="count">{count}</span>
                                        <button className="increase" onClick={increase}>+</button>
                                    </div>
                                    <button className="icon-2"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                                    <button className="remove-btn">remove</button>
                                </div>
                                <h3 className="Cart-item-price">4.99$</h3>
                            </div>
                        </div>
                    </div>
                    <div className="Cart-pay">
                        <p>total price: <strong>15.00$</strong></p>
                        <button className="Cart-cash-btn">buy with cash</button>
                        <button className="Cart-kaspi-btn">kaspi qr</button>
                    </div>
                </div>
            </main>
            <Footer />
        </block>
    )
}

export default Cart;