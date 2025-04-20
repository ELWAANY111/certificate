import styles from './CertificatePage.module.css'; // Changed import
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { Formik, Field, Form } from 'formik';
import moment from 'moment-hijri';

const CertificatePage = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getLogoForAuthority = (authority) => {
    switch (authority) {
      case 'القصيم':
        return '/شعار أمانة منطقة القصيم – SVG.svg';
      case 'جدة':
        return '/شعار أمانة جدة  – SVG.svg';
      case 'تبوك':
        return '/شعار أمانة منطقة تبوك – SVG.svg';
      case 'المدينة المنورة':
        return '/madena.svg';
      case 'الدمام':
        return '/أمانة_المنطقة_الشرقية.png';
      case 'جازان':
        return '/شعار أمانة منطقة جازان – SVG.svg';
      case 'الاحساء':
        return '/شعار أمانة الأحساء بدقة عالية png – svg (1).svg';
      case 'الرياض':
        return '/شعار أمانة الرياض بدقة عالية png – svg.svg';
      case 'الباحه':
        return '/شعار أمانة الباحة – SVG.svg';
      case 'الشرقية':
        return '/شعار أمانة المنطقة الشرقية بدقة عالية svg – png.svg';
      case 'مكه':
        return '/شعار أمانة مكة المكرمة – SVG.svg';
      case 'الطايف':
        return '/الطائف-.jpeg';
      case 'حايل':
        return '/حائل-.jpeg';
      case 'ابها':
        return '/ابها-عسير.jpeg';
      case 'نجران':
        return '/نجران-.jpeg';
      case 'حفر الباطن':
        return '/شعار_أمانة_محافظة_حفر_الباطن.png';
      default:
        return '/';
    }
  };

  const formatHijriDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const m = moment(new Date(dateString));
      return `${m.iYear()}/${String(m.iMonth() + 1).padStart(2, '0')}/${String(m.iDate()).padStart(2, '0')}`;
    } catch {
      return 'N/A';
    }
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/certificates/${id}`);
        if (!response.ok) throw new Error('Certificate not found');
        const data = await response.json();
        setCertificate(data.data || data);

        const verificationUrl = `${window.location.origin}/certificate/${id}`;
        const qrData = await QRCode.toDataURL(verificationUrl, {
          width: 200,
          margin: 2,
          color: { dark: '#2c3e50', light: '#ffffff' }
        });
        setQrCode(qrData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
      <p>Loading certificate data...</p>
    </div>
  );

  if (error) return (
    <div className={styles['error-container']}>
      <h2>Error Loading Certificate</h2>
      <p>{error}</p>
      <p>Please try again later or contact support.</p>
    </div>
  );

  if (!certificate) return (
    <div className={styles['not-found-container']}>
      <h2>Certificate Not Found</h2>
      <p>The requested certificate could not be found.</p>
    </div>
  );

  return (
    <div className={styles.cert}>
      <div className={styles['certificate-container']}>
        <button onClick={() => window.print()} className={styles['print-button']}>
          طباعة
        </button>

        <div className={styles['clear-float']}></div>

        <div className={styles['header-container']}>
          <div className={styles['logo-group']}>
            <img src="/c6d17091-bf2b-45e2-9fac-671389252d6b.png" className={styles.logo} />
            <img src="/2e1b29f1-aea9-4ed7-94da-913325bcff77.png" className={styles.logo} id={styles.logoo}/>
            <img
              src={getLogoForAuthority(certificate.authority)}
              className={styles['authority-logo']}
              alt="Authority Logo"
            />
          </div>
          <h1 className={styles['certificate-title']}>الشهاده الصحيه الموحدة</h1>
        </div>

        <div className={styles['content-container']}>
          <div className={styles['form-container']}>
            <h1 className={styles['certificate-name']}> الاسم {certificate.name}</h1>
            <Formik initialValues={certificate}>
              <Form className={styles['form-grid']}>
                <div className={styles['form-field']}>
                  <label>رقم الهوية</label>
                  <Field name="idNumber" disabled className={styles['form-input']} />
                </div>
                <div className={styles['form-field']}>
                  <label>الجنسية</label>
                  <Field name="nationality" disabled className={styles['form-input']} />
                </div>
                <div className={styles['form-field']}>
                  <label>رقم الشهادة الصحية</label>
                  <Field name="certificateNumber" disabled className={styles['form-input']} />
                </div>
                
                <div className={styles['form-field']}>
                  <label>المهنة</label>
                  <Field name="profession" disabled className={styles['form-input']} />
                </div>
                
                <div className={styles['form-field']}>
                  <label>تاريخ اصدار الشهاده الصحيه</label>
                  <div className={styles['form-input']}>{formatHijriDate(certificate.issueDate)}</div>
                </div>
                
                <div className={styles['form-field']}>
                  <label>تاريخ نهايه الشهاده الصحيه</label>
                  <div className={styles['form-input']}>{formatHijriDate(certificate.expiryDate)}</div>
                </div>

                <div className={styles['form-field']}>
                  <label>نوع البرنامج التثقيفي</label>
                  <Field name="programType" disabled className={styles['form-input']} />
                </div>        
                
                <div className={styles['form-field']}>
                  <label>تاريخ انتهاء البرنامج التثقيفي</label>
                  <div className={styles['form-input']}>{formatHijriDate(certificate.programEndDate)}</div>
                </div>
              </Form>
            </Formik>
          </div>

          <div className={styles['right-column']}>
            {certificate.imageUrl && (
              <div className={styles['image-wrapper']}>
                <img 
                  src={certificate.imageUrl} 
                  alt="Certificate" 
                  className={styles['certificate-image']}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className={styles['qr-wrapper']}>
              {qrCode && (
                <a
                  href={`${window.location.origin}/certificate/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={qrCode} alt="QR Code" className={styles['qr-image']} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <footer>
          <img src='/rzftbayb.i3r.png'/>
        </footer>
      </div>
     
      <div className={styles['footer-page']}>
        <img src='/iusau5ib.bna.png' />
      </div>
    </div>
  );
};

export default CertificatePage;