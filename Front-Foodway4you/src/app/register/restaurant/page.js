"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function RestaurantRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    restaurantType: 'Veg',
    address: '',
    gstNumber: '',
    aadhar: '',
    pan: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted! Our team will verify your 5km zone availability.");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-[#0A64BC] p-8 text-white text-center">
          <h1 className="text-3xl font-bold italic">Foodway Partner Network</h1>
          <p className="mt-2 opacity-80 text-sm">Join the exclusive 5 km radius model and boost your sales [cite: 22-23].</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Restaurant Name</label>
            <input name="restaurantName" type="text" onChange={handleChange} required className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none transition-all" placeholder="E.g. Spice Garden" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Restaurant Category</label>
            <select name="restaurantType" onChange={handleChange} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none bg-white">
              <option value="Veg">Pure Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Fast Food">Fast Food</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Owner Name</label>
            <input name="ownerName" type="text" onChange={handleChange} required className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Business Mobile</label>
            <input name="phone" type="tel" onChange={handleChange} required className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" placeholder="+91" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Address (for 5km Zone Check)</label>
            <textarea name="address" rows="2" onChange={handleChange} required className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" placeholder="Enter complete address to verify exclusivity..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">GSTIN Number</label>
            <input name="gstNumber" type="text" onChange={handleChange} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" placeholder="22AAAAA0000A1Z5" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">FSSAI Certificate (PDF/Image)</label>
            <input type="file" className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-[#0A64BC] file:font-bold hover:file:bg-blue-100" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Aadhar Card Number</label>
            <input name="aadhar" type="text" onChange={handleChange} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">PAN Card Number</label>
            <input name="pan" type="text" onChange={handleChange} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#0A64BC] outline-none" />
          </div>

          <div className="md:col-span-2 pt-6">
            <button type="submit" className="w-full bg-[#0A64BC] text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95">
              Apply for Partnership
            </button>
            <p className="text-center mt-4 text-sm text-gray-500">
              Only one partner per category is accepted in a 5km zone[cite: 22].
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}