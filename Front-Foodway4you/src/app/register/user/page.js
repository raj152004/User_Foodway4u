"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agree: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.agree) return alert("Please agree to terms");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account Created Successfully!");
      router.push('/login/user'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4 font-sans">

      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-[#0A64BC] text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shadow-md">F</div>
        <span className="text-xl font-black text-blue-900 tracking-tighter">FOODWAY</span>
      </div>
      <div className="w-full max-w-lg bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-1">Quick 1-minute setup</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompactInput 
              label="Full Name" 
              placeholder="Raaj Thakur" 
              type="text"
              onChange={(val) => setFormData({...formData, fullName: val})} 
            />
            <CompactInput 
              label="Phone Number" 
              placeholder="+91 98765..." 
              type="tel"
              onChange={(val) => setFormData({...formData, phone: val})} 
            />
          </div>

          <CompactInput 
            label="Email Address" 
            placeholder="raaj@example.com" 
            type="email"
            onChange={(val) => setFormData({...formData, email: val})} 
          />

          <CompactInput 
            label="Set Password" 
            placeholder="••••••••" 
            type="password"
            onChange={(val) => setFormData({...formData, password: val})} 
          />

          <label className="flex items-center space-x-3 cursor-pointer py-1 px-1">
            <input 
              type="checkbox" 
              required
              className="w-4 h-4 rounded border-gray-300 text-[#0A64BC] focus:ring-0 cursor-pointer" 
              onChange={(e) => setFormData({...formData, agree: e.target.checked})}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              I agree to <span className="text-[#0A64BC]">Terms & Privacy</span>
            </span>
          </label>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#0A64BC] text-white py-3.5 rounded-xl font-black text-sm shadow-lg shadow-blue-50 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><span>Sign Up Now</span><span>🚀</span></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
            Member already? 
            <Link href="/login/user" className="text-[#0A64BC] ml-1.5 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Optimized Compact Input Component
function CompactInput({ label, placeholder, type, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input 
        type={type} 
        required 
        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:border-[#0A64BC] focus:bg-white outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 text-sm"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}