import { useState } from 'react';
import { api } from '../utils/api';
import { Brain, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AIInsight({ analyticsData }) { 
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getInsight = async () => {
    if (user.role !== 'pro') return alert('Pro feature only!');
    setLoading(true);
    try {
      const res = await api.post('/ai/summary', { data: analyticsData });
      setInsight(res.data.insight);
    } catch (err) {
      setInsight('AI unavailable—check back soon!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-purple-600" /> AI-Powered Insights
      </h3>
      {user.role !== 'pro' ? (
        <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span>Upgrade to Pro for smart traffic summaries!</span>
        </div>
      ) : (
        <>
          <button
            onClick={getInsight}
            disabled={loading}
            className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center"
          >
            {loading ? 'Generating...' : 'Get AI Summary'}
            <Brain className="h-4 w-4 ml-2" />
          </button>
          {insight && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="text-gray-800 italic">"{insight}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}