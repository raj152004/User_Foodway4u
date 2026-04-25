import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-[#0A64BC] mb-4">Foodway-partner [cite: 65]</h3>
          <p className="text-gray-600 max-w-sm">
            Empowering local restaurants with digital tools and area exclusivity. Claim your zone today.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/help" className="hover:text-[#0A64BC]">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-[#0A64BC]">Contact Us [cite: 66]</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="#" className="hover:text-[#0A64BC]">Terms and Conditions [cite: 68]</Link></li>
            <li><Link href="#" className="hover:text-[#0A64BC]">Privacy Policy [cite: 68]</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-gray-100 text-xs text-gray-400">
        © 2026 Foodway-partner Platform. All rights reserved. [cite: 65]
      </div>
    </footer>
  );
}