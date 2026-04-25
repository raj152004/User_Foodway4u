"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";
import { hydrateCart } from "./slices/cartSlice";
import { hydrateOrders } from "./slices/orderSlice";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load hone ke baad safely data nikal kar Redux mein daalenge
    const cartData = localStorage.getItem('cart');
    if (cartData) dispatch(hydrateCart(JSON.parse(cartData)));

    const orderData = localStorage.getItem('foodway_orders');
    if (orderData) dispatch(hydrateOrders(JSON.parse(orderData)));

    setIsLoaded(true);
  }, [dispatch]);

  // Jab tak data load na ho, UI roke rakhenge taaki refresh bug na aaye
  if (!isLoaded) return null; 
  return children;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}