export type Language = 'ENG' | 'CHN';

export enum ViewState {
  HOME = 'HOME',
  MY_PRODUCTS = 'MY_PRODUCTS',
  ABOUT_IT = 'ABOUT_IT',
  GEN1_APP = 'GEN1_APP',
  GEN1_MARKETING = 'GEN1_MARKETING',
  SILICON_SIM = 'SILICON_SIM'
}

export interface User {
  name: string;
  email: string;
  phone: string;
  region: string;
  password?: string; // Stored for the sake of the demo logic
  timestamp: string;
}

export interface Translations {
  products: string;
  about: string;
  gen1: string;
  enter: string;
  inputPlaceholder: string;
  thinking: string;
  setThinkingTime: string;
  save: string;
  marketingTitle: string;
  marketingSubtitle: string;
  marketingDesc: string;
  feature1Title: string;
  feature1Desc: string;
  back: string;
  login: string;
  logout: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  region: string;
  downloadData: string;
  previewData: string;
  locked: string;
  submit: string;
  cancel: string;
  visitFriend: string;
  // New Marketing Keys
  bentoChipTitle: string;
  bentoChipDesc: string;
  bentoBatteryTitle: string;
  bentoBatteryDesc: string;
  bentoNeuralTitle: string;
  bentoNeuralDesc: string;
  proTitle: string;
  proSubtitle: string;
  compTitle: string;
  compF1: string;
  compF2: string;
  compF3: string;
  compUs: string;
  compThem: string;
  quote: string;
  quoteAuthor: string;
  // Simulator Keys
  simTitle: string;
  simTutorialTitle: string;
  simTutorialStep1: string;
  simTutorialStep2: string;
  simTutorialStep3: string;
  simStartDesign: string;
  simTools: string;
  simGridSize: string;
  simPackage: string;
  simEngraving: string;
  simDownload: string;
  compCpuP: string;
  compCpuE: string;
  compGpu: string;
  compNpu: string;
  compSmoke: string;
  compEmpty: string;
}

export const TEXTS: Record<Language, Translations> = {
  ENG: {
    products: "My Products",
    about: "About It",
    gen1: "FAI Gen1",
    enter: "Enter",
    inputPlaceholder: "Ask anything...",
    thinking: "Calculating irrelevance...",
    setThinkingTime: "Set Thinking Time (ms)",
    save: "Save",
    marketingTitle: "FAI Gen1",
    marketingSubtitle: "Misses the point. Every time.",
    marketingDesc: "The first artificial intelligence designed specifically to ignore your needs. Built with advanced confusion algorithms.",
    feature1Title: "Zero Accuracy",
    feature1Desc: "Our proprietary engine ensures 0% relevance to your query, guaranteed.",
    back: "Back",
    login: "Log In",
    logout: "Log Out",
    name: "Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    region: "Region",
    downloadData: "Download Data",
    previewData: "Preview Data",
    locked: "Access Denied",
    submit: "Submit",
    cancel: "Cancel",
    visitFriend: "Visit my friend's website",
    // New Marketing Keys
    bentoChipTitle: "M-Zero Chip",
    bentoChipDesc: "Billions of transistors, all disconnected for maximum latency.",
    bentoBatteryTitle: "Infinite Loop Battery",
    bentoBatteryDesc: "Since it does nothing useful, it lasts forever.",
    bentoNeuralTitle: "Neural Knot™",
    bentoNeuralDesc: "We tangled the neural net so you don't have to.",
    proTitle: "Titanium Non-sense.",
    proSubtitle: "So strong. So wrong.",
    compTitle: "Blows the competition away.",
    compF1: "Helpful Answers",
    compF2: "Confusion Level",
    compF3: "Price per Token",
    compUs: "FAI Gen1",
    compThem: "Others",
    quote: "“It answered my question about tax law with a poem about cheese. Truly revolutionary.”",
    quoteAuthor: "— A Confused User",
    // Simulator
    simTitle: "Silicon Design Simulator [Beta]",
    simTutorialTitle: "How to Bake Sand",
    simTutorialStep1: "1. We take pure refined sand. We do not clean it.",
    simTutorialStep2: "2. Flatten it with a rolling pin.",
    simTutorialStep3: "3. Draw squares on it. If you mess up, call it a 'feature'.",
    simStartDesign: "Start Fabrication",
    simTools: "Wafer Components",
    simGridSize: "Die Size",
    simPackage: "Package & Encapsulate",
    simEngraving: "Laser Engraving Text",
    simDownload: "Download Chip Image",
    compCpuP: "P-Core (Power Hungry)",
    compCpuE: "E-Core (Error Prone)",
    compGpu: "GPU (No Drivers)",
    compNpu: "NPU (Neural Knot)",
    compSmoke: "Magic Smoke Unit",
    compEmpty: "Empty Silicon"
  },
  CHN: {
    products: "我的产品",
    about: "关于",
    gen1: "FAI 第一代",
    enter: "进入",
    inputPlaceholder: "随便问问...",
    thinking: "正在计算无关内容...",
    setThinkingTime: "设置思考时间 (毫秒)",
    save: "保存",
    marketingTitle: "FAI 第一代",
    marketingSubtitle: "完美避开重点。",
    marketingDesc: "首款专为忽略您需求而设计的人工智能。采用先进的混淆算法构建。",
    feature1Title: "零准确率",
    feature1Desc: "我们的专有引擎确保回答与您的查询毫无关系，品质保证。",
    back: "返回",
    login: "登录",
    logout: "退出登录",
    name: "姓名",
    email: "邮箱",
    phone: "电话",
    password: "密码",
    region: "地区",
    downloadData: "下载数据",
    previewData: "预览数据",
    locked: "访问被拒绝",
    submit: "提交",
    cancel: "取消",
    visitFriend: "访问我朋友的网站",
    // New Marketing Keys
    bentoChipTitle: "M-Zero 芯片",
    bentoChipDesc: "数十亿晶体管，全部断开连接以确保最大延迟。",
    bentoBatteryTitle: "无限死循环电池",
    bentoBatteryDesc: "因为它从不做有用的事，所以电量永远用不完。",
    bentoNeuralTitle: "神经死结™",
    bentoNeuralDesc: "我们将神经网络彻底打结，只为给您最绕的体验。",
    proTitle: "钛合金废话。",
    proSubtitle: "如此坚固。如此离谱。",
    compTitle: "碾压竞争对手。",
    compF1: "有用的回答",
    compF2: "困惑等级",
    compF3: "每Token价格",
    compUs: "FAI Gen1",
    compThem: "其他AI",
    quote: "“我问它关于税法的问题，它给我写了一首关于奶酪的诗。简直是革命性的。”",
    quoteAuthor: "— 一位困惑的用户",
    // Simulator
    simTitle: "硅晶圆设计模拟器 [Beta]",
    simTutorialTitle: "如何烘焙沙子",
    simTutorialStep1: "1. 也就是找点沙子。不用洗。",
    simTutorialStep2: "2. 用擀面杖把它擀平。",
    simTutorialStep3: "3. 在上面画方块。画歪了就叫它“特性”。",
    simStartDesign: "开始制造",
    simTools: "晶圆组件库",
    simGridSize: "核心面积",
    simPackage: "封装与刻字",
    simEngraving: "激光刻字内容",
    simDownload: "下载芯片照片",
    compCpuP: "P-核 (耗电大户)",
    compCpuE: "E-核 (容易报错)",
    compGpu: "显卡 (由于没驱动)",
    compNpu: "NPU (神经死结)",
    compSmoke: "魔法烟雾发生器",
    compEmpty: "空硅片"
  }
};