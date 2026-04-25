"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// === REDUX IMPORTS ===
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';

export default function RestaurantMenuPage({ params }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  // === REDUX STATE & DISPATCH ===
  const dispatch = useDispatch();
  // Cart ke items aur length directly Redux se fetch kar rahe hain
  const cartItems = useSelector((state) => state.cart.items);

  const menuItems = [
    { id: 2, name: "Veg Deluxe Thali", price: 280, type: "Veg", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200" },
    { id: 3, name: "Dal Makhani Box", price: 220, type: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200" },
    { id: 4, name: "Shahi Paneer", price: 240, type: "Veg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200" },
    { id: 7, name: "Veg Pulao", price: 160, type: "Veg", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200" },
    { id: 8, name: "Malai Kofta", price: 260, type: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200" },
    { id: 12, name: "Aloo Gobhi", price: 140, type: "Veg", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=200" },
    { id: 14, name: "Masala Dosa", price: 110, type: "Veg", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200" },
    { id: 16, name: "Hyderabadi Veg Biryani", price: 220, type: "Veg", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200" },
    { id: 17, name: "Kadai Paneer", price: 235, type: "Veg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200" },
    { id: 19, name: "Chicken Tikka Masala", price: 320, type: "Non-Veg", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200" },
    { id: 23, name: "Fish Tikka", price: 380, type: "Non-Veg", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200" },
    { id: 24, name: "Tandoori Chicken (Half)", price: 240, type: "Non-Veg", img: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=200" },
    { id: 26, name: "Mutton Biryani", price: 420, type: "Non-Veg", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200" },
    { id: 30, name: "Chicken Garlic Roast", price: 330, type: "Non-Veg", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200" },
    { id: 31, name: "Chicken Afgani", price: 360, type: "Non-Veg", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200" },
    { id: 33, name: "Chicken Changezi", price: 370, type: "Non-Veg", img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200" },
    { id: 34, name: "Cheese Burst Burger", price: 120, type: "Fast Food", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200" },
    { id: 35, name: "Veg Hakka Noodles", price: 150, type: "Fast Food", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200" },
    { id: 37, name: "Crispy French Fries", price: 90, type: "Fast Food", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200" },
    { id: 38, name: "Paneer Pizza", price: 350, type: "Fast Food", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" },
    { id: 39, name: "Chicken Steamed Momos", price: 140, type: "Fast Food", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=200" },
    { id: 40, name: "Veg Fried Rice", price: 130, type: "Fast Food", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200" },
    { id: 41, name: "Pasta White Sauce", price: 180, type: "Fast Food", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200" },
    { id: 42, name: "Chicken Wings (6pc)", price: 210, type: "Fast Food", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200" },
    { id: 45, name: "Zesty Paneer Burger", price: 145, type: "Fast Food", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200" },
    { id: 46, name: "Chilli Chicken", price: 260, type: "Fast Food", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200" },
    { id: 47, name: "Loaded Nachos", price: 175, type: "Fast Food", img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200" },
    { id: 49, name: "Manchow Soup", price: 95, type: "Fast Food", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200" },
  ];

  // ==========================================
  // UPDATED: ADD TO CART USING REDUX
  // ==========================================
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // Optional: Ab array length manage karne ki zaroorat nahi hai
    alert(`${item.name} added to cart!`);
  };

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.type === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">

      <div className="h-64 bg-[#0A64BC] relative overflow-hidden flex items-end p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">5km Exclusive Zone</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Restaurant Menu</h1>
          <p className="opacity-80 mt-2 font-medium">Deliciousness delivered to your doorstep</p>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white shadow-md px-6 py-4 flex space-x-4 overflow-x-auto no-scrollbar">
        {["All", "Veg", "Non-Veg", "Fast Food"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat
                ? "bg-[#0A64BC] text-white shadow-lg shadow-blue-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 flex items-center shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className="relative h-24 w-24 shrink-0">
                <img
                  src={item.img}
                  className="h-full w-full rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                  alt={item.name}
                />
                <div className={`absolute -top-2 -left-2 w-4 h-4 rounded-full border-2 border-white ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>

              <div className="ml-5 grow">
                <h3 className="font-extrabold text-gray-800 text-lg group-hover:text-[#0A64BC] transition-colors">{item.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter mr-2">{item.type}</span>
                  <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                  <span className="ml-2 text-xs font-bold text-green-600 uppercase">Popular</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-black text-gray-900">₹{item.price}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#0A64BC] hover:scale-105 transition-all active:scale-95 shadow-lg shadow-gray-100"
                  >
                    ADD +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FLOATING CART BAR (Count comes directly from Redux now) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50">
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-green-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl flex justify-between items-center px-10 hover:bg-green-700 hover:scale-[1.02] transition-all active:scale-95"
          >
            <div className="flex items-center space-x-3">
              <span className="bg-white/20 p-2 rounded-lg text-sm">🛒 {cartItems.length}</span>
              <span>View Your Cart</span>
            </div>
            <span className="text-2xl">→</span>
          </button>
        </div>
      )}
    </div>
  );
}