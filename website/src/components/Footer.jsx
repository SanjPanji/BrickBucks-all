import figma from "../static/img/figma.svg";
import ig from "../static/img/instagram.svg";
import spotify from "../static/img/spotify.svg";
import { Link } from "react-router-dom";
import { HOME, INVINCIBLE, SUSTAINABILITY } from "../utils/consts";

function Footer() {
    return (
        <footer>
            <div className="footer-media">
                <a href="https://open.spotify.com/playlist/37i9dQZF1DXe7OsxgbX67u?si=1397567974984198"><img src={spotify} alt="" /></a>
                <a href="https://www.instagram.com/sanj_panjj?igsh=MWVzd2syMDRmdzNwMw%3D%3D&utm_source=qr"><img src={ig} alt="" /></a>
                <a href="https://www.instagram.com/boys_neonchik?igsh=Z2FrNWx0NDVmOXZi"><img src={ig} alt="" /></a>
                <a href="https://www.instagram.com/xilay_dens?igsh=N3VpZm50dXFsM2U3"><img src={ig} alt="" /></a>
                <a href="https://www.instagram.com/madinellass?igsh=MTNrams5bXcyczZsdA=="><img src={ig} alt="" /></a>
                <a href="https://www.instagram.com/p/C_WGnB6szmMqBvJiTdCQxwIh4PDIhn793n5xv40/?igsh=d3Bnd2NveDVwZDdl"><img src={ig} alt="" /></a>
                <a href="https://www.figma.com/design/dCG2wBbxvW0MITJqYDDzqF/BrickBucks?node-id=0-1&p=f&t=QPTEvcg9Livbdu0n-0"><img src={figma} alt="" /></a>
            </div>
            <div className="footer-nav">
                <ul>
                    <li><Link to={HOME}>menu</Link></li>
                    <li><a href="https://github.com/SanjPanji/BricksBucks-API-system-.git">career</a></li>
                    <li><Link to={INVINCIBLE}>invincible</Link></li>
                    <li><a href="">contact us</a></li>
                    <li><Link to={SUSTAINABILITY}>social impact</Link></li>
                </ul>
            </div>
            <div className="footer-adress">
                <h3>Adress: Abay ave. 51/2 <br/>
                    always waiting for you!
                </h3>
            </div>
        </footer>
    );
}
export default Footer;