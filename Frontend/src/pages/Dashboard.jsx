import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import URLForm from '../components/URLForm';
import URLCard from '../components/UrlCard';
import AnalyticsCard from '../components/AnalyticsCard';
import AIInsight from '../components/AIInsight';
import UpsellModal from '../components/UpsellModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ urls: [], stats: {} });
  const [showModal, setShowModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({}); // For AI

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/dashboard');
      setData(res.data);
      // Prep AI data
      setAnalyticsData({
        totalClicks: res.data.stats.totalClicks,
        topUrls: res.data.urls.slice(0,3).map(u => ({ id: u.shortId, clicks: u.clicks.length })),
      });
      if (user.role === 'free' && user.urlCount >= 5) setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShortenSuccess = () => {
    fetchData(); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.email}! Role: <span className={`px-2 py-1 rounded-full text-sm ${user.role === 'pro' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{user.role}</span></p>
        </div>

        <URLForm onSuccess={handleShortenSuccess} />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your URLs</h2>
            {data.urls.length === 0 ? (
              <p className="text-gray-500">No URLs yet—shorten one above!</p>
            ) : (
              <div className="grid gap-4">
                {data.urls.map((url) => (
                  <URLCard key={url._id} url={url} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <AnalyticsCard stats={data.stats} analytics={data.urls} />
            <AIInsight analyticsData={analyticsData} />
          </div>
        </div>
      </div>
      <UpsellModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}