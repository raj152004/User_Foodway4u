"use client";
import { useState, useEffect } from 'react';

// === REDUX IMPORTS ===
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '@/redux/slices/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  
  // Redux store se user data fetch kar rahe hain
  const reduxUser = useSelector((state) => state.auth.user);

  // Local state for the form, initialized with Redux data or default fallbacks
  const [userData, setUserData] = useState({
    name: reduxUser?.name || "Raaj Thakur",
    email: reduxUser?.email || "raaj@example.com",
    phone: reduxUser?.phone || "+91 9876543210",
    address: reduxUser?.address || "123, Food Street, Near City Mall, Indore"
  });

  const [isEditing, setIsEditing] = useState(false);

  // --- 1. SYNC DATA ON PAGE LOAD / REDUX UPDATE ---
  useEffect(() => {
    if (reduxUser) {
      setUserData({
        name: reduxUser.name || "Raaj Thakur",
        email: reduxUser.email || "raaj@example.com",
        phone: reduxUser.phone || "+91 9876543210",
        address: reduxUser.address || "123, Food Street, Near City Mall, Indore"
      });
    }
  }, [reduxUser]);

  // --- 2. SAVE & UPDATE DATA (Redux Dispatch) ---
  const handleUpdate = (e) => {
    e.preventDefault();

    // Redux store mein naya data bhej rahe hain
    dispatch(updateProfile(userData));
    setIsEditing(false);

    alert("✅ Updated Successfully!");
  };

  const handleCancel = () => {
    // Cancel karne par form wapas purane Redux state par reset ho jayega
    if (reduxUser) {
      setUserData({
        name: reduxUser.name || "Raaj Thakur",
        email: reduxUser.email || "raaj@example.com",
        phone: reduxUser.phone || "+91 9876543210",
        address: reduxUser.address || "123, Food Street, Near City Mall, Indore"
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-12 px-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 relative">
        <div className="bg-[#0A64BC] p-12 text-white text-center relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-28 h-28 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-5 text-5xl border-4 border-white/30 shadow-xl backdrop-blur-sm">
              🧑🏻‍💻
            </div>
            <h1 className="text-3xl font-black tracking-tight">{userData.name}</h1>
            <p className="opacity-90 text-sm font-bold uppercase tracking-widest mt-2 text-blue-200">Foodway Exclusive Partner</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-[#0A64BC]">
                Full Name
              </label>
              <input
                disabled={!isEditing}
                required
                className={`w-full p-4.5 rounded-2xl border-2 transition-all outline-none font-bold text-gray-800 ${isEditing
                    ? 'border-gray-200 focus:border-[#0A64BC] bg-white shadow-sm'
                    : 'border-transparent bg-gray-50 text-gray-500 cursor-not-allowed'
                  }`}
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-[#0A64BC]">
                Mobile Number
              </label>
              <input
                disabled={!isEditing}
                required
                type="tel"
                className={`w-full p-4.5 rounded-2xl border-2 transition-all outline-none font-bold text-gray-800 ${isEditing
                    ? 'border-gray-200 focus:border-[#0A64BC] bg-white shadow-sm'
                    : 'border-transparent bg-gray-50 text-gray-500 cursor-not-allowed'
                  }`}
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex justify-between">
              <span>Email Address</span>
              <span className="text-red-400">Cannot be changed</span>
            </label>
            <input
              disabled
              className="w-full p-4.5 rounded-2xl border-transparent bg-gray-50 text-gray-400 outline-none cursor-not-allowed font-bold"
              value={userData.email}
            />
          </div>

          {/* Saved Address */}
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-[#0A64BC]">
              Delivery Address
            </label>
            <textarea
              disabled={!isEditing}
              required
              rows="3"
              className={`w-full p-4.5 rounded-2xl border-2 transition-all outline-none font-bold text-gray-800 resize-none ${isEditing
                  ? 'border-gray-200 focus:border-[#0A64BC] bg-white shadow-sm'
                  : 'border-transparent bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100">
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-1/3 bg-gray-100 text-gray-600 py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#22C55E] text-white py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-[#16a34a] transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Save Changes</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full bg-[#0A64BC] text-white py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Edit Profile</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}