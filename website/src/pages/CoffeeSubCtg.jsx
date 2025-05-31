import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CoffeeItem from "../components/Product/CoffeeItem";
import Search from "../components/search";
import a from "../services/axiosInstance";
import { useParams } from "react-router-dom";

function CoffeeSubCtg () {
const [Products,SetProducts] = useState([]);
const {category,subcategory} = useParams();

    useEffect(()=> {
        async function FetchProducts() {
            try {
                const res = await a.get(`/coffee/${subcategory}/products/`);
                SetProducts(res.data)
            } catch(e) {
                console.log(e);
            } 
        }
        FetchProducts();
    },[category]);

    return (
        <block>
            <Header />
            < Search />
            <main>
                <div className="sub-coffee-all">
                    {Products.map(product =>(
                        <CoffeeItem key={product.id} product={product} />
                    ))}
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default CoffeeSubCtg;