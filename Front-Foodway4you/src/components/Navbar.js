"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("XYZ location");
  
  const router = useRouter();
  const pathname = usePathname();

  // Login status check on every path change
  useEffect(() => {
    const userStatus = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(userStatus === "true");
    setIsDrawerOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
    window.location.href = "/"; 
  };

  const handleLocationClick = () => {
    // Yahan map ya location selector modal khulega
    const newLocation = prompt("Enter your new delivery location:", currentLocation);
    if (newLocation) {
      setCurrentLocation(newLocation);
    }
  };

  // Auth pages jahan Navbar nahi dikhana hai
  const authPages = ['/', '/login/user', '/login/restaurant', '/register/user', '/register/restaurant'];
  
  if (!isAuthorized(isLoggedIn, authPages, pathname)) {
    return null;
  }

  return (
    <>
      {/* 1. MAIN HEADER SECTION */}
  
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-100 px-4 py-3 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left Side: Hamburger & Location */}
          <div className="flex items-center space-x-4">
            
            {/* ☰ Hamburger Menu */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* 📍 User Location */}
            <div 
              onClick={handleLocationClick}
              className="flex flex-col cursor-pointer group"
            >
              <div className="flex items-center space-x-1 text-[#0A64BC] font-black text-sm group-hover:text-black transition-colors">
                <span className="text-lg">📍</span> 
                <span className="hidden md:inline">Delivery to</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-bold ml-1 truncate w-32 md:w-48 group-hover:text-gray-800 transition-colors">
                {currentLocation}
              </p>
            </div>
          </div>

          {/* Right Side: 👤 Profile Image (Circular) */}
          <div 
            onClick={() => router.push('/profile')}
            className="w-11 h-11 rounded-full bg-blue-50 border-2 border-[#0A64BC] overflow-hidden cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Raaj" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>
      </nav>

      {/* 2. SIDE NAVIGATION DRAWER */}
  
      {isDrawerOpen && (
        <div className="fixed inset-0 z-200 flex">
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[80%] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            
            {/* Drawer Header */}
            <div className="bg-[#0A64BC] p-8 text-white relative">
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
              <div className="w-16 h-16 rounded-full bg-white/20 mb-4 flex items-center justify-center text-2xl font-black border-2 border-white/50">
                👤
              </div>
              <h3 className="font-black text-xl">Raaj Thakur</h3>
              <p className="text-xs text-blue-200 font-bold mt-1">{currentLocation}</p>
            </div>

            {/* Drawer Links */}
            <div className="p-4 space-y-1 flex-1 overflow-y-auto mt-2">
              <DrawerLink icon="🏠" text="Home" onClick={() => router.push('/restaurants')} />
              <DrawerLink icon="📦" text="My Orders" onClick={() => router.push('/orders')} />
              <DrawerLink icon="🔔" text="Notification" onClick={() => alert("No new notifications")} />
              <DrawerLink icon="🛵" text="Track your Order" onClick={() => router.push('/track')} />
              <DrawerLink icon="🎫" text="Coupons" onClick={() => alert("No active coupons")} />
              <DrawerLink icon="⚙️" text="Settings" onClick={() => router.push('/settings')} />
              <DrawerLink icon="🎁" text="Invite a Friend" onClick={() => router.push('/invite_friend')} />
              <DrawerLink icon="🎧" text="Help Centre" onClick={() => router.push('/help')} />
            </div>

            {/* Logout Button */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
               <button 
                 onClick={handleLogout}
                 className="w-full py-3.5 bg-red-100 text-red-600 font-black rounded-xl hover:bg-red-600 hover:text-white transition-all text-sm uppercase tracking-widest shadow-sm flex items-center justify-center space-x-2"
               >
                 <span>Logout</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Helper function for checking Auth
function isAuthorized(isLoggedIn, authPages, pathname) {
  if (!isLoggedIn || authPages.includes(pathname)) {
    return false;
  }
  return true;
}

// Helper Component for Drawer Links
function DrawerLink({ icon, text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl font-bold text-gray-600 hover:bg-blue-50 hover:text-[#0A64BC] transition-all text-sm group"
    >
      <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">{icon}</span>
      <span>{text}</span>
    </button>
  );
}