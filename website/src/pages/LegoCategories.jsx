import { useState,useEffect } from "react";
import a from "../services/axiosInstance";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/search";
import marvel from "../static/img/image 22.png";
import formual1 from "../static/img/image 23.png";
import minecraft from "../static/img/image 24.png";
import starwars from "../static/img/image 25.png";


function LegoCategories () {
    const staticImg = [
        {
            img: marvel,
            title: "marvel"
        },
        {
            img: formual1,
            title: "formula 1"
        },
        {
            img: minecraft,
            title: "minecraft"
        },
        {
            img: starwars,
            title: "starwars"
        }
    ]

const [LegoCat,SetLegoCat] = useState([]);

useEffect(()=> {
            async function FetchLego() {
                try {
                    const res = await a.get('categories/Lego/subcategory/');
                    SetLegoCat(res.data)
                } catch(e) {
                    console.log(e);
                }
            }
            FetchLego();
        },[]);

    return (
        <block>
            <Header />
            <Search />
            <main>
                <div className="lego-categories-all">
                    {staticImg.map((img,index) => {
                        const cat = LegoCat[index];
                        return (
                    <div className="lego-category" key={index}>
                        <img src={img.img} alt={cat?.name || "..."} />
                        <div className="category-title">{cat?.name || "..."}</div>
                        <Link to={cat ?`/catalogy/${cat.slug}`: "/"} className="category-btn">посмотреть все</Link>
                    </div>
                    );
                    })}
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default LegoCategories;