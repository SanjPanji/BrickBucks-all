import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import a from "../services/axiosInstance";
import { useCart } from "../context/useCart";
import { useFavorites } from "../components/Product/useFavorites";

function CoffeeOrder() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {favorites,toggleFavorite} = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === product?.id);
  const { addToCart} = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await a.get(`/products/${product_id}`); // запрос по product ID
        setProduct(response.data);
      } catch (err) {
        setError("Ошибка при загрузке продукта");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!product) return <p>Продукт не найден</p>;

  return (
    <>
      <Header />
      <main>
        <div className="coffee-order-card">
          <img src={product.image} alt={product.name} className="coffee-order-img" />
          <div className="coffee-order-info">
            <h1 className="coffee-order-title">{product.name}</h1>
            <p className="coffee-order-description">{product.description}</p>
            <p className="coffee-order-price">${product.price}</p>
            <div className="coffee-order-action">
              <button className="icon-2" onClick={()=> toggleFavorite(product_id)}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill={isFavorite ? "red" : "none"}>
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                       3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                       3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>
              <button className="order-btn" onClick={()=> addToCart(product)}>Order</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CoffeeOrder;