"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    
    if (isLoggedIn === "true") {
      router.push('/restaurants');
    } else {
      router.push('/login/user');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#0A64BC] border-opacity-50"></div>
        <p className="text-sm font-bold text-gray-400 animate-pulse uppercase tracking-widest">
          Redirecting to Foodway...
        </p>
      </div>
    </div>
  );
}