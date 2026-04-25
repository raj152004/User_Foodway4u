"use client";
import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      localStorage.setItem("userLoggedIn", "true");
      window.location.href = "/restaurants";
    } else {
      alert("Registration Successful! Now please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDE5F4] flex items-center justify-center p-4 font-sans">
      
      {/* --- Main Container --- */}
      <div className="relative w-full max-w-850px h-550px bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden flex">
        <div 
          className={`absolute top-0 w-1/2 h-full bg-[#6C95E0] z-20 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-white px-10 text-center ${
            isLogin 
            ? "left-1/2 rounded-l-[150px] rounded-r-[40px]" 
            : "left-0 rounded-r-[150px] rounded-l-[40px]"
          }`}
        >
          <h2 className="text-4xl font-black mb-4 tracking-tighter">
            {isLogin ? "Hello, Welcome!" : "Welcome Back!"}
          </h2>
          <p className="text-sm opacity-90 mb-8 leading-relaxed font-medium">
            {isLogin 
              ? "Don't have an account? Join Foodway 4U today!" 
              : "Already have an account? Sign in to order your favorite food."}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="border-2 border-white px-12 py-3 rounded-xl font-black hover:bg-white hover:text-[#6C95E0] transition-all active:scale-95 uppercase text-xs tracking-[0.2em]"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* --- LOGIN FORM SECTION --- */}
        <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 transition-all duration-700 ${!isLogin ? "translate-x-full opacity-0 invisible" : "translate-x-0 opacity-100"}`}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-800 tracking-tighter">Login</h2>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Foodway 4U Portal</p>
          </div>
          
          <form onSubmit={handleAuth} className="w-full space-y-4">
            <AuthInput type="email" placeholder="Email Address" icon="👤" />
            <AuthInput type="password" placeholder="Password" icon="🔒" />
            
            <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest cursor-pointer hover:text-[#6C95E0] transition-colors">Forgot password?</p>
            
            <button className="w-full bg-[#6C95E0] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-[#5a82cc] active:scale-95 transition-all uppercase text-xs tracking-widest">
              Sign In
            </button>
          </form>
          
          <SocialSection label="or login with social platforms" />
        </div>

        {/* --- REGISTER FORM SECTION --- */}
        <div className={`w-1/2 h-full flex flex-col items-center justify-center p-12 transition-all duration-700 absolute top-0 left-0 ${isLogin ? "-translate-x-full opacity-0 invisible" : "translate-x-0 opacity-100"}`}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-800 tracking-tighter">Registration</h2>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Create your Identity</p>
          </div>

          <form onSubmit={handleAuth} className="w-full space-y-3">
            <AuthInput type="text" placeholder="Full Name" icon="👤" />
            <AuthInput type="email" placeholder="Email" icon="📧" />
            <AuthInput type="tel" placeholder="Phone Number" icon="📞" />
            <AuthInput type="password" placeholder="Set Password" icon="🔒" />
            
            <button className="w-full bg-[#6C95E0] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#5a82cc] active:scale-95 transition-all uppercase text-xs tracking-widest mt-2">
              Create Account
            </button>
          </form>
          
          <SocialSection label="or register with social platforms" />
        </div>

      </div>
    </div>
  );
}

// Helper Components for Cleaner Code
function AuthInput({ type, placeholder, icon }) {
  return (
    <div className="relative group">
      <input 
        type={type} 
        placeholder={placeholder} 
        className="w-full bg-gray-50 p-4 rounded-2xl outline-none text-sm font-bold border-2 border-transparent focus:border-[#6C95E0] focus:bg-white transition-all placeholder:text-gray-300 text-gray-700" 
      />
      <span className="absolute right-5 top-4 opacity-20 group-focus-within:opacity-100 transition-opacity text-lg">{icon}</span>
    </div>
  );
}

function SocialSection({ label }) {
  return (
    <div className="mt-8 text-center">
      <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">{label}</p>
      <div className="flex justify-center space-x-3">
        {['G', 'f', 'git', 'in'].map((icon) => (
          <div key={icon} className="w-10 h-10 border-2 border-gray-50 rounded-xl flex items-center justify-center font-black text-gray-400 hover:bg-[#6C95E0] hover:text-white hover:border-[#6C95E0] cursor-pointer transition-all text-xs">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}