import Footer from "../components/Footer";
import Header from "../components/Header";

import latte from "../static/img/image 8.png";
import heart from "../static/img/heart-2.svg";

function CoffeeOrder () {
    return (
        <block>
            <Header />
            <main>
                <div className="coffee-order-card">
                    <img src={latte} alt="" className="coffee-order-img"/>
                    <div className="coffee-order-info">
                        <h1 className="coffee-order-title">Латте</h1>
                        <p className="coffee-order-description">напиток на основе эспрессо и молока с небольшим количеством молочной пены</p>
                        <p className="coffee-order-price">4.99$</p>
                        <div className="coffee-order-action">
                            <button className="icon-2"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                            <button className="order-btn">order</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default CoffeeOrder;