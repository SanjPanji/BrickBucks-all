import { Link } from "react-router-dom";
import { COFFEE_ORDER } from "../../utils/consts";

function CoffeeItem ({product}) {
    return (
        <div className="sub-coffee-card">
            <img src={product.image} alt={product.name} />
            <Link to={COFFEE_ORDER}>
            <h4 className="sub-coffee-title">{product.name}</h4>
            <p className="sub-coffee-description">{product.description}</p>
            <p className="sub-coffee-price">${product.price}</p>
            </Link>
        </div>
    );
}
export default CoffeeItem;