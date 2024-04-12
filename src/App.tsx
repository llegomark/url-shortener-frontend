import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/analytics" element={<AnalyticsDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;