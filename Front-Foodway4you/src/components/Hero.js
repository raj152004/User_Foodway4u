import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-600px flex items-center justify-center overflow-hidden">
    
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Partner With Foodway and Boost Your Sales
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
          Only one of each type per 5 km radius. Secure your exclusive spot today!
        </p>
        <Link href="/register">
          <button className="bg-[#0A64BC] hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-2xl transform hover:scale-105">
            Register Now
          </button>
        </Link>
      </div>
    </section>
  );
}