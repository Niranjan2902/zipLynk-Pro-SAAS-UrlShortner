import { X } from 'lucide-react';

export default function UpsellModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Unlock Pro Features</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="space-y-2 mb-4 text-gray-700">
          <li className="flex items-center"><span className="mr-2">✅</span> Unlimited URLs</li>
          <li className="flex items-center"><span className="mr-2">✅</span> AI Analytics</li>
          <li className="flex items-center"><span className="mr-2">✅</span> Custom QR Codes</li>
        </ul>
        <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700">
          Upgrade Now (Coming Soon)
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">Simulated—add Stripe later!</p>
      </div>
    </div>
  );
}