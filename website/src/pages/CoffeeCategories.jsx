import { useState,useEffect } from "react";
import a from "../services/axiosInstance";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/search";
import img4 from "../static/img/image 4.png";
import img5 from "../static/img/image 5.png";
import img6 from "../static/img/image 6.png";
import img7 from "../static/img/image 7.png";
import { Link } from "react-router-dom";

function CoffeeCategories () {
    const staticInfo = [
        {
            img: img4,
            description : "От горячих и насыщенных до холодных и освежающих - откройте для себя мир напитков Starbucks®, пробуйте их, наслаждайтесь и пейте с удовольствием."
        },
        {
            img: img5,
            description: "Выпечка и сэндвичи готовятся из высококачественных ингредиентов. Поэтому все, что вы пробуете, - настоящая и действительно вкусная еда"
        },
        {
            img:img6,
            description: "Удобные и яркие кружки, тамблеры, бутылки для воды и другие товары."
        },
        {
            img: img7,
            description: "Мы разделяем кофе на три вида обжарки, чтобы вы легко могли найти свой идеальный вкус кофе Brickbucks®."
        }
    ];

    const[CoffeeCat,SetCoffeeCat] = useState([]);

    useEffect(()=> {
            async function FetchCoffee() {
                try {
                    const res = await a.get('categories/coffee/subcategory/');
                    SetCoffeeCat(res.data)
                } catch(e) {
                    console.log(e);
                }
            }
            FetchCoffee();
        },[]);

    return (
        <block>
            <Header />
            <Search />
            <main>
                <div className="coffee-categories-all">
                    {staticInfo.map((info,index)=> {
                        const cat = CoffeeCat[index];
                        return (
                    <div className="category" key={index}>
                        <img src={info.img} alt="drinks" />
                        <h4 className="category-title">{cat?.name || "..."}</h4>
                        <p className="category-description">{info.description}</p>
                        <Link to={cat ? `/menu/${cat.slug}` : "/"} className="category-btn">посмотреть все</Link>
                    </div>
                    );
                    })}
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default CoffeeCategories;