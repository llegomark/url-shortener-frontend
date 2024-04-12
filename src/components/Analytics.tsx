import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';

interface AnalyticsDashboardProps {}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = () => {
  const [apiKey, setApiKey] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await getAnalytics(shortCode, apiKey);
      setClickCount(data.clickCount);
    } catch (error) {
      setError('Error fetching analytics. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-md sm:mx-0">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Analytics Dashboard
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="shortCode" className="block text-gray-700 font-bold mb-2">
              Short Code
            </label>
            <input
              type="text"
              name="shortCode"
              id="shortCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter short code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
            />
          </div>
          {!import.meta.env.VITE_API_KEY && (
            <div className="mb-6">
              <label htmlFor="apiKey" className="block text-gray-700 font-bold mb-2">
                API Key
              </label>
              <input
                type="password"
                name="apiKey"
                id="apiKey"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Get Analytics'}
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {clickCount > 0 && (
          <div className="mt-8">
            <p className="text-xl font-bold text-center">
              Total Clicks: <span className="text-indigo-600">{clickCount}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;