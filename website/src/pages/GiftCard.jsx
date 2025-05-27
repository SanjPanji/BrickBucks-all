import Footer from "../components/Footer";
import Header from "../components/Header";
import greencard from "../static/img/image 20.png";
import pinkcard from "../static/img/image 21.png";


function GiftCard () {
    return (
        <block>
            <Header />
            <main>
                <div className="gift-card">
                    <img src={greencard} alt="" />
                    <img src={pinkcard} alt="" />
                    <div className="gift-card-info1">
                        <h2 className="gift-card-title">Easy & Convenient Gifting</h2>
                        <p className="gift-card-description">Looking for the perfect gift? Our gift cards let your loved ones choose exactly what they want! Available in digital and physical formats, they’re the ideal solution for any occasion.</p>
                    </div>
                    <div className="gift-card-info2">
                        <h2 className="gift-card-title">Instant Delivery, Endless Choices</h2>
                        <p className="gift-card-description">Send a gift instantly! Our gift cards can be used across a wide range of products, giving recipients the freedom to shop for their favorites. No expiration, no hassle—just the perfect gift every time!</p>
                    </div>
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default GiftCard;