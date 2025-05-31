import { useEffect, useParams, useState } from "react";
import a from "../services/axiosInstance";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/search";
import formual1 from "../static/img/image 23.png";

function LegoSubCtg () {
const [Products,SetProducts] = useState([]);
const {category,subcategory} = useParams();

    useEffect(() => {
        async function FetchProducts () {
            try {
                const res = await a.get(`/lego/${subcategory}/products/`);
                SetProducts(res.data);
            } catch(e) {
                console.log(e);
            }
        }
        FetchProducts();
    },[category]);


    return (
        <block>
            <Header />
            <Search />
            <main>
                <div className="LegoSub-all">
                    <div className="LegoSub-card">
                        <img src={formual1} alt="" />
                        <h4 className="LegoSub-title">Ferrari SF-24 F1 Car</h4>
                        <p className="LegoSub-price">4.99$</p>
                        <p className="LegoSub-available">alailable now</p>
                        <div className="quantity">
                            <button className="decrease">-</button>
                            <span className="count" id="count">1</span>
                            <button className="increase">+</button>
                        </div>
                        <div className="LegoSub-order">
                        <button className="icon-2"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                            <button className="LegoSub-order-btn">order now</button>
                        </div>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </block>
    )
}

export default LegoSubCtg;