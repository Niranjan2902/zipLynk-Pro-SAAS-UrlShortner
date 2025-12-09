const PricingCard = ({ title, features, price, isPro }) => (
  <div className={`p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:scale-105 ${
    isPro ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white' // Pro gets accent color
  }`}>
    <h3 className="text-3xl font-bold mb-6 text-gray-800">{title}</h3>
    <ul className="space-y-3 mb-8 text-gray-600">
      {features.map((f, i) => (
        <li key={i} className="flex items-center"> 
          <span className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></span> 
          {f}
        </li>
      ))}
    </ul>
    <div className="text-3xl font-bold text-blue-600 mb-6">{price}</div>
    {!isPro && (
      <button className="w-full bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors">
        Coming Soon 
      </button>
    )}
  </div>
);

export default PricingCard;