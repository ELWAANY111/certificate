import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const CertificateCard = ({ certificate }) => {
  const [copied, setCopied] = useState(false);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!certificate) return <div className="text-center py-8">جارٍ تحميل بيانات الشهادة...</div>;

  const shareUrl = `${window.location.origin}/certificates/${certificate.certificateId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-right" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center mb-4">الشهادة الصحية الموحدة</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-bold text-gray-600">الاسم:</span>
            <span>{certificate.name || 'غير متوفر'}</span>
          </div>
     
        </div>
      </div>


      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-center">
          <QRCodeSVG 
            value={shareUrl} 
            size={100}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          يمكن مسح الكود الضوئي لعرض الشهادة على أي جهاز
        </p>
      </div>
    </div>
  );
};

export default CertificateCard;