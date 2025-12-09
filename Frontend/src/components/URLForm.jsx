import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '../utils/api';
import { Loader2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function URLForm({ onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/url/shorten', { url: data.originalUrl });
      setResult(res.data);
      onSuccess?.(res.data);
      reset();
    } catch (err) {
      alert(err.response?.data?.error || 'Error shortening URL'); 
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('originalUrl', { required: 'URL is required' })}
          type="url"
          placeholder="Paste a long URL here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.originalUrl && <p className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</p>}
      </div>
      {user?.role === 'free' && user.urlCount >= 5 && (
        <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800">
          Free limit reached! <a href="#" className="underline">Upgrade to Pro</a> for unlimited.
        </div>
      )}
      <button
        type="submit"
        disabled={loading || (user?.role === 'free' && user.urlCount >= 5)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Check className="h-5 w-5 mr-2" />}
        Shorten URL
      </button>
      {result && (
        <div className="bg-green-100 p-3 rounded-lg">
          <p>Your short URL: <a href={result.shortUrl} className="font-mono text-blue-600">{result.shortUrl}</a></p>
          <button onClick={() => setResult(null)} className="text-sm text-green-700 underline">Dismiss</button>
        </div>
      )}
    </form>
  );
}