"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InviteFriendPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const referralCode = "RAAJ-FW150";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Foodway4U!',
        text: `Use my code ${referralCode} to get ₹150 OFF on your first food delivery order on Foodway4U!`,
        url: 'https://foodway4u.com',
      })
      .catch(console.error);
    } else {
      handleCopyCode();
      alert("Link copied to clipboard!");
    }
  };

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
          <h1 className="text-xl font-black tracking-tight">Refer & Earn</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        
        {/* PREMIUM HERO CARD */}
        <div className="bg-[#0A64BC] rounded-[2.5rem] p-8 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-100/50">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-6xl mb-4 animate-bounce">🎁</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Give ₹150, Get ₹150</h2>
            <p className="text-blue-100 font-medium text-sm px-4 leading-relaxed mb-8">
              Invite your friends to Foodway4U. They get ₹150 off their first order, and you get ₹150 when it's delivered!
            </p>

            {/* REFERRAL CODE BOX */}
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 p-2 rounded-2xl flex items-center justify-between max-w-sm mx-auto">
              <div className="px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 text-left mb-0.5">Your Code</p>
                <p className="font-black text-xl tracking-wider">{referralCode}</p>
              </div>
              <button 
                onClick={handleCopyCode}
                className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  copied ? "bg-[#22C55E] text-white" : "bg-white text-[#0A64BC] hover:bg-gray-50 active:scale-95"
                }`}
              >
                {copied ? "Copied! ✔" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* SHARE ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleShare}
            className="bg-[#25D366] text-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-md hover:bg-[#1ebd5a] active:scale-95 transition-all"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.128.552 4.195 1.6 6.015L.302 24l6.104-1.6c1.782.96 3.791 1.468 5.869 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.846c-1.802 0-3.564-.485-5.115-1.4l-.367-.217-3.8.996 1.018-3.702-.238-.38a9.923 9.923 0 01-1.529-5.31C2.031 6.502 6.533 2.001 12.031 2.001 17.53 2.001 22.032 6.502 22.032 12.031c0 5.498-4.502 9.815-10.001 9.815zm5.494-7.514c-.301-.151-1.784-.881-2.06-1-.277-.118-.478-.18-.679.12-.202.301-.78 1-.956 1.201-.176.202-.352.227-.653.076-.301-.151-1.274-.469-2.427-1.521-.897-.818-1.503-1.829-1.679-2.13-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.526.151-.176.201-.301.301-.502.101-.202.05-.377-.025-.527-.075-.15-.679-1.636-.929-2.24-.244-.589-.492-.51-.679-.52-.175-.01-.377-.01-.578-.01-.201 0-.527.075-.803.376-.277.301-1.055 1.028-1.055 2.508 0 1.48 1.08 2.912 1.23 3.112.15.201 2.122 3.238 5.139 4.54.718.311 1.278.497 1.713.636.721.23 1.376.197 1.892.12.576-.086 1.784-.73 2.035-1.434.251-.705.251-1.307.176-1.434-.075-.126-.277-.201-.578-.352z"/></svg>
            <span className="font-black text-sm">WhatsApp</span>
          </button>

          <button 
            onClick={handleShare}
            className="bg-white border-2 border-gray-100 text-gray-700 p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm hover:border-[#0A64BC] hover:text-[#0A64BC] active:scale-95 transition-all"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            <span className="font-black text-sm">Share Link</span>
          </button>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2 mt-6">How it works</h2>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="space-y-8 relative">
              
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100 -z-10"></div>

              {/* Step 1 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0A64BC] font-black text-lg flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-800 text-lg">Share your code</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">Send your unique code to friends via WhatsApp or any other app.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0A64BC] font-black text-lg flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-800 text-lg">Friend gets ₹150 OFF</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">Your friend signs up using your code and gets ₹150 off on their first food order.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-green-50 text-[#22C55E] font-black text-lg flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-800 text-lg">You earn ₹150!</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">Once their order is successfully delivered, you get a ₹150 discount coupon instantly.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* T&C */}
        <div className="text-center pt-4 pb-8">
           <p className="text-xs font-bold text-gray-400 hover:text-[#0A64BC] cursor-pointer transition-colors underline decoration-dashed underline-offset-4">
             Read Terms & Conditions
           </p>
        </div>

      </main>
    </div>
  );
}