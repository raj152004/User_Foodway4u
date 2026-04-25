"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// === REDUX IMPORTS ===
import { useSelector, useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '@/redux/slices/cartSlice';

export default function UserHome() {
  const router = useRouter();

  // === REDUX STATE & DISPATCH ===
  const dispatch = useDispatch();
  // Cart items ab seedha Redux se aa rahe hain (localStorage ki zaroorat nahi)
  const cartItems = useSelector((state) => state.cart.items);

  // --- STATES ---
  const [location, setLocation] = useState("Indore, MP");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Banner Slider State
  const [currentBanner, setCurrentBanner] = useState(0);

  // --- HD AUTO-SLIDING BANNER IMAGES (Optimized for both Mobile & Desktop) ---
  const promotionalBanners = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&h=400&q=80", // Salad / Healthy
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&h=400&q=80", // Pizza
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&h=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&h=400&q=80", // Restaurant table
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&h=400&q=80", // Sushi
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&h=400&q=80" // Snacks
  ];

  useEffect(() => {
    const status = localStorage.getItem("userLoggedIn");
    if (status !== "true") {
      router.push('/login/user');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % promotionalBanners.length);
    }, 3000);
    return () => clearInterval(slideTimer);
  }, [promotionalBanners.length]);

  // ==========================================
  // DATA PRESERVED EXACTLY AS YOU PROVIDED
  // ==========================================
  const seasonSpecials = [
    { id: "s2", name: "Iced Latte", price: 150, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
    { id: "s3", name: "Berry Sundae", price: 190, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80" },
    { id: "s4", name: "Watermelon", price: 80, img: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=600&q=80" },
    { id: "s5", name: "Mint Mojito", price: 110, img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
    { id: "s6", name: "Frappe", price: 160, img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80" },
    { id: "s7", name: "Sweet Lassi", price: 70, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80" },
    { id: "s8", name: "Fresh Lime", price: 60, img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80" },
    { id: "s9", name: "Cold Coffee", price: 140, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80" },
    { id: "s10", name: "Chocolate Milkshake", price: 180, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80" },
    { id: "s12", name: "Strawberry Smoothie", price: 170, img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80" },
    { id: "s13", name: "Pineapple Juice", price: 90, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80" },
    { id: "s14", name: "Orange Juice", price: 85, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80" },
    { id: "s15", name: "Kulfi Falooda", price: 200, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80" },
    { id: "s18", name: "Blue Lagoon", price: 130, img: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=600&q=80" }
  ];

  const categories = ["All", "Veg", "Non-Veg", "Fast Food", "Bakery", "Desserts"];

  const allTodaysSpecials = [
    { id: 't1', name: 'Paneer Butter Masala', type: 'Veg', price: 250, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80' },
    { id: 't2', name: 'Hyderabadi Biryani', type: 'Non-Veg', price: 350, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
    { id: 't3', name: 'Hakka Noodles', type: 'Fast Food', price: 180, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' },
    { id: 't4', name: 'Italian Pizza', type: 'Fast Food', price: 450, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
    { id: 't5', name: 'Malai Kofta', type: 'Veg', price: 280, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80' },
    { id: 't6', name: 'Butter Chicken', type: 'Non-Veg', price: 380, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
    { id: 't7', name: 'Red Velvet Cake', type: 'Bakery', price: 420, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
    { id: 't8', name: 'Blueberry Cheesecake', type: 'Bakery', price: 450, img: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?auto=format&fit=crop&w=800&q=80' },
    { id: 't20', name: 'Chocolate Ice Cream', type: 'Desserts', price: 150, img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80' },
    { id: 't21', name: 'Strawberry Pastry', type: 'Desserts', price: 180, img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80' },
    { id: 't9', name: 'Veg Pulao', type: 'Veg', price: 190, img: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80' },
    { id: 't11', name: 'Masala Dosa', type: 'Veg', price: 130, img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80' },
    { id: 't12', name: 'Chicken Tandoori', type: 'Non-Veg', price: 340, img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
    { id: 't13', name: 'Mutton Curry', type: 'Non-Veg', price: 420, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
    { id: 't22', name: 'Grilled Chicken', type: 'Non-Veg', price: 300, img: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80' },
    { id: 't14', name: 'Veg Burger', type: 'Fast Food', price: 120, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80' },
    { id: 't15', name: 'French Fries', type: 'Fast Food', price: 100, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80' },
    { id: 't16', name: 'Donuts', type: 'Bakery', price: 180, img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80' },
    { id: 't17', name: 'Croissant', type: 'Bakery', price: 200, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { id: 't18', name: 'Chocolate Brownie', type: 'Desserts', price: 150, img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80' },
    { id: 't19', name: 'Vanilla Ice Cream', type: 'Desserts', price: 120, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80' },
    { id: 't24', name: 'Fruit Custard', type: 'Desserts', price: 130, img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80' },
    { id: 't25', name: 'Chocolate Mousse', type: 'Desserts', price: 170, img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
  ];

  const allRecommendedDishes = [
    { id: 'r1', name: 'Masala Dosa', type: 'Veg', price: 120, img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
    { id: 'r4', name: 'Dal Makhani', type: 'Veg', price: 220, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80' },
    { id: 'r10', name: 'Palak Paneer', type: 'Veg', price: 230, img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80' },
    { id: 'r11', name: 'Veg Thali', type: 'Veg', price: 200, img: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=600&q=80' },
    { id: 'r2', name: 'Chicken Burger', type: 'Non-Veg', price: 199, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
    { id: 'r6', name: 'Mutton Curry', type: 'Non-Veg', price: 420, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
    { id: 'r13', name: 'Chicken Tandoori', type: 'Non-Veg', price: 350, img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80' },
    { id: 'r14', name: 'Chicken Biryani', type: 'Non-Veg', price: 320, img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80' },
    { id: 'r3', name: 'Loaded Fries', type: 'Fast Food', price: 145, img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80' },
    { id: 'r5', name: 'Dimsum Momos', type: 'Fast Food', price: 150, img: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=600&q=80' },
    { id: 'r9', name: 'Spring Rolls', type: 'Fast Food', price: 140, img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80' },
    { id: 'r15', name: 'Veg Burger', type: 'Fast Food', price: 130, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80' },
    { id: 'r7', name: 'Croissant', type: 'Bakery', price: 90, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
    { id: 'r16', name: 'Donuts', type: 'Bakery', price: 120, img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80' },
    { id: 'r17', name: 'Chocolate Muffin', type: 'Bakery', price: 110, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' },
    { id: 'r18', name: 'Garlic Bread', type: 'Bakery', price: 100, img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80' },
    { id: 'r8', name: 'Red Velvet Pastry', type: 'Desserts', price: 150, img: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80' },
    { id: 'r12', name: 'Cheesecake', type: 'Desserts', price: 180, img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80' },
    { id: 'r19', name: 'Chocolate Brownie', type: 'Desserts', price: 140, img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80' },
    { id: 'r20', name: 'Ice Cream', type: 'Desserts', price: 120, img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80' },
  ];

  const nearbyRestaurants = [
    { id: 1, name: "Green Palace", type: "Veg", rating: 4.5, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "The Sattvik Kitchen", type: "Veg", rating: 4.8, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Meat & Greet", type: "Non-Veg", rating: 4.2, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Quick Bites", type: "Fast Food", rating: 4.0, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Spice Villa", type: "Non-Veg", rating: 4.4, image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Cafe Delight", type: "Bakery", rating: 4.6, image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" },
  ];

  const [filteredRestaurants, setFilteredRestaurants] = useState(nearbyRestaurants);

  const filteredTodays = activeCategory === "All" ? allTodaysSpecials : allTodaysSpecials.filter(dish => dish.type === activeCategory);
  const filteredRecommended = activeCategory === "All" ? allRecommendedDishes : allRecommendedDishes.filter(dish => dish.type === activeCategory);

  // ==========================================
  // UPDATED: ADD TO CART USING REDUX
  // ==========================================
  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    dispatch(addToCartAction(item));
  };

  const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRestaurants(nearbyRestaurants);
    } else {
      const searchLower = searchQuery.toLowerCase();
      const matches = nearbyRestaurants.filter(res =>
        res.name.toLowerCase().includes(searchLower)
      );
      setFilteredRestaurants(matches);
    }
    const element = document.getElementById("restaurant-list");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="bg-[#F8F9FB] min-h-screen font-sans text-gray-900 flex flex-col">

      <main className="grow max-w-7xl mx-auto w-full pb-32">

        {/* ========================================== */}
        {/* FIXED: RESPONSIVE BANNER */}
        {/* ========================================== */}
        <div className="px-4 pt-4 md:pt-6 pb-2">
          {/* md:max-w-4xl aur lg:h-[300px] se banner ab desktop pe jyada failega nahi */}
          <div className="relative w-full h-36 md:h-56 lg:h-300px lg:max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-gray-200">
            {promotionalBanners.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Promo Banner ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
            ))}

            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center space-x-2">
              {promotionalBanners.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="px-4 py-4 md:py-6">
          <div className="relative flex items-center bg-white border border-gray-100 rounded-[1.5rem] p-2.5 shadow-lg focus-within:border-[#0A64BC] lg:max-w-5xl mx-auto">
            <button onClick={handleSearch} className="p-2 text-gray-400 hover:text-[#0A64BC]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <input
              type="text"
              placeholder="Search food | e.g. Pizza, Burger"
              className="w-full bg-transparent px-3 py-2 outline-none font-bold text-base text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="hidden md:block bg-[#0A64BC] text-white px-6 py-2.5 rounded-xl font-bold text-sm">Search</button>
          </div>
        </div>

        {/* 3. SEASON SPECIAL */}
        <section className="mt-2 px-4 lg:max-w-6xl mx-auto">
          <h2 className="text-2xl font-black tracking-tight text-gray-800 mb-5">Season Special</h2>
          <div className="flex overflow-x-auto space-x-6 custom-scrollbar pb-6 pt-2 px-2 -mx-2">
            {seasonSpecials.map((dish) => (
              <div key={dish.id} className="flex flex-col items-center space-y-3 min-w-90px group">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white group-hover:border-[#0A64BC] transition-all relative">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />

                  <div onClick={(e) => handleAddToCart(e, dish)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <span className="bg-[#0A64BC] text-white text-[10px] px-3 py-1 rounded-full font-black shadow-lg">ADD +</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-center text-gray-700">{dish.name}</p>
                <p className="text-[10px] font-black text-[#0A64BC]">₹{dish.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. REAL CATEGORY FILTER BUTTONS */}
        <section className="mt-6 px-4 sticky top-16 md:top-20 z-30 bg-[#F8F9FB] py-4 lg:max-w-6xl mx-auto">
          <div className="flex overflow-x-auto space-x-3 custom-scrollbar pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3.5 rounded-2xl font-black text-sm border-2 transition-all ${activeCategory === cat ? "bg-[#0A64BC] text-white border-[#0A64BC] shadow-lg" : "bg-white text-gray-500 border-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 5. TODAY'S SPECIAL */}
        <section className="mt-6 px-4 lg:max-w-6xl mx-auto">
          <h2 className="text-2xl font-black mb-6 text-gray-800">{activeCategory === "All" ? "Today's Special" : `${activeCategory} Specials`}</h2>

          {filteredTodays.length === 0 ? (
            <p className="text-gray-400 font-bold p-4">No specials available in this category.</p>
          ) : (
            <div className="flex overflow-x-auto space-x-6 custom-scrollbar pb-8 px-2 -mx-2">
              {filteredTodays.map((dish) => (
                <div key={dish.id} className="min-w-260px bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden shrink-0 flex flex-col">
                  <div className="h-48 w-full overflow-hidden relative">
                    <img src={dish.img} className="w-full h-full object-cover" alt={dish.name} />
                    <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm ${dish.type === 'Veg' ? 'text-green-600' : dish.type === 'Non-Veg' ? 'text-red-600' : 'text-[#0A64BC]'}`}>{dish.type}</div>
                  </div>
                  <div className="p-5 flex flex-col justify-between grow">
                    <h3 className="font-black text-xl text-gray-800 mb-4">{dish.name}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-black text-2xl text-[#0A64BC]">₹{dish.price}</span>
                      <button onClick={(e) => handleAddToCart(e, dish)} className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#0A64BC] hover:scale-105 transition-all shadow-lg">ADD +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. RECOMMENDED DISHES */}
        <section className="mt-8 px-4 mb-10 lg:max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight text-gray-800">Recommended for You</h2>
          </div>

          {filteredRecommended.length === 0 ? (
            <p className="text-gray-400 font-bold p-4">No recommendations available in this category.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredRecommended.map((dish) => (
                <div key={dish.id} className="bg-white p-3 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-3 relative cursor-pointer" onClick={() => router.push(`/dish/${dish.id}`)}>
                    <img src={dish.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dish.name} />
                    <div className={`absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black uppercase ${dish.type === 'Veg' ? 'text-green-600' : dish.type === 'Non-Veg' ? 'text-red-600' : 'text-gray-600'}`}>
                      {dish.type}
                    </div>
                  </div>
                  <div className="px-2 grow flex flex-col justify-between">
                    <p className="font-bold text-gray-800 leading-tight mb-3 text-sm md:text-base">{dish.name}</p>
                    <div className="flex items-center justify-between w-full mt-auto">
                      <p className="font-black text-[#0A64BC] text-lg">₹{dish.price}</p>
                      <button onClick={(e) => handleAddToCart(e, dish)} className="bg-gray-900 text-white px-4 py-1.5 rounded-xl font-bold text-xs hover:bg-[#0A64BC] hover:scale-105 transition-all shadow-lg">ADD +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* HERO SECTION & EXCLUSIVE RESTAURANTS */}
        <section className="relative py-12 px-4 md:px-6 bg-[#0A64BC] mt-16 mx-4 rounded-[2.5rem] shadow-xl overflow-hidden lg:max-w-6xl lg:mx-auto">
          <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-[-20deg] translate-x-32 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-widest text-white">Live in Indore</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
              Hungry? <span className="opacity-70">Order Now.</span>
            </h1>
            <div className="w-full max-w-xl bg-white rounded-2xl p-1.5 shadow-xl flex items-center">
              <input
                type="text"
                placeholder="Enter restaurant name (e.g. Green Palace)..."
                className="w-full py-4 px-4 text-gray-800 font-bold bg-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="bg-[#0A64BC] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest">
                Find
              </button>
            </div>
          </div>
        </section>

        <section id="restaurant-list" className="py-16 px-4 md:px-6 lg:max-w-6xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Exclusive Partners</h2>
              <p className="text-gray-500 mt-1">Handpicked quality within 5 km of your zone.</p>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredRestaurants(nearbyRestaurants);
                }}
                className="text-xs font-bold text-[#0A64BC] bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100"
              >
                Clear Search ✕
              </button>
            )}
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">🍽️</div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-2">No Restaurant Available</h3>
              <p className="text-gray-500 font-medium">We couldn't find any partner matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(""); setFilteredRestaurants(nearbyRestaurants); }}
                className="mt-6 bg-[#0A64BC] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors"
              >
                View All Partners
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {filteredRestaurants.map((res) => (
                <Link href={`/restaurants/${res.id}`} key={res.id} className="group">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
                      <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${res.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {res.type}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{res.name}</h3>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-black">⭐ {res.rating}</div>
                      </div>
                      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">5 km Zone</p>
                        <span className="text-[#0A64BC] font-black text-sm">VIEW MENU →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* BOTTOM FLOATING CART BAR */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-420px z-50 animate-in slide-in-from-bottom-10">
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-[#22C55E] text-white py-4 rounded-[2rem] font-black text-lg shadow-2xl flex justify-between items-center px-8 hover:bg-[#16a34a] hover:scale-[1.02] transition-all active:scale-95 border-2 border-green-400/30"
          >
            <div className="flex items-center space-x-3">
              <span className="bg-white/20 p-2 rounded-lg text-sm">🛒 {cartItems.length}</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-widest text-green-100 leading-tight">Total Bill</span>
                <span className="leading-tight">₹{getCartTotal()}</span>
              </div>
            </div>
            <span className="text-xl flex items-center space-x-2">
              <span className="text-sm">Pay</span>
              <span>→</span>
            </span>
          </button>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}