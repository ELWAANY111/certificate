const header = [
  {
    mainheader: "عن بلدي",
    links: [
      {
        mainhead: "من نحن",
        subhead: [
          { label: "من نحن", url: "https://balady.gov.sa/ar/about-balady" },
          { label: "الهيكل التنظيمي", url: "https://balady.gov.sa/ar/node/11036" },
          { label: "الهيكل الإستراتيجي للوزارة", url: "https://balady.gov.sa/ar/node/11038" },
          { label: "السياسات والاستراتيجيات", url: "https://balady.gov.sa/ar/node/11014" },
          { label: "أهداف التنمية المستدامة", url: "https://balady.gov.sa/ar/node/11004" },
          { label: "الشركاء", url: "https://balady.gov.sa/ar/partners" },
          { label: "الوظائف", url: "https://app.baladiy.qve-se.com/Eservice/HeathIssue/PrintedLicens?uuid=55f9d2c1-0bf7-4fac-92fa-d055bdbe7232" },
          { label: "تواصل معنا", url: "https://balady.gov.sa/ar/node/10982" }
        ]
      },
      {
        mainhead: "المشاركة الإلكترونية",
        subhead: [
          { label: "الاستشارات", url: "https://balady.gov.sa/ar/e_participation/11190" },
          { label: "البيانات المفتوحة", url: "https://balady.gov.sa/ar/node/11050" },
          { label: "التغذية الراجعة", url: "https://balady.gov.sa/ar/e_participation/feedback" },
          { label: "التطوير المشترك والأفكار", url: "https://balady.gov.sa/ar/e_participation/development-and-ideas" },
          { label: "وسائل التواصل الاجتماعي", url: "https://balady.gov.sa/ar/e_participation/11022" }
        ]
      },
      {
        mainhead: "الأخبار والفعاليات",
        subhead: [
          { label: "الأخبار", url: "https://balady.gov.sa/ar/news" },
          { label: "الفعاليات", url: "https://balady.gov.sa/ar/events-list" }
        ]
      },
      {
        mainhead: "المناقصات والميزانية",
        subhead: [
          { label: "المناقصات والمشتريات", url: "https://balady.gov.sa/ar/node/10981" }
        ]
      }
    ]
  },
  {
    mainheader: "مركز المعرفة",
    links: [
      {
        mainhead: "مبادرات وشراكات",
        subhead: [
          { label: "المبادرات", url: "https://balady.gov.sa/ar/initiatives" },
          { label: "الشراكات", url: "https://balady.gov.sa/ar/partners" },
          { label: "منصة استطلاع", url: "https://istitlaa.ncc.gov.sa/ar/Municipality/momra/Pages/default.aspx" },
          { label: "منصة تفاعل", url: "https://eparticipation.my.gov.sa/e-consultations/consultations/?title=&status=&type=&beneficiary=&sector=" }
        ]
      },
      {
        mainhead: "بيانات وإحصائيات",
        subhead: [
          { label: "البيانات المفتوحة", url: "https://balady.gov.sa/ar/prints" },
          { label: "إحصائيات ومؤشرات المنصة", url: "https://balady.gov.sa/ar/e_participation/feedback/11180" }
        ]
      }
    ]
  },
  {
    mainheader: "الخدمات",
    links: [
      {
        mainhead: "الصفات الشخصية",
        subhead: [
          { label: "إدارة الطلبات", url: "https://balady.gov.sa/ar/services/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA%D9%8A-%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA-%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A%D8%A9" },
          { label: "إدارة الرخص", url: "https://balady.gov.sa/ar/services/%D8%B1%D8%AE%D8%B5%D9%8A" },
          { label: "لوحة التحكم", url: "https://apps.balady.gov.sa/dashboardclient/bff/login?returnUrl=/dashboardclient/" }
        ]
      },
      {
        mainhead: "المنظمات والأنظمة",
        subhead: [
          { label: "منصة رسم إشغال مرافق الإيواء", url: "https://balady.gov.sa/ar/services/%D9%85%D9%86%D8%B5%D8%A9-%D8%B1%D8%B3%D9%85-%D8%A5%D8%B4%D8%BA%D8%A7%D9%84-%D9%85%D8%B1%D8%A7%D9%81%D9%82-%D8%A7%D9%84%D8%A5%D9%8A%D9%88%D8%A7%D8%A1" },
          { label: "منصة رسم تقديم منتجات التبع", url: "" },
          { label: "بلدي أعمال", url: "https://balady.gov.sa/ar/services/%D9%85%D9%86%D8%B5%D8%A9-%D8%B1%D8%B3%D9%85-%D8%AA%D9%82%D8%AF%D9%8A%D9%85-%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D8%A8%D8%BA" }
        ]
      },
      {
        mainhead: "التفويض البلدي الإلكتروني",
        subhead: [
          { label: "تصنيف مقدمي خدمات المدن", url: "https://balady.gov.sa/ar/products/%D8%AA%D8%B5%D9%86%D9%8A%D9%81-%D9%85%D9%82%D8%AF%D9%85%D9%8A-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D8%AF%D9%86" },
          { label: "إضافة منشأة إلى مدير حساب", url: "https://balady.gov.sa/ar/services/%D8%A5%D8%B6%D8%A7%D9%81%D8%A9-%D9%85%D9%86%D8%B4%D8%A3%D8%A9-%D8%A5%D9%84%D9%89-%D9%85%D8%AF%D9%8A%D8%B1-%D8%AD%D8%B3%D8%A7%D8%A8" },
          { label: "الاستعلام عن طلبات منشأة", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%B7%D9%84%D8%A8%D8%A7%D8%AA-%D9%85%D9%86%D8%B4%D8%A3%D8%A9" },
          { label: "الاستعلام عن مفوضي منشأة", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D9%85%D9%81%D9%88%D8%B6%D9%8A-%D9%85%D9%86%D8%B4%D8%A3%D8%A9" }
        ]
      },
      {
        mainhead: "الرخص التجارية",
        subhead: [
          { label: "إصدار رخصة تجارية", url: "https://balady.gov.sa/ar/services/%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%B1%D8%AE%D8%B5%D8%A9-%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9" },
          { label: "تجديد رخصة نشاط تجاري", url: "https://balady.gov.sa/ar/services/%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF-%D8%B1%D8%AE%D8%B5%D8%A9-%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%D8%A9" },
      
          { label: "إلغاء رخصة نشاط تجاري", url: "https://balady.gov.sa/ar/services/%D8%A5%D9%84%D8%BA%D8%A7%D8%A1-%D8%B1%D8%AE%D8%B5%D8%A9-%D9%86%D8%B4%D8%A7%D8%B7-%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A" }
        ]
      },
      {
        mainhead: "الرخص الإنشائية",
        subhead: [
          { label: "إصدار رخصة بناء", url: "https://balady.gov.sa/ar/services/%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%B1%D8%AE%D8%B5%D8%A9-%D8%A8%D9%86%D8%A7%D8%A1" },
          { label: "تجديد رخصة بناء", url: "https://balady.gov.sa/ar/services/%D8%AE%D8%AF%D9%85%D8%A9-%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%B1%D8%AE%D8%B5%D8%A9-%D8%AA%D8%B3%D9%88%D9%8A%D8%B1-%D8%A3%D8%B1%D8%A7%D8%B6%D9%8A-%D9%81%D8%B6%D8%A7%D8%A1" }
        ]
      },
      {
        mainhead: "الشهادات الصحية",
        subhead: [
          { label: "إصدار شهادة صحية", url: "https://balady.gov.sa/ar/services/%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%B5%D8%AD%D9%8A%D8%A9" },
          { label: "تجديد شهادة صحية", url: "https://balady.gov.sa/ar/services/%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%B5%D8%AD%D9%8A%D8%A9" }
        ]
      },
      {
        mainhead: "خدمات تنسيق المشروعات",
        subhead: [
          { label: "خدمات تنسيق أعمال البنية التحتية", url: "https://balady.gov.sa/ar/products/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AA%D9%86%D8%B3%D9%8A%D9%82-%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%A8%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%AD%D8%AA%D9%8A%D8%A9" }
        ]
      },
      {
        mainhead: "خدمات التقارير المساحية",
        subhead: [
          { label: "إصدار تقرير مساحي", url: "https://balady.gov.sa/ar/services/%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%AA%D9%82%D8%B1%D9%8A%D8%B1-%D9%85%D8%B3%D8%A7%D8%AD%D9%8A" }
        ]
      },
			  {
        mainhead: "الهوية العقارية",
        subhead: [
          { label: "ربط صك إلكتروني بالهوية العقارية", url: "https://balady.gov.sa/ar/services/%D8%B1%D8%A8%D8%B7-%D8%B5%D9%83-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A-%D8%A8%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9" }
        ]
      }
    ]
  },
  {
    mainheader: "الاستعلامات",
    links: [
      {
        mainhead: "الاستعلامات العامة",
        subhead: [
        
          { label: "الاستعلام عن المخالفات للإجراءات الاحترازية", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%A7%D9%84%D9%85%D8%AE%D8%A7%D9%84%D9%81%D8%A9-%D9%84%D9%84%D8%A5%D8%AC%D8%B1%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D8%B2%D9%8A%D8%A9" },
          { label: "حاسبة الرسوم المعلوماتية", url: "https://balady.gov.sa/ar/services/%D8%AD%D8%A7%D8%B3%D8%A8%D8%A9-%D8%A7%D9%84%D8%B1%D8%B3%D9%88%D9%85-%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA%D9%8A%D8%A9" },
          { label: "الاستعلام عن المكاتب الهندسية", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%A7%D9%84%D9%85%D9%83%D8%A7%D8%AA%D8%A8-%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D9%8A%D8%A9" },
          { label: "الاستعلام عن عقود النظافة", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%B9%D9%82%D9%88%D8%AF-%D8%A7%D9%84%D9%86%D8%B8%D8%A7%D9%81%D8%A9" },
          { label: "أسواق المتاجر المتنقلة", url: "https://balady.gov.sa/services/11120" },
          { label: "الاستعلام عن الإيقافات", url: "https://balady.gov.sa/services/11120" },
					          { label: "الاستعلام عن المخالفات", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%A7%D9%84%D9%85%D8%AE%D8%A7%D9%84%D9%81%D8%A7%D8%AA" }
        ]
      },
      {
        mainhead: "الأراضي والبناء",
        subhead: [
          { label: "الاستعلام عن رخصة بناء", url: "https://balady.gov.sa/ar/services/%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%B1%D8%AE%D8%B5%D8%A9-%D8%A8%D9%86%D8%A7%D8%A1" },
        { label: "اشتراطات إيصال الخدمات الكهربائية", url: "https://balady.gov.sa/services/11126" },  
				{ label: "المستكشف الجغرافي", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%83%D8%B4%D9%81-%D8%A7%D9%84%D8%AC%D8%BA%D8%B1%D8%A7%D9%81%D9%8A" },
          { label: "مستكشف خدمات البنية التحتية", url: "https://balady.gov.sa/ar/services/%D9%85%D8%B3%D8%AA%D9%83%D8%B4%D9%81-%D8%A7%D9%84%D8%AA%D8%BA%D8%B7%D9%8A%D8%A9-%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%AD%D8%AA%D9%8A%D8%A9" },
          { label: "الاستعلام عن تقرير مساحي", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%AA%D9%82%D8%B1%D9%8A%D8%B1-%D9%85%D8%B3%D8%A7%D8%AD%D9%8A" }
        ]
      },
      {
        mainhead: "الاستعلامات التجارية",
        subhead: [
          { label: "الاستعلام عن رخصة نشاط تجاري", url: "https://new.balady.gov.sa/ar/services/11134" },
          { label: "الأنشطة التجارية والاشتراطات البلدية", url: "https://app.baladiy.qve-se.com/Eservice/HeathIssue/PrintedLicens?uuid=55f9d2c1-0bf7-4fac-92fa-d055bdbe7232" },
          { label: "الاستعلام عن مسارات العربات المتجولة", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D9%85%D8%B3%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D9%88%D9%84%D8%A9" }
        ]
      },
      {
        mainhead: "خدمات إكرام الموتى",
        subhead: [
          { label: "الاستعلام عن مقدمي خدمات نقل وتجهيز الموتى (الجهات الخيرية)", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D9%85%D9%82%D8%AF%D9%85%D9%8A-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D9%86%D9%82%D9%84-%D9%88%D8%AA%D8%AC%D9%87%D9%8A%D8%B2-%D8%A7%D9%84%D9%85%D9%88%D8%AA%D9%89-%D8%A7%D9%84%D8%AC%D9%87%D8%A7%D8%AA-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9" },
          { label: "الاستعلام عن قبر متوفي", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D9%82%D8%A8%D8%B1-%D9%85%D8%AA%D9%88%D9%81%D9%8A" },
          { label: "طباعة شهادة دفن", url: "https://balady.gov.sa/ar/services/%D8%B7%D8%A8%D8%A7%D8%B9%D8%A9-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%AF%D9%81%D9%86" },
          { label: "الاستعلام عن المقابر", url: "https://balady.gov.sa/ar/services/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D9%84%D8%A7%D9%85-%D8%B9%D9%86-%D8%A7%D9%84%D9%85%D9%82%D8%A7%D8%A8%D8%B1" }
        ]
      }
    ]
  },
  {
    mainheader: "المنصات",
      links: [
      {
     
        subhead: [
          { label: "بوابة الفرص الاستثمارية", url: "https://furas.momah.gov.sa/" },
          { label: "المنصات التفاعلية", url: "https://engage.balady.gov.sa/" },
         
        ]
      }
    ]
  },
  {
    mainheader: "تواصل معنا",
    links: [
      {
        subhead: [
          { label: "اتصل بنا", url: "https://balady.gov.sa/ar/form/contact-us" },
          { label: "بلاغ عن فساد", url: "https://balady.gov.sa/ar/node/11211" },
          { label: "الأسئلة الشائعة", url: "https://balady.gov.sa/ar/faq" },
          { label: "الدعم الفني بلغة الإشارة", url: "https://deaf.dga.gov.sa/" },
          { label: "دليل الأمانات", url: "https://balady.gov.sa/ar/branches" },
          { label: "وسائل التواصل الإجتماعي", url: "https://balady.gov.sa/ar/e_participation/11022" },
          { label: "حجز موعد إلكتروني", url: "https://balady.gov.sa/ar/services/%D8%AD%D8%AC%D8%B2-%D9%85%D9%88%D8%B9%D8%AF-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A" }
        ]
      }
    ]
  }
];

export default header;