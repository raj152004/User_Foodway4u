"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// === REDUX IMPORTS ===
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '@/redux/slices/cartSlice';
import { placeNewOrder } from '@/redux/slices/orderSlice';

export default function CartPage() {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const router = useRouter();

  // === REDUX STATE & DISPATCH ===
  const dispatch = useDispatch();
  // Cart items ab seedha Redux store se aayenge (localStorage ki zaroorat nahi)
  const items = useSelector((state) => state.cart.items);

  // Subtotal calculation (Redux mein quantity manage hoti hai isliye multiply kiya hai)
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const platformFee = items.length > 0 ? 15 : 0;
  const total = subtotal + deliveryFee + platformFee;

  // ==========================================
  // UPDATED: PLACE ORDER WITH REDUX
  // ==========================================
  const placeOrder = () => {
    if (items.length === 0) return;

    // 1. Naya order object banao
    const newOrder = {
      id: "FW-" + Math.floor(100000 + Math.random() * 900000), // Random Order ID
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: "Processing", 
      total: total, 
      items: items.map(item => ({ 
        name: item.name, 
        quantity: item.quantity || 1 
      }))
    };

    // 2. Redux Order Slice mein order bhejo
    dispatch(placeNewOrder(newOrder));

    // 3. Redux Cart Slice se cart khali karo
    dispatch(clearCart()); 
    
    // 4. Success Message dikhao aur Orders page par bhejo
    alert("✅ Order Placed Successfully!");
    router.push('/orders'); 
  };

  const handleRemoveItem = (id) => {
    // Redux action ko item ka id bhejna hai remove karne ke liye
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-6 animate-bounce">🛒</div>
        <h2 className="text-3xl font-black text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-8">Add some delicious items from the menu to get started!</p>
        <button 
          onClick={() => router.push('/restaurants')}
          className="bg-[#0A64BC] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-6 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Cart ({items.length})</h1>
            <button onClick={() => router.push('/restaurants')} className="text-[#0A64BC] font-bold text-sm hover:underline">
              + Add more items
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <img src={item.img} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={item.name} />
                <div className="ml-5 grow">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.name} {item.quantity > 1 && <span className="text-sm text-[#0A64BC] ml-1">x{item.quantity}</span>}
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.type}</p>
                  <p className="text-[#0A64BC] font-black mt-1">₹{item.price * (item.quantity || 1)}</p>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["UPI", "Cards", "Cash on Delivery"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                    paymentMethod === method 
                    ? "border-[#0A64BC] bg-blue-50 text-[#0A64BC]" 
                    : "border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 sticky top-28">
            <h3 className="text-xl font-black mb-6 text-gray-900 border-b pb-4">Bill Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              
              <div className="h-[1px] bg-dashed border-t border-dashed border-gray-200 my-4"></div>
              
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-[#0A64BC]">Total Pay</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Incl. GST & Taxes</span>
                </div>
                <span className="text-3xl font-black italic">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={placeOrder}
              className="w-full bg-[#0A64BC] text-white mt-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Place Order</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <p className="text-[10px] text-center text-gray-400 mt-6 font-bold uppercase tracking-tighter">
              Secure Checkout with Foodway SSL
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}