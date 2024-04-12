interface ShortUrlResponse {
    shortUrl: string;
    url: string;
  }
  
  interface ErrorResponse {
    error: string;
  }
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DEFAULT_API_KEY = import.meta.env.VITE_API_KEY;
  
  export const shortenUrl = async (url: string, apiKey: string): Promise<ShortUrlResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey || DEFAULT_API_KEY}`,
        },
        body: JSON.stringify({ url }),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to generate short URL');
      }
  
      const data: ShortUrlResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Network error: ' + error.message);
      }
      throw error;
    }
  };
  
  export const updateUrl = async (shortCode: string, url: string, apiKey: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/urls/${shortCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey || DEFAULT_API_KEY}`,
        },
        body: JSON.stringify({ url }),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to update URL');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Network error: ' + error.message);
      }
      throw error;
    }
  };
  
  export const deleteUrl = async (shortCode: string, apiKey: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/urls/${shortCode}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiKey || DEFAULT_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to delete URL');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Network error: ' + error.message);
      }
      throw error;
    }
  };
  
  export const getAnalytics = async (shortCode: string, apiKey: string): Promise<{ shortCode: string; clickCount: number }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/${shortCode}`, {
        headers: {
          Authorization: `Bearer ${apiKey || DEFAULT_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to get analytics');
      }
  
      const data: { shortCode: string; clickCount: number } = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Network error: ' + error.message);
      }
      throw error;
    }
  };