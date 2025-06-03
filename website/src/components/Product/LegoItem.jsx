

function LegoItem () {
    return (
        <div className="LegoSub-card">
                                <img src={product.image} alt={product.name} />
                                <h4 className="LegoSub-title">{product.name}</h4>
                                <p className="LegoSub-price">${product.price}</p>
                                <p className="LegoSub-available">alailable now</p>
                                <div className="quantity">
                                    <button className="decrease" onClick={decrease}>-</button>
                                    <span className="count" id="count">{order.quantity}</span>
                                    <button className="increase" onClick={increase}>+</button>
                                </div>
                                <div className="LegoSub-order">
                                <button className="icon-2"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                                    <button className="LegoSub-order-btn">order now</button>
                                </div>
                            </div>
    );
}

export default LegoItem;