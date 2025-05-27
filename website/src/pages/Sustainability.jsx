import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import sus from "../static/img/sus.png";
import tree from "../static/img/image 9.png";
import cups from "../static/img/image 10.png";
import climate from "../static/img/image 11-2.png";
import invincilbe2 from "../static/img/image 12.png"


function Sustainability () {
    useEffect(() => {
        document.body.classList.add("no-padding");
        return () => document.body.classList.remove("no-padding");
      }, []);
    return (
        <block>
            <Header />
            <main>
                <div className="coffee-img">
                <img src={sus} alt="coffee"/>
                </div>
                <div className="sus">
                    <div className="sus-card">
                        <img src={tree} alt="" />
                        <h4 className="sus-title">coffee</h4>
                        <p className="sus-description">Sourcing coffee beans in a way that positively impacts nature and farmers.</p>
                    </div>
                    <div className="sus-card">
                        <img src={cups} alt="" />
                        <h4 className="sus-title">cups and packages</h4>
                        <p className="sus-description">Championing circular cups and packaging solutions.</p>
                    </div>
                    <div className="sus-card">
                        <img src={climate} alt="" />
                        <h4 className="sus-title">climate</h4>
                        <p className="sus-description">Cutting emissions (in-line with climate science) to reach Net Zero by 2040.</p>
                    </div>
                    <div className="sus-card">
                        <a href="">
                            <img src={invincilbe2} alt="" />
                            <h4 className="sus-title">invincible</h4>
                            <p className="sus-description">waiting for 4season release</p>
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </block>
    );
}
export default Sustainability;