import React, { useState, useEffect } from "react";

function Dashboard() {
  const authoritiesList = [
    "القصيم",
    "جدة",
    "تبوك",
    "المدينة المنورة",
    "الدمام",
    "جازان",
    "الاحساء",
    "الرياض",
    "الباحه",
    "الشرقية",
    "مكه",
    "الطايف",
    "حايل",
    "ابها",
    "نجران",
    "حفر الباطن"
  ];
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const genderOptions = ["ذكر", "أنثى"];

  const [newUser, setNewUser] = useState({
    authority: "القصيم",
    municipality: "",
    name: "",
    idNumber: "",
    gender: "ذكر",
    nationality: "",
    certificateNumber: "",
    profession: "",
    issueDate: "",
    expiryDate: "",
    programType: "",
    programEndDate: "",
    licenseNumber: "",
    establishmentName: "",
    establishmentNumber: "",
    image: null,
  });


  useEffect(() => {
    const today = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(today.getFullYear() + 1);

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    setNewUser(prev => ({
      ...prev,
      issueDate: formatDate(today),
      expiryDate: formatDate(oneYearLater),
      programEndDate: formatDate(oneYearLater)
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewUser(prev => ({ ...prev, image: e.target.files[0] }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  

  formData.append('authority', newUser.authority);
  formData.append('municipality', newUser.municipality);
  formData.append('name', newUser.name);
  formData.append('idNumber', newUser.idNumber);
  formData.append('gender', newUser.gender === 'ذكر' ? 'male' : 'female'); // Convert to English
  formData.append('nationality', newUser.nationality);
  formData.append('certificateNumber', newUser.certificateNumber);
  formData.append('profession', newUser.profession);
  
  formData.append('issueDate', new Date(newUser.issueDate).toISOString());
  formData.append('expiryDate', new Date(newUser.expiryDate).toISOString());
  
  formData.append('programType', newUser.programType);
  formData.append('programEndDate', new Date(newUser.programEndDate).toISOString());
  formData.append('licenseNumber', newUser.licenseNumber);
  formData.append('establishmentName', newUser.establishmentName);
  formData.append('establishmentNumber', newUser.establishmentNumber);
  
  if (newUser.image) {
    formData.append('image', newUser.image);
  }

  try {
    const response = await fetch(`${backendUrl}/api/certificates`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary
    });

    const data = await response.json();
    
    if (!response.ok) {
      // Handle validation errors from backend
      if (data.errors) {
        const errorMessages = data.errors.map(err => err.msg).join('\n');
        throw new Error(errorMessages);
      }
      throw new Error(data.message || 'Request failed with status ' + response.status);
    }

    alert('تمت الإضافة بنجاح!');
    // Reset form
    setNewUser(prev => ({
      ...prev,
      municipality: "",
      name: "",
      idNumber: "",
      nationality: "",
      certificateNumber: "",
      profession: "",
      programType: "",
      licenseNumber: "",
      establishmentName: "",
      establishmentNumber: "",
      image: null,
    }));
    
  } catch (error) {
    console.error('Submission error:', error);
    alert(`خطأ: ${error.message}`);
  }
};

  return (
    <div className="container mx-auto p-4 mt-[50px]">
      <h1 className="text-3xl font-semibold mb-6 text-right">إضافة مستخدم جديد</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الامانه Dropdown */}
          <div className="text-right">
            <label htmlFor="authority" className="block mb-2 font-medium">الامانه</label>
            <select
              name="authority"
              value={newUser.authority}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              {authoritiesList.map((authority, index) => (
                <option key={index} value={authority}>
                  {authority}
                </option>
              ))}
            </select>
          </div>

          {/* البلدية */}
          <div className="text-right">
            <label htmlFor="municipality" className="block mb-2 font-medium">البلدية</label>
            <input
              type="text"
              name="municipality"
              value={newUser.municipality}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="البلدية"
              required
            />
          </div>

          {/* الاسم */}
          <div className="text-right">
            <label htmlFor="name" className="block mb-2 font-medium">الاسم</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="الاسم"
              required
            />
          </div>

          {/* رقم الهوية */}
          <div className="text-right">
            <label htmlFor="idNumber" className="block mb-2 font-medium">رقم الهوية</label>
            <input
              type="text"
              name="idNumber"
              value={newUser.idNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رقم الهوية"
              required
            />
          </div>

          {/* الجنس */}
          <div className="text-right">
            <label htmlFor="gender" className="block mb-2 font-medium">الجنس</label>
            <select
              name="gender"
              value={newUser.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              {genderOptions.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* الجنسية */}
          <div className="text-right">
            <label htmlFor="nationality" className="block mb-2 font-medium">الجنسية</label>
            <input
              type="text"
              name="nationality"
              value={newUser.nationality}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="الجنسية"
              required
            />
          </div>

          {/* رقم الشهادة */}
          <div className="text-right">
            <label htmlFor="certificateNumber" className="block mb-2 font-medium">رقم الشهادة</label>
            <input
              type="text"
              name="certificateNumber"
              value={newUser.certificateNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رقم الشهادة"
              required
            />
          </div>

          {/* المهنة */}
          <div className="text-right">
            <label htmlFor="profession" className="block mb-2 font-medium">المهنة</label>
            <input
              type="text"
              name="profession"
              value={newUser.profession}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="المهنة"
              required
            />
          </div>

          {/* تاريخ الإصدار */}
          <div className="text-right">
            <label htmlFor="issueDate" className="block mb-2 font-medium">تاريخ الإصدار</label>
            <input
              type="date"
              name="issueDate"
              value={newUser.issueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* تاريخ الانتهاء */}
          <div className="text-right">
            <label htmlFor="expiryDate" className="block mb-2 font-medium">تاريخ الانتهاء</label>
            <input
              type="date"
              name="expiryDate"
              value={newUser.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* نوع البرنامج */}
          <div className="text-right">
            <label htmlFor="programType" className="block mb-2 font-medium">نوع البرنامج</label>
            <input
              type="text"
              name="programType"
              value={newUser.programType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="نوع البرنامج"
              required
            />
          </div>

          {/* تاريخ انتهاء البرنامج */}
          <div className="text-right">
            <label htmlFor="programEndDate" className="block mb-2 font-medium">تاريخ انتهاء البرنامج</label>
            <input
              type="date"
              name="programEndDate"
              value={newUser.programEndDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* رقم الرخصة */}
          <div className="text-right">
            <label htmlFor="licenseNumber" className="block mb-2 font-medium">رقم الرخصة</label>
            <input
              type="text"
              name="licenseNumber"
              value={newUser.licenseNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رقم الرخصة"
              required
            />
          </div>

          {/* اسم المنشأة */}
          <div className="text-right">
            <label htmlFor="establishmentName" className="block mb-2 font-medium">اسم المنشأة</label>
            <input
              type="text"
              name="establishmentName"
              value={newUser.establishmentName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="اسم المنشأة"
              required
            />
          </div>

          {/* رقم المنشأة */}
          <div className="text-right">
            <label htmlFor="establishmentNumber" className="block mb-2 font-medium">رقم المنشأة</label>
            <input
              type="text"
              name="establishmentNumber"
              value={newUser.establishmentNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="رقم المنشأة"
              required
            />
          </div>

          {/* حقل الصورة */}
          <div className="text-right md:col-span-2">
            <label htmlFor="image" className="block mb-2 font-medium">الصورة</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            إضافة المستخدم
          </button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;