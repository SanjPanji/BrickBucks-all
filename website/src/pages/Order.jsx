import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/useCart";
import { useState } from "react";
import a from "../services/axiosInstance";

function Order() {
  const { items, addToCart, decreaseQuantity } = useCart();

  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("kaspi");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name: username,
      city,
      address,
      phone_number: phone,
      payment_method: payment,
      items: items.map(({ product, quantity }) => ({
        product: product.id,
        quantity,
        price: Math.round(product.price),
      })),
    };

    try {
      await a.post("/order/create", orderData);
      alert("Заказ успешно оформлен!");
    } catch (error) {
      console.error("Order submit error:", error);
      alert("Ошибка при оформлении заказа.");
    }

    console.log(orderData); // Можно убрать после отладки
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <>
      <Header />
      <main>
        <div className="order">
          <div className="order-list">
            {items.map(({ product, quantity }) => (
              <div className="Cart-item" key={product.id}>
                <img src={product.image || "/default.png"} alt={product.name} />
                <div className="Cart-item-info">
                  <h2>{product.name}</h2>
                  <p>{product.description || "No description"}</p>
                  <div className="Cart-item-action">
                    <div className="quantity">
                        <button className="decrease" onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span className="count">{quantity}</span>
                        <button className="increase" onClick={() => addToCart(product)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => decreaseQuantity(product.id)}>Remove</button>
                  </div>
                  <h3>{(product.price * quantity).toFixed(2)}$</h3>
                </div>
              </div>
            ))}
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            <h1>Shipping & Payment</h1>
            <div className="order-info-form">
              <label>
                <p>
                Full Name
                </p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
                <br />
                <br />
              <label>
                <p>
                City
                </p>
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
                <br />
                <br />
              <label>
                <p>
                Shipping Address
                </p>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
                <br />
                <br />
              <label>
                <p>
                Phone Number
                </p>
                <input
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="payment">
              <p>Payment Method</p>
              {["kaspi", "crypto", "cash"].map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  {method === "kaspi" ? "Kaspi Gold" : method === "crypto" ? "Metamask" : "Cash"}
                </label>
              ))}
            </div>

            <p className="total-price">
              Total Price: <strong>{getTotalPrice()}$</strong>
            </p>

            <div className="order-submit-wrapper">
              <button className="order-submit" type="submit">Order</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Order;
