import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import a from "../services/axiosInstance";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/search";
import formual1 from "../static/img/image 23.png";
import { useCart } from "../context/useCart";
import { useFavorites } from "../components/Product/useFavorites";


function LegoSubCtg() {
  const [products, setProducts] = useState([]);
  const { category, subcategory } = useParams();

  const { items, addToCart, decreaseQuantity } = useCart();
  const {toggleFavorite} = useFavorites();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await a.get(`/lego/${subcategory}/products/`);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProducts();
  }, [category, subcategory]);

  // Функция для получения количества товара из корзины
  const getQuantity = (productId) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div>
      <Header />
      <Search />
      <main>
        <div className="LegoSub-all">
          {products.map((product) => (
            <div className="LegoSub-card" key={product.id}>
              <img src={formual1} alt={product.name} />
              <h4 className="LegoSub-title">{product.name}</h4>
              <p className="LegoSub-price">{product.price}$</p>
              <p className="LegoSub-available">available now</p>

              <div className="quantity">
                <button
                  className="decrease"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <span className="count" id="count">
                  {getQuantity(product.id) || 1}
                </span>
                <button
                  className="increase"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>

              <div className="LegoSub-order">
                <button className="icon-2" key={product.id} onClick={()=> toggleFavorite(product.id)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <button className="LegoSub-order-btn" onClick={() => addToCart(product)}>order now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LegoSubCtg;
