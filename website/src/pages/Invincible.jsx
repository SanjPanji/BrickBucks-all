import Footer from "../components/Footer";
import Header from "../components/Header";
import in1 from "../static/img/image 16.png";
import in2 from "../static/img/image 17.png";
import in3 from "../static/img/image 18.png";
import in4 from "../static/img/image 19.png";


function Invincilbe () {
    return (
        <block>
            <Header />
            <main>
                <div className="invincible">
                    <div className="invincible-img">
                        <img src={in1} alt="" />
                        <img src={in2} alt="" />
                    </div>
                    <h1 className="invincible-title">
                        {Array.from("SINISTER").map((letter, index) => (
                            <span key={index}>{letter}</span>
                        ))}
                    </h1> 
                    <div className="invincible-img">
                        <img src={in3} alt="" />
                        <img src={in4} alt="" />
                    </div>
                </div>
            </main>
            <Footer />
        </block>
    );
}

export default Invincilbe;