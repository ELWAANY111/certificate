import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CertificatesList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/certificates`);
      if (!response.ok) throw new Error('Failed to fetch certificates');
      const data = await response.json();
      
      setCertificates(data.map(cert => ({
        ...cert,
        // Use a local fallback image instead of external URL
        imageUrl: cert.image ? `${backendUrl}${cert.image}` : null
      })));
    } catch (err) {
      setError(err.message);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const filteredCertificates = certificates.filter(cert => {
    if (!cert) return false;
    const term = searchTerm.toLowerCase();
    return (
      (cert.name?.toLowerCase()?.includes(term)) ||
      (cert.idNumber?.toString()?.includes(searchTerm)) ||
      (cert.certificateNumber?.toString()?.includes(searchTerm))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Certificates List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search certificates..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          {searchTerm ? (
            <p>No certificates match your search criteria.</p>
          ) : (
            <p>No certificates found.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Section with proper error handling */}
              <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={`${cert?.name || 'Certificate'} image`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = '/image-placeholder.png'; // Local fallback
                      e.target.className = 'w-full h-full object-contain p-4';
                    }}
                  />
                ) : (
                  <div className="text-gray-500 p-4 text-center">
                    No Image Available
                  </div>
                )}
              </div>
              
              {/* Certificate Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {cert.name || 'Unnamed Certificate'}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {cert.authority || 'Unknown Authority'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <DetailField label="ID Number" value={cert.idNumber} />
                  <DetailField label="Certificate #" value={cert.certificateNumber} />
                  <DetailField label="Gender" value={cert.gender} />
                  <DetailField label="Nationality" value={cert.nationality} />
                  <DetailField label="Profession" value={cert.profession} />
                  <DetailField label="Municipality" value={cert.municipality} />
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                  <div className="flex justify-between">
                    <DetailField 
                      label="Issued" 
                      value={cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'} 
                    />
                    <DetailField 
                      label="Expires" 
                      value={cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : 'N/A'} 
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/certificate/${cert._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/certificate/save/${cert._id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors text-sm"
                  >
                    Save PDF
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable component for certificate details
const DetailField = ({ label, value }) => (
  <div className="truncate">
    <p className="text-gray-500 font-medium">{label}</p>
    <p className="truncate" title={String(value)}>{value || 'N/A'}</p>
  </div>
);

export default CertificatesList;