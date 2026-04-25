import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    {
      question: "How does the 5 km exclusivity work?",
      answer: "We allow only one Veg, one Non-Veg, and one Fast Food restaurant within a 5 km radius to ensure maximum visibility and minimal competition for you[cite: 22, 28]."
    },
    {
      question: "When do I receive my payouts?",
      answer: "Payouts are processed weekly. You can track your gross sales and net payable amounts in the 'Payments' tab of your dashboard[cite: 56, 288]."
    },
    {
      question: "What documents are required for registration?",
      answer: "You will need a valid GST number, FSSAI certificate, Aadhaar Card, and PAN Card[cite: 85, 86, 88, 89]."
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">How can we help you today?</h1>
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for articles or topics..." 
              className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#0A64BC] outline-none"
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-[#0A64BC]">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Track Your Queries</h2>
            <Link href="/login" className="text-[#0A64BC] font-semibold hover:underline">
              View All Tickets →
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr>
                  <td className="px-6 py-4 font-mono">#FW-8821</td>
                  <td className="px-6 py-4">Menu update request</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Resolved</span>
                  </td>
                  <td className="px-6 py-4">2026-03-20</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">#FW-8944</td>
                  <td className="px-6 py-4">Payment delay inquiry</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">In Progress</span>
                  </td>
                  <td className="px-6 py-4">2026-03-23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-16 text-center">
        <h3 className="text-xl font-bold mb-4">Still need help?</h3>
        <p className="text-gray-600 mb-8">Our support team is available via Email and WhatsApp.</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-[#0A64BC] text-white px-6 py-2 rounded-md font-bold">Email Support</button>
          <button className="border border-[#0A64BC] text-[#0A64BC] px-6 py-2 rounded-md font-bold">Contact via WhatsApp</button>
        </div>
      </section>
    </div>
  );
}