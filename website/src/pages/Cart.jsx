  import Footer from "../components/Footer";
  import Header from "../components/Header";
  import { useCart } from "../context/useCart";
  import { useFavorites } from "../components/Product/useFavorites";
  import { ORDER } from "../utils/consts";
  import { Link } from "react-router-dom";

  function Cart() {
    const { items, addToCart, decreaseQuantity } = useCart();
    const {favorites,toggleFavorite} = useFavorites();

    const getTotalPrice = () => {
      return items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ).toFixed(2);
    };

    return (
      <div>
        <Header />
        <main>
          <div className="Cart">
            <div className="Cart-list">
              {items.map(({ product, quantity }) => {
                const isFavorite = favorites.some(fav => fav.id === product.id);
                return (
                <div className="Cart-item" key={product.id}>
                  <img src={product.image || "/default.png"} alt={product.name} />
                  <div className="Cart-item-info">
                    <h2 className="Cart-item-title">{product.name}</h2>
                    <p className="Cart-item-description">{product.description || "No description"}</p>
                    <div className="Cart-item-action">
                      <div className="quantity">
                        <button className="decrease" onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span className="count">{quantity}</span>
                        <button className="increase" onClick={() => addToCart(product)}>+</button>
                      </div>
                      <button className="icon-2" onClick={()=> toggleFavorite(product.id)}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill={isFavorite ? "red" : "none"}
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                            2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                            4.5 2.09C13.09 3.81 14.76 3 16.5 
                            3 19.58 3 22 5.42 22 8.5c0 
                            3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      <button className="remove-btn" onClick={() => decreaseQuantity(product.id)}>remove</button>
                    </div>
                    <h3 className="Cart-item-price">{(product.price * quantity).toFixed(2)}$</h3>
                  </div>
                </div>
                );
              })}
            </div>

            <div className="Cart-pay">
              <p>total price: <strong>{getTotalPrice()}$</strong></p>
              <Link to={ORDER} className="to-order">order</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  export default Cart;