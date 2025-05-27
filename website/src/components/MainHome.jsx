import img1 from "../static/img/image 1.png";
import img2 from "../static/img/image 2.png";
import img3 from "../static/img/image 3.png";
import { Link } from "react-router-dom";
import { COFFEE_CATEGORIES, JOIN_NOW, LEGO_CATEGORIES } from "../utils/consts";

function MainHome () {
    return (
        <main>
            <div className="home-1">
                <img src={img1} alt="view-the-menu" />
                <div className="home-info">
                    <div className="home-1-title">THE SPRING EDIT</div>
                    <div className="home-1-description">flesh flavors, familiar joy</div>
                    <Link to={COFFEE_CATEGORIES} className="home-btn">view the menu</Link>
                </div>
            </div>
            <div className="home-2">
                <div className="home-info">
                    <div className="home-2-title">your first taste with us</div>
                    <div className="home-2-description">taste Mocha White Chocolate with a discount. To get a discount create a new account.You’re always welcome in BrickBucks!</div>
                    <Link to={JOIN_NOW} className="home-btn">join-now</Link>
                </div>
                <img src={img2} alt="join-us" />
            </div>
            <div className="home-3">
                <img src={img3} alt="formula-1" />
                <div className="home-info">
                <div className="home-3-title">have not only cold brue!</div>
                <div className="home-3-description">check the new collection of formula 1</div>
                <Link to={LEGO_CATEGORIES} className="home-btn">formula 1</Link>
                </div>
            </div>
        </main>
    );
}
export default MainHome;