export const translations = {
  en: {
    sidebar: {
      refugeeLink: 'Refugee Link',
      searchPlaceholder: 'Search resources...'
    },
    topbar: {
      title: 'Service Locator Map',
      location: 'Lebanon',
      reportIssue: 'Report Issue'
    },
    filters: {
      all: 'All Services',
      shelter: 'Shelter',
      medical: 'Medical',
      foodWater: 'Food/Water',
      legal: 'Legal'
    },
    sort: {
      sortBy: 'Sort by',
      distance: 'Sort by Distance',
      availability: 'Sort by Availability'
    },
    locations: {
      safeHavenCentral: 'SafeHaven Central',
      emergencyShelter: 'Emergency Shelter',
      cityGeneralClinic: 'City General Clinic',
      medicalCare: 'Medical Care',
      communityKitchen: 'Community Kitchen #4',
      foodDistribution: 'Food Distribution',
      away: 'away',
      bedsAvailable: 'beds available',
      limited: 'LIMITED',
      open: 'OPEN',
      full: 'FULL'
    },
    detailPanel: {
      currentCapacity: 'Current Capacity',
      reserve: 'Reserve',
      contact: 'Contact',
      information: 'Information',
      intakeHours: 'Intake Hours',
      address: 'Address',
      requirements: 'Requirements',
      facilities: 'Facilities & Accessibility',
      hoursLabel: 'Hours',
      addressLabel: 'Address',
      requirementsLabel: 'Requirements',
      accessible: 'Accessible',
      family: 'Family',
      trauma: 'Trauma'
    },
    status: {
      km: 'km',
      address1: 'Rue Gouraud, Beirut, Lebanon',
      address2: 'Hamra Street, West Beirut, Lebanon',
      address3: 'Tripoli Downtown, Lebanon'
    }
  },
  ar: {
    sidebar: {
      refugeeLink: 'وصلة اللاجئين',
      searchPlaceholder: 'البحث عن الموارد...'
    },
    topbar: {
      title: 'خريطة مواقع الخدمات',
      location: 'لبنان',
      reportIssue: 'الإبلاغ عن مشكلة'
    },
    filters: {
      all: 'جميع الخدمات',
      shelter: 'المأوى',
      medical: 'طبي',
      foodWater: 'الغذاء والماء',
      legal: 'قانوني'
    },
    sort: {
      sortBy: 'ترتيب حسب',
      distance: 'ترتيب حسب المسافة',
      availability: 'ترتيب حسب التوفر'
    },
    locations: {
      safeHavenCentral: 'مركز الملاذ الآمن',
      emergencyShelter: 'مأوى طارئ',
      cityGeneralClinic: 'عيادة المدينة العامة',
      medicalCare: 'الرعاية الطبية',
      communityKitchen: 'مطبخ المجتمع #4',
      foodDistribution: 'توزيع الغذاء',
      away: 'بعيد',
      bedsAvailable: 'أسرة متاحة',
      limited: 'محدود',
      open: 'مفتوح',
      full: 'ممتلئ'
    },
    detailPanel: {
      currentCapacity: 'السعة الحالية',
      reserve: 'احجز',
      contact: 'اتصل',
      information: 'معلومات',
      intakeHours: 'ساعات الاستقبال',
      address: 'العنوان',
      requirements: 'المتطلبات',
      facilities: 'المرافق والإمكانية',
      hoursLabel: 'الساعات',
      addressLabel: 'العنوان',
      requirementsLabel: 'المتطلبات',
      accessible: 'يسهل الوصول إليه',
      family: 'عائلة',
      trauma: 'رضح'
    },
    status: {
      km: 'كم',
      address1: 'شارع جورو، بيروت، لبنان',
      address2: 'شارع الحمرا، غرب بيروت، لبنان',
      address3: 'وسط طرابلس، لبنان'
    }
  }
};

export const t = (language, key) => {
  const keys = key.split('.');
  let value = translations[language] || translations.en;
  
  for (const k of keys) {
    value = value[k] || key;
  }
  
  return value;
};
