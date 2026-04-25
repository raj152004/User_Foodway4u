"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// === REDUX IMPORTS ===
import { useSelector, useDispatch } from 'react-redux';
import { placeNewOrder } from '@/redux/slices/orderSlice';

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");

  // === REDUX STATE & DISPATCH ===
  const dispatch = useDispatch();
  // Fetching orders from Redux store instead of localStorage
  const reduxOrders = useSelector((state) => state.orders.orderHistory);

  useEffect(() => {
    // 1. Check Login
    const status = localStorage.getItem("userLoggedIn");
    if (status !== "true") {
      router.push('/login/user');
      return;
    }

    // 2. Dummy Order Logic for Empty State (Testing purpose only)
    // Redux store shuru mein khali hota hai, toh agar koi order nahi hai
    // toh hum ek fake order dispatch kar dete hain UI dekhne ke liye.
    if (reduxOrders.length === 0) {
      const dummyOrder = {
        id: "FW-9823471",
        date: "24 Mar 2026, 08:30 PM",
        status: "Delivered",
        total: 540,
        items: [
          { name: "Paneer Butter Masala", quantity: 1 },
          { name: "Butter Naan", quantity: 3 },
          { name: "Sweet Lassi", quantity: 2 }
        ]
      };
      // Dispatch dummy order to Redux store
      dispatch(placeNewOrder(dummyOrder));
    }
  }, [router, reduxOrders.length, dispatch]);

  // Filtering based on Redux state
  const activeOrders = reduxOrders.filter(o => o.status === "Processing" || o.status === "On the way");
  const pastOrders = reduxOrders.filter(o => o.status === "Delivered" || o.status === "Cancelled");

  const displayOrders = activeTab === "Active" ? activeOrders : pastOrders;

  return (
    <div className="bg-[#F8F9FB] min-h-screen font-sans text-gray-900 pb-24">
      
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()} 
            className="p-2.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-xl font-black tracking-tight">My Orders</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6">
        
        {/* TABS */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8">
          <button 
            onClick={() => setActiveTab("Active")}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
              activeTab === "Active" ? "bg-[#0A64BC] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button 
            onClick={() => setActiveTab("Past")}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
              activeTab === "Past" ? "bg-[#0A64BC] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        <div className="space-y-6">
          {displayOrders.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm mt-10">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                {activeTab === "Active" ? "🛵" : "📜"}
              </div>
              <h3 className="text-xl font-black text-gray-800 tracking-tight mb-2">
                No {activeTab} Orders
              </h3>
              <p className="text-gray-500 font-medium mb-6">
                {activeTab === "Active" 
                  ? "You don't have any ongoing orders right now." 
                  : "Your past orders will appear here."}
              </p>
              <button 
                onClick={() => router.push('/restaurants')}
                className="bg-[#0A64BC] text-white px-8 py-3.5 rounded-xl font-black text-sm hover:bg-black transition-all shadow-lg"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            displayOrders.map((order, index) => (
              <div key={index} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                
                {/* ORDER HEADER */}
                <div className="p-5 md:p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
                    <p className="font-bold text-gray-800">{order.id}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1.5 shadow-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                    'bg-blue-100 text-[#0A64BC]'
                  }`}>
                    {order.status === 'Processing' && <span className="w-1.5 h-1.5 bg-[#0A64BC] rounded-full animate-pulse"></span>}
                    {order.status === 'On the way' && <span>🛵</span>}
                    {order.status === 'Delivered' && <span>✅</span>}
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-[#0A64BC] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">
                      F
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-gray-800">Foodway Exclusive</h3>
                      <p className="text-xs font-bold text-gray-400">{order.date}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm font-medium text-gray-600 flex items-start">
                        <span className="text-[#0A64BC] font-black mr-2">{item.quantity} x</span> 
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ORDER TOTAL & BUTTONS */}
                <div className="p-5 md:p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Bill</p>
                    <p className="text-xl font-black text-[#0A64BC]">₹{order.total}</p>
                  </div>
                  
                  {activeTab === "Active" ? (
                    <button 
                      onClick={() => router.push(`/track?id=${order.id}`)}
                      className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-md hover:bg-[#16a34a] transition-all flex items-center space-x-2"
                    >
                      <span>Track Order</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  ) : (
                    <button 
                      onClick={() => router.push('/restaurants')}
                      className="bg-white border-2 border-[#0A64BC] text-[#0A64BC] px-6 py-2.5 rounded-xl font-black text-sm hover:bg-[#0A64BC] hover:text-white transition-all"
                    >
                      Reorder
                    </button>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}