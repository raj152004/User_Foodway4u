
"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginViaAPI } from '@/redux/slices/authSlice';

// === FIREBASE IMPORTS ===
import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";

// Firebase Config (Apne Firebase Console se copy karke yahan daalein)
const firebaseConfig = {
  apiKey: "AIzaSyAnsonJ6BP2A697lhxlctSNDxBPw7QNHOs",
  authDomain: "foodway4you.firebaseapp.com",
  projectId: "foodway4you",
  storageBucket: "foodway4you.firebasestorage.app",
  messagingSenderId: "926244744549",
  appId: "1:926244744549:web:b49f8f083add7b81c0058c"
};

// Initialize Firebase (Avoid duplicate initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentScreen, setCurrentScreen] = useState("splash");
  const [introSlide, setIntroSlide] = useState(0);
  const [authStep, setAuthStep] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  // 1. SPLASH SCREEN LOGIC
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => setCurrentScreen("intro"), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // 2. OTP TIMER LOGIC
  useEffect(() => {
    let interval;
    if (authStep === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, timer]);

  // RECAPTCHA SETUP
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => { console.log("Recaptcha verified"); }
      });
    }
  };

  // HANDLER: GET OTP (Firebase Real SMS)
  const handleGetOTP = async (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setLoading(true);
      try {
        setupRecaptcha();
        const phoneNumber = "+91" + mobileNumber;
        const appVerifier = window.recaptchaVerifier;

        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = confirmation;
        
        setAuthStep("otp");
        setTimer(30);
      } catch (error) {
        console.error("SMS Error:", error);
        alert("Failed to send SMS: " + error.message);
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  // HANDLER: VERIFY OTP & BACKEND LOGIN
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");
    
    if (enteredOTP.length === 6) {
      setLoading(true);
      try {
        // 1. Firebase OTP verify karein
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(enteredOTP);
        
        // 2. Real JWT Token (idToken) lein
        const idToken = await result.user.getIdToken();

        // 3. Redux Thunk se Backend verify-otp route pe bhejein
        dispatch(loginViaAPI({ idToken }))
          .unwrap()
          .then((response) => {
            localStorage.setItem("userLoggedIn", "true");
            if(response.token) localStorage.setItem("accessToken", response.token);
            
            router.push("/restaurants");
          })
          .catch((error) => {
            alert("Backend Login Failed: " + error);
          });

      } catch (error) {
        console.error("OTP Error:", error);
        alert("Invalid OTP! Please check and try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter the complete 6-digit OTP");
    }
  };

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // INTRO SCREENS DATA
  const introData = [
    { title: "Choose a Favorite Food", text: "Jo lage best, woh karo test.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
    { title: "Hot Delivery to home", text: "Home pe delivery, full on thrill, khana milega just how you fill.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },
    { title: "Receive the Great Food", text: "Plate mein aaya magic ka mood, kya mast, kya sahi, kya great food.", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" }
  ];

  // RENDER SPLASH
  if (currentScreen === "splash") {
    return (
      <div className="min-h-screen bg-[#0A64BC] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-24 h-24 bg-white text-[#0A64BC] rounded-[2rem] flex items-center justify-center font-black text-5xl shadow-2xl mb-6 animate-pulse">F</div>
        <h1 className="text-4xl font-black mb-2">FoodWay4U</h1>
      </div>
    );
  }

  // RENDER INTRO
  if (currentScreen === "intro") {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[400px] h-[700px] bg-white rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="pt-8 pb-4 text-center font-black text-[#0A64BC] tracking-widest">FOODWAY4U</div>
          <div className="flex-1 p-6 flex flex-col items-center text-center">
            <img src={introData[introSlide].img} className="w-full h-72 rounded-[2rem] object-cover mb-8" alt="intro" />
            <h3 className="text-2xl font-black mb-4">{introData[introSlide].title}</h3>
            <p className="text-gray-500 text-sm px-4">"{introData[introSlide].text}"</p>
          </div>
          <div className="p-8 flex items-center justify-between border-t bg-gray-50/50 mt-auto">
            <button onClick={() => setCurrentScreen("auth")} className="text-gray-400 font-bold">Skip</button>
            <button 
                onClick={() => introSlide < 2 ? setIntroSlide(introSlide+1) : setCurrentScreen("auth")}
                className="bg-[#0A64BC] text-white px-6 py-3 rounded-xl font-black"
            >
              {introSlide === 2 ? "Start" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER AUTH (Mobile/OTP)
  return (
    <div className="min-h-screen bg-[#DDE5F4] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Invisible Recaptcha Container */}
      <div id="recaptcha-container"></div>

      <div className="relative w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0A64BC] text-white mx-auto rounded-[1.5rem] flex items-center justify-center font-black text-2xl">F</div>
        </div>

        {authStep === "mobile" ? (
          <div className="animate-in slide-in-from-left duration-500">
            <h2 className="text-3xl font-black text-gray-800 mb-8">Sign In Your<br />Account</h2>
            <form onSubmit={handleGetOTP} className="space-y-6">
              <div className="flex bg-gray-50 border-2 rounded-2xl overflow-hidden focus-within:border-[#0A64BC]">
                <div className="bg-gray-100 px-4 py-4 font-black">+91</div>
                <input
                  type="tel" maxLength="10" placeholder="Mobile Number" required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent px-4 py-4 outline-none font-bold"
                />
              </div>
              <button 
                type="submit" 
                disabled={mobileNumber.length !== 10 || loading}
                className="w-full bg-[#0A64BC] text-white py-4.5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get OTP"}
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl font-black text-gray-800 mb-8">OTP Verify</h2>
            <form onSubmit={handleVerifyOTP} className="space-y-8">
              <div className="flex justify-center gap-2">
                {otp.map((data, index) => (
                  <input
                    className="w-12 h-14 bg-gray-50 border-2 text-center text-xl font-black rounded-xl focus:border-[#0A64BC] outline-none"
                    type="text" maxLength="1" key={index} value={data}
                    onChange={e => handleOTPChange(index, e.target.value)}
                    onKeyDown={e => handleOTPKeyDown(index, e)}
                    ref={el => otpRefs.current[index] = el}
                  />
                ))}
              </div>
              <button 
                type="submit" 
                disabled={otp.includes("") || loading}
                className="w-full bg-[#22C55E] text-white py-4.5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Submit & Verify"}
              </button>
              <div className="text-center pt-4 border-t">
                <button type="button" onClick={() => setAuthStep("mobile")} className="text-[#0A64BC] text-xs font-bold">Change Number</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}