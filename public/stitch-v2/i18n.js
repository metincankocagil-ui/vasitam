(function () {
  var storageKey = "vasitan-language";
  var defaultLanguage = "TR";
  var languages = ["TR", "EN", "DE", "FR", "IT", "ES", "PT", "AR", "ZH", "JA"];

  var dictionary = {
    TR: {
      nav_inventory: "İlanlar",
      nav_intelligence: "Akıllı Analiz",
      nav_valuation: "Değerleme",
      nav_garage: "Garaj",
      login: "Giriş",
      list_vehicle: "İlan Ver",
      hero_title: "Mobilite zekayla buluşur.",
      hero_subtitle: "Modern araç ekosistemi için AI destekli arama.",
      search_placeholder: "1.5M TL altı, düşük masraflı aile SUV’u",
      chip_family: "Aile",
      chip_first: "İlk Araç",
      chip_suv: "SUV",
      chip_electric: "Elektrikli",
      chip_motorcycle: "Motosiklet",
      chip_commercial: "Ticari",
      chip_performance: "Performans",
      section_trending: "Öne Çıkan Araçlar",
      badge_demand: "+12% Talep",
      badge_hot: "Popüler İlan",
      card_1_desc: "Long Range AWD. Son 48 saatte güçlü piyasa ilgisi.",
      card_2_desc: "B5 Inscription. Segmentine göre çok düşük kilometre.",
      hybrid: "Hibrit",
      ai_matches: "AI Eşleşmeleri",
      top_reco: "En İyi Öneri",
      trust_score: "Güven Skoru",
      ai_reason_1: "Bütçeye tam uyumlu (ortalama 1.42M TL).",
      ai_reason_2: "Bakım maliyeti rakiplerinden %15 düşük.",
      ai_reason_3: "Aile kullanım puanı yüksek.",
      view_analysis: "Analizi Gör",
      footer_rights: "Tüm hakları saklıdır.",
      marketplace: "Pazar Yeri",
      performance_data: "Performans Verisi",
      ai_diagnostics: "AI Tanı",
      support_center: "Destek Merkezi",
      privacy: "Gizlilik",
      terms: "Koşullar"
    },
    EN: {
      nav_inventory: "Inventory",
      nav_intelligence: "AI Insight",
      nav_valuation: "Valuation",
      nav_garage: "Garage",
      login: "Sign In",
      list_vehicle: "List Car",
      hero_title: "Mobility meets intelligence.",
      hero_subtitle: "AI search for the modern vehicle market.",
      search_placeholder: "Family SUV under 1.5M TL, low upkeep",
      chip_family: "Family",
      chip_first: "First Car",
      chip_suv: "SUV",
      chip_electric: "Electric",
      chip_motorcycle: "Moto",
      chip_commercial: "Commercial",
      chip_performance: "Performance",
      section_trending: "Featured Vehicles",
      badge_demand: "+12% Demand",
      badge_hot: "Hot Listing",
      card_1_desc: "Long Range AWD. Strong demand in the last 48 hours.",
      card_2_desc: "B5 Inscription. Very low mileage for its class.",
      hybrid: "Hybrid",
      ai_matches: "AI Matches",
      top_reco: "Top Pick",
      trust_score: "Trust Score",
      ai_reason_1: "Fits budget perfectly (1.42M TL avg).",
      ai_reason_2: "Maintenance cost is 15% lower.",
      ai_reason_3: "High family utility score.",
      view_analysis: "View Analysis",
      footer_rights: "All rights reserved.",
      marketplace: "Marketplace",
      performance_data: "Performance Data",
      ai_diagnostics: "AI Diagnostics",
      support_center: "Support",
      privacy: "Privacy",
      terms: "Terms"
    },
    DE: {
      nav_inventory: "Angebote",
      nav_intelligence: "AI Analyse",
      nav_valuation: "Bewertung",
      nav_garage: "Garage",
      login: "Login",
      list_vehicle: "Inserieren",
      hero_title: "Mobilität trifft Intelligenz.",
      hero_subtitle: "AI Suche für den modernen Fahrzeugmarkt.",
      search_placeholder: "Familien-SUV unter 1.5M TL, geringe Kosten",
      chip_family: "Familie",
      chip_first: "Erstes Auto",
      chip_suv: "SUV",
      chip_electric: "Elektrisch",
      chip_motorcycle: "Motorrad",
      chip_commercial: "Gewerbe",
      chip_performance: "Performance",
      section_trending: "Top Fahrzeuge",
      badge_demand: "+12% Nachfrage",
      badge_hot: "Top Inserat",
      card_1_desc: "Long Range AWD. Starke Nachfrage in 48 Stunden.",
      card_2_desc: "B5 Inscription. Sehr niedrige Laufleistung.",
      hybrid: "Hybrid",
      ai_matches: "AI Treffer",
      top_reco: "Top Tipp",
      trust_score: "Trust Score",
      ai_reason_1: "Passt perfekt ins Budget (1.42M TL).",
      ai_reason_2: "Wartungskosten 15% niedriger.",
      ai_reason_3: "Hoher Familiennutzen.",
      view_analysis: "Analyse",
      footer_rights: "Alle Rechte vorbehalten.",
      marketplace: "Markt",
      performance_data: "Leistungsdaten",
      ai_diagnostics: "AI Diagnose",
      support_center: "Support",
      privacy: "Datenschutz",
      terms: "Bedingungen"
    },
    FR: {
      nav_inventory: "Annonces",
      nav_intelligence: "Analyse AI",
      nav_valuation: "Cote",
      nav_garage: "Garage",
      login: "Connexion",
      list_vehicle: "Déposer",
      hero_title: "La mobilité devient intelligente.",
      hero_subtitle: "Recherche AI pour le marché auto moderne.",
      search_placeholder: "SUV familial sous 1.5M TL, entretien bas",
      chip_family: "Famille",
      chip_first: "1re voiture",
      chip_suv: "SUV",
      chip_electric: "Électrique",
      chip_motorcycle: "Moto",
      chip_commercial: "Utilitaire",
      chip_performance: "Sport",
      section_trending: "Véhicules phares",
      badge_demand: "+12% demande",
      badge_hot: "Annonce chaude",
      card_1_desc: "Long Range AWD. Forte demande sur 48 h.",
      card_2_desc: "B5 Inscription. Kilométrage très bas.",
      hybrid: "Hybride",
      ai_matches: "Matchs AI",
      top_reco: "Top choix",
      trust_score: "Score confiance",
      ai_reason_1: "Parfait pour le budget (1.42M TL).",
      ai_reason_2: "Entretien 15% moins cher.",
      ai_reason_3: "Très bon usage familial.",
      view_analysis: "Voir analyse",
      footer_rights: "Tous droits réservés.",
      marketplace: "Marché",
      performance_data: "Données perf.",
      ai_diagnostics: "Diagnostic AI",
      support_center: "Support",
      privacy: "Confidentialité",
      terms: "Conditions"
    },
    IT: {
      nav_inventory: "Annunci",
      nav_intelligence: "Analisi AI",
      nav_valuation: "Valutazione",
      nav_garage: "Garage",
      login: "Accedi",
      list_vehicle: "Inserisci",
      hero_title: "Mobilità e intelligenza.",
      hero_subtitle: "Ricerca AI per il mercato auto moderno.",
      search_placeholder: "SUV famiglia sotto 1.5M TL, costi bassi",
      chip_family: "Famiglia",
      chip_first: "Prima auto",
      chip_suv: "SUV",
      chip_electric: "Elettrica",
      chip_motorcycle: "Moto",
      chip_commercial: "Commerciale",
      chip_performance: "Performance",
      section_trending: "Veicoli in evidenza",
      badge_demand: "+12% domanda",
      badge_hot: "Annuncio hot",
      card_1_desc: "Long Range AWD. Forte interesse in 48 ore.",
      card_2_desc: "B5 Inscription. Chilometri molto bassi.",
      hybrid: "Ibrida",
      ai_matches: "Match AI",
      top_reco: "Scelta top",
      trust_score: "Score fiducia",
      ai_reason_1: "Perfetta per budget (1.42M TL).",
      ai_reason_2: "Manutenzione -15%.",
      ai_reason_3: "Ottima per famiglia.",
      view_analysis: "Vedi analisi",
      footer_rights: "Tutti i diritti riservati.",
      marketplace: "Mercato",
      performance_data: "Dati performance",
      ai_diagnostics: "Diagnosi AI",
      support_center: "Supporto",
      privacy: "Privacy",
      terms: "Termini"
    },
    ES: {
      nav_inventory: "Anuncios",
      nav_intelligence: "Análisis AI",
      nav_valuation: "Valoración",
      nav_garage: "Garaje",
      login: "Entrar",
      list_vehicle: "Publicar",
      hero_title: "Movilidad con inteligencia.",
      hero_subtitle: "Búsqueda AI para el mercado auto moderno.",
      search_placeholder: "SUV familiar bajo 1.5M TL, bajo costo",
      chip_family: "Familia",
      chip_first: "Primer auto",
      chip_suv: "SUV",
      chip_electric: "Eléctrico",
      chip_motorcycle: "Moto",
      chip_commercial: "Comercial",
      chip_performance: "Rendimiento",
      section_trending: "Vehículos destacados",
      badge_demand: "+12% demanda",
      badge_hot: "Anuncio top",
      card_1_desc: "Long Range AWD. Alta demanda en 48 h.",
      card_2_desc: "B5 Inscription. Muy bajo kilometraje.",
      hybrid: "Híbrido",
      ai_matches: "Matches AI",
      top_reco: "Top elección",
      trust_score: "Score confianza",
      ai_reason_1: "Encaja con presupuesto (1.42M TL).",
      ai_reason_2: "Mantenimiento 15% menor.",
      ai_reason_3: "Alta utilidad familiar.",
      view_analysis: "Ver análisis",
      footer_rights: "Todos los derechos reservados.",
      marketplace: "Mercado",
      performance_data: "Datos rendimiento",
      ai_diagnostics: "Diagnóstico AI",
      support_center: "Soporte",
      privacy: "Privacidad",
      terms: "Términos"
    },
    PT: {
      nav_inventory: "Anúncios",
      nav_intelligence: "Análise AI",
      nav_valuation: "Avaliação",
      nav_garage: "Garagem",
      login: "Entrar",
      list_vehicle: "Anunciar",
      hero_title: "Mobilidade com inteligência.",
      hero_subtitle: "Busca AI para o mercado automóvel moderno.",
      search_placeholder: "SUV familiar até 1.5M TL, baixo custo",
      chip_family: "Família",
      chip_first: "1º carro",
      chip_suv: "SUV",
      chip_electric: "Elétrico",
      chip_motorcycle: "Moto",
      chip_commercial: "Comercial",
      chip_performance: "Performance",
      section_trending: "Veículos destaque",
      badge_demand: "+12% demanda",
      badge_hot: "Anúncio top",
      card_1_desc: "Long Range AWD. Alta procura em 48 h.",
      card_2_desc: "B5 Inscription. Quilometragem muito baixa.",
      hybrid: "Híbrido",
      ai_matches: "Matches AI",
      top_reco: "Top escolha",
      trust_score: "Score confiança",
      ai_reason_1: "Cabe no orçamento (1.42M TL).",
      ai_reason_2: "Manutenção 15% menor.",
      ai_reason_3: "Ótimo uso familiar.",
      view_analysis: "Ver análise",
      footer_rights: "Todos os direitos reservados.",
      marketplace: "Mercado",
      performance_data: "Dados performance",
      ai_diagnostics: "Diagnóstico AI",
      support_center: "Suporte",
      privacy: "Privacidade",
      terms: "Termos"
    },
    AR: {
      nav_inventory: "الإعلانات",
      nav_intelligence: "تحليل AI",
      nav_valuation: "تقييم",
      nav_garage: "المرآب",
      login: "دخول",
      list_vehicle: "أضف إعلان",
      hero_title: "تنقل بذكاء.",
      hero_subtitle: "بحث AI لسوق السيارات الحديث.",
      search_placeholder: "SUV عائلية تحت 1.5M TL وتكلفة منخفضة",
      chip_family: "عائلة",
      chip_first: "أول سيارة",
      chip_suv: "SUV",
      chip_electric: "كهربائية",
      chip_motorcycle: "دراجة",
      chip_commercial: "تجاري",
      chip_performance: "أداء",
      section_trending: "سيارات مميزة",
      badge_demand: "+12% طلب",
      badge_hot: "إعلان مميز",
      card_1_desc: "Long Range AWD. طلب قوي خلال 48 ساعة.",
      card_2_desc: "B5 Inscription. كيلومترات منخفضة جدا.",
      hybrid: "هجين",
      ai_matches: "مطابقات AI",
      top_reco: "أفضل خيار",
      trust_score: "درجة الثقة",
      ai_reason_1: "يناسب الميزانية (1.42M TL).",
      ai_reason_2: "صيانة أقل 15%.",
      ai_reason_3: "مناسب للعائلة.",
      view_analysis: "عرض التحليل",
      footer_rights: "كل الحقوق محفوظة.",
      marketplace: "السوق",
      performance_data: "بيانات الأداء",
      ai_diagnostics: "تشخيص AI",
      support_center: "الدعم",
      privacy: "الخصوصية",
      terms: "الشروط"
    },
    ZH: {
      nav_inventory: "车源",
      nav_intelligence: "AI分析",
      nav_valuation: "估值",
      nav_garage: "车库",
      login: "登录",
      list_vehicle: "发布",
      hero_title: "出行遇见智能。",
      hero_subtitle: "面向现代车市的 AI 搜索。",
      search_placeholder: "150万TL内低维护家庭SUV",
      chip_family: "家庭",
      chip_first: "首车",
      chip_suv: "SUV",
      chip_electric: "电动",
      chip_motorcycle: "摩托",
      chip_commercial: "商用",
      chip_performance: "性能",
      section_trending: "精选车辆",
      badge_demand: "+12% 需求",
      badge_hot: "热门车源",
      card_1_desc: "Long Range AWD。近48小时需求强。",
      card_2_desc: "B5 Inscription。同级低里程。",
      hybrid: "混动",
      ai_matches: "AI 匹配",
      top_reco: "首选",
      trust_score: "信任分",
      ai_reason_1: "符合预算（均价1.42M TL）。",
      ai_reason_2: "维护成本低15%。",
      ai_reason_3: "家庭实用分高。",
      view_analysis: "查看分析",
      footer_rights: "版权所有。",
      marketplace: "市场",
      performance_data: "性能数据",
      ai_diagnostics: "AI诊断",
      support_center: "支持",
      privacy: "隐私",
      terms: "条款"
    },
    JA: {
      nav_inventory: "在庫",
      nav_intelligence: "AI分析",
      nav_valuation: "査定",
      nav_garage: "ガレージ",
      login: "ログイン",
      list_vehicle: "出品",
      hero_title: "移動に知性を。",
      hero_subtitle: "現代の車市場向けAI検索。",
      search_placeholder: "1.5M TL以下 低維持費の家族SUV",
      chip_family: "家族",
      chip_first: "初めて",
      chip_suv: "SUV",
      chip_electric: "EV",
      chip_motorcycle: "バイク",
      chip_commercial: "商用",
      chip_performance: "性能",
      section_trending: "注目車両",
      badge_demand: "+12% 需要",
      badge_hot: "人気掲載",
      card_1_desc: "Long Range AWD。直近48時間で高い関心。",
      card_2_desc: "B5 Inscription。同クラスで低走行。",
      hybrid: "ハイブリッド",
      ai_matches: "AIマッチ",
      top_reco: "最有力",
      trust_score: "信頼スコア",
      ai_reason_1: "予算に適合（平均1.42M TL）。",
      ai_reason_2: "維持費15%低い。",
      ai_reason_3: "家族利用に高評価。",
      view_analysis: "分析を見る",
      footer_rights: "All rights reserved.",
      marketplace: "市場",
      performance_data: "性能データ",
      ai_diagnostics: "AI診断",
      support_center: "サポート",
      privacy: "プライバシー",
      terms: "規約"
    }
  };

  function getLanguage() {
    var saved = localStorage.getItem(storageKey);
    return languages.indexOf(saved) >= 0 ? saved : defaultLanguage;
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = text;
    });
  }

  function applyLanguage(language) {
    var messages = dictionary[language] || dictionary[defaultLanguage];
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    localStorage.setItem(storageKey, language);

    Object.keys(messages).forEach(function (key) {
      setText('[data-i18n="' + key + '"]', messages[key]);
      document.querySelectorAll('[data-i18n-placeholder="' + key + '"]').forEach(function (element) {
        element.setAttribute("placeholder", messages[key]);
      });
    });

    document.querySelectorAll("[data-language-current]").forEach(function (element) {
      element.textContent = language;
    });
    document.querySelectorAll("[data-language-option]").forEach(function (element) {
      element.classList.toggle("is-active", element.getAttribute("data-language-option") === language);
    });
  }

  function toggleMenu(menu) {
    menu.classList.toggle("is-open");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var selector = document.querySelector("[data-language-selector]");
    var menu = document.querySelector("[data-language-menu]");
    applyLanguage(getLanguage());

    if (!selector || !menu) {
      return;
    }

    selector.addEventListener("click", function (event) {
      event.preventDefault();
      toggleMenu(menu);
    });

    document.querySelectorAll("[data-language-option]").forEach(function (button) {
      button.addEventListener("click", function () {
        applyLanguage(button.getAttribute("data-language-option") || defaultLanguage);
        menu.classList.remove("is-open");
      });
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !selector.contains(event.target)) {
        menu.classList.remove("is-open");
      }
    });
  });
})();
