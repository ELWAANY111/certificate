import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import CertificatePage from './Components/CertificatePage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Certificates from './Components/CertificatesList';
import CertificateDetail from './Components/CertificateDetail';
import './App.css';

function LayoutWrapper() {
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const hideHeaderFooterPaths = ['/certificate/save'];
  const shouldHideHeaderFooter = hideHeaderFooterPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      {!shouldHideHeaderFooter && (
        <Header onHeightChange={setHeaderHeight} />
      )}

      <main
        className="flex-grow w-full"
        style={{
          marginTop: shouldHideHeaderFooter ? 0 : `${headerHeight}px`,
        }}
      >
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/certificate/save/:id" element={<CertificatePage />} />
          <Route path="/certificate/:id" element={<CertificateDetail />} />
        </Routes>
      </main>

      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;