const revealItems = document.querySelectorAll('.reveal');
const productImages = document.querySelectorAll('.hero-product');
const viewButtons = document.querySelectorAll('.view-dots button');
const parallaxStage = document.querySelector('[data-parallax]');
const cursorGlow = document.querySelector('.cursor-glow');
const tiltCards = document.querySelectorAll('.tilt-card');
const videoModal = document.querySelector('[data-video-modal]');
const videoPlayer = document.querySelector('[data-video-player]');
const videoFallback = document.querySelector('[data-video-fallback]');
const videoCloseButtons = document.querySelectorAll('[data-video-close]');
const videoModalEyebrow = document.querySelector('[data-video-modal-eyebrow]');
const videoModalTitle = document.querySelector('[data-video-modal-title]');
const videoFallbackSrc = document.querySelector('[data-video-fallback-src]');
const navMenus = document.querySelectorAll('.nav-menu');
const seriesCards = document.querySelectorAll('[data-series-card]');
const languageToggle = document.querySelector('[data-language-toggle]');
const languageCurrent = document.querySelector('[data-language-current]');
const launchIntro = document.querySelector('[data-launch-intro]');
const launchSkip = document.querySelector('[data-launch-skip]');
const contactFloat = document.querySelector('[data-contact-float]');
const contactToggle = document.querySelector('[data-contact-toggle]');
const contactClose = document.querySelector('[data-contact-close]');

const inquiryEmailConfig = {
  recipientEmail: '2949799538@qq.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/2949799538@qq.com',
  emailJsPublicKey: '',
  emailJsServiceId: '',
  emailJsTemplateId: '',
};

let activeProduct = 0;
let productTimer;
let pinnedNavMenu = null;
let navCloseTimer;
let pinnedSeriesCard = null;
let launchTimer;
let homeEnterTimer;
let contactScrollTimer;
let contactScrollRaf;
let lastContactScrollY = window.scrollY;

function closeLaunchIntro() {
  if (!launchIntro || launchIntro.classList.contains('is-exiting')) return;
  window.clearTimeout(launchTimer);
  window.clearTimeout(homeEnterTimer);
  launchIntro.classList.add('is-exiting');
  document.body.classList.remove('intro-lock');
  homeEnterTimer = window.setTimeout(() => {
    document.body.classList.add('home-enter-active');
  }, 520);
  window.setTimeout(() => {
    launchIntro.hidden = true;
  }, 940);
  window.setTimeout(() => {
    document.body.classList.remove('home-preenter');
  }, 1600);
}

if (launchIntro) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    launchIntro.hidden = true;
  } else {
    document.body.classList.add('intro-lock', 'home-preenter');
    launchTimer = window.setTimeout(closeLaunchIntro, 3600);
    launchSkip?.addEventListener('click', closeLaunchIntro);
  }
}

function setContactFloat(open) {
  if (!contactFloat || !contactToggle) return;
  contactFloat.classList.toggle('open', open);
  contactToggle.setAttribute('aria-expanded', String(open));
}

contactToggle?.addEventListener('click', () => {
  setContactFloat(!contactFloat?.classList.contains('open'));
});

contactClose?.addEventListener('click', () => {
  setContactFloat(false);
});

document.addEventListener('pointerdown', (event) => {
  if (contactFloat && contactFloat.classList.contains('open') && !contactFloat.contains(event.target)) {
    setContactFloat(false);
  }
});

function syncContactFloatScroll() {
  if (!contactFloat) return;
  const currentY = window.scrollY;
  const delta = Math.max(-1, Math.min(1, currentY - lastContactScrollY));
  lastContactScrollY = currentY;
  contactFloat.classList.add('is-scrolling');
  contactFloat.style.setProperty('--contact-shift', `${delta * 10}px`);
  contactFloat.style.setProperty('--contact-scale', '0.985');
  window.clearTimeout(contactScrollTimer);
  contactScrollTimer = window.setTimeout(() => {
    contactFloat.classList.remove('is-scrolling');
    contactFloat.style.setProperty('--contact-shift', '0px');
    contactFloat.style.setProperty('--contact-scale', '1');
  }, 150);
}

window.addEventListener(
  'scroll',
  () => {
    if (!contactFloat || contactScrollRaf) return;
    contactScrollRaf = window.requestAnimationFrame(() => {
      contactScrollRaf = 0;
      syncContactFloatScroll();
    });
  },
  { passive: true },
);

const textTranslations = {
  磐宏: 'Panhiro',
  首页: 'Home',
  首屏: 'Top',
  产品入口: 'Product guide',
  询盘: 'Inquiry',
  关于我们: 'About',
  公司简介: 'Company profile',
  企业实力: 'Capability',
  产品中心: 'Products',
  产品总览: 'Product overview',
  服务支持: 'Support',
  服务总览: 'Support overview',
  售后视频: 'Service videos',
  授权店铺: 'Authorized stores',
  维修网点: 'Repair network',
  下载专区: 'Downloads',
  联系我们: 'Contact',
  表单咨询: 'Contact form',
  联系: 'Contact',
  展开联系方式: 'Open contact options',
  收起联系方式: 'Close contact options',
  快速联系: 'Quick contact',
  电话咨询: 'Phone',
  企业微信二维码: 'WeCom QR code',
  抖音店铺二维码: 'Douyin shop QR code',
  企业微信: 'WeCom',
  抖音店铺: 'Douyin shop',
  获取产品手册: 'Get catalog',
  磐宏清洗设备: 'Panhiro Cleaning Equipment',
  '永磁变频高压清洗机，专为高效清洁而生': 'Permanent-magnet inverter pressure washers built for efficient cleaning',
  '从 P4/P5 入门家用手提款，到 PH 系列高级家用与半商用机型，再到 VK 系列商用级和清洗机爱好者产品，\n            磐宏按不同使用需求提供清晰选型。其中 VK-Y1 主打新能源汽车外放电与永磁变频技术，是移动清洗和高频使用场景的重点推荐款。':
    'From P4/P5 entry-level handheld models, to PH advanced home and semi-commercial machines, to VK commercial-grade products for enthusiasts, Panhiro makes product selection clear by use case. VK-Y1 highlights EV power output and permanent-magnet inverter technology for mobile and high-frequency cleaning.',
  查看产品系列: 'View product series',
  咨询合作: 'Contact us',
  '级需求选型': 'need levels',
  外放电主推: 'EV output highlight',
  新能源外放电: 'EV power output',
  主推产品: 'Featured model',
  '永磁变频 · 商用级高压清洗机': 'Inverter PM motor · Commercial-grade washer',
  外放电主推: 'EV output highlight',
  '效率提升 50%': '50% efficiency gain',
  新能源车供电: 'Powered by EV output',
  商用与极客玩家: 'Commercial & enthusiast',
  入门家用手提款: 'Entry home handheld',
  按需求选型: 'Choose by need',
  '从入门家用到商用玩家，按使用强度分级选择': 'Choose by usage intensity, from home entry to commercial enthusiasts',
  'P4/P5 适合入门家用和轻量手提清洗；PH 系列面向高级家用与半商用场景；VK 系列适合商用高频使用和清洗机爱好者。\n            VK-Y1 单独作为主推款，重点突出外放电、永磁变频和移动清洗能力。':
    'P4/P5 are for entry-level home and lightweight handheld cleaning. PH series serves advanced home and semi-commercial use. VK series is for commercial high-frequency use and pressure-washer enthusiasts. VK-Y1 is featured separately for EV power output, PM inverter control, and mobile cleaning.',
  入门家用: 'Entry home',
  'P4 / P5 手提款': 'P4 / P5 handheld',
  '适合家庭洗车、庭院小面积冲洗、户外用品清洁和首次购买用户。重点是轻便、好收纳、上手门槛低。':
    'For home car washing, small yard cleaning, outdoor gear, and first-time users. Lightweight, easy to store, and easy to start.',
  轻量: 'Lightweight',
  手提: 'Handheld',
  入门家用系列: 'Entry home series',
  '点击窗口常驻，滚动自动收起': 'Click to pin, scroll to collapse',
  '入门家用 · 点击播放视频': 'Entry home · Click to play',
  查看手提款系列详情: 'View handheld series details',
  '高级家用 / 半商用': 'Advanced home / Semi-commercial',
  'PH 系列': 'PH series',
  '适合更稳定的家庭进阶清洗、小型门店、物业备用和中等频率使用。比手提款更稳，也不必一步到商用级。':
    'For advanced home cleaning, small stores, property backup, and medium-frequency use. More stable than handheld models without jumping to commercial grade.',
  'PH-0885 与 PH-0995 同模具，均为感应无刷电机；0885 配 1407 泵头，0995 升级 1408 泵头，按功率、压力和流量区分。':
    'PH-0885 and PH-0995 share the same mold and both use an induction brushless motor. 0885 uses a 1407 pump head, while 0995 upgrades to a 1408 pump head, with differences in power, pressure, and flow.',
  查看该系列型号: 'View series models',
  基础款详情: 'Base model details',
  升级款详情: 'Upgrade model details',
  '1800W · 85Bar · 1407 泵头': '1800W · 85Bar · 1407 pump head',
  '2200W · 95Bar · 1408 泵头': '2200W · 95Bar · 1408 pump head',
  '商用级 / 极客玩家': 'Commercial / Enthusiast',
  'VK 系列': 'VK series',
  '适合专业清洗渠道、门店高频使用，以及对压力表现、耐用结构和设备质感更敏感的清洗机爱好者。':
    'For professional channels, high-frequency store use, and enthusiasts who care about pressure, durability, and machine feel.',
  点击产品播放视频或查看详情: 'Click a product to play video or view details',
  商用级平台款: 'Commercial platform model',
  点击播放视频: 'Click to play video',
  主推款: 'Featured',
  'VK-Y1 外放电永磁变频': 'VK-Y1 EV output PM inverter',
  '面向新能源车外放电、户外移动清洗和高频使用场景。永磁变频、省电低噪，是需要更强技术卖点时优先推荐的型号。':
    'For EV power output, outdoor mobile cleaning, and high-frequency use. PM inverter control delivers energy savings and lower noise for stronger technical appeal.',
  查看: 'View',
  '查看 VK-Y1': 'View VK-Y1',
  'EV 外放': 'EV output',
  永磁变频: 'PM inverter',
  '外放电 + 永磁变频': 'EV output + PM inverter',
  查看主推款详情: 'View featured model details',
  'VK-Y1 主推款': 'VK-Y1 featured model',
  '外放电 + 永磁变频，面向移动清洗和高频使用': 'EV output + PM inverter for mobile and high-frequency cleaning',
  'VK-Y1 主打新能源汽车外放电户外用电场景，搭载永磁无刷变频控制、黑橙工业外观、集成卷管器、\n            大号越野轮和外露高压泵。它适合移动洗车、户外清洗、门店高频使用，以及对设备性能有兴趣的进阶用户。':
    'VK-Y1 is built around EV power output for outdoor use, with permanent-magnet brushless inverter control, black-orange industrial styling, integrated hose reel, large wheels, and exposed high-pressure pump. It fits mobile car washing, outdoor cleaning, store use, and advanced users who care about performance.',
  永磁无刷电机: 'PM brushless motor',
  '16 档智能调速': '16-speed smart control',
  纯铜线圈: 'Pure copper coil',
  四核曲轴泵: 'Four-core crankshaft pump',
  宽电压: 'Wide voltage',
  '主推款，突出外放电与永磁变频': 'Featured for EV output and PM inverter',
  '黑橙工业风格，专业质感强': 'Black-orange industrial design',
  '效率提升 50%，省电更耐用': '50% efficiency gain, energy-saving and durable',
  高压曲轴泵: 'High-pressure crankshaft pump',
  集成卷管器: 'Integrated hose reel',
  变频控制: 'Inverter control',
  产品参数: 'Specifications',
  'VK-Y1 核心技术参数': 'VK-Y1 core specifications',
  核心技术: 'Core technology',
  应用场景: 'Applications',
  服务支持: 'Service support',
  企业实力: 'Company strength',
  联系我们: 'Contact us',
  返回首页: 'Back home',
  详细内容: 'Details',
  页面结构: 'Page structure',
  产品信息: 'Product info',
  采购支持: 'Procurement support',
  售后协同: 'After-sales support',
  姓名: 'Name',
  公司: 'Company',
  联系方式: 'Contact',
  产品意向: 'Product interest',
  留言: 'Message',
  提交咨询: 'Submit inquiry',
  '请输入您的姓名': 'Your name',
  请输入公司名称: 'Company name',
  '请输入电话 / 微信 / 邮箱': 'Phone / WeChat / Email',
  '数量、电压、插头类型、市场需求或配置要求': 'Quantity, voltage, plug type, market needs, or configuration requirements',
  台州磐宏机电有限公司: 'Taizhou Panhiro Electromechanical Co., Ltd.',
  关闭: 'Close',
  产品视频: 'Product video',
  'P5 产品视频': 'P5 product video',
  'P5 入门家用手提款预览': 'P5 entry home handheld preview',
  'VK-1011 产品视频': 'VK-1011 product video',
  'VK-1011 商用级高压清洗机预览': 'VK-1011 commercial pressure washer preview',
  'PH-0995 产品视频': 'PH-0995 product video',
  'PH-0995 高级家用 / 半商用预览': 'PH-0995 advanced home / semi-commercial preview',
  高压清洗机预览: 'Pressure washer preview',
  '查看磐宏清洗设备的产品、服务与合作信息。': 'Explore Panhiro products, service, and cooperation information.',
  '磐宏围绕不同使用强度、采购方式和售后需求，提供清晰的产品资料与合作支持。':
    'Panhiro provides clear product information and cooperation support for different usage intensities, procurement needs, and service requirements.',
  查看型号定位核心配置和适用场景: 'View positioning, core configuration, and applications',
  '查看型号定位、核心配置和适用场景。': 'View positioning, core configuration, and applications.',
  '根据数量、市场和配置需求沟通合作方案。': 'Discuss cooperation plans based on quantity, market, and configuration needs.',
  '提供安装、维护、资料下载和维修支持。': 'Installation, maintenance, downloads, and repair support.',
  '专注清洁设备智造与长期合作': 'Focused on cleaning equipment manufacturing and long-term cooperation',
  '生产、测试、资料与售后协同': 'Production, testing, documentation, and service coordination',
  '按使用强度和清洗需求选择设备': 'Choose equipment by usage intensity and cleaning needs',
  '外放电 + 永磁变频主推款': 'Featured EV output + PM inverter model',
  '商用级 VK 平台机型': 'Commercial-grade VK platform model',
  '商用级视频展示机型': 'Commercial-grade video showcase model',
  '高级家用 / 半商用基础款': 'Advanced home / semi-commercial base model',
  '高级家用 / 半商用升级款': 'Advanced home / semi-commercial upgrade model',
  入门家用手提款: 'Entry home handheld model',
  '让客户买得清楚，用得安心': 'Clear before purchase, reliable after use',
  '安装、维护、排查一看就懂': 'Installation, maintenance, and troubleshooting at a glance',
  '区域门店与渠道合作支持': 'Regional stores and channel cooperation support',
  '维修、保养与配件支持': 'Repair, maintenance, and parts support',
  '资料集中获取，采购沟通更高效': 'Centralized downloads for faster procurement communication',
  '告诉我们需求，获取合适方案': 'Tell us your needs and get the right solution',
  '台州磐宏机电有限公司专注高压清洗机、洗车机及清洁设备解决方案，为渠道客户和批量采购客户提供稳定产品支持。':
    'Taizhou Panhiro Electromechanical focuses on pressure washers, car washers, and cleaning equipment solutions for channel and bulk procurement customers.',
  '磐宏按使用需求划分产品：P4/P5 入门家用手提款，PH 系列高级家用与半商用，VK 系列商用级与清洗机爱好者产品，VK-Y1 作为外放电永磁变频主推款。':
    'Panhiro organizes products by use case: P4/P5 for entry home handheld use, PH for advanced home and semi-commercial use, VK for commercial and enthusiast users, and VK-Y1 as the featured EV output PM inverter model.',
  'VK-Y1 是磐宏外放电永磁变频主推款，适合移动清洗、高频使用、商用门店和清洗机爱好者。':
    'VK-Y1 is Panhiro’s featured EV output PM inverter model for mobile cleaning, high-frequency use, commercial stores, and enthusiasts.',
  'VK-1010-P4 面向商用级清洗和极客清洗机爱好者，适合需要专业外观、稳定输出和更高使用强度的客户。':
    'VK-1010-P4 is for commercial-grade cleaning and enthusiast users who need professional styling, stable output, and higher usage intensity.',
  'VK-1011 是 VK 商用级系列的视频展示款，适合专业渠道、商用清洗和清洗机爱好者选型。':
    'VK-1011 is a video-showcase model in the commercial VK series for professional channels, commercial cleaning, and enthusiasts.',
  'PH-0885 属于高级家用与半商用基础款，适合更稳定的家庭洗车、庭院清洁和中等频率使用。':
    'PH-0885 is the base advanced home and semi-commercial model for stable home car washing, yard cleaning, and medium-frequency use.',
  'PH-0995 是高级家用与半商用升级款，适合更高强度清洁和更进阶的家庭、门店、物业需求。':
    'PH-0995 is the upgraded advanced home and semi-commercial model for stronger cleaning and more demanding home, store, and property needs.',
  'PH-0885 与 PH-0995 采用同一模具，配置 1407 泵头，额定功率 1800W，出水压力 85Bar，适合中等频率清洁需求。':
    'PH-0885 shares the same mold as PH-0995, uses a 1407 pump head, has 1800W rated power and 85Bar outlet pressure, and fits medium-frequency cleaning needs.',
  'PH-0995 与 PH-0885 采用同一模具，升级 1408 泵头，额定功率 2200W，出水压力 95Bar，适合更高强度清洁需求。':
    'PH-0995 shares the same mold as PH-0885, upgrades to a 1408 pump head, has 2200W rated power and 95Bar outlet pressure, and fits higher-intensity cleaning needs.',
  'PH-0885 和 PH-0995 是同模具平台，外观结构一致，主要通过功率、压力、流量和泵头型号区分。PH-0885 使用 1407 泵头，额定功率 1800W，出水压力 85Bar，出水流量 8-8.5L/min，适合作为 PH 系列基础款承接家庭进阶、小型门店和物业备用需求。':
    'PH-0885 and PH-0995 share the same mold platform and exterior structure. They are mainly differentiated by power, pressure, flow, and pump-head model. PH-0885 uses a 1407 pump head, with 1800W rated power, 85Bar outlet pressure, and 8-8.5L/min flow, making it the base PH model for advanced home use, small stores, and property backup needs.',
  'PH-0995 与 PH-0885 属于同模具平台，外观结构一致，定位为 PH 系列升级款。它使用 1408 泵头，额定功率 2200W，出水压力 95Bar，出水流量 8.5-9L/min，在同样的机身基础上提供更高输出，更适合更高强度的家庭、门店和物业清洁。':
    'PH-0995 shares the same mold platform and exterior structure as PH-0885, positioned as the upgraded PH model. It uses a 1408 pump head, with 2200W rated power, 95Bar outlet pressure, and 8.5-9L/min flow, delivering higher output from the same body for more demanding home, store, and property cleaning.',
  '额定电压 220V / 50Hz，额定功率 1800W': 'Rated voltage 220V / 50Hz, rated power 1800W',
  '出水压力 85Bar，出水流量 8-8.5L/min': 'Outlet pressure 85Bar, flow 8-8.5L/min',
  '感应无刷电机，配置 1407 泵头': 'Induction brushless motor with 1407 pump head',
  同模具平台: 'Shared mold platform',
  '与 PH-0995 使用同一机身模具，便于渠道统一展示、备货和产品说明。':
    'Uses the same body mold as PH-0995, making channel display, stocking, and product explanation easier.',
  基础配置: 'Base configuration',
  '1800W、85Bar、8-8.5L/min，适合中等频率家庭清洁、小门店和物业备用。':
    '1800W, 85Bar, and 8-8.5L/min for medium-frequency home cleaning, small stores, and property backup.',
  泵头差异: 'Pump-head difference',
  'PH-0885 配置 1407 泵头；PH-0995 则升级为 1408 泵头，用于更高输出需求。':
    'PH-0885 uses a 1407 pump head; PH-0995 upgrades to a 1408 pump head for higher output needs.',
  '额定电压 220V / 50Hz，额定功率 2200W': 'Rated voltage 220V / 50Hz, rated power 2200W',
  '出水压力 95Bar，出水流量 8.5-9L/min': 'Outlet pressure 95Bar, flow 8.5-9L/min',
  '感应无刷电机，配置 1408 泵头': 'Induction brushless motor with 1408 pump head',
  同模具升级: 'Shared mold upgrade',
  '与 PH-0885 同一机身模具，便于形成基础款与升级款组合销售。':
    'Uses the same body mold as PH-0885, making it easy to sell as a base and upgraded pair.',
  更高输出: 'Higher output',
  '2200W、95Bar、8.5-9L/min，相比 PH-0885 更适合中高强度作业。':
    '2200W, 95Bar, and 8.5-9L/min, better suited than PH-0885 for medium-to-high intensity work.',
  'PH-0995 配置 1408 泵头；PH-0885 使用 1407 泵头，便于按预算和强度区分。':
    'PH-0995 uses a 1408 pump head; PH-0885 uses a 1407 pump head, making them easy to separate by budget and intensity.',
  'P4 与 P5 是入门家用手提款，适合轻量清洗、移动使用、零售展示和紧凑收纳需求。':
    'P4 and P5 are entry home handheld models for light cleaning, mobile use, retail display, and compact storage.',
  '欢迎咨询产品选型、批量采购、渠道代理、OEM/ODM 和售后支持。':
    'Contact us for product selection, bulk procurement, channel agency, OEM/ODM, and after-sales support.',
  '合作方向：': 'Cooperation: ',
  '响应内容：': 'Response: ',
  '渠道代理、OEM/ODM、批量采购、售后支持': 'Channel agency, OEM/ODM, bulk procurement, after-sales support',
  '产品目录、配置建议、报价资料、样机沟通': 'Catalogs, configuration advice, quotations, sample communication',
  '产品咨询、批量采购、渠道代理和定制需求。': 'Product inquiries, bulk procurement, channel agency, and customization.',
  '主营方向：高压清洗机、洗车机及相关清洁设备': 'Main focus: pressure washers, car washers, and related cleaning equipment',
  '产品覆盖：入门家用、高级家用、半商用、商用级和外放电主推款': 'Product coverage: entry home, advanced home, semi-commercial, commercial, and EV-output featured models',
  '合作方式：渠道代理、OEM/ODM、批量采购、样机沟通': 'Cooperation: channel agency, OEM/ODM, bulk procurement, and sample discussion',
  '定制范围：Logo、颜色、包装、电压、插头及配置方案': 'Customization: logo, color, packaging, voltage, plug, and configuration plans',
  '交付支持：产品资料、安装说明、售后视频、配件维修协同': 'Delivery support: product materials, installation instructions, service videos, parts and repair coordination',
  '质检流程：装配检查、出厂测试、包装复核、批量一致性管控': 'Quality control: assembly inspection, factory testing, packaging review, and batch consistency control',
  '告诉我们您的市场、产品需求、预期数量及配置要求，我们将为您准备相关产品资料以供参考。':
    'Tell us your market, product needs, expected quantity, and configuration requirements. We will prepare relevant product materials for reference.',
  '咨询产品信息，洽谈合作事项': 'Ask about products and discuss cooperation',
  'VK-Y1 外放电主推款详情': 'VK-Y1 EV output featured model',
  'VK-1010-P4 / VK-1011 商用级系列': 'VK-1010-P4 / VK-1011 commercial series',
  'PH-0885 高级家用 / 半商用': 'PH-0885 advanced home / semi-commercial',
  'PH-0995 高级家用 / 半商用升级': 'PH-0995 advanced home / semi-commercial upgrade',
  'P4 / P5 入门家用手提款': 'P4 / P5 entry home handheld',
  全系列产品目录: 'Full product catalog',
};

const supplementalTranslations = {
  中: 'CN',
  主导航: 'Main navigation',
  磐宏首页: 'Panhiro home',
  产品视图切换: 'Product view switcher',
  '视图 1': 'View 1',
  '视图 2': 'View 2',
  '视图 3': 'View 3',
  产品亮点: 'Product highlights',
  关闭视频: 'Close video',
  页面详情: 'Page details',
  '磐宏清洗设备 | 永磁变频高压清洗机制造商': 'Panhiro Cleaning Equipment | PM inverter pressure washer manufacturer',
  '磐宏（Panhiro）高压清洗机覆盖入门家用手提款、高级家用与半商用 PH 系列、商用级 VK 系列，并以 VK-Y1 永磁变频外放电机型作为主推产品。':
    'Panhiro pressure washers cover entry-level handheld home models, advanced home and semi-commercial PH models, commercial VK models, and the VK-Y1 EV-output PM inverter flagship.',
  '磐宏清洗设备子页面模板。': 'Panhiro cleaning equipment detail page template.',

  产品品牌: 'Brand',
  磐宏洗车机: 'Panhiro car washer',
  额定电压: 'Rated voltage',
  额定功率: 'Rated power',
  出水压力: 'Outlet pressure',
  出水流量: 'Outlet flow',
  电机类型: 'Motor type',
  工作效率: 'Efficiency',
  调速档位: 'Speed control',
  启动电流: 'Starting current',
  机身重量: 'Machine weight',
  防护等级: 'Protection',
  智能保护: 'Smart protection',
  进水模式: 'Water intake',
  喷头套装: 'Nozzle set',
  卷管器: 'Hose reel',
  移动设计: 'Mobility design',
  清洁半径: 'Cleaning radius',
  三种款式: 'Three styles',
  'VK-Y1 核心参数': 'VK-Y1 core specs',
  'VK-Y1 标配附件': 'VK-Y1 standard accessories',
  '永磁变频电机，纯铜线圈': 'PM inverter motor with pure copper coil',
  '效率提升约 50%': 'Efficiency improved by about 50%',
  '16 档调速（1600-2600 转）': '16-speed control, 1600-2600 rpm',
  '软启动控制，适配新能源汽车外放电': 'Soft-start control for EV power output',
  '约 24.5kg': 'About 24.5kg',
  '钣金外壳，全局防水喷淋防护': 'Sheet-metal shell with full spray-water protection',
  '过压、过流、过温、缺相、堵转、通信故障等多重保护，异常自动停机':
    'Multiple protections for over-voltage, over-current, over-temperature, phase loss, rotor lock, and communication faults; automatic shutdown on abnormal conditions',
  '桶式自吸进水，不受固定水源限制': 'Bucket self-priming intake without fixed-water-source limits',
  '0°、15°、25°、40° 四种喷头，适配不同清洗面积': '0°, 15°, 25°, and 40° nozzles for different cleaning areas',
  '商用级卷轴式绕线盘，摇杆灵活，便于收纳水管': 'Commercial reel with smooth crank for easy hose storage',
  '20cm 大号越野轮，防滑耐磨，轻松推拉': '20cm large all-terrain wheels, anti-slip, wear-resistant, easy to move',
  '最长可覆盖 5 米清洁半径': 'Covers up to a 5m cleaning radius',
  '手提式 / 推车式 / 推车式带卷管器': 'Handheld / trolley / trolley with hose reel',
  '永磁变频技术加持，效率提升 50%。以 110Bar 机型为例，每小时仅耗电 1.8 度，比定频机更省电， 更适合高频使用和移动清洗场景。':
    'With PM inverter technology, efficiency improves by 50%. Taking the 110Bar model as an example, it consumes only 1.8 kWh per hour, saving more energy than fixed-speed machines and fitting high-frequency and mobile cleaning.',
  '永磁变频技术加持，效率提升 50%。以 110Bar 机型为例，每小时仅耗电 1.8 度，比定频机更省电，\n            更适合高频使用和移动清洗场景。':
    'With PM inverter technology, efficiency improves by 50%. Taking the 110Bar model as an example, it consumes only 1.8 kWh per hour, saving more energy than fixed-speed machines and fitting high-frequency and mobile cleaning.',

  产品呈现: 'Product presentation',
  '先让买家看懂技术，再看参数': 'Help buyers understand the technology before the specs',
  永磁无刷变频电机: 'PM brushless inverter motor',
  新能源汽车外放电: 'EV power output',
  四核高压曲轴泵: 'Four-core high-pressure crankshaft pump',
  '钕铁硼永磁材料，效率更高，无励磁损耗。相比普通电机更轻、噪音更低，适合长时间高频清洗。':
    'NdFeB permanent-magnet material delivers higher efficiency with no excitation loss. It is lighter and quieter than ordinary motors, suitable for long high-frequency cleaning.',
  '软启动技术降低瞬时电流冲击，适配新能源汽车外放电场景，解决户外清洗无固定电源的问题。':
    'Soft-start technology reduces current surge, supports EV power output, and solves outdoor cleaning without fixed power.',
  '四轴向柱塞泵配合纯铜泵体，提供稳定高压水流，耐腐蚀、寿命长，顽固污渍也能快速冲净。':
    'Four axial plungers with a pure copper pump body provide stable high-pressure flow, corrosion resistance, long life, and fast removal of stubborn dirt.',
  '从设备选型到长期使用，提供完整清洁方案': 'A complete cleaning solution from selection to long-term use',
  '磐宏不仅提供高压清洗机整机，也可根据渠道销售、批量采购、户外移动清洗和售后维护需求， 配套产品资料、配置建议、样机沟通和定制合作支持。':
    'Panhiro provides complete pressure washers plus product materials, configuration advice, sample communication, and customization support for channel sales, bulk procurement, outdoor mobile cleaning, and after-sales maintenance.',
  '磐宏不仅提供高压清洗机整机，也可根据渠道销售、批量采购、户外移动清洗和售后维护需求，\n            配套产品资料、配置建议、样机沟通和定制合作支持。':
    'Panhiro provides complete pressure washers plus product materials, configuration advice, sample communication, and customization support for channel sales, bulk procurement, outdoor mobile cleaning, and after-sales maintenance.',
  '永磁变频技术，效率提升 50%，高频使用更省电': 'PM inverter technology improves efficiency by 50% and saves energy in high-frequency use',

  '全场景清洁，一机覆盖': 'One machine for all cleaning scenarios',
  '从家庭庭院到工业车间，磐宏高压清洗机覆盖多类清洁需求。': 'From home yards to industrial workshops, Panhiro pressure washers cover many cleaning needs.',
  车: 'Car',
  院: 'Yard',
  工: 'Work',
  拓: 'More',
  '家用 / 商用洗车': 'Home / commercial car washing',
  '庭院 / 路面冲洗': 'Yard / pavement washing',
  '工业 / 养殖清洁': 'Industrial / farming cleaning',
  特殊场景: 'Special scenarios',
  '高压水流强力冲洗车身污垢，搭配泡沫清洗效果更佳。': 'High-pressure water removes vehicle dirt, and foam cleaning improves results.',
  '清理青苔、泥渍、落叶，广角喷头覆盖更大面积。': 'Clean moss, mud, and leaves; wide-angle nozzles cover larger areas.',
  '冲洗设备油污、地面污渍、养殖栏舍，顽固污垢也能处理。': 'Wash equipment oil, floor stains, and livestock pens, including stubborn dirt.',
  '适用于农作物清洗、墙面清洁、空调外机清洁等多种需求。': 'Also suitable for crop washing, wall cleaning, outdoor AC units, and more.',

  '资料、售后、门店和维修支持集中响应': 'Centralized support for materials, service, stores, and repair',
  '从安装指导到配件维修，从产品手册到渠道门店信息，磐宏为客户提供清晰、稳定、可持续的服务支持。':
    'From installation guidance to parts repair, product manuals to channel store information, Panhiro provides clear, stable, and sustainable support.',
  '安装 & 售后视频': 'Installation & service videos',
  授权店铺: 'Authorized stores',
  维修网点: 'Repair network',
  下载专区: 'Downloads',
  '把安装演示、常见问题、维护教学做成统一入口，降低首次使用门槛。': 'Centralize installation demos, FAQs, and maintenance tutorials to make first use easier.',
  '展示区域合作门店、陈列标准和选购建议，适合承接本地化销售。': 'Show regional partner stores, display standards, and purchase advice for local sales.',
  '把维修、保养、配件支持放进一张网络，强化售后信任感。': 'Put repair, maintenance, and parts support into one network to build service trust.',
  '产品手册、规格书、目录图册、宣传物料统一归档，方便客户快速取用。': 'Manuals, spec sheets, catalogs, and marketing materials are archived for quick access.',

  '磐宏 Panhiro': 'Panhiro',
  专注清洁设备智造: 'Focused on cleaning equipment manufacturing',
  '台州磐宏机电有限公司专注研发制造高压清洗机、洗车机及清洁设备解决方案， 为专业市场提供可靠的清洁设备。':
    'Taizhou Panhiro Electromechanical focuses on R&D and manufacturing of pressure washers, car washers, and cleaning equipment solutions for professional markets.',
  '台州磐宏机电有限公司专注研发制造高压清洗机、洗车机及清洁设备解决方案，\n            为专业市场提供可靠的清洁设备。':
    'Taizhou Panhiro Electromechanical focuses on R&D and manufacturing of pressure washers, car washers, and cleaning equipment solutions for professional markets.',
  生产能力: 'Production capability',
  产品资料: 'Product materials',
  定制服务: 'Customization service',
  '产品组装、测试、包装、发货准备全流程管控。': 'Full-process control for assembly, testing, packaging, and shipment preparation.',
  '产品图片、目录、规格参数及市场推广物料一应俱全。': 'Product images, catalogs, specifications, and marketing materials are available.',
  'Logo、颜色、包装、插头、电压及配置方案均可灵活定制。': 'Logo, color, packaging, plug, voltage, and configurations can be customized.',
  '制造、测试、交付一体化支持': 'Integrated manufacturing, testing, and delivery support',
  '围绕高压清洗设备生产，持续完善研发、装配、检测、包装和售后协同能力。':
    'Around pressure washer production, Panhiro keeps improving R&D, assembly, inspection, packaging, and service coordination.',

  'P4 / P5 系列产品': 'P4 / P5 series products',
  'PH 系列产品': 'PH series products',
  'VK 系列产品': 'VK series products',
  'VK-Y1 主推产品': 'VK-Y1 featured product',
  'P5 入门家用手提款': 'P5 entry home handheld model',
  'P4 手提款系列': 'P4 handheld series',
  'PH 系列高压清洗机': 'PH series pressure washer',
  'PH-0885 高压清洗机': 'PH-0885 pressure washer',
  'PH-0995 高压清洗机': 'PH-0995 pressure washer',
  'VK 系列商用级高压清洗机': 'VK series commercial pressure washer',
  'VK-1010-P4 高压清洗机': 'VK-1010-P4 pressure washer',
  'VK-1011 高压清洗机': 'VK-1011 pressure washer',
  'VK-Y1 高压清洗机': 'VK-Y1 pressure washer',
  'VK-Y1 高压清洗机侧面图': 'VK-Y1 pressure washer side view',
  '磐宏 VK-Y1 高压清洗机': 'Panhiro VK-Y1 pressure washer',
  '磐宏 VK-Y1 正面视图': 'Panhiro VK-Y1 front view',
  '磐宏 VK-Y1 侧面视图': 'Panhiro VK-Y1 side view',
  '磐宏高压清洗机': 'Panhiro pressure washer',
  '磐宏高压清洗设备': 'Panhiro pressure cleaning equipment',
  '磐宏产品总览': 'Panhiro product overview',
  '磐宏服务支持': 'Panhiro service support',
  '磐宏资料下载': 'Panhiro downloads',
  '磐宏产品咨询': 'Panhiro product inquiry',
  '磐宏售后视频支持': 'Panhiro service video support',
  '磐宏授权店铺支持': 'Panhiro authorized store support',
  '磐宏维修网点支持': 'Panhiro repair network support',
  '磐宏 Panhiro 品牌标识': 'Panhiro brand mark',
  'VK-Y1 永磁变频高压清洗机': 'VK-Y1 PM inverter pressure washer',
  磐宏开场动画: 'Panhiro opening animation',
  跳过: 'Skip',
  永磁变频清洗系统: 'PM inverter cleaning system',
  高压启动: 'High Pressure Start',
  清洁登场: 'Cleaning Takes Stage',
  '高压启动，清洁登场': 'High pressure starts. Cleaning takes the stage.',
  '外放电 · 永磁变频 · 商用级清洗设备': 'EV output · PM inverter · Commercial cleaning equipment',
  'VK-1010-P4 专业清洗机型': 'VK-1010-P4 professional cleaning model',
  'P4 P5 入门家用手提清洗设备': 'P4/P5 entry home handheld cleaning equipment',
  'PH-0885 高级家用半商用高压清洗机': 'PH-0885 advanced home and semi-commercial pressure washer',
  'PH-0995 高级家用半商用升级款高压清洗机': 'PH-0995 upgraded advanced home and semi-commercial pressure washer',

  产品制造: 'Product manufacturing',
  渠道协同: 'Channel coordination',
  定制合作: 'Custom cooperation',
  整机装配: 'Complete machine assembly',
  性能测试: 'Performance testing',
  核心动力: 'Core power',
  清洗效率: 'Cleaning efficiency',
  移动使用: 'Mobile use',
  商用定位: 'Commercial positioning',
  使用场景: 'Use scenarios',
  展示友好: 'Display friendly',
  专业外观: 'Professional appearance',
  采购沟通: 'Procurement communication',
  便携收纳: 'Portable storage',
  轻量场景: 'Lightweight scenarios',
  销售展示: 'Sales display',
  资料支持: 'Material support',
  售后指导: 'Service guidance',
  维修协同: 'Repair coordination',
  新机安装: 'New machine installation',
  日常维护: 'Routine maintenance',
  故障排查: 'Troubleshooting',
  门店展示: 'Store display',
  渠道支持: 'Channel support',
  区域服务: 'Regional service',
  故障登记: 'Fault registration',
  配件支持: 'Parts support',
  保养建议: 'Maintenance advice',
  产品手册: 'Product manual',
  规格书: 'Specification sheet',
  售后文件: 'Service documents',
  选型沟通: 'Model selection discussion',
  资料获取: 'Material access',
  合作推进: 'Cooperation follow-up',

  '主营高压清洗机、洗车机及相关清洁设备': 'Main products include pressure washers, car washers, and related cleaning equipment',
  '支持渠道代理、批量采购、OEM/ODM 等合作方式': 'Supports channel agency, bulk procurement, OEM/ODM, and other cooperation models',
  '可提供产品图片、目录、参数资料和配置建议': 'Provides product images, catalogs, specs, and configuration advice',
  '产品线覆盖入门家用、高级家用、半商用、商用级和外放电主推款': 'Product lines cover entry home, advanced home, semi-commercial, commercial, and EV-output featured models',
  '支持安装说明、售后视频、规格资料和配件沟通': 'Supports installation instructions, service videos, spec materials, and parts communication',
  '面向批量采购客户提供配置和交付方案沟通': 'Provides configuration and delivery planning for bulk procurement customers',
  'P4/P5：入门家用手提款，适合轻量清洗和紧凑收纳': 'P4/P5: entry home handheld models for light cleaning and compact storage',
  'PH-0885 / PH-0995：高级家用与半商用，适合更稳定、更高频的清洁需求':
    'PH-0885 / PH-0995: advanced home and semi-commercial models for steadier, higher-frequency cleaning',
  'VK-1010-P4 / VK-1011：商用级与极客玩家产品，VK-Y1 单独主打外放电和永磁变频':
    'VK-1010-P4 / VK-1011: commercial and enthusiast models; VK-Y1 separately highlights EV output and PM inverter technology',
  '永磁无刷电机，效率更高，运行更安静': 'PM brushless motor for higher efficiency and quieter operation',
  '16 档智能调速，适配不同清洗强度': '16-speed smart control for different cleaning intensities',
  '支持新能源车外放电，户外移动清洗更灵活': 'Supports EV power output for more flexible outdoor mobile cleaning',
  '适合商用清洗、门店陈列和高频使用': 'Suitable for commercial cleaning, store display, and high-frequency use',
  '面向对压力、耐用度和专业外观更敏感的客户': 'For customers sensitive to pressure, durability, and professional appearance',
  '可与 VK-1011、VK-Y1 组成完整 VK 商用级产品线': 'Completes the VK commercial lineup with VK-1011 and VK-Y1',
  '配套产品视频，便于客户了解外观和使用感': 'Product videos help customers understand appearance and use experience',
  '适合门店、商用清洗和专业渠道销售': 'Suitable for stores, commercial cleaning, and professional channel sales',
  '可与 VK-1010-P4、VK-Y1 形成完整 VK 商用级组合': 'Forms a complete VK commercial combination with VK-1010-P4 and VK-Y1',
  '体积更紧凑，适合零售和家庭入门场景': 'Compact size for retail and entry-level home use',
  '移动使用方便，降低首次使用门槛': 'Easy to move and lowers the first-use barrier',
  'P5 配套多角度图和视频，适合线上展示': 'P5 includes multi-angle images and video for online display',
  '产品手册、规格书和宣传资料可统一沟通获取': 'Manuals, spec sheets, and promotional materials can be requested together',
  '安装、维护和常见问题可通过视频降低使用门槛': 'Videos reduce barriers for installation, maintenance, and common issues',
  '维修、配件和渠道门店信息可按区域继续完善': 'Repair, parts, and channel store information can be improved by region',
  '安装演示：开箱、连接、进水、通电和试机': 'Installation demo: unboxing, connection, water intake, power-on, and test run',
  '维护教学：喷头清理、管路检查、泵体保养和收纳': 'Maintenance: nozzle cleaning, pipe inspection, pump care, and storage',
  '问题排查：不出水、压力不足、异常停机等常见情况': 'Troubleshooting: no water, low pressure, abnormal shutdown, and other common issues',
  '展示区域门店、联系方式和服务范围': 'Show regional stores, contact details, and service coverage',
  '支持样机体验、选型咨询和购买建议': 'Supports sample experience, model selection advice, and purchase guidance',
  '可用于承接本地化售后和配件沟通': 'Can support local after-sales and parts communication',
  '支持设备故障咨询、配件沟通和维修指引': 'Supports fault consultation, parts communication, and repair guidance',
  '建议客户提供型号、购买时间、故障现象和现场照片/视频': 'Suggest customers provide model, purchase time, fault symptoms, and photos/videos',
  '可按区域持续完善维修点和服务联系人': 'Repair sites and service contacts can be improved by region',
  '产品目录：全系列型号、定位和应用场景': 'Catalog: full series, positioning, and applications',
  '规格资料：压力、流量、功率、附件和包装信息': 'Specs: pressure, flow, power, accessories, and packaging information',
  '售后资料：安装说明、维护指南和常见问题': 'Service materials: installation instructions, maintenance guide, and FAQs',
  '产品咨询：型号、参数、附件、视频和图片资料': 'Product inquiry: models, specs, accessories, videos, and images',
  '合作咨询：渠道代理、批量采购、OEM/ODM 定制': 'Cooperation inquiry: channel agency, bulk procurement, OEM/ODM customization',
  '售后咨询：安装、维护、配件和维修支持': 'Service inquiry: installation, maintenance, parts, and repair support',
};

const remainingTranslations = {
  交付支持: 'Delivery support',
  合作方式: 'Cooperation model',
  '宽电压 60-260V': 'Wide voltage 60-260V',
  '磐宏清洗设备 | 页面详情': 'Panhiro Cleaning Equipment | Page details',
  'VK-Y1 外放电永磁变频高压清洗机': 'VK-Y1 EV-output PM inverter pressure washer',

  '用于安装、保养、维修和客户服务。': 'For installation, maintenance, repair, and customer service.',
  '根据使用场景和预算推荐合适型号。': 'Recommend suitable models by use case and budget.',
  '用短视频方式解释常见问题，减少沟通成本。': 'Explain common issues with short videos to reduce communication costs.',
  '按区域承接客户咨询、安装说明和售后协调。': 'Handle customer consultation, installation guidance, and service coordination by region.',
  '提供目录、规格书、图片、视频和配置说明。': 'Provide catalogs, spec sheets, images, videos, and configuration notes.',
  '更适合空间有限、移动频繁和低门槛清洗需求。': 'Better for limited space, frequent movement, and low-barrier cleaning needs.',
  '围绕配件、保养和维修需求建立清晰响应入口。': 'Create a clear response entry for parts, maintenance, and repair needs.',
  '说明使用后排水、收管、清洁和存放注意事项。': 'Explain draining, hose storage, cleaning, and storage after use.',
  '用于快速了解产品矩阵、型号定位和核心卖点。': 'For quickly understanding the product matrix, model positioning, and key selling points.',
  '用于采购对比、门店销售、电商上架和内部选型。': 'For procurement comparison, store sales, ecommerce listings, and internal selection.',
  '帮助客户按步骤完成水路、电源、喷枪和附件连接。': 'Help customers connect water lines, power, spray guns, and accessories step by step.',
  '围绕数量、交期、包装、定制和售后要求继续沟通。': 'Continue discussion around quantity, lead time, packaging, customization, and service requirements.',
  '可根据客户目标市场匹配附件、包装和批量交付方案。': 'Match accessories, packaging, and bulk delivery plans to the customer’s target market.',
  '为合作门店提供产品资料、陈列建议和销售话术素材。': 'Provide partner stores with product materials, display advice, and sales talking points.',
  '产品形态直观，适合电商页面、门店陈列和短视频展示。': 'The product form is intuitive, suitable for ecommerce pages, store displays, and short videos.',
  '通过安装视频、维护说明和常见问题帮助用户快速上手。': 'Help users get started quickly with installation videos, maintenance notes, and FAQs.',
  '展示授权门店信息，方便客户找到附近购买或咨询入口。': 'Show authorized store information so customers can find nearby purchase or consultation points.',
  '围绕喷枪、水管、喷头、接头、泵体等部件提供沟通入口。': 'Provide communication entries for spray guns, hoses, nozzles, connectors, pump bodies, and other parts.',
  '面向洗车门店、物业保洁、庭院深度清洁和中高频冲洗需求。': 'For car wash stores, property cleaning, deep yard cleaning, and medium-to-high frequency washing.',
  '可按市场需求沟通包装、配置、电压、插头和批量采购方案。': 'Discuss packaging, configuration, voltage, plug, and bulk procurement plans by market demand.',
  '覆盖洗车补充、庭院小面积冲洗、户外用品清洁和日常维护。': 'Covers car washing support, small yard washing, outdoor gear cleaning, and daily maintenance.',
  '授权店铺页面用于展示渠道门店、区域服务和线下购买支持。': 'The authorized stores page displays channel stores, regional services, and offline purchase support.',
  '收集型号、使用场景、故障表现和联系方式，便于快速判断。': 'Collect model, use case, fault symptoms, and contact details for faster diagnosis.',
  '机身结构和工业风格更适合商用客户对耐用感、专业感的判断。': 'The structure and industrial style help commercial customers assess durability and professionalism.',
  '永磁变频电机配合纯铜线圈，降低能耗并提升长时间运行稳定性。': 'The PM inverter motor with pure copper coils lowers energy use and improves long-run stability.',
  '指导客户定期检查进水、喷头、管路和存放环境，延长设备寿命。': 'Guide customers to regularly check water intake, nozzles, hoses, and storage conditions to extend service life.',
  '大轮、卷管器和自吸进水设计，让设备更适合户外和门店高频移动。': 'Large wheels, hose reel, and self-priming intake make the machine better for outdoor and store mobility.',
  '适合放在 PH 系列之上，承接门店、高频清洗和专业玩家需求。': 'Positioned above the PH series for stores, high-frequency cleaning, and professional enthusiasts.',
  '产品图和视频素材适合用于网站、门店屏幕、销售资料和线上沟通。': 'Product images and videos suit websites, store screens, sales materials, and online communication.',
  '维修网点页面用于承接设备维修、配件更换、保养指导和售后咨询。': 'The repair network page supports equipment repair, parts replacement, maintenance guidance, and service consultation.',
  '结合客户市场和销售渠道，提供产品资料、包装建议和后续售后协同。': 'Provide product materials, packaging advice, and follow-up service coordination by market and sales channel.',
  '提供产品目录、参数说明、图片素材和宣传资料，方便采购和销售沟通。': 'Provide catalogs, spec descriptions, image assets, and promotional materials for procurement and sales communication.',
  '下载专区集中提供产品手册、规格书、目录图册、安装说明和宣传资料。': 'The downloads area centralizes manuals, spec sheets, catalogs, installation instructions, and promotional materials.',
  '可根据客户市场需求沟通 Logo、颜色、包装、电压、插头和配置方案。': 'Discuss logo, color, packaging, voltage, plug, and configuration plans based on market needs.',
  'PH 系列适合更高频、更稳定的家庭进阶清洗、小型门店和物业辅助使用。': 'The PH series fits higher-frequency, steadier advanced home cleaning, small stores, and property support use.',
  '磐宏提供产品资料、安装指导、售后视频、维修网点和渠道门店等配套支持。': 'Panhiro provides product materials, installation guidance, service videos, repair networks, and channel store support.',
  '通过安装演示、维护教学和常见问题视频，帮助用户更快掌握设备使用方法。': 'Installation demos, maintenance tutorials, and FAQ videos help users learn faster.',
  '围绕压力、流量、启动、运行稳定性和基础防护进行检查，降低客户使用风险。': 'Checks cover pressure, flow, startup, running stability, and basic protection to reduce user risk.',
  '视频文件在当前站点文件夹中不可用。请从项目根目录启动本地服务器，以便加载':
    'The video file is unavailable from the current site folder. Start a local server from the project root to load',
  '为经销商、门店和区域合作伙伴提供产品资料、陈列建议、样机沟通和售后配合。': 'Provide distributors, stores, and regional partners with product materials, display advice, sample discussion, and service support.',
  '从产品开发到交付服务，磐宏以稳定制造能力和清晰产品资料支持客户长期经营。': 'From product development to delivery service, Panhiro supports long-term customer operations with stable manufacturing and clear product materials.',
  '110Bar 压力与 8L/min 流量适合车辆、地面、庭院和设备冲洗。': '110Bar pressure and 8L/min flow suit vehicles, floors, yards, and equipment washing.',
  'P4/P5 更轻便，适合洗车、庭院、小面积冲洗和首次购买高压清洗机的用户。': 'P4/P5 are lighter, fitting car washing, yards, small-area cleaning, and first-time pressure washer buyers.',
  '对关键部件、连接件、附件和外观进行装配管控，保证设备到货后的完整性和一致性。': 'Assembly control covers key parts, connectors, accessories, and appearance to ensure completeness and consistency on arrival.',
  '围绕电机、泵体、机架、外壳、附件和整机测试建立稳定生产流程，确保批量交付一致性。': 'Stable production processes cover motor, pump body, frame, shell, accessories, and full-machine testing for consistent batch delivery.',
  'VK 系列强调专业感、压力表现和展示价值，VK-Y1 则进一步突出外放电和永磁变频。': 'The VK series emphasizes professional feel, pressure performance, and display value; VK-Y1 further highlights EV output and PM inverter technology.',
  '授权店铺可用于承接本地客户咨询、样机体验和售后协同。对于经销商和区域合作伙伴，页面也能展示门店资质、陈列形象和服务覆盖范围。':
    'Authorized stores can handle local customer inquiries, sample experience, and service coordination. For distributors and regional partners, the page can also show store qualifications, display image, and service coverage.',
  '高压清洗机属于长期使用设备，稳定的维修和配件支持会直接影响客户信任。维修网点页面用于说明维修流程、常见服务内容和沟通所需信息。':
    'Pressure washers are long-term-use equipment, and stable repair and parts support directly affect customer trust. The repair network page explains repair processes, common services, and required information.',
  '下载专区适合放置经销商、采购客户和终端用户常用资料。客户在沟通采购、上架销售或售后服务前，可先获取对应型号资料，减少反复确认。':
    'The downloads area is for materials commonly used by distributors, procurement customers, and end users. Customers can get model materials before procurement, listing, or service discussions, reducing repeated confirmation.',
  '售后视频适合覆盖首次安装、水管连接、喷头选择、压力调节、日常保养和常见异常排查。通过视频降低说明成本，也能帮助渠道门店提升服务效率。':
    'Service videos can cover first installation, hose connection, nozzle selection, pressure adjustment, routine maintenance, and common troubleshooting. Video reduces explanation cost and helps stores improve service efficiency.',
  '为了更快匹配产品和报价，请尽量提供目标市场、意向型号、采购数量、电压/插头要求、使用场景和联系方式。磐宏会根据需求准备产品资料、配置建议和合作沟通内容。':
    'To match products and quotations faster, please provide target market, intended model, purchase quantity, voltage/plug requirements, use case, and contact details. Panhiro will prepare product materials, configuration advice, and cooperation details.',
  '服务支持围绕客户实际使用过程展开：购买前需要资料和选型，收到货后需要安装和维护，长期使用中需要配件和维修。磐宏将这些支持集中呈现，便于客户快速找到所需信息。':
    'Support follows actual use: materials and selection before purchase, installation and maintenance after delivery, and parts and repair during long-term use. Panhiro centralizes these supports for quick access.',
  '清洗设备不仅需要参数漂亮，更需要长期稳定使用。磐宏在整机装配、出厂检测、包装交付和售后资料方面持续完善，让客户拿到的不只是设备，也是一套更容易销售和服务的产品体系。':
    'Cleaning equipment needs not only good specs, but stable long-term use. Panhiro continues improving assembly, factory inspection, packaging, delivery, and service materials, giving customers not only equipment but a product system easier to sell and service.',
  'P4/P5 面向更轻量、更灵活的入门家用场景，适合用户在家庭、户外、庭院、小车位和临时清洗中快速使用。P5 在主页面配有视频预览和多角度图片，方便客户直观看到产品形态。':
    'P4/P5 target lighter, more flexible entry home scenarios for quick use at home, outdoors, yards, parking spaces, and temporary cleaning. P5 includes video preview and multi-angle images for direct product viewing.',
  'VK-1011 在主页面提供产品视频预览，适合用于渠道展示、线上沟通和客户选型。它与 VK-1010-P4 同属商用级 VK 系列，面向门店、高频清洗和对设备表现有兴趣的进阶用户。':
    'VK-1011 provides a product video preview on the main page for channel display, online communication, and model selection. It belongs to the commercial VK series with VK-1010-P4, serving stores, high-frequency cleaning, and advanced users interested in performance.',
  'VK-1010-P4 属于 VK 商用级产品线，适合门店、渠道展示、商用清洗和对清洗机性能有兴趣的进阶用户。它强调稳定输出、耐用结构和更强专业感，适合承接 PH 系列之上的使用需求。':
    'VK-1010-P4 belongs to the commercial VK line, suitable for stores, channel display, commercial cleaning, and advanced users interested in washer performance. It emphasizes stable output, durable structure, and stronger professionalism above the PH series.',
  '磐宏围绕清洗设备的研发、制造、装配、测试和交付持续投入，产品覆盖家用、商用、工业和移动清洗等多个场景。我们重视产品稳定性、资料完整度和售后响应效率，帮助合作客户更顺畅地完成选品、销售和服务。':
    'Panhiro continues investing in R&D, manufacturing, assembly, testing, and delivery of cleaning equipment. Products cover home, commercial, industrial, and mobile cleaning scenarios. We value stability, complete materials, and service response efficiency to help partners select, sell, and serve more smoothly.',
  'VK-Y1 以新能源汽车外放电和永磁变频平台作为核心卖点，兼顾高压输出、省电、低噪和移动使用。它适合没有固定电源的户外清洗、门店高频洗车、物业维护，以及对设备性能和技术配置更敏感的清洗机爱好者。':
    'VK-Y1 centers on EV power output and PM inverter technology, combining high-pressure output, energy saving, low noise, and mobile use. It fits outdoor cleaning without fixed power, high-frequency store car washing, property maintenance, and enthusiasts sensitive to performance and configuration.',
  '客户选择高压清洗机时，真正关心的是使用频率、清洁强度、移动便利性和预算。磐宏将产品按需求分成清晰层级：入门家用选 P4/P5，高级家用与半商用选 PH 系列，商用级和极客清洗机爱好者选 VK 系列，需要外放电和永磁变频能力时重点了解 VK-Y1。':
    'When choosing a pressure washer, customers care about usage frequency, cleaning intensity, mobility, and budget. Panhiro organizes products into clear tiers: P4/P5 for entry home use, PH for advanced home and semi-commercial use, VK for commercial and enthusiast users, and VK-Y1 for EV output and PM inverter needs.',
};

const extendedTranslations = {
  菜单: 'Menu',
  '资料、售后视频和咨询入口集中响应': 'Centralized response for materials, service videos, and inquiries',
  '从安装指导到产品手册，从选型咨询到合作沟通，磐宏为客户提供清晰、稳定、可持续的服务支持。':
    'From installation guidance and catalogs to model selection and cooperation, Panhiro provides clear, stable, and sustainable service support.',
  咨询响应: 'Inquiry response',
  '通过表单、电话、企业微信和抖音店铺承接选型、采购与售后咨询。':
    'Handle model selection, procurement, and after-sales inquiries through forms, phone, WeCom, and Douyin shop.',
  '播放 P5 产品视频': 'Play P5 product video',
  '播放 VK-1011 产品视频': 'Play VK-1011 product video',
  '播放 PH-0995 产品视频': 'Play PH-0995 product video',
  首页咨询表单: 'Home inquiry form',
  台州磐宏机电有限公司: 'Taizhou Panhiro Electromechanical Co., Ltd.',
  '台州磐宏机电有限公司成立于 2009 年，是一家以清洗机设备研发制造为核心，集开发、生产与销售于一体的专业厂家。':
    'Founded in 2009, Taizhou Panhiro Electromechanical Co., Ltd. is a professional manufacturer centered on the R&D and manufacturing of cleaning equipment, integrating development, production, and sales.',
  '立足温岭泵与电机产业带，深耕清洗设备制造': 'Rooted in the Wenling pump and motor industrial belt, focused on cleaning equipment manufacturing',
  '公司坐落于浙江省台州市温岭市大溪镇后瓦屿工业园区，依托当地泵与电机产业集群的配套优势，持续向专业化、规范化和数字化运营方向发展。磐宏以高压清洗机为核心产品，覆盖家用、工业、洗车设备、电机与泵等相关业务，为国内外客户提供稳定的产品与合作支持。':
    'Located in Houwayu Industrial Park, Daxi Town, Wenling, Taizhou, Zhejiang, Panhiro relies on the local pump and motor industrial cluster and continues to develop toward professional, standardized, and digital operations. With pressure washers as its core product, Panhiro covers home, industrial, car-wash equipment, motor, and pump businesses, providing stable product and cooperation support for domestic and overseas customers.',
  '成立于 2009 年 11 月 1 日，持续深耕清洗设备研发制造':
    'Founded on November 1, 2009, with continued focus on cleaning equipment R&D and manufacturing',
  '核心产品包括家用清洗机、工业清洗机、高压清洗机和洗车设备':
    'Core products include home washers, industrial washers, pressure washers, and car-wash equipment',
  '经营理念为“质量立企、诚信为本、信誉至上”，办企宗旨是“质量第一，信誉第一”':
    'Business philosophy: quality builds the company, integrity is the foundation, and reputation comes first; operating principle: quality first, reputation first',
  清洗设备主业: 'Core cleaning equipment business',
  '以高压清洗机为核心拳头产品，覆盖家用清洗机、工业清洗机、洗车设备等应用场景。':
    'With pressure washers as the core flagship product, covering home washers, industrial washers, car-wash equipment, and related applications.',
  产业带配套: 'Industrial-belt support',
  '位于温岭大溪泵与电机产业核心聚集区，上下游配套完整，便于产品开发、装配和交付。':
    'Located in the core Wenling Daxi pump and motor cluster, with complete upstream and downstream support for development, assembly, and delivery.',
  长期合作能力: 'Long-term cooperation capability',
  '重视质量管理、客户服务和产品资料建设，支持渠道客户、批量采购和海外业务拓展。':
    'Emphasizes quality management, customer service, and product materials to support channel customers, bulk procurement, and overseas business expansion.',
  成立时间: 'Founded',
  员工规模: 'Team size',
  公司名称: 'Company name',
  所在区域: 'Location',
  '浙江省台州市温岭市大溪镇后瓦屿工业园区': 'Houwayu Industrial Park, Daxi Town, Wenling, Taizhou, Zhejiang',
  产业基础: 'Industrial foundation',
  '温岭泵与电机产业集群核心地带，工业基础雄厚，上下游配套完整':
    'Core area of the Wenling pump and motor industrial cluster, with a strong industrial base and complete supply-chain support',
  '13197228342 / 联系人：潘晨': '13197228342 / Contact: Pan Chen',
  主营产品: 'Main products',
  围绕清洗设备延展产品矩阵: 'Extending the product matrix around cleaning equipment',
  '磐宏机电以高压清洗机为核心，同时覆盖电机、微特电机及组件、泵及真空设备、风机、风扇、金属加工设备、农业机械和相关进出口业务。产品矩阵服务家用及工业两大应用领域，便于客户按场景和采购需求形成组合选型。':
    'Panhiro focuses on pressure washers while also covering motors, micro motors and components, pumps and vacuum equipment, fans, metal-processing equipment, agricultural machinery, and related import/export business. The product matrix serves both home and industrial applications, helping customers combine models by scenario and procurement needs.',
  高压清洗机: 'Pressure washers',
  洗车设备: 'Car-wash equipment',
  电机与泵: 'Motors and pumps',
  工业清洗: 'Industrial cleaning',
  质量与文化: 'Quality and culture',
  '质量第一，信誉第一': 'Quality first, reputation first',
  '公司自成立以来重视质量管理体系建设，产品质量经过市场长期检验。企业坚持“质量立企、诚信为本、信誉至上”的经营理念，持续完善现代化管理体系，并通过产品迭代和服务响应提升客户信任。':
    'Since its founding, the company has valued quality-management systems, and product quality has been tested by the market over time. The company follows the philosophy of quality, integrity, and reputation, continuously improving modern management and building customer trust through product iteration and service response.',
  质量立企: 'Quality builds the company',
  诚信为本: 'Integrity first',
  信誉至上: 'Reputation first',
  规范管理: 'Standardized management',
  未来方向: 'Future direction',
  专业制造与数字化运营并进: 'Professional manufacturing and digital operations moving forward together',
  '面向未来，磐宏将坚持专业化、多产品协同发展策略，立足清洗机核心业务，同步开拓电机、泵及通用设备等细分市场，并结合线上营销、新媒体、电商运营与海外业务拓展，提升国内外市场覆盖能力。':
    'Looking ahead, Panhiro will continue professional, multi-product development, build on its cleaning-equipment core, expand into motors, pumps, and general equipment, and improve domestic and overseas market coverage through online marketing, new media, ecommerce, and overseas business.',
  专业化制造: 'Professional manufacturing',
  数字化运营: 'Digital operations',
  海外拓展: 'Overseas expansion',
  多产品协同: 'Multi-product synergy',
  '依托温岭泵与电机产业集群，磐宏围绕清洗设备研发制造、质量管理、产品交付和数字化运营持续建设企业能力。':
    'Relying on the Wenling pump and motor industrial cluster, Panhiro continues building capabilities in cleaning equipment R&D and manufacturing, quality management, product delivery, and digital operations.',
  '产业配套、产品矩阵与长期交付能力': 'Industrial support, product matrix, and long-term delivery capability',
  '磐宏机电立足浙江温岭大溪镇后瓦屿工业园区，处于泵与电机产业核心聚集区。公司以高压清洗机为核心拳头产品，产品矩阵覆盖家用及工业清洗，同时延展电机、泵、真空设备、风机和通用设备等相关业务，形成从产品开发、生产装配到销售支持的综合服务能力。':
    'Based in Houwayu Industrial Park, Daxi Town, Wenling, Zhejiang, Panhiro sits in the core pump and motor industrial cluster. With pressure washers as its flagship product, the company covers home and industrial cleaning while extending into motors, pumps, vacuum equipment, fans, and general equipment, forming integrated capabilities from product development and assembly to sales support.',
  '大溪镇泵与电机产业链配套完整，便于研发、采购、装配和交付协同':
    'The Daxi pump and motor supply chain is complete, supporting R&D, procurement, assembly, and delivery coordination',
  '产品覆盖家用清洗机、工业清洗机、高压清洗机、洗车设备、电机与泵等方向':
    'Products cover home washers, industrial washers, pressure washers, car-wash equipment, motors, and pumps',
  '坚持质量管理与服务响应并重，持续完善现代化管理和数字化运营能力':
    'Balances quality management and service response while improving modern management and digital operations',
  '位于温岭泵与电机产业核心聚集区，工业基础雄厚，上下游配套完整，为产品开发和生产交付提供稳定支撑。':
    'Located in the core Wenling pump and motor cluster, with a strong industrial base and complete supply-chain support for product development and delivery.',
  产品矩阵: 'Product matrix',
  '以高压清洗机为核心，同时覆盖洗车设备、电机与泵、金属加工设备及相关进出口业务，便于客户组合选型。':
    'Centered on pressure washers while also covering car-wash equipment, motors and pumps, metal-processing equipment, and related import/export business, making it easier for customers to combine models.',
  质量经营: 'Quality-driven operations',
  '坚持“质量立企、诚信为本、信誉至上”，通过规范管理、产品迭代和客户服务提升长期信任。':
    'Adheres to quality, integrity, and reputation, building long-term trust through standardized management, product iteration, and customer service.',
  '5000 平方米': '5,000 square meters',
  占地面积: 'Site area',
  泵与电机: 'Pumps and motors',
  产业集群: 'Industrial cluster',
  国内外: 'Domestic and overseas',
  市场覆盖: 'Market coverage',
  产业链协同: 'Supply-chain collaboration',
  '公司所在的大溪镇是温岭泵与电机产业核心聚集区，工业基础雄厚、上下游配套完整。产业生态让关键部件采购、样机开发、装配测试和批量交付更容易形成协同。':
    'Daxi Town is the core Wenling pump and motor cluster, with a strong industrial base and complete upstream and downstream support. This industrial ecosystem helps coordinate key-part procurement, prototype development, assembly testing, and batch delivery.',
  上下游配套: 'Upstream and downstream support',
  装配协同: 'Assembly coordination',
  产品开发与矩阵: 'Product development and matrix',
  '磐宏围绕高压清洗机持续开发新品，产品覆盖家用清洗、工业清洗、洗车设备、电机、泵及真空设备等方向，能够承接多场景、多层级的采购需求。':
    'Panhiro continues developing new products around pressure washers, covering home cleaning, industrial cleaning, car-wash equipment, motors, pumps, and vacuum equipment to serve multi-scenario and multi-tier procurement needs.',
  质量管理能力: 'Quality management capability',
  '企业长期重视质量管理体系建设，产品质量通过市场检验并获得客户认可。公司以“质量第一，信誉第一”为宗旨，把稳定交付和客户信任放在经营重点。':
    'The company has long valued quality-management systems. Product quality has been tested by the market and recognized by customers. With quality and reputation first, Panhiro prioritizes stable delivery and customer trust.',
  质量管理: 'Quality management',
  稳定交付: 'Stable delivery',
  客户认可: 'Customer recognition',
  团队与运营升级: 'Team and operations upgrade',
  '核心管理层具备机械制造行业经验和市场拓展能力，同时逐步建设直播电商运营、新媒体文案、采购管理、业务拓展和仓储管理等职能，推动制造与数字化运营并进。':
    'The core management team has mechanical-manufacturing experience and market-development capability, while gradually building live ecommerce, new-media copywriting, procurement, business development, and warehouse-management functions to advance manufacturing and digital operations together.',
  团队建设: 'Team building',
  市场拓展: 'Market expansion',
  产品开发: 'Product development',
  '围绕清洗机核心业务开发新品，并延展电机、泵和通用设备等细分方向。':
    'Develop new products around the cleaning-machine core business while extending into motors, pumps, and general equipment.',
  生产装配: 'Production assembly',
  '依托园区基础设施和产业链配套，提升装配、测试和批量交付效率。':
    'Use park infrastructure and industrial-chain support to improve assembly, testing, and batch-delivery efficiency.',
  '通过规范管理和长期市场检验，持续强化产品稳定性与服务响应。':
    'Strengthen product stability and service response through standardized management and long-term market validation.',
  '结合货物进出口、技术进出口和线上运营能力，拓展国内外业务版图。':
    'Expand domestic and overseas business through goods import/export, technology import/export, and online operations.',
  '磐宏提供产品资料、安装指导、售后视频、下载资料和咨询响应等配套支持。':
    'Panhiro provides supporting services including product materials, installation guidance, service videos, downloads, and inquiry response.',
  '欢迎咨询产品选型、批量采购、渠道代理、定制合作和售后支持。':
    'Contact us for model selection, bulk procurement, channel agency, customization, and after-sales support.',
  '合作咨询：渠道代理、批量采购、定制合作': 'Cooperation inquiries: channel agency, bulk procurement, customization',
  'VK-Y1 主推': 'VK-Y1 featured model',
  'VK 商用级': 'VK commercial grade',
  'PH 半商用': 'PH semi-commercial',
  'P4 / P5 入门家用': 'P4 / P5 entry home',
  '按使用强度、移动需求、采购预算和展示场景选择对应产品系列。':
    'Choose the right product series by usage intensity, mobility needs, procurement budget, and display scenario.',
  新能源车外放电: 'EV power output',
  永磁变频电机: 'PM inverter motor',
  '移动洗车、户外清洗、门店高频使用和对节能低噪有要求的场景。':
    'Mobile car washing, outdoor cleaning, high-frequency store use, and scenarios requiring energy saving and low noise.',
  商用平台: 'Commercial platform',
  'VK 商用级平台': 'VK commercial-grade platform',
  专业外观结构: 'Professional exterior structure',
  适合高频清洗: 'Suitable for high-frequency cleaning',
  支持批量采购沟通: 'Supports bulk procurement discussion',
  '洗车门店、物业保洁、庭院深度清洗和渠道展示。': 'Car-wash stores, property cleaning, deep yard cleaning, and channel display.',
  视频展示款: 'Video showcase model',
  '商用级 VK 系列': 'Commercial VK series',
  产品视频素材: 'Product video assets',
  专业渠道展示: 'Professional channel display',
  '可配合 VK-Y1 组合销售': 'Can be sold together with VK-Y1',
  '线上展示、门店屏幕、销售资料和专业清洗渠道选型。':
    'Online display, store screens, sales materials, and professional cleaning-channel selection.',
  高级家用: 'Advanced home',
  '1407 泵头': '1407 pump head',
  '家庭进阶清洗、小型门店、物业备用和中等频率清洁。':
    'Advanced home cleaning, small stores, property backup, and medium-frequency cleaning.',
  半商用升级: 'Semi-commercial upgrade',
  '1408 泵头': '1408 pump head',
  '更高强度的家庭、门店和物业清洁需求。': 'Higher-intensity home, store, and property cleaning needs.',
  手提款: 'Handheld model',
  轻量收纳: 'Lightweight storage',
  家用洗车: 'Home car washing',
  视频素材支持: 'Video asset support',
  '家庭洗车、庭院小面积冲洗、户外用品清洁和首次购买用户。':
    'Home car washing, small yard washing, outdoor gear cleaning, and first-time buyers.',
  产品展示: 'Product display',
  咨询该型号: 'Ask about this model',
  图片待补充: 'Image pending',
  图片: 'Image',
  完整咨询入口: 'Complete inquiry entry',
  '表单、电话、企业微信、抖音店铺，一页完成留资与沟通':
    'Forms, phone, WeCom, and Douyin shop: inquiry and communication in one page',
  '请优先填写表单，方便我们记录型号、数量、市场和配置需求；也可以直接电话联系、扫码添加企业微信，或进入抖音店铺咨询。':
    'Please fill in the form first so we can record model, quantity, market, and configuration needs. You can also call directly, scan to add WeCom, or visit the Douyin shop.',
  磐宏产品咨询表单: 'Panhiro product inquiry form',
  '提交采购 / 渠道询盘': 'Submit purchase / channel inquiry',
  '适合产品选型、批量采购、代理合作、定制需求、售后资料与检测文件获取。':
    'For model selection, bulk procurement, agency cooperation, custom requirements, after-sales materials, and inspection documents.',
  '留下采购需求，获取匹配资料': 'Leave procurement needs and get matched materials',
  '请尽量写清市场、数量、产品方向和联系方式，我们会按 B2B 合作场景整理回复。':
    'Please include market, quantity, product direction, and contact details; we will reply with materials organized for B2B cooperation.',
  提交咨询表单: 'Submit inquiry form',
  '适合产品选型、批量采购、定制合作、售后资料和产品手册获取。':
    'Suitable for model selection, bulk procurement, customization, after-sales materials, and catalog requests.',
  联系人: 'Contact person',
  '请输入联系人姓名': 'Enter contact name',
  '公司 / 门店': 'Company / Store',
  '请输入公司、门店或团队名称': 'Enter company, store, or team name',
  所在地区: 'Region',
  '所在地区 / 目标市场': 'Region / Target market',
  '请输入公司或门店名称': 'Enter company or store name',
  '电话 / 微信 / 邮箱均可': 'Phone / WeChat / Email',
  '例如：浙江台州 / 海外市场': 'Example: Taizhou, Zhejiang / overseas market',
  '例如：浙江台州 / 华东渠道 / 海外市场': 'Example: Taizhou, Zhejiang / East China channel / overseas market',
  'VK-Y1 外放电主推款详情': 'VK-Y1 featured EV-output model details',
  'VK-Y1 外放电永磁变频主推款': 'VK-Y1 featured EV-output PM inverter model',
  'VK-1010-P4 / VK-1011 商用级系列': 'VK-1010-P4 / VK-1011 commercial series',
  'PH-0885 / PH-0995 高级家用与半商用': 'PH-0885 / PH-0995 advanced home and semi-commercial',
  'P4 / P5 入门家用手提款': 'P4 / P5 entry home handheld',
  '全系列产品目录 / 产品手册': 'Full product catalog / product brochure',
  全系列产品目录: 'Full product catalog',
  '暂不确定，需要推荐': 'Not sure yet, need a recommendation',
  '售后视频 / 配件 / 维修咨询': 'Service videos / parts / repair inquiry',
  合作类型: 'Cooperation type',
  产品选型咨询: 'Model selection inquiry',
  渠道代理合作: 'Channel agency cooperation',
  批量采购报价: 'Bulk procurement quotation',
  渠道代理: 'Channel agency',
  批量采购: 'Bulk procurement',
  'OEM / ODM 定制': 'OEM / ODM customization',
  售后支持: 'After-sales support',
  '售后资料 / 配件支持': 'After-sales materials / parts support',
  产品手册与检测资料: 'Product brochure and inspection materials',
  预计数量: 'Estimated quantity',
  '样机 1 台': '1 sample unit',
  '2-10 台': '2-10 units',
  '10-50 台': '10-50 units',
  '50 台以上': '50+ units',
  长期渠道备货: 'Long-term channel stocking',
  '电压 / 插头 / 配置': 'Voltage / Plug / Configuration',
  '如 220V、外贸插头、需要卷管器等': 'E.g. 220V, export plug, hose reel needed',
  需求说明: 'Requirement notes',
  '请补充使用场景、预算区间、交期、资料需求或售后问题':
    'Add use case, budget range, delivery time, material needs, or service issue',
  '请填写数量、电压、插头类型、市场需求、配置要求或售后问题':
    'Enter quantity, voltage, plug type, market needs, configuration requirements, or service issue',
  联系页咨询表单: 'Contact page inquiry form',
  联系子页面询盘表单: 'Contact subpage inquiry form',
  首页询盘表单: 'Homepage inquiry form',
  提交询盘: 'Submit inquiry',
  '资料 / 报价 / 合作沟通': 'Materials / Quote / Cooperation',
  正在提交: 'Submitting',
  '请稍候...': 'Please wait...',
  '适合急需确认产品资料、报价方向、样机沟通或售后问题。':
    'Suitable for urgent confirmation of product materials, quotation direction, sample discussion, or service issues.',
  '扫码添加企业微信，发送型号、数量、图片或视频资料。': 'Scan to add WeCom and send model, quantity, images, or video materials.',
  '扫码进入抖音店铺，查看产品展示并发起在线咨询。': 'Scan to enter the Douyin shop, view product displays, and start an online inquiry.',
  建议一次性提供: 'Recommended information',
  '联系方式、产品型号、采购数量、使用场景、电压插头要求、目标市场或售后问题描述。':
    'Contact details, product model, purchase quantity, use case, voltage/plug requirements, target market, or service issue description.',
  企业档案: 'Company profile',
  '把制造基础、产品矩阵和合作能力讲清楚': 'Clarifying manufacturing foundation, product matrix, and cooperation capability',
  '以下内容根据公司简介资料重新整理，便于访客快速理解磐宏的企业背景、主营业务和发展方向。':
    'The following content reorganizes the company profile so visitors can quickly understand Panhiro background, main business, and development direction.',
  实力结构: 'Capability structure',
  '从产业带优势到数字化运营，形成稳定交付链路': 'From industrial-belt advantages to digital operations, forming a stable delivery chain',
  '企业实力不只体现在单一设备参数上，也体现在产业配套、产品矩阵、质量管理、团队运营和市场拓展的连续能力。':
    'Company strength is not only equipment specs, but also continuous capability across industrial support, product matrix, quality management, team operations, and market expansion.',
  能力链路: 'Capability chain',
  '研发、制造、质量与市场协同推进': 'R&D, manufacturing, quality, and market working together',
  '公司简介 | 磐宏清洗设备': 'Company Profile | Panhiro Cleaning Equipment',
  '企业实力 | 磐宏清洗设备': 'Company Strength | Panhiro Cleaning Equipment',
  '产品总览 | 磐宏清洗设备': 'Product Overview | Panhiro Cleaning Equipment',
  '服务总览 | 磐宏清洗设备': 'Service Overview | Panhiro Cleaning Equipment',
  '售后视频 | 磐宏清洗设备': 'Service Videos | Panhiro Cleaning Equipment',
  '下载专区 | 磐宏清洗设备': 'Downloads | Panhiro Cleaning Equipment',
  '表单咨询 | 磐宏清洗设备': 'Contact Form | Panhiro Cleaning Equipment',
};

Object.assign(textTranslations, supplementalTranslations, remainingTranslations, extendedTranslations);

function normalizeTranslationKey(value) {
  return value.replace(/\s+/g, ' ').trim();
}

const normalizedTextTranslations = Object.fromEntries(
  Object.entries(textTranslations).map(([zh, en]) => [normalizeTranslationKey(zh), en]),
);
const reverseTranslations = Object.fromEntries(Object.entries(textTranslations).map(([zh, en]) => [en, zh]));
const normalizedReverseTranslations = Object.fromEntries(
  Object.entries(reverseTranslations).map(([en, zh]) => [normalizeTranslationKey(en), zh]),
);
const phraseTranslations = Object.entries(textTranslations)
  .filter(([zh]) => /[\u4e00-\u9fff]/.test(zh) && normalizeTranslationKey(zh).length > 1)
  .sort((a, b) => normalizeTranslationKey(b[0]).length - normalizeTranslationKey(a[0]).length);
const reversePhraseTranslations = Object.entries(reverseTranslations)
  .filter(([, zh]) => /[\u4e00-\u9fff]/.test(zh) && normalizeTranslationKey(zh).length > 1)
  .sort((a, b) => normalizeTranslationKey(b[0]).length - normalizeTranslationKey(a[0]).length);
const languageStorageKey = 'panhiro-language';
function readStoredLanguage() {
  try {
    return localStorage.getItem(languageStorageKey) || 'zh';
  } catch {
    return 'zh';
  }
}

function storeLanguage(lang) {
  try {
    localStorage.setItem(languageStorageKey, lang);
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
}

function getInquiryFormFields(form) {
  const formData = new FormData(form);
  return {
    name: String(formData.get('name') || '').trim(),
    company: String(formData.get('company') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    region: String(formData.get('region') || '').trim(),
    product: String(formData.get('product') || '').trim(),
    intent: String(formData.get('intent') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    source: String(formData.get('source') || document.title || '网站咨询表单').trim(),
  };
}

function buildInquiryEmail(fields) {
  const lines = [
    `来源：${fields.source}`,
    `姓名：${fields.name || '未填写'}`,
    `公司 / 门店：${fields.company || '未填写'}`,
    `联系方式：${fields.contact || '未填写'}`,
    fields.region ? `所在地区：${fields.region}` : '',
    `产品意向：${fields.product || '未选择'}`,
    fields.intent ? `合作类型：${fields.intent}` : '',
    '',
    '需求说明：',
    fields.message || '未填写',
  ].filter(Boolean);

  return {
    subject: `磐宏官网咨询 - ${fields.name || fields.contact || '新客户'}`,
    body: lines.join('\n'),
  };
}

function setFormStatus(form, type, message) {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;
  status.textContent = message;
  status.dataset.state = type;
}

function hasEmailJsConfig() {
  return Boolean(
    inquiryEmailConfig.emailJsPublicKey &&
      inquiryEmailConfig.emailJsServiceId &&
      inquiryEmailConfig.emailJsTemplateId &&
      window.emailjs,
  );
}

async function sendInquiryWithFormSubmit(fields, email) {
  if (!inquiryEmailConfig.formSubmitEndpoint) return false;
  const payload = {
    _subject: email.subject,
    _template: 'table',
    _captcha: 'false',
    来源: fields.source,
    姓名: fields.name,
    公司门店: fields.company,
    联系方式: fields.contact,
    所在地区: fields.region,
    产品意向: fields.product,
    合作类型: fields.intent,
    需求说明: fields.message,
  };

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact)) {
    payload.email = fields.contact;
    payload._replyto = fields.contact;
  }

  const response = await fetch(inquiryEmailConfig.formSubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('FormSubmit request failed');
  }

  const result = await response.json().catch(() => ({}));
  if (result.success === false) {
    throw new Error(result.message || 'FormSubmit rejected the submission');
  }

  return true;
}

async function sendInquiryWithEmailJs(fields, email) {
  window.emailjs.init({ publicKey: inquiryEmailConfig.emailJsPublicKey });
  await window.emailjs.send(inquiryEmailConfig.emailJsServiceId, inquiryEmailConfig.emailJsTemplateId, {
    to_email: inquiryEmailConfig.recipientEmail,
    from_name: fields.name,
    company: fields.company,
    contact: fields.contact,
    region: fields.region,
    product: fields.product,
    intent: fields.intent,
    message: fields.message,
    source: fields.source,
    subject: email.subject,
    body: email.body,
  });
}

function openInquiryMailDraft(email) {
  const recipient = inquiryEmailConfig.recipientEmail;
  if (!recipient) return false;
  const query = new URLSearchParams({
    subject: email.subject,
    body: email.body,
  });
  window.location.href = `mailto:${encodeURIComponent(recipient)}?${query.toString()}`;
  return true;
}

async function handleInquirySubmit(form) {
  const fields = getInquiryFormFields(form);
  if (!fields.name || !fields.contact) {
    setFormStatus(form, 'error', '请先填写姓名和联系方式，方便我们回复。');
    return;
  }

  const email = buildInquiryEmail(fields);
  const button = form.querySelector('button[type="submit"]');
  const originalText = button?.textContent || '提交咨询';
  if (button) {
    button.disabled = true;
    button.textContent = '正在提交...';
  }
  setFormStatus(form, 'pending', '正在整理咨询信息...');

  try {
    if (inquiryEmailConfig.formSubmitEndpoint) {
      await sendInquiryWithFormSubmit(fields, email);
      setFormStatus(form, 'success', '提交成功，我们会尽快与您联系。');
      form.reset();
      return;
    }

    if (hasEmailJsConfig()) {
      await sendInquiryWithEmailJs(fields, email);
      setFormStatus(form, 'success', '提交成功，我们会尽快与您联系。');
      form.reset();
      return;
    }

    if (openInquiryMailDraft(email)) {
      setFormStatus(form, 'success', '已为您打开邮件草稿，请确认发送。也可以直接电话或扫码联系。');
    } else {
      setFormStatus(form, 'success', '咨询信息已整理，请直接电话联系或扫码添加企业微信发送需求。');
    }
  } catch {
    setFormStatus(form, 'error', '提交暂时失败，请电话联系或扫码添加企业微信。');
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

document.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-inquiry-form]');
  if (!form) return;
  event.preventDefault();
  handleInquirySubmit(form);
});

let activeLanguage = readStoredLanguage();

function translateValue(value, lang) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const map = lang === 'en' ? normalizedTextTranslations : normalizedReverseTranslations;
  const next = map[normalizeTranslationKey(trimmed)];
  if (!next) return value;
  return value.replace(trimmed, next);
}

function translatePhraseValue(value, lang) {
  const exact = translateValue(value, lang);
  if (exact !== value) return exact;

  const entries = lang === 'en' ? phraseTranslations : reversePhraseTranslations;
  let translated = value;
  entries.forEach(([from, to]) => {
    if (translated.includes(from)) {
      translated = translated.split(from).join(to);
    }
  });
  return translated;
}

function translateDocumentMetadata(lang) {
  document.title = translatePhraseValue(document.title, lang);
  document.querySelectorAll('meta[name="description"]').forEach((meta) => {
    const content = meta.getAttribute('content');
    if (content) {
      meta.setAttribute('content', translatePhraseValue(content, lang));
    }
  });
}

function translateTextNodes(root, lang) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    node.nodeValue = translatePhraseValue(node.nodeValue, lang);
  });
}

function translateAttributes(root, lang) {
  const attributes = ['placeholder', 'aria-label', 'alt', 'title', 'data-video-eyebrow', 'data-video-title'];
  root.querySelectorAll('*').forEach((element) => {
    attributes.forEach((attribute) => {
      if (element.hasAttribute(attribute)) {
        element.setAttribute(attribute, translatePhraseValue(element.getAttribute(attribute), lang));
      }
    });
  });
}

function setLanguage(lang) {
  activeLanguage = lang;
  storeLanguage(lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  translateDocumentMetadata(lang);
  translateTextNodes(document.body, lang);
  translateAttributes(document.body, lang);
  if (languageCurrent) {
    languageCurrent.textContent = lang === 'en' ? 'EN' : '中';
  }
  languageToggle?.querySelector('small')?.replaceChildren(document.createTextNode(lang === 'en' ? '中' : 'EN'));
}

window.applyPanhiroLanguage = () => setLanguage(activeLanguage);

languageToggle?.addEventListener('click', () => {
  setLanguage(activeLanguage === 'en' ? 'zh' : 'en');
});

setLanguage(activeLanguage);

function closeNavMenus(exceptMenu) {
  navMenus.forEach((menu) => {
    if (menu !== exceptMenu) {
      menu.removeAttribute('open');
    }
  });
  if (!exceptMenu) {
    pinnedNavMenu = null;
  }
}

navMenus.forEach((menu) => {
  const summary = menu.querySelector('summary');
  menu.addEventListener('pointerenter', () => {
    window.clearTimeout(navCloseTimer);
    closeNavMenus(menu);
    menu.setAttribute('open', '');
  });
  menu.addEventListener('pointerleave', () => {
    if (pinnedNavMenu === menu) return;
    navCloseTimer = window.setTimeout(() => {
      menu.removeAttribute('open');
    }, 120);
  });
  summary?.addEventListener('click', (event) => {
    event.preventDefault();
    const willOpen = pinnedNavMenu !== menu;
    closeNavMenus(menu);
    pinnedNavMenu = willOpen ? menu : null;
    menu.toggleAttribute('open', willOpen);
  });
});

document.addEventListener('pointerdown', (event) => {
  if (![...navMenus].some((menu) => menu.contains(event.target))) {
    closeNavMenus();
  }
});

window.addEventListener('scroll', () => closeNavMenus(), { passive: true });

function closeSeriesPopovers() {
  if (!pinnedSeriesCard) return;
  pinnedSeriesCard.classList.remove('popover-pinned');
  pinnedSeriesCard = null;
}

seriesCards.forEach((card) => {
  const popover = card.querySelector('[data-series-popover]');
  popover?.addEventListener('click', (event) => {
    if (event.target.closest('[data-video-trigger]')) {
      return;
    }
    event.stopPropagation();
    if (pinnedSeriesCard && pinnedSeriesCard !== card) {
      closeSeriesPopovers();
    }
    pinnedSeriesCard = card;
    card.classList.add('popover-pinned');
  });
});

document.addEventListener('pointerdown', (event) => {
  if (![...seriesCards].some((card) => card.contains(event.target))) {
    closeSeriesPopovers();
  }
});

window.addEventListener('scroll', closeSeriesPopovers, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  revealObserver.observe(item);
});

function setProduct(index) {
  activeProduct = index;
  productImages.forEach((image, imageIndex) => {
    image.classList.toggle('active', imageIndex === index);
  });
  viewButtons.forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === index);
  });
}

function startProductLoop() {
  if (!productImages.length) return;
  window.clearInterval(productTimer);
  productTimer = window.setInterval(() => {
    setProduct((activeProduct + 1) % productImages.length);
  }, 4200);
}

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setProduct(Number(button.dataset.product));
    startProductLoop();
  });
});

window.addEventListener(
  'pointermove',
  (event) => {
    if (cursorGlow) {
      cursorGlow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
    }
  },
  { passive: true },
);

if (parallaxStage) {
  window.addEventListener(
    'scroll',
    () => {
      const offset = Math.min(window.scrollY * 0.07, 44);
      parallaxStage.style.transform = `translateY(${offset}px)`;
    },
    { passive: true },
  );
}

tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (y / rect.height - 0.5) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

function openVideoModal(trigger) {
  if (!videoModal || !videoPlayer) return;
  const nextSrc = trigger?.dataset.videoSrc || './assets/vk-1011-pro.mp4';
  const nextEyebrow = trigger?.dataset.videoEyebrow || 'VK-1011 产品视频';
  const nextTitle = trigger?.dataset.videoTitle || '高压清洗机预览';

  if (videoPlayer.getAttribute('src') !== nextSrc) {
    videoPlayer.setAttribute('src', nextSrc);
    videoPlayer.load();
  }
  if (videoModalEyebrow) {
    videoModalEyebrow.textContent = nextEyebrow;
  }
  if (videoModalTitle) {
    videoModalTitle.textContent = nextTitle;
  }
  if (videoFallbackSrc) {
    videoFallbackSrc.textContent = nextSrc.replace('./', '');
  }
  if (videoFallback) {
    videoFallback.hidden = true;
  }
  videoModal.hidden = false;
  document.body.classList.add('modal-open');
  window.requestAnimationFrame(() => {
    videoModal.classList.add('open');
    videoPlayer.currentTime = 0;
    videoPlayer.muted = true;
    videoPlayer.play().catch(() => {
      videoPlayer.controls = true;
    });
  });
}

function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;
  videoModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  videoPlayer.pause();
  window.setTimeout(() => {
    videoModal.hidden = true;
  }, 220);
}

document.addEventListener('click', (event) => {
  const directTrigger = event.target.closest('[data-video-trigger]');
  const cardTrigger = event.target.closest('[data-card-video-trigger]');
  const trigger = directTrigger || cardTrigger;
  if (!trigger) return;
  if (cardTrigger && !directTrigger && event.target.closest('a, button, input, select, textarea, [data-series-popover]')) {
    return;
  }
  event.preventDefault();
  openVideoModal(trigger);
});

document.addEventListener('keydown', (event) => {
  const directTrigger = event.target.closest('[data-video-trigger]');
  const cardTrigger = event.target.closest('[data-card-video-trigger]');
  const trigger = directTrigger || cardTrigger;
  if (!trigger || (event.key !== 'Enter' && event.key !== ' ')) return;
  if (cardTrigger && !directTrigger && event.target.closest('a, button, input, select, textarea, [data-series-popover]')) {
    return;
  }
  event.preventDefault();
  openVideoModal(trigger);
});

videoCloseButtons.forEach((button) => {
  button.addEventListener('click', closeVideoModal);
});

if (videoPlayer && videoFallback) {
  videoPlayer.addEventListener('error', () => {
    videoFallback.hidden = false;
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLaunchIntro();
    closeNavMenus();
    if (videoModal && !videoModal.hidden) {
      closeVideoModal();
    }
  }
});

startProductLoop();
