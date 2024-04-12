import React, { useState, useEffect } from 'react';
import { shortenUrl, updateUrl, deleteUrl } from '../services/api';

interface UrlShortenerFormProps {}

const UrlShortenerForm: React.FC<UrlShortenerFormProps> = () => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      const data = await shortenUrl(url, apiKey);
      setShortUrl(data.shortUrl);
      setShortCode(data.shortUrl.split('/').pop() || '');
      localStorage.setItem('apiKey', apiKey);
    } catch (error) {
      setError('Error generating short URL. Please try again.');
    }

    setLoading(false);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError('');

    try {
      await updateUrl(shortCode, url, apiKey);
      setShortUrl(`https://m.llego.dev/${shortCode}`);
    } catch (error) {
      setError('Error updating URL. Please try again.');
    }

    setIsUpdating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');

    try {
      await deleteUrl(shortCode, apiKey);
      setShortUrl('');
      setShortCode('');
      setUrl('');
    } catch (error) {
      setError('Error deleting URL. Please try again.');
    }

    setIsDeleting(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-md sm:mx-0">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
              URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              disabled={loading || isUpdating || isDeleting}
            >
              {loading ? 'Generating...' : 'Generate Short URL'}
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {shortUrl && (
          <div className="mt-8">
            <label htmlFor="shortUrl" className="block text-gray-700 font-bold mb-2">
              Short URL
            </label>
            <div className="flex">
              <input
                type="url"
                name="shortUrl"
                id="shortUrl"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md bg-white focus:outline-none"
                value={shortUrl}
                readOnly
              />
              <button
                type="button"
                className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline transition duration-300 ${
                  copied ? 'bg-green-500 hover:bg-green-600' : ''
                }`}
                onClick={copyToClipboard}
                disabled={loading || isUpdating || isDeleting}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 mr-2"
                onClick={handleUpdate}
                disabled={loading || isUpdating || isDeleting || copied}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                onClick={handleDelete}
                disabled={loading || isUpdating || isDeleting || copied}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;