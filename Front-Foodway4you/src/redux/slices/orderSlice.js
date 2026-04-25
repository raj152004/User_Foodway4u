import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orderHistory: [] },
  reducers: {
    hydrateOrders: (state, action) => {
      state.orderHistory = action.payload;
    },
    placeNewOrder: (state, action) => {
      state.orderHistory.unshift(action.payload);
      localStorage.setItem('foodway_orders', JSON.stringify(state.orderHistory));
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orderHistory.find(o => o.id === id);
      if (order) {
        order.status = status;
        localStorage.setItem('foodway_orders', JSON.stringify(state.orderHistory));
      }
    }
  }
});

export const { hydrateOrders, placeNewOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;