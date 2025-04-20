import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment-hijri';

const CertificateDetail = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const convertToHijri = (dateString) => {
    try {
      return moment(dateString).format('iYYYY/iMM/iDD');
    } catch {
      return 'N/A';
    }
  };

  const mapCertificateFields = (dbData) => {
    const issueDate = dbData.issueDate ? new Date(dbData.issueDate) : null;
    const expiryDate = dbData.expiryDate ? new Date(dbData.expiryDate) : null;
    const programEndDate = dbData.programEndDate ? new Date(dbData.programEndDate) : null;

    const mapped = {
      name: dbData.name,
      gender: dbData.gender === 'male' ? 'ذكر' : 'أنثى',
      nationality: dbData.nationality || 'N/A',
      city: dbData.municipality || 'N/A',
      region: dbData.authority || 'N/A',
      identityNumber: dbData.idNumber || 'N/A',
      job: dbData.profession || 'N/A',
      certificateNumber: dbData.certificateNumber || 'N/A',
      issuedDateGregorian: issueDate ? issueDate.toLocaleDateString('en-GB') : 'N/A',
      issuedDateHijri: issueDate ? convertToHijri(issueDate) : 'N/A',
      expiryDateGregorian: expiryDate ? expiryDate.toLocaleDateString('en-GB') : 'N/A',
      expiryDateHijri: expiryDate ? convertToHijri(expiryDate) : 'N/A',
      programType: dbData.programType || 'N/A',
      trainingEndDateHijri: programEndDate ? convertToHijri(programEndDate) : 'N/A',
      licenseNumber: dbData.licenseNumber || 'N/A',
      organizationName: dbData.establishmentName || 'N/A',
      organizationNumber: dbData.establishmentNumber || 'N/A',
      image: dbData.image || null,
    };

    const mappedFields = [
      { id: 1, label: "الأمانة", value: mapped.region },
      { id: 2, label: "البلدية", value: mapped.city },
      { id: 3, label: "الاسم", value: mapped.name },
      { id: 4, label: "رقم الهوية", value: mapped.identityNumber },
      { id: 5, label: "الجنس", value: mapped.gender },
      { id: 6, label: "الجنسية", value: mapped.nationality },
      { id: 7, label: "رقم الشهادة الصحية", value: mapped.certificateNumber },
      { id: 8, label: "المهنة", value: mapped.job },
      { id: 9, label: "تاريخ إصدار الشهادة الصحية ميلادي", value: mapped.issuedDateGregorian },
      { id: 10, label: "تاريخ إصدار الشهادة الصحية هجري", value: mapped.issuedDateHijri },
      { id: 11, label: "تاريخ نهاية الشهادة الصحية ميلادي", value: mapped.expiryDateGregorian },
      { id: 12, label: "تاريخ نهاية الشهادة الصحية هجري", value: mapped.expiryDateHijri },
      { id: 13, label: "تاريخ انتهاء البرنامج التدريبي", value: mapped.trainingEndDateHijri },
      { id: 14, label: "نوع البرنامج التدريبي", value: mapped.programType },
      { id: 15, label: "اسم المنشأة", value: mapped.organizationName },
      { id: 16, label: "رقم الرخصة", value: mapped.licenseNumber },
      { id: 17, label: "رقم المنشأة", value: mapped.organizationNumber },
    ];

    return { mapped, mappedFields };
  };

  useEffect(() => {
    const fetchCertificateDetail = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/certificates/${id}`);
        if (!response.ok) {
          throw new Error('فشل تحميل الشهادة');
        }
        const data = await response.json();
        const { mapped, mappedFields } = mapCertificateFields(data.data || data);
        setCertificate(mapped);
        setFields(mappedFields);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateDetail();
  }, [id]);
  const handleColor = (id) => {
    setSelectedId((prev) => (prev === id ? null : id)); 
  };
const Field = ({ label, value, onClick, selected }) => (
  <div onClick={onClick} className="relative w-full cursor-pointer">
    <div className={`p-[3px] ${selected ? 'bg-[#b6dcdb] rounded-sm' : 'bg-transparent'}`}>
      <div
        className={`
          w-full px-[14px] py-[10px] bg-gray-200 border-[2px] rounded-sm
          ${selected ? 'border-[#007b7a]' : 'border-gray-300'} 
          transition-all
        `}
      >
        <label className="block text-sm absolute bg-white h-5 right-3 top-[-11px] font-semibold">
          {label}
        </label>
        <div className="w-full py-[5px] min-h-[2.5rem] text-gray-500">
          {value}
        </div>
      </div>
    </div>
  </div>
);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">خطأ: {error}</div>;
  }

  if (!certificate) {
    return <div className="container mx-auto p-6">لم يتم العثور على الشهادة.</div>;
  }

  return (
    <div className="w-full  bg-gray-100   min-h-screen  flex justify-center mt-[40px]  min-[768px]:py-[50px]  min[786px]:px-[50px]">
      <div className="min-h-screen     w-full pb-[50px]     min-[700px]:w-3/4 ">
        <div className="bg-white  bg-white-600 shadow  pb-[80px] md: rounded-lg    overflow-hidden">
          <h2 className="text-3xl font-bold  text-center max-[320px]:mx-auto   m-[20px] text-black/70 max-[320px]:w-[240px]  max-[596px]:block max-[768px]:hidden ">الشهادة الصحية الموحدة</h2>
          <div className="flex justify-center p-4">
            {certificate.image && !imageError ? (
              <img
                src={`${backendUrl}${certificate.image}`}
                alt="الصورة الشخصية"
                className="h-[180px] w-[130px] m-[20px]"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-gray-500 p-8 text-center">لا توجد صورة</div>
            )}
          </div>

          <div dir="rtl" className="grid max-[763px]:grid-cols-1    min-[900px]:grid-cols-2    gap-x-6 gap-y-4 px-[20px]">
            {fields.map((field) => (
              <Field
                key={field.id}
                label={field.label}
                value={field.value}
                onClick={() => handleColor(field.id)}
                selected={selectedId === field.id}

              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
