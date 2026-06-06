// ============================================================================
// BILINGUAL CONTENT — THE BUILDERS SOLUTIONS  (English + Arabic)
// ----------------------------------------------------------------------------
// This is the single source of truth for ALL on-page text, in both languages.
// Edit values here to change copy. Every English string has an Arabic match.
//
// PLACEHOLDER NOTICE: stats, projects, testimonials, partners and news below
// are EDITABLE PLACEHOLDERS — not verified facts. Replace with real TBS data
// before going live. Do not publish invented numbers, clients, or partners.
// ============================================================================

export type Lang = 'en' | 'ar';

export interface Dictionary {
  nav: {
    home: string; about: string; services: string; projects: string;
    products: string; industries: string; locations: string; careers: string;
    news: string; contact: string; getQuote: string;
  };
  hero: { kicker: string; titleTop: string; titleBottom: string; lead: string; ctaPrimary: string; ctaSecondary: string }[];
  stats: { value: string; label: string }[];
  about: { kicker: string; title: string; p1: string; p2: string; cta: string; badgeValue: string; badgeLabel: string };
  services: { kicker: string; title: string; subtitle: string; items: { title: string; desc: string }[] };
  projects: { kicker: string; title: string; allLabel: string; viewAll: string; sectors: Record<string, string> };
  products: { kicker: string; title: string; viewAll: string; items: { id: string; title: string; desc: string }[] };
  partners: { kicker: string; title: string; viewAll: string; note: string };
  presence: { kicker: string; title: string; viewAll: string; locationsLabel: string; items: { country: string; projects: string }[] };
  why: { kicker: string; title: string; items: { title: string; desc: string }[] };
  testimonials: { kicker: string; title: string; items: { quote: string; name: string; role: string }[] };
  news: { kicker: string; title: string; viewAll: string; items: { title: string; date: string }[] };
  cta: { title: string; text: string; button: string };
  footer: { tagline: string; quickLinks: string; servicesCol: string; productsCol: string; locationsCol: string; contactCol: string; rights: string; headOffice: string; address: string; phone: string; email: string };
  chat: { title: string; greeting: string; placeholder: string; send: string; typing: string };
  whatsapp: string;
  controls: { lightMode: string; darkMode: string };
  comingSoon: string;
}

const en: Dictionary = {
  nav: {
    home: 'Home', about: 'About Us', services: 'Services', projects: 'Projects',
    products: 'Products', industries: 'Industries', locations: 'Locations',
    careers: 'Careers', news: 'News', contact: 'Contact', getQuote: 'Get a Quote',
  },
  hero: [
    { kicker: 'Building Beyond Limits', titleTop: 'Strong Foundations.', titleBottom: 'Endless Possibilities.', lead: 'The Builders Solutions delivers integrated construction-component supply that builds stronger projects and a better future.', ctaPrimary: 'Explore Products', ctaSecondary: 'Our Story' },
    { kicker: 'Engineered to Specification', titleTop: 'Quality Components.', titleBottom: 'Trusted Performance.', lead: 'Architectural and structural building components supplied for commercial construction across the region.', ctaPrimary: 'View Range', ctaSecondary: 'Contact Us' },
    { kicker: 'From Concept to Completion', titleTop: 'Built to Last.', titleBottom: 'Delivered on Time.', lead: 'Reliable supply, accurate specifications, and support at every stage of your project.', ctaPrimary: 'Request a Quote', ctaSecondary: 'Learn More' },
  ],
  stats: [
    { value: '00+', label: 'Years Experience' },
    { value: '000+', label: 'Projects Supplied' },
    { value: '00+', label: 'Product Lines' },
    { value: '00+', label: 'Team Members' },
    { value: '0+', label: 'Locations' },
  ],
  about: {
    kicker: 'About The Builders Solutions',
    title: 'We Turn Vision Into Reality',
    p1: 'The Builders Solutions supplies architectural and structural building components across residential, commercial, industrial and infrastructure projects.',
    p2: 'With a commitment to quality, accuracy and reliable delivery, we help build more than structures — we build trust.',
    cta: 'Learn More About Us', badgeValue: '00+', badgeLabel: 'Years of Excellence',
  },
  services: {
    kicker: 'What We Do',
    title: 'End-to-End Component Supply',
    subtitle: 'From specification to delivery, we add value at every stage of your project.',
    items: [
      { title: 'Product Supply', desc: 'Architectural and structural components sourced and supplied to spec.' },
      { title: 'Technical Support', desc: 'Specification guidance and product selection for your project requirements.' },
      { title: 'Project Delivery', desc: 'Reliable, scheduled delivery to keep your site on track.' },
      { title: 'Custom Solutions', desc: 'Made-to-measure profiles and components for specific applications.' },
      { title: 'After-Sales', desc: 'Ongoing support, spares and service after installation.' },
    ],
  },
  projects: {
    kicker: 'Our Work',
    title: 'Where Our Products Are Used',
    allLabel: 'All',
    viewAll: 'View All Projects',
    sectors: {
      Hospitality: 'Hospitality', Retail: 'Retail', Commercial: 'Commercial',
      Entertainment: 'Entertainment', Education: 'Education', Energy: 'Energy',
      Logistics: 'Logistics', 'F&B': 'F&B', 'Mixed-Use': 'Mixed-Use', Office: 'Office',
      Automotive: 'Automotive', Government: 'Government', Residential: 'Residential', Industrial: 'Industrial',
    },
  },
  products: {
    kicker: 'Our Range',
    title: 'Quality Products. Trusted Performance.',
    viewAll: 'View All Products',
    items: [
      { id: 'expansion-joints', title: 'Expansion Joints', desc: 'Structural expansion joints for buildings, parking and infrastructure.' },
      { id: 'movement-joints', title: 'Movement Joints', desc: 'Tile movement joints for floors, walls and façades.' },
      { id: 'expansion-joint-covers', title: 'Expansion Joint Covers', desc: 'Architectural covers across floors, walls, ceilings and roofs.' },
      { id: 'tile-trims', title: 'Tile Trims', desc: 'Stainless steel and metal tile trims for clean edges and transitions.' },
      { id: 'skirting', title: 'Skirting', desc: 'Hygienic, impact-resistant skirting profiles.' },
      { id: 'stair-nosing', title: 'Stair Nosing', desc: 'Anti-slip stair nosings for safety and longevity.' },
      { id: 'corner-guards', title: 'Corner Guards', desc: 'Corner protection for high-traffic walls and circulation routes.' },
      { id: 'wall-guards', title: 'Wall Guards', desc: 'Continuous wall protection systems for hospitals, schools and retail.' },
      { id: 'hand-rails', title: 'Hand Rails', desc: 'Engineered handrails for healthcare, transit and public spaces.' },
    ],
  },
  partners: {
    kicker: 'Our Partners',
    title: 'Brands We Work With',
    viewAll: 'View All',
    note: 'Add your real partner logos to /public/partners — do not list a brand you are not authorised to represent.',
  },
  presence: {
    kicker: 'Our Presence',
    title: 'Regional Reach. Local Expertise.',
    viewAll: 'View All Locations', locationsLabel: 'Locations',
    items: [
      { country: 'Country 1', projects: '0 Projects' },
      { country: 'Country 2', projects: '0 Projects' },
      { country: 'Country 3', projects: '0 Projects' },
      { country: 'Country 4', projects: '0 Projects' },
      { country: 'Country 5', projects: '0 Projects' },
      { country: 'Country 6', projects: '0 Projects' },
    ],
  },
  why: {
    kicker: 'Why Choose Us',
    title: 'Why The Builders Solutions',
    items: [
      { title: 'Quality First', desc: 'Components supplied to verified specification.' },
      { title: 'Reliable Delivery', desc: 'On-time supply that keeps projects moving.' },
      { title: 'Technical Expertise', desc: 'Guidance from specification to installation.' },
      { title: 'Customer Focused', desc: 'Your project success is our priority.' },
    ],
  },
  testimonials: {
    kicker: 'Testimonials',
    title: 'What Our Clients Say',
    items: [
      { quote: '[Replace with a real, attributable client quote.]', name: 'Client Name', role: 'Role, Company' },
      { quote: '[Replace with a real, attributable client quote.]', name: 'Client Name', role: 'Role, Company' },
      { quote: '[Replace with a real, attributable client quote.]', name: 'Client Name', role: 'Role, Company' },
    ],
  },
  news: {
    kicker: 'News & Insights',
    title: 'Latest Updates',
    viewAll: 'View All News',
    items: [
      { title: 'News headline placeholder one', date: 'Date' },
      { title: 'News headline placeholder two', date: 'Date' },
      { title: 'News headline placeholder three', date: 'Date' },
      { title: 'News headline placeholder four', date: 'Date' },
    ],
  },
  cta: {
    title: "Let's Build Something Extraordinary Together",
    text: 'Have a project in mind? We would love to hear about it.',
    button: 'Get in Touch',
  },
  footer: {
    tagline: 'Supplying architectural and structural building components for commercial construction projects.',
    quickLinks: 'Quick Links', servicesCol: 'Services', productsCol: 'Products',
    locationsCol: 'Locations', contactCol: 'Contact Us', rights: 'All rights reserved.',
    headOffice: 'Head Office', address: '[Address line — replace]', phone: '+000 000 0000', email: 'hello@thebuilderssolutions.com',
  },
  chat: {
    title: 'Builders Assistant', greeting: 'Hello! Ask me about our products, services or how to request a quote.',
    placeholder: 'Type your message…', send: 'Send', typing: 'Assistant is typing…',
  },
  whatsapp: 'Chat on WhatsApp',
  controls: { lightMode: 'Light mode', darkMode: 'Dark mode' },
  comingSoon: 'Photo coming soon',
};

const ar: Dictionary = {
  nav: {
    home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', projects: 'المشاريع',
    products: 'المنتجات', industries: 'القطاعات', locations: 'المواقع',
    careers: 'الوظائف', news: 'الأخبار', contact: 'اتصل بنا', getQuote: 'اطلب عرض سعر',
  },
  hero: [
    { kicker: 'نبني بلا حدود', titleTop: 'أساسات قوية.', titleBottom: 'إمكانيات لا حدود لها.', lead: 'تقدّم «ذا بيلدرز سوليوشنز» توريداً متكاملاً لمكوّنات البناء لبناء مشاريع أقوى ومستقبل أفضل.', ctaPrimary: 'استكشف المنتجات', ctaSecondary: 'قصتنا' },
    { kicker: 'مصمّمة وفق المواصفات', titleTop: 'مكوّنات عالية الجودة.', titleBottom: 'أداء موثوق.', lead: 'مكوّنات بناء معمارية وإنشائية تُورَّد لمشاريع البناء التجارية في المنطقة.', ctaPrimary: 'تصفّح المجموعة', ctaSecondary: 'اتصل بنا' },
    { kicker: 'من الفكرة إلى الإنجاز', titleTop: 'بناء يدوم.', titleBottom: 'تسليم في الوقت المحدد.', lead: 'توريد موثوق ومواصفات دقيقة ودعم في كل مرحلة من مراحل مشروعك.', ctaPrimary: 'اطلب عرض سعر', ctaSecondary: 'اعرف المزيد' },
  ],
  stats: [
    { value: '+٠٠', label: 'سنوات الخبرة' },
    { value: '+٠٠٠', label: 'مشاريع موردة' },
    { value: '+٠٠', label: 'خطوط منتجات' },
    { value: '+٠٠', label: 'أعضاء الفريق' },
    { value: '+٠', label: 'المواقع' },
  ],
  about: {
    kicker: 'عن ذا بيلدرز سوليوشنز',
    title: 'نحوّل الرؤية إلى واقع',
    p1: 'تورّد «ذا بيلدرز سوليوشنز» مكوّنات البناء المعمارية والإنشائية للمشاريع السكنية والتجارية والصناعية والبنية التحتية.',
    p2: 'بالتزامنا بالجودة والدقة والتسليم الموثوق، نساعد على بناء ما هو أكثر من منشآت — نبني الثقة.',
    cta: 'اعرف المزيد عنّا', badgeValue: '+٠٠', badgeLabel: 'سنوات من التميّز',
  },
  services: {
    kicker: 'ماذا نقدّم',
    title: 'توريد مكوّنات متكامل',
    subtitle: 'من المواصفات إلى التسليم، نضيف قيمة في كل مرحلة من مشروعك.',
    items: [
      { title: 'توريد المنتجات', desc: 'مكوّنات معمارية وإنشائية تُورَّد وفق المواصفات.' },
      { title: 'الدعم الفني', desc: 'إرشاد في المواصفات واختيار المنتجات وفق متطلبات مشروعك.' },
      { title: 'تسليم المشاريع', desc: 'تسليم موثوق ومجدول للحفاظ على سير موقعك.' },
      { title: 'حلول مخصّصة', desc: 'قطاعات ومكوّنات حسب الطلب لتطبيقات محدّدة.' },
      { title: 'خدمة ما بعد البيع', desc: 'دعم مستمر وقطع غيار وخدمة بعد التركيب.' },
    ],
  },
  projects: {
    kicker: 'أعمالنا',
    title: 'أين تُستخدم منتجاتنا',
    allLabel: 'الكل',
    viewAll: 'عرض كل المشاريع',
    sectors: {
      Hospitality: 'الضيافة', Retail: 'التجزئة', Commercial: 'تجاري',
      Entertainment: 'ترفيه', Education: 'التعليم', Energy: 'الطاقة',
      Logistics: 'الخدمات اللوجستية', 'F&B': 'الأغذية والمشروبات', 'Mixed-Use': 'متعدد الاستخدامات', Office: 'مكاتب',
      Automotive: 'سيارات', Government: 'حكومي', Residential: 'سكني', Industrial: 'صناعي',
    },
  },
  products: {
    kicker: 'مجموعتنا',
    title: 'منتجات عالية الجودة. أداء موثوق.',
    viewAll: 'عرض كل المنتجات',
    items: [
      { id: 'expansion-joints', title: 'فواصل التمدد', desc: 'فواصل تمدد إنشائية للمباني والمواقف والبنية التحتية.' },
      { id: 'movement-joints', title: 'فواصل الحركة', desc: 'فواصل حركة البلاط للأرضيات والجدران والواجهات.' },
      { id: 'expansion-joint-covers', title: 'أغطية فواصل التمدد', desc: 'أغطية معمارية للأرضيات والجدران والأسقف والأسطح.' },
      { id: 'tile-trims', title: 'زوايا البلاط', desc: 'زوايا بلاط من الستانلس ستيل والمعدن لحواف وانتقالات نظيفة.' },
      { id: 'skirting', title: 'الوزرات', desc: 'وزرات صحية مقاومة للصدمات.' },
      { id: 'stair-nosing', title: 'أنوف الدرج', desc: 'أنوف درج مانعة للانزلاق للسلامة وطول العمر.' },
      { id: 'corner-guards', title: 'واقيات الزوايا', desc: 'حماية الزوايا للجدران وممرات الحركة كثيفة الاستخدام.' },
      { id: 'wall-guards', title: 'واقيات الجدران', desc: 'أنظمة حماية جدران مستمرة للمستشفيات والمدارس والتجزئة.' },
      { id: 'hand-rails', title: 'الدرابزين', desc: 'درابزينات مصمّمة للرعاية الصحية والنقل والأماكن العامة.' },
    ],
  },
  partners: {
    kicker: 'شركاؤنا',
    title: 'علامات نعمل معها',
    viewAll: 'عرض الكل',
    note: 'أضف شعارات شركائك الحقيقيين إلى /public/partners — لا تُدرج علامة لست مخوّلاً بتمثيلها.',
  },
  presence: {
    kicker: 'حضورنا',
    title: 'انتشار إقليمي. خبرة محلية.',
    viewAll: 'عرض كل المواقع', locationsLabel: 'المواقع',
    items: [
      { country: 'الدولة ١', projects: '٠ مشاريع' },
      { country: 'الدولة ٢', projects: '٠ مشاريع' },
      { country: 'الدولة ٣', projects: '٠ مشاريع' },
      { country: 'الدولة ٤', projects: '٠ مشاريع' },
      { country: 'الدولة ٥', projects: '٠ مشاريع' },
      { country: 'الدولة ٦', projects: '٠ مشاريع' },
    ],
  },
  why: {
    kicker: 'لماذا نحن',
    title: 'لماذا ذا بيلدرز سوليوشنز',
    items: [
      { title: 'الجودة أولاً', desc: 'مكوّنات تُورَّد وفق مواصفات موثّقة.' },
      { title: 'تسليم موثوق', desc: 'توريد في الوقت المحدد يبقي المشاريع متقدّمة.' },
      { title: 'خبرة فنية', desc: 'إرشاد من المواصفات إلى التركيب.' },
      { title: 'التركيز على العميل', desc: 'نجاح مشروعك هو أولويتنا.' },
    ],
  },
  testimonials: {
    kicker: 'آراء العملاء',
    title: 'ماذا يقول عملاؤنا',
    items: [
      { quote: '[استبدل باقتباس حقيقي من عميل يمكن نسبته إليه.]', name: 'اسم العميل', role: 'المسمّى، الشركة' },
      { quote: '[استبدل باقتباس حقيقي من عميل يمكن نسبته إليه.]', name: 'اسم العميل', role: 'المسمّى، الشركة' },
      { quote: '[استبدل باقتباس حقيقي من عميل يمكن نسبته إليه.]', name: 'اسم العميل', role: 'المسمّى، الشركة' },
    ],
  },
  news: {
    kicker: 'الأخبار والمقالات',
    title: 'آخر المستجدات',
    viewAll: 'عرض كل الأخبار',
    items: [
      { title: 'عنوان خبر تجريبي ١', date: 'التاريخ' },
      { title: 'عنوان خبر تجريبي ٢', date: 'التاريخ' },
      { title: 'عنوان خبر تجريبي ٣', date: 'التاريخ' },
      { title: 'عنوان خبر تجريبي ٤', date: 'التاريخ' },
    ],
  },
  cta: {
    title: 'لنبنِ شيئاً استثنائياً معاً',
    text: 'لديك مشروع في ذهنك؟ يسعدنا أن نسمع عنه.',
    button: 'تواصل معنا',
  },
  footer: {
    tagline: 'نورّد مكوّنات البناء المعمارية والإنشائية لمشاريع البناء التجارية.',
    quickLinks: 'روابط سريعة', servicesCol: 'الخدمات', productsCol: 'المنتجات',
    locationsCol: 'المواقع', contactCol: 'اتصل بنا', rights: 'جميع الحقوق محفوظة.',
    headOffice: 'المكتب الرئيسي', address: '[سطر العنوان — استبدل]', phone: '+000 000 0000', email: 'hello@thebuilderssolutions.com',
  },
  chat: {
    title: 'مساعد البنّائين', greeting: 'مرحباً! اسألني عن منتجاتنا أو خدماتنا أو كيفية طلب عرض سعر.',
    placeholder: 'اكتب رسالتك…', send: 'إرسال', typing: 'المساعد يكتب…',
  },
  whatsapp: 'تحدّث عبر واتساب',
  controls: { lightMode: 'الوضع الفاتح', darkMode: 'الوضع الداكن' },
  comingSoon: 'الصورة قريباً',
};

export const DICT: Record<Lang, Dictionary> = { en, ar };
