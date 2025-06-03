import React, { createContext, useContext, useReducer, useEffect } from 'react';
import a from '../services/axiosInstance';

const CartContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      const itemsWithQuantity = action.payload.map(product => ({
        product,
        quantity: 1,
      }));
      return { ...state, loading: false, items: itemsWithQuantity };
    case 'ADD_NEW_PRODUCT':
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map(item =>
            item.product.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    const token = localStorage.getItem('access_token'); // <<< исправлено ключ на 'access_token'
    if (!token) return;

    dispatch({ type: 'FETCH_START' });
    try {
      const response = await a.get('/cart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      console.error("Cart fetch error:", error);
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem('token'); // <<< исправлено ключ на 'access_token'
    if (!token) {
      console.warn('Missing token in localStorage');
      return;
    }
    if (!product || !product.id) {
      console.warn('Product missing id:', product);
      return;
    }

    try {
      await a.post(`/cart/${product.id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        dispatch({ type: 'INCREASE_QUANTITY', payload: product.id });
      } else {
        dispatch({ type: 'ADD_NEW_PRODUCT', payload: product });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        error: state.error,
        addToCart,
        decreaseQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
