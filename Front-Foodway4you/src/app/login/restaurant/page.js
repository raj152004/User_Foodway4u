"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// === REDUX IMPORTS ===
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';

export default function RestaurantLogin() {
  const router = useRouter();
  const dispatch = useDispatch(); // Redux Dispatch
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  // ==========================================
  // UPDATED: REDUX LOGIN LOGIC FOR PARTNER
  // ==========================================
  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Dispatch Partner Data to Redux Store
    dispatch(login({
      name: "Foodway Partner",
      email: email,
      role: "partner" // Is role se aage chal kar Dashboard pe UI change kar sakte hain
    }));

    // 2. Maintain local route guards (Optional but safe)
    localStorage.setItem("partnerLoggedIn", "true");

    // 3. Success & Redirect
    alert("Partner Login Successful!");
    router.push('/dashboard'); 
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A64BC] items-center justify-center relative overflow-hidden">
        <div className="z-10 text-white text-center p-12">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Partner Dashboard</h2>
          <p className="text-xl opacity-90 max-w-md mx-auto leading-relaxed">
            Manage your exclusive zone, digital menu, and live orders in real-time.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/assets/restaurant-bg.mp4" 
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 lg:bg-white">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Login as Partner</h1>
            <p className="text-gray-500 mt-2 italic">
              Access your personalized restaurant control panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
    
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700 ml-1">Registered Email ID</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@foodway.com"
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] focus:ring-0 outline-none transition-all placeholder:text-gray-300" 
              />
            </div>
            
            <div className="space-y-1 relative">
              <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••"
                className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] focus:ring-0 outline-none transition-all placeholder:text-gray-300" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-11 text-[#0A64BC] font-extrabold text-xs uppercase tracking-widest hover:text-blue-800 transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A64BC] focus:ring-[#0A64BC]" />
                <span className="group-hover:text-gray-900 transition-colors">Remember Me</span>
              </label>
              <Link href="/help" className="text-[#0A64BC] font-bold hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0A64BC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-100 pt-8">
            <p className="text-gray-500">
              Want to register your outlet? 
              <Link href="/register/restaurant" className="text-[#0A64BC] font-bold ml-2 hover:underline">
                Apply for Partnership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}