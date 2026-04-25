export default function Features() {
  const steps = [
    { title: "Register", desc: "Sign up your restaurant with basic details. [cite: 50]" },
    { title: "Exclusivity", desc: "Get exclusive access in your 5 km area. [cite: 51]" },
    { title: "Manage", desc: "Use your dedicated dashboard to control orders. [cite: 52]" },
    { title: "Grow", desc: "Watch your sales grow with zero local platform competition. [cite: 53]" }
  ];

  const benefits = [
    "Weekly Payouts [cite: 56]",
    "Dedicated Dashboard [cite: 57]",
    "Sales Analytics [cite: 58]",
    "Area Exclusivity [cite: 59]",
    "Free Menu Customization [cite: 60]"
  ];

  return (
    <div className="space-y-24">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-blue-100 text-[#0A64BC] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:bg-[#0A64BC] group-hover:text-white transition-colors">
                {i + 1}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-12 rounded-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Partner Benefits</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3">
              <span className="text-[#0A64BC] font-bold">✓</span>
              <span className="font-medium text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}