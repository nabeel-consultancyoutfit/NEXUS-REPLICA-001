export const LANGUAGE_STORAGE_KEY = 'clone-home-language';
export const LANGUAGE_CHANGE_EVENT = 'clone-home-language-change';

export const LANGUAGE_OPTIONS = [
  { code: 'EN', label: 'English', nativeLabel: 'English' },
  { code: 'AR', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'FR', label: 'French', nativeLabel: 'Francais' },
  { code: 'DE', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'ES', label: 'Spanish', nativeLabel: 'Espanol' },
  { code: 'PT', label: 'Portuguese', nativeLabel: 'Portugues' },
  { code: 'CN', label: 'Chinese', nativeLabel: '中文' },
  { code: 'JP', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'KR', label: 'Korean', nativeLabel: '한국어' },
  { code: 'HI', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'TR', label: 'Turkish', nativeLabel: 'Turkce' },
  { code: 'RU', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'IT', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'NL', label: 'Dutch', nativeLabel: 'Nederlands' },
] as const;

export type HomeLanguageCode = typeof LANGUAGE_OPTIONS[number]['code'];

interface HomeLanguageCopy {
  navbar: {
    chatHub: string;
    marketplace: string;
    agents: string;
    discoverNew: string;
    signIn: string;
    tryIt: string;
    appLanguage: string;
  };
  home: {
    liveModels: string;
    headingBefore: string;
    headingAccent: string;
    headingAfter: string;
    subtitle: string;
    helperPrefix: string;
    helperLink: string;
    trendingModels: string;
    viewAllModels: string;
  };
  tasks: string[];
}

const ENGLISH_TASKS = [
  'Create Image',
  'Generate Audio',
  'Create Video',
  'Create Slides',
  'Create Infographs',
  'Create Quiz',
  'Create Document',
  'Create Mind Map',
  'Code',
  'Write Content',
  'Analyze Data',
  'Automate Work',
];

export const HOME_LANGUAGE_COPY: Record<HomeLanguageCode, HomeLanguageCopy> = {
  EN: {
    navbar: {
      chatHub: 'Chat Hub',
      marketplace: 'Marketplace',
      agents: 'Agents',
      discoverNew: 'Discover New',
      signIn: 'Sign in',
      tryIt: 'Try It ->',
      appLanguage: 'APP LANGUAGE',
    },
    home: {
      liveModels: '347 models live · Updated daily',
      headingBefore: 'Find your perfect',
      headingAccent: 'AI model',
      headingAfter: 'with guided discovery',
      subtitle: "You don't need to know anything about AI to get started. Just click the box below — we'll do the rest together. ✨",
      helperPrefix: 'Click the box above to start the guided flow · or',
      helperLink: 'jump straight to chat',
      trendingModels: '🔥 Trending Models',
      viewAllModels: 'View all 347 models ->',
    },
    tasks: ENGLISH_TASKS,
  },
  AR: {
    navbar: { chatHub: 'مركز الدردشة', marketplace: 'المتجر', agents: 'الوكلاء', discoverNew: 'اكتشف الجديد', signIn: 'تسجيل الدخول', tryIt: 'ابدأ الآن ->', appLanguage: 'لغة التطبيق' },
    home: { liveModels: '347 نموذجا مباشرا · يتم التحديث يوميا', headingBefore: 'اعثر على', headingAccent: 'نموذج AI', headingAfter: 'المثالي مع اكتشاف موجه', subtitle: 'لا تحتاج إلى معرفة تقنية لتبدأ. فقط اضغط على المربع بالاسفل وسنتولى الباقي. ✨', helperPrefix: 'اضغط على المربع اعلاه لبدء التدفق الموجه · أو', helperLink: 'اذهب مباشرة إلى الدردشة', trendingModels: '🔥 النماذج الرائجة', viewAllModels: 'عرض كل 347 نموذجا ->' },
    tasks: ['إنشاء صورة', 'توليد صوت', 'إنشاء فيديو', 'إنشاء عروض', 'إنشاء إنفوجراف', 'إنشاء اختبار', 'إنشاء مستند', 'إنشاء خريطة ذهنية', 'برمجة', 'كتابة محتوى', 'تحليل البيانات', 'أتمتة العمل'],
  },
  FR: {
    navbar: { chatHub: 'Chat Hub', marketplace: 'Marche', agents: 'Agents', discoverNew: 'Decouvrir', signIn: 'Connexion', tryIt: 'Essayer ->', appLanguage: 'LANGUE APP' },
    home: { liveModels: '347 modeles en direct · Mise a jour quotidienne', headingBefore: 'Trouvez votre', headingAccent: 'modele IA', headingAfter: 'ideal avec decouverte guidee', subtitle: "Pas besoin d'etre expert en IA pour commencer. Cliquez sur la case ci-dessous et nous faisons le reste. ✨", helperPrefix: 'Cliquez sur la case ci-dessus pour commencer · ou', helperLink: 'aller directement au chat', trendingModels: '🔥 Modeles tendance', viewAllModels: 'Voir les 347 modeles ->' },
    tasks: ['Creer une image', 'Generer un audio', 'Creer une video', 'Creer des slides', 'Creer des infographies', 'Creer un quiz', 'Creer un document', 'Creer une carte mentale', 'Coder', 'Ecrire du contenu', 'Analyser des donnees', 'Automatiser le travail'],
  },
  DE: {
    navbar: { chatHub: 'Chat Hub', marketplace: 'Marktplatz', agents: 'Agenten', discoverNew: 'Neu entdecken', signIn: 'Anmelden', tryIt: 'Jetzt testen ->', appLanguage: 'APP-SPRACHE' },
    home: { liveModels: '347 Modelle live · Taeglich aktualisiert', headingBefore: 'Finde dein perfektes', headingAccent: 'KI-Modell', headingAfter: 'mit gefuehrter Entdeckung', subtitle: 'Du brauchst kein KI-Wissen fuer den Start. Klicke einfach unten auf das Feld und wir uebernehmen den Rest. ✨', helperPrefix: 'Klicke oben auf das Feld, um zu starten · oder', helperLink: 'direkt zum Chat', trendingModels: '🔥 Trendmodelle', viewAllModels: 'Alle 347 Modelle ansehen ->' },
    tasks: ['Bild erstellen', 'Audio erzeugen', 'Video erstellen', 'Folien erstellen', 'Infografiken erstellen', 'Quiz erstellen', 'Dokument erstellen', 'Mindmap erstellen', 'Code', 'Inhalte schreiben', 'Daten analysieren', 'Arbeit automatisieren'],
  },
  ES: {
    navbar: { chatHub: 'Centro de chat', marketplace: 'Marketplace', agents: 'Agentes', discoverNew: 'Descubrir', signIn: 'Iniciar sesion', tryIt: 'Probar ->', appLanguage: 'IDIOMA APP' },
    home: { liveModels: '347 modelos en vivo · Actualizado a diario', headingBefore: 'Encuentra tu', headingAccent: 'modelo IA', headingAfter: 'perfecto con descubrimiento guiado', subtitle: 'No necesitas saber de IA para empezar. Haz clic en la caja de abajo y haremos el resto contigo. ✨', helperPrefix: 'Haz clic arriba para iniciar el flujo guiado · o', helperLink: 'ir directo al chat', trendingModels: '🔥 Modelos en tendencia', viewAllModels: 'Ver los 347 modelos ->' },
    tasks: ['Crear imagen', 'Generar audio', 'Crear video', 'Crear diapositivas', 'Crear infografias', 'Crear quiz', 'Crear documento', 'Crear mapa mental', 'Codigo', 'Escribir contenido', 'Analizar datos', 'Automatizar trabajo'],
  },
  PT: {
    navbar: { chatHub: 'Chat Hub', marketplace: 'Marketplace', agents: 'Agentes', discoverNew: 'Descobrir', signIn: 'Entrar', tryIt: 'Experimentar ->', appLanguage: 'IDIOMA APP' },
    home: { liveModels: '347 modelos ao vivo · Atualizado diariamente', headingBefore: 'Encontre seu', headingAccent: 'modelo de IA', headingAfter: 'ideal com descoberta guiada', subtitle: 'Voce nao precisa saber nada de IA para comecar. Clique na caixa abaixo e fazemos o resto com voce. ✨', helperPrefix: 'Clique acima para iniciar o fluxo guiado · ou', helperLink: 'ir direto para o chat', trendingModels: '🔥 Modelos em alta', viewAllModels: 'Ver todos os 347 modelos ->' },
    tasks: ['Criar imagem', 'Gerar audio', 'Criar video', 'Criar slides', 'Criar infograficos', 'Criar quiz', 'Criar documento', 'Criar mapa mental', 'Codigo', 'Escrever conteudo', 'Analisar dados', 'Automatizar trabalho'],
  },
  CN: {
    navbar: { chatHub: '聊天中心', marketplace: '模型市场', agents: '智能体', discoverNew: '发现新内容', signIn: '登录', tryIt: '立即开始 ->', appLanguage: '应用语言' },
    home: { liveModels: '347 个模型在线 · 每日更新', headingBefore: '找到你的理想', headingAccent: 'AI 模型', headingAfter: '通过引导式探索', subtitle: '你不需要任何 AI 背景就能开始。点击下面的输入框，我们会陪你完成剩下的步骤。 ✨', helperPrefix: '点击上方输入框开始引导流程 · 或', helperLink: '直接进入聊天', trendingModels: '🔥 热门模型', viewAllModels: '查看全部 347 个模型 ->' },
    tasks: ['创建图片', '生成音频', '创建视频', '创建幻灯片', '创建信息图', '创建测验', '创建文档', '创建思维导图', '编写代码', '写内容', '分析数据', '自动化工作'],
  },
  JP: {
    navbar: { chatHub: 'チャットハブ', marketplace: 'マーケットプレイス', agents: 'エージェント', discoverNew: '新着を探す', signIn: 'サインイン', tryIt: '試してみる ->', appLanguage: 'アプリ言語' },
    home: { liveModels: '347 モデルが稼働中 · 毎日更新', headingBefore: 'あなたに最適な', headingAccent: 'AI モデル', headingAfter: 'をガイド付きで発見', subtitle: 'AI の知識がなくても始められます。下のボックスをクリックすれば、あとは一緒に進めます。 ✨', helperPrefix: '上のボックスからガイドを開始 · または', helperLink: 'すぐにチャットへ', trendingModels: '🔥 注目モデル', viewAllModels: '347 モデルをすべて見る ->' },
    tasks: ['画像を作成', '音声を生成', '動画を作成', 'スライドを作成', 'インフォグラフィックを作成', 'クイズを作成', '文書を作成', 'マインドマップを作成', 'コード', 'コンテンツ作成', 'データ分析', '作業を自動化'],
  },
  KR: {
    navbar: { chatHub: '채팅 허브', marketplace: '마켓플레이스', agents: '에이전트', discoverNew: '새로운 항목', signIn: '로그인', tryIt: '시작하기 ->', appLanguage: '앱 언어' },
    home: { liveModels: '347개 모델 실시간 · 매일 업데이트', headingBefore: '가장 적합한', headingAccent: 'AI 모델', headingAfter: '을 가이드와 함께 찾으세요', subtitle: 'AI 지식이 없어도 시작할 수 있습니다. 아래 상자를 클릭하면 나머지는 함께 진행합니다. ✨', helperPrefix: '위 상자를 눌러 가이드 흐름 시작 · 또는', helperLink: '바로 채팅으로 이동', trendingModels: '🔥 인기 모델', viewAllModels: '347개 모델 모두 보기 ->' },
    tasks: ['이미지 만들기', '오디오 생성', '비디오 만들기', '슬라이드 만들기', '인포그래픽 만들기', '퀴즈 만들기', '문서 만들기', '마인드맵 만들기', '코드', '콘텐츠 작성', '데이터 분석', '업무 자동화'],
  },
  HI: {
    navbar: { chatHub: 'चैट हब', marketplace: 'मार्केटप्लेस', agents: 'एजेंट', discoverNew: 'नया खोजें', signIn: 'साइन इन', tryIt: 'शुरू करें ->', appLanguage: 'ऐप भाषा' },
    home: { liveModels: '347 मॉडल लाइव · रोज अपडेट', headingBefore: 'अपना परफेक्ट', headingAccent: 'AI मॉडल', headingAfter: 'गाइडेड डिस्कवरी के साथ खोजें', subtitle: 'शुरू करने के लिए आपको AI के बारे में जानने की जरूरत नहीं है। नीचे बॉक्स पर क्लिक करें और बाकी हम साथ करेंगे। ✨', helperPrefix: 'गाइडेड फ्लो शुरू करने के लिए ऊपर बॉक्स क्लिक करें · या', helperLink: 'सीधे चैट पर जाएं', trendingModels: '🔥 ट्रेंडिंग मॉडल', viewAllModels: 'सभी 347 मॉडल देखें ->' },
    tasks: ['इमेज बनाएं', 'ऑडियो जनरेट करें', 'वीडियो बनाएं', 'स्लाइड बनाएं', 'इन्फोग्राफ बनाएं', 'क्विज बनाएं', 'दस्तावेज बनाएं', 'माइंड मैप बनाएं', 'कोड', 'कंटेंट लिखें', 'डेटा विश्लेषण', 'काम ऑटोमेट करें'],
  },
  TR: {
    navbar: { chatHub: 'Sohbet Merkezi', marketplace: 'Pazar', agents: 'Ajanlar', discoverNew: 'Yenileri Kesfet', signIn: 'Giris yap', tryIt: 'Basla ->', appLanguage: 'UYGULAMA DILI' },
    home: { liveModels: '347 model canli · Gunluk guncellenir', headingBefore: 'Mukemmel', headingAccent: 'AI modelini', headingAfter: 'yonlendirmeli kesifle bul', subtitle: 'Baslamak icin AI bilmen gerekmiyor. Asagidaki kutuya tikla, gerisini birlikte yapalim. ✨', helperPrefix: 'Yonlendirmeli akis icin yukariya tikla · veya', helperLink: 'dogrudan sohbete gec', trendingModels: '🔥 Trend modeller', viewAllModels: 'Tum 347 modeli gor ->' },
    tasks: ['Gorsel olustur', 'Ses uret', 'Video olustur', 'Slayt olustur', 'Infografik olustur', 'Quiz olustur', 'Belge olustur', 'Zihin haritasi olustur', 'Kod', 'Icerik yaz', 'Veri analiz et', 'Isi otomatiklestir'],
  },
  RU: {
    navbar: { chatHub: 'Чат-хаб', marketplace: 'Маркетплейс', agents: 'Агенты', discoverNew: 'Новое', signIn: 'Войти', tryIt: 'Начать ->', appLanguage: 'ЯЗЫК ПРИЛОЖЕНИЯ' },
    home: { liveModels: '347 моделей онлайн · Обновляется ежедневно', headingBefore: 'Найдите свою идеальную', headingAccent: 'AI модель', headingAfter: 'с пошаговым подбором', subtitle: 'Вам не нужно разбираться в AI, чтобы начать. Нажмите на поле ниже, и мы проведем вас дальше. ✨', helperPrefix: 'Нажмите выше, чтобы начать подбор · или', helperLink: 'сразу перейти в чат', trendingModels: '🔥 Популярные модели', viewAllModels: 'Посмотреть все 347 моделей ->' },
    tasks: ['Создать изображение', 'Сгенерировать аудио', 'Создать видео', 'Создать слайды', 'Создать инфографику', 'Создать викторину', 'Создать документ', 'Создать mind map', 'Код', 'Писать контент', 'Анализировать данные', 'Автоматизировать работу'],
  },
  IT: {
    navbar: { chatHub: 'Chat Hub', marketplace: 'Marketplace', agents: 'Agenti', discoverNew: 'Scopri novita', signIn: 'Accedi', tryIt: 'Inizia ->', appLanguage: 'LINGUA APP' },
    home: { liveModels: '347 modelli live · Aggiornato ogni giorno', headingBefore: 'Trova il tuo', headingAccent: 'modello AI', headingAfter: 'perfetto con scoperta guidata', subtitle: "Non serve conoscere l'AI per iniziare. Clicca sul riquadro qui sotto e faremo il resto insieme. ✨", helperPrefix: 'Clicca sopra per iniziare il flusso guidato · oppure', helperLink: 'vai subito alla chat', trendingModels: '🔥 Modelli di tendenza', viewAllModels: 'Vedi tutti i 347 modelli ->' },
    tasks: ['Crea immagine', 'Genera audio', 'Crea video', 'Crea slide', 'Crea infografiche', 'Crea quiz', 'Crea documento', 'Crea mappa mentale', 'Codice', 'Scrivi contenuti', 'Analizza dati', 'Automatizza il lavoro'],
  },
  NL: {
    navbar: { chatHub: 'Chat Hub', marketplace: 'Marktplaats', agents: 'Agenten', discoverNew: 'Ontdek nieuw', signIn: 'Inloggen', tryIt: 'Start ->', appLanguage: 'APPTAAL' },
    home: { liveModels: '347 modellen live · Dagelijks bijgewerkt', headingBefore: 'Vind jouw perfecte', headingAccent: 'AI-model', headingAfter: 'met begeleide ontdekking', subtitle: 'Je hoeft niets van AI te weten om te beginnen. Klik op het vak hieronder en wij doen de rest samen. ✨', helperPrefix: 'Klik hierboven om de flow te starten · of', helperLink: 'ga direct naar chat', trendingModels: '🔥 Trending modellen', viewAllModels: 'Bekijk alle 347 modellen ->' },
    tasks: ['Afbeelding maken', 'Audio genereren', 'Video maken', 'Slides maken', 'Infographics maken', 'Quiz maken', 'Document maken', 'Mindmap maken', 'Code', 'Content schrijven', 'Data analyseren', 'Werk automatiseren'],
  },
};

export function getStoredHomeLanguage(): HomeLanguageCode {
  if (typeof window === 'undefined') return 'EN';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as HomeLanguageCode | null;
  return stored && stored in HOME_LANGUAGE_COPY ? stored : 'EN';
}
