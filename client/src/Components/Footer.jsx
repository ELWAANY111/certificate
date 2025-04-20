// Footer.jsx
import React from 'react';
import { FaPhoneAlt, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Footer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
   <footer className="flex flex-col min-[751px]:flex-row   w-full h-[90%]  items-center min-[751px]:justify-between   mt-[17px] text-[0.6rem]">
 <div className=' flex max-[751px]:flex-col  items-center     min-[751px]:flex-row   min-[751px]:items-center  '>
  <img src='jl1sk4vt.k2d.png'className='w-[80px]' />

<div>© 2025 وزارة البلديات والإسكان</div>
 </div> 
<h1 className='m-[20px] '> <span>اتصل بنا</span>
<span  className='m-[20px]'>شروط الاستخدام</span>
<span className='m-[20px]'>خريطة الموقع</span>
</h1>
 </footer>
  );
};

export default Footer;
