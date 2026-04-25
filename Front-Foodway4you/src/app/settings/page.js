"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  
  // Settings States
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("userLoggedIn");
    if (status !== "true") {
      router.push('/login/user');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!isAuthorized) return null;

  return (
    <div className="bg-[#F8F9FB] min-h-screen font-sans text-gray-900 pb-24">
      
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()} 
            className="p-2.5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors active:scale-95"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-xl font-black tracking-tight">Settings</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-8 space-y-8">
        
        {/* SECTION 1: ACCOUNT */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Account</h2>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Edit Profile Link */}
            <div onClick={() => router.push('/profile')} className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50 cursor-pointer hover:bg-blue-50/50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-50 text-[#0A64BC] rounded-xl flex items-center justify-center text-lg shadow-sm">👤</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-[#0A64BC] transition-colors">Personal Information</h3>
                  <p className="text-xs font-medium text-gray-500">Name, Email, Phone number</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-[#0A64BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Saved Addresses */}
            <div onClick={() => router.push('/profile')} className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-blue-50/50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-lg shadow-sm">📍</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-[#0A64BC] transition-colors">Saved Addresses</h3>
                  <p className="text-xs font-medium text-gray-500">Home, Work, Other locations</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-[#0A64BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>

          </div>
        </div>

        {/* SECTION 2: PREFERENCES (With Toggles) */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Preferences</h2>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Push Notifications */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-lg shadow-sm">🔔</div>
                <div>
                  <h3 className="font-bold text-gray-800">Push Notifications</h3>
                  <p className="text-xs font-medium text-gray-500">Order updates & delivery status</p>
                </div>
              </div>
              <ToggleSwitch isChecked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
            </div>

            {/* Promotional Emails */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-lg shadow-sm">✉️</div>
                <div>
                  <h3 className="font-bold text-gray-800">Promotional Emails</h3>
                  <p className="text-xs font-medium text-gray-500">Exclusive offers & discounts</p>
                </div>
              </div>
              <ToggleSwitch isChecked={promoEmails} onChange={() => setPromoEmails(!promoEmails)} />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-5 md:p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-800 text-white rounded-xl flex items-center justify-center text-lg shadow-sm">🌙</div>
                <div>
                  <h3 className="font-bold text-gray-800">Dark Mode</h3>
                  <p className="text-xs font-medium text-gray-500">App appearance</p>
                </div>
              </div>
              <ToggleSwitch isChecked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>

          </div>
        </div>

        {/* SECTION 3: MORE & LEGAL */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">More Options</h2>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            
           
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-lg shadow-sm">🌐</div>
                <h3 className="font-bold text-gray-800">App Language</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-[#0A64BC] bg-blue-50 px-3 py-1 rounded-lg">English</span>
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>

            {/* Help & Support */}
            <div onClick={() => router.push('/help')} className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center text-lg shadow-sm">🎧</div>
                <h3 className="font-bold text-gray-800">Help & Support</h3>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* About */}
            <div className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center text-lg shadow-sm">ℹ️</div>
                <h3 className="font-bold text-gray-800">About Foodway4U</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400">v1.0.4</span>
            </div>

          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="pt-6 pb-10">
          <button 
            onClick={handleLogout}
            className="w-full bg-white border-2 border-red-100 text-red-500 py-4.5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Log Out Securely</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>

      </main>
    </div>
  );
}

// PREMIUM CUSTOM TOGGLE COMPONENT
function ToggleSwitch({ isChecked, onChange }) {
  return (
    <div 
      onClick={onChange}
      className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isChecked ? 'bg-[#22C55E]' : 'bg-gray-200'
      }`}
    >
      <div 
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          isChecked ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
}