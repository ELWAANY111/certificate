import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CertificatesList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/certificates`);
      if (!response.ok) throw new Error('فشل في جلب الشهادات');
      
      const data = await response.json();
      console.log("API Data:", data);

      const certsArray = Array.isArray(data) 
        ? data 
        : (data?.data && Array.isArray(data.data)) 
          ? data.data 
          : [];

      setCertificates(
        certsArray.map(cert => ({
          ...cert,
          imageUrl: cert.image 
            ? `${backendUrl}${cert.image.startsWith('/') ? '' : '/'}${cert.image}`
            : null
        }))
      );
    } catch (err) {
      setError(err.message);
      toast.error('فشل في تحميل الشهادات');
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const filteredCertificates = certificates.filter(cert => {
    const term = searchTerm.toLowerCase();
    return (
      cert?.name?.toLowerCase().includes(term) ||
      cert?.idNumber?.toString().includes(searchTerm) ||
      cert?.certificateNumber?.toString().includes(searchTerm)
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
      <div className="container mx-auto p-6 text-red-600 text-right" dir="rtl">
        خطأ: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-[40px]" dir="rtl">
      <div className="flex flex-col max-[768px]:gap-4 max-[768px]:mb-6 mb-6">
        <div className="flex flex-col max-[768px]:w-full max-[768px]:items-end w-full items-center justify-between max-[768px]:gap-4">
          <h2 className="text-2xl font-bold">قائمة الشهادات</h2>
          <div className="relative w-full max-[768px]:w-full">
            <input
              type="text"
              placeholder="البحث عن الشهادات..."
              className="pr-10 pl-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        
          </div>
        </div>
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          {searchTerm ? (
            <p>لا توجد شهادات تطابق معايير البحث الخاصة بك.</p>
          ) : (
            <p>لم يتم العثور على شهادات.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 min-[1024px]:grid-cols-3 max-[768px]:grid-cols-1 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={`صورة ${cert.name || 'شهادة غير محددة'}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-gray-500 p-4 text-center">
                    لا توجد صورة متاحة
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {cert.name || 'شهادة غير محددة'}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {cert.authority || 'سلطة غير معروفة'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <DetailField label="رقم الهوية" value={cert.idNumber} />
                  <DetailField label="رقم الشهادة" value={cert.certificateNumber} />
                  <DetailField label="الجنس" value={arabizeGender(cert.gender)} />
                  <DetailField label="الجنسية" value={cert.nationality} />
                  <DetailField label="المهنة" value={cert.profession} />
                  <DetailField label="البلدية" value={cert.municipality} />
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                  <div className="flex justify-between">
                    <DetailField 
                      label="تاريخ الإصدار" 
                      value={cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('ar-SA') : 'غير متوفر'} 
                    />
                    <DetailField 
                      label="تاريخ الانتهاء" 
                      value={cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString('ar-SA') : 'غير متوفر'} 
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/certificate/${cert._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors text-sm"
                  >
                    عرض التفاصيل
                  </Link>
                  <Link
                    to={`/certificate/save/${cert._id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors text-sm"
                  >
                    حفظ PDF
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

// Helper function to translate gender
const arabizeGender = (gender) => {
  if (!gender) return 'غير محدد';
  const genderLower = gender.toLowerCase();
  if (genderLower === 'male') return 'ذكر';
  if (genderLower === 'female') return 'أنثى';
  return gender;
};

const DetailField = ({ label, value }) => (
  <div className="truncate text-right">
    <p className="text-gray-500 font-medium">{label}</p>
    <p className="truncate" title={String(value)}>{value || 'غير متوفر'}</p>
  </div>
);

export default CertificatesList;