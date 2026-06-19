// ============================================================================
// BILINGUAL CONTENT — BUILDERS SOLUTIONS (English + Arabic)
// Real data folded in from BS_Website_FINAL_LIVE.html (group site).
// ============================================================================

export type Lang = 'en' | 'ar';

export interface Dictionary {
  nav: {
    home: string; about: string; services: string; projects: string;
    products: string; industries: string; locations: string; careers: string;
    news: string; contact: string; getQuote: string;
  };
  hero: { kicker: string; titleTop: string; titleBottom: string; lead: string; ctaPrimary: string; ctaSecondary: string }[];
  ticker: string[];
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

const TICKER = ['Tile Trims', 'Expansion Joints', 'Stern Touchless Cubicles', 'Metal Panels', 'SS Bollards', 'Skylights', 'Wall Guards', 'HPL Laminates', 'LED Profiles', 'Acoustic Pods', 'Stair Nosing', 'Benkiser Germany'];

const en: Dictionary = {
  nav: {
    home: 'Home', about: 'About', services: 'Services', projects: 'Projects',
    products: 'Products', industries: 'Industries', locations: 'Companies',
    careers: 'Careers', news: 'News', contact: 'Contact', getQuote: 'Get a Quote',
  },
  hero: [
    { kicker: 'Premium Construction Finishing Materials', titleTop: 'Builders', titleBottom: 'Solutions Group', lead: 'Multinational supplier of premium construction finishing materials across Bahrain, UAE, Saudi Arabia and the USA.', ctaPrimary: 'Explore Products', ctaSecondary: 'Contact Us' },
    { kicker: 'Official Middle East Distributor', titleTop: 'Stern', titleBottom: 'Touchless Cubicles', lead: 'Zero-contact WC cubicle systems — hygienic, sensor-operated, engineered for commercial washrooms.', ctaPrimary: 'View Products', ctaSecondary: 'Get a Quote' },
    { kicker: 'Trusted Since 2009', titleTop: 'Engineered.', titleBottom: 'Delivered on Time.', lead: 'Right products, full documentation, delivered on time across the GCC.', ctaPrimary: 'Request a Quote', ctaSecondary: 'Our Companies' },
  ],
  ticker: TICKER,
  stats: [
    { value: '15+', label: 'Years Experience' },
    { value: '5', label: 'Group Companies' },
    { value: '4', label: 'Countries' },
    { value: 'GCC', label: 'Regional Reach' },
  ],
  about: {
    kicker: 'Who We Are',
    title: 'Builders Solutions Group',
    p1: 'A multinational group specialising in premium construction finishing materials, modular solutions, fabrication and civil construction. Operating across Bahrain, UAE, Saudi Arabia and the USA since 2009.',
    p2: 'Our group companies serve architectural, industrial, defense and Oil & Gas sectors.',
    cta: 'Contact Our Team', badgeValue: '15+', badgeLabel: 'Years of Excellence',
  },
  services: {
    kicker: 'Services',
    title: 'What We Offer',
    subtitle: 'Right products, full documentation, delivered on time across the GCC.',
    items: [
      { title: 'Material Supply', desc: 'Direct import from certified manufacturers. Full TDS, DWG, test reports and MAC sheets with every delivery.' },
      { title: 'Technical Consultation', desc: 'BOQ preparation, shop drawing review and product selection — from tender through completion.' },
      { title: 'Installation', desc: 'Full installation and civil works through Allied Gulf Construction Services (AGCS) in Bahrain.' },
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
    kicker: 'Our Product Range',
    title: 'Quality Products. Trusted Performance.',
    viewAll: 'Request a Quote',
    items: [
      { id: 'tile-trims', title: 'Tile Trims', desc: 'Precision edge-protection profiles for tiled walls and floors — clean transitions and corner protection.' },
      { id: 'expansion-joints', title: 'Expansion Joints', desc: 'Structural and architectural expansion joint systems for floors, walls and façades.' },
      { id: 'movement-joints', title: 'Movement Joints', desc: 'Tile and floor movement joints that absorb thermal expansion and protect edges.' },
      { id: 'compression-seal', title: 'Compression Seals', desc: 'Pre-compressed foam and elastomeric compression seals for watertight joints.' },
      { id: 'stern-touchless', title: 'Stern Touchless', desc: 'Official Middle East distributor — zero-contact WC cubicle systems with sensor flushing.' },
      { id: 'wall-guards', title: 'Wall Guards', desc: 'Impact-resistant wall and corner protection for hospitals, schools and high-traffic spaces.' },
      { id: 'bollards', title: 'SS Bollards', desc: 'Security-grade stainless steel bollards — fixed, removable and PAS 68 anti-ram options.' },
      { id: 'metal-panels', title: 'Metal Panels', desc: 'Aluminium composite, perforated and water-ripple metal panels for façades and ceilings.' },
      { id: 'led-profiles', title: 'LED Profiles', desc: 'Architectural aluminium LED channel profiles with diffusers for linear lighting.' },
      { id: 'skylights', title: 'Skylights', desc: 'Aluminium-framed and tubular skylights in polycarbonate, PMMA and safety glass.' },
      { id: 'hpl', title: 'HPL Laminates', desc: 'High-pressure laminate and compact-grade panels for cubicles, lockers and cladding.' },
      { id: 'flooring', title: 'Flooring Systems', desc: 'Vinyl, SPC, LVT, epoxy, rubber, raised-access and entrance matting systems.' },
      { id: 'skirting', title: 'Skirting', desc: 'Hygienic aluminium, PVC and stainless steel skirting profiles.' },
      { id: 'stair-nosing', title: 'Stair Nosing', desc: 'Anti-slip stair nosings for safety and durability on every step.' },
      { id: 'acoustic-panels', title: 'Acoustic Panels', desc: 'Sound-absorbing PET felt and wood-wool panels for acoustic comfort.' },
      { id: 'silent-pods', title: 'Silent Pods', desc: 'Freestanding acoustic office pods and phone booths for quiet focus.' },
      { id: 'stretch-ceiling', title: 'Stretch Ceilings', desc: 'Seamless PVC stretch-ceiling membranes — matte, gloss and translucent.' },
      { id: 'channel-grating', title: 'Channel & Grating', desc: 'Drainage channels and gratings in stainless steel and polymer concrete.' },
      { id: 'metal-furniture', title: 'Metal Furniture', desc: 'Custom metal lockers, cabinets and shelving for commercial spaces.' },
      { id: 'prefab-cabins', title: 'Prefab & Modular Cabins', desc: 'Off-site prefabricated and expandable modular cabins and container units.' },
      { id: 'smart-solar', title: 'Smart Solar Furniture', desc: 'Solar-powered smart benches and street furniture with device charging.' },
      { id: 'defense', title: 'Defense Products', desc: 'Armoured steel, GRP and ballistic glass solutions for defense and security projects.' },
      { id: 'oilgas', title: 'Oil & Gas', desc: 'GRP, carbon steel, SS316L and HDPE products engineered for oil & gas applications.' },
    ],
  },
  partners: {
    kicker: 'Our Partners',
    title: 'Brands We Work With',
    viewAll: 'View All',
    note: 'Add your real partner logos to /public/partners — do not list a brand you are not authorised to represent.',
  },
  presence: {
    kicker: 'Group Companies',
    title: 'Our Companies',
    viewAll: 'Contact Us', locationsLabel: 'Companies',
    items: [
      { country: 'Builders Solutions Inc.', projects: 'USA · +1 901-850-4031' },
      { country: 'Builders Solutions FZ LLC', projects: 'UAE · +971 50 477 8537' },
      { country: 'Emaar Builders Solutions', projects: 'Bahrain · +973 3468 5656' },
      { country: 'Allied Gulf Construction W.L.L', projects: 'Bahrain · alliedgulf.me' },
      { country: 'Gulf Construction Solutions L.L.C', projects: 'Saudi Arabia · gcs.sa' },
    ],
  },
  why: {
    kicker: 'Why Choose Us',
    title: 'Why Builders Solutions',
    items: [
      { title: 'Certified Supply', desc: 'Direct import from certified manufacturers with full documentation.' },
      { title: 'Regional Reach', desc: 'Delivery and support across Bahrain, UAE, Saudi Arabia and the USA.' },
      { title: 'Technical Expertise', desc: 'Guidance from tender and BOQ through to installation.' },
      { title: 'On-Time Delivery', desc: 'Reliable supply that keeps your project on schedule.' },
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
    title: 'Ready to Start Your Project?',
    text: 'Talk to our team — right products, full documentation, delivered on time across the GCC.',
    button: 'Request a Quote',
  },
  footer: {
    tagline: 'Multinational supplier of premium construction finishing materials. Bahrain · UAE · Saudi Arabia · USA.',
    quickLinks: 'Quick Links', servicesCol: 'Services', productsCol: 'Products',
    locationsCol: 'Companies', contactCol: 'Contact Us', rights: 'All rights reserved.',
    headOffice: 'Head Office — Bahrain', address: 'Bahrain · UAE · Saudi Arabia · USA', phone: '+973 3468 5656', email: 'trade@thebuilderssolutions.com',
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
    products: 'المنتجات', industries: 'القطاعات', locations: 'الشركات',
    careers: 'الوظائف', news: 'الأخبار', contact: 'اتصل بنا', getQuote: 'اطلب عرض سعر',
  },
  hero: [
    { kicker: 'مواد تشطيب بناء فاخرة', titleTop: 'بيلدرز', titleBottom: 'سوليوشنز جروب', lead: 'مورّد متعدد الجنسيات لمواد تشطيب البناء الفاخرة في البحرين والإمارات والسعودية والولايات المتحدة.', ctaPrimary: 'استكشف المنتجات', ctaSecondary: 'اتصل بنا' },
    { kicker: 'الموزّع الرسمي في الشرق الأوسط', titleTop: 'ستيرن', titleBottom: 'كبائن لمسية', lead: 'أنظمة كبائن دورات مياه بدون لمس — صحية تعمل بالحساسات ومصمّمة للحمامات التجارية.', ctaPrimary: 'تصفّح المنتجات', ctaSecondary: 'اطلب عرض سعر' },
    { kicker: 'موثوق منذ 2009', titleTop: 'هندسة دقيقة.', titleBottom: 'تسليم في الوقت.', lead: 'المنتجات المناسبة وتوثيق كامل وتسليم في الوقت المحدد في جميع أنحاء الخليج.', ctaPrimary: 'اطلب عرض سعر', ctaSecondary: 'شركاتنا' },
  ],
  ticker: TICKER,
  stats: [
    { value: '+15', label: 'سنوات الخبرة' },
    { value: '5', label: 'شركات المجموعة' },
    { value: '4', label: 'دول' },
    { value: 'الخليج', label: 'الانتشار الإقليمي' },
  ],
  about: {
    kicker: 'من نحن',
    title: 'بيلدرز سوليوشنز جروب',
    p1: 'مجموعة متعددة الجنسيات متخصصة في مواد تشطيب البناء الفاخرة والحلول المعيارية والتصنيع والإنشاءات المدنية. تعمل في البحرين والإمارات والسعودية والولايات المتحدة منذ عام 2009.',
    p2: 'تخدم شركات مجموعتنا القطاعات المعمارية والصناعية والدفاعية وقطاع النفط والغاز.',
    cta: 'تواصل مع فريقنا', badgeValue: '+15', badgeLabel: 'سنوات من التميّز',
  },
  services: {
    kicker: 'الخدمات',
    title: 'ماذا نقدّم',
    subtitle: 'المنتجات المناسبة وتوثيق كامل وتسليم في الوقت المحدد في جميع أنحاء الخليج.',
    items: [
      { title: 'توريد المواد', desc: 'استيراد مباشر من مصنّعين معتمدين. مع كل توريد: ملفات TDS وDWG وتقارير الاختبار وأوراق MAC كاملة.' },
      { title: 'الاستشارات الفنية', desc: 'إعداد جداول الكميات ومراجعة المخططات التنفيذية واختيار المنتجات — من المناقصة حتى الإنجاز.' },
      { title: 'التركيب', desc: 'تركيب كامل وأعمال مدنية عبر شركة الخليج المتحالف للإنشاءات (AGCS) في البحرين.' },
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
    kicker: 'مجموعة منتجاتنا',
    title: 'منتجات عالية الجودة. أداء موثوق.',
    viewAll: 'اطلب عرض سعر',
    items: [
      { id: 'tile-trims', title: 'زوايا البلاط', desc: 'قطاعات حماية حواف دقيقة للجدران والأرضيات المبلّطة — انتقالات نظيفة وحماية للزوايا.' },
      { id: 'expansion-joints', title: 'فواصل التمدد', desc: 'أنظمة فواصل تمدد إنشائية ومعمارية للأرضيات والجدران والواجهات.' },
      { id: 'movement-joints', title: 'فواصل الحركة', desc: 'فواصل حركة للبلاط والأرضيات تمتص التمدد الحراري وتحمي الحواف.' },
      { id: 'compression-seal', title: 'سدادات الضغط', desc: 'سدادات ضغط رغوية ومطاطية مسبقة الضغط لفواصل مانعة للماء.' },
      { id: 'stern-touchless', title: 'ستيرن اللمسية', desc: 'الموزّع الرسمي في الشرق الأوسط — أنظمة كبائن دورات مياه بدون لمس بحساسات تدفق.' },
      { id: 'wall-guards', title: 'واقيات الجدران', desc: 'حماية جدران وزوايا مقاومة للصدمات للمستشفيات والمدارس والمساحات كثيفة الحركة.' },
      { id: 'bollards', title: 'حواجز ستانلس', desc: 'حواجز ستانلس ستيل أمنية — ثابتة وقابلة للإزالة وخيارات مضادة للاقتحام PAS 68.' },
      { id: 'metal-panels', title: 'الألواح المعدنية', desc: 'ألواح ألمنيوم مركّبة ومثقّبة وذات تموّج مائي للواجهات والأسقف.' },
      { id: 'led-profiles', title: 'قطاعات LED', desc: 'قطاعات ألمنيوم معمارية لإضاءة LED مع موزّعات للإضاءة الخطية.' },
      { id: 'skylights', title: 'المناور', desc: 'مناور بإطار ألمنيوم وأنبوبية من البولي كربونات وPMMA والزجاج الأمني.' },
      { id: 'hpl', title: 'ألواح HPL', desc: 'ألواح لامينيت عالية الضغط ومدمجة للكبائن والخزائن والكسوة.' },
      { id: 'flooring', title: 'أنظمة الأرضيات', desc: 'أرضيات فينيل وSPC وLVT وإيبوكسي ومطاط وأرضيات مرتفعة وحصائر مداخل.' },
      { id: 'skirting', title: 'الوزرات', desc: 'وزرات صحية من الألمنيوم وPVC والستانلس ستيل.' },
      { id: 'stair-nosing', title: 'أنوف الدرج', desc: 'أنوف درج مانعة للانزلاق للسلامة والمتانة على كل درجة.' },
      { id: 'acoustic-panels', title: 'الألواح الصوتية', desc: 'ألواح ماصّة للصوت من لباد PET وصوف الخشب للراحة الصوتية.' },
      { id: 'silent-pods', title: 'الكبائن الصامتة', desc: 'كبائن مكتبية صوتية قائمة بذاتها وأكشاك هاتف للتركيز الهادئ.' },
      { id: 'stretch-ceiling', title: 'الأسقف المشدودة', desc: 'أغشية أسقف مشدودة PVC سلسة — مطفية ولامعة وشفافة.' },
      { id: 'channel-grating', title: 'القنوات والمشبكات', desc: 'قنوات تصريف ومشبكات من الستانلس ستيل والخرسانة البوليمرية.' },
      { id: 'metal-furniture', title: 'الأثاث المعدني', desc: 'خزائن ودواليب ورفوف معدنية مخصصة للمساحات التجارية.' },
      { id: 'prefab-cabins', title: 'الكبائن المعيارية', desc: 'كبائن معيارية ووحدات حاويات مصنّعة مسبقًا وقابلة للتوسعة.' },
      { id: 'smart-solar', title: 'الأثاث الشمسي الذكي', desc: 'مقاعد ذكية وأثاث شوارع يعمل بالطاقة الشمسية مع شحن الأجهزة.' },
      { id: 'defense', title: 'منتجات دفاعية', desc: 'حلول من الفولاذ المدرّع وGRP والزجاج المضاد للرصاص لمشاريع الدفاع والأمن.' },
      { id: 'oilgas', title: 'النفط والغاز', desc: 'منتجات من GRP والفولاذ الكربوني وSS316L وHDPE مصمّمة لتطبيقات النفط والغاز.' },
    ],
  },
  partners: {
    kicker: 'شركاؤنا',
    title: 'علامات نعمل معها',
    viewAll: 'عرض الكل',
    note: 'أضف شعارات شركائك الحقيقيين إلى /public/partners — لا تُدرج علامة لست مخوّلاً بتمثيلها.',
  },
  presence: {
    kicker: 'شركات المجموعة',
    title: 'شركاتنا',
    viewAll: 'اتصل بنا', locationsLabel: 'الشركات',
    items: [
      { country: 'Builders Solutions Inc.', projects: 'الولايات المتحدة · +1 901-850-4031' },
      { country: 'Builders Solutions FZ LLC', projects: 'الإمارات · +971 50 477 8537' },
      { country: 'Emaar Builders Solutions', projects: 'البحرين · +973 3468 5656' },
      { country: 'Allied Gulf Construction W.L.L', projects: 'البحرين · alliedgulf.me' },
      { country: 'Gulf Construction Solutions L.L.C', projects: 'السعودية · gcs.sa' },
    ],
  },
  why: {
    kicker: 'لماذا نحن',
    title: 'لماذا بيلدرز سوليوشنز',
    items: [
      { title: 'توريد معتمد', desc: 'استيراد مباشر من مصنّعين معتمدين مع توثيق كامل.' },
      { title: 'انتشار إقليمي', desc: 'توريد ودعم في البحرين والإمارات والسعودية والولايات المتحدة.' },
      { title: 'خبرة فنية', desc: 'إرشاد من المناقصة وجداول الكميات حتى التركيب.' },
      { title: 'تسليم في الوقت', desc: 'توريد موثوق يبقي مشروعك ضمن الجدول الزمني.' },
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
    title: 'هل أنت مستعد لبدء مشروعك؟',
    text: 'تحدّث مع فريقنا — المنتجات المناسبة وتوثيق كامل وتسليم في الوقت المحدد في الخليج.',
    button: 'اطلب عرض سعر',
  },
  footer: {
    tagline: 'مورّد متعدد الجنسيات لمواد تشطيب البناء الفاخرة. البحرين · الإمارات · السعودية · الولايات المتحدة.',
    quickLinks: 'روابط سريعة', servicesCol: 'الخدمات', productsCol: 'المنتجات',
    locationsCol: 'الشركات', contactCol: 'اتصل بنا', rights: 'جميع الحقوق محفوظة.',
    headOffice: 'المكتب الرئيسي — البحرين', address: 'البحرين · الإمارات · السعودية · الولايات المتحدة', phone: '+973 3468 5656', email: 'trade@thebuilderssolutions.com',
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
