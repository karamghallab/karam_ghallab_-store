const state = {
  apps: [],
  category: "الكل",
  query: "",
  managing: false,
  language: "ar",
  theme: "light",
  currentUser: null
};

const translations = {
  ar: {
    dir: "rtl",
    kicker: "اكتشف ما يناسب يومك",
    title: "نوفر لك التطبيقات المجانية والألعاب المجانية بصيغة apk.",
    description: "مجموعة مختارة من الألعاب والتطبيقات المجانية.",
    sidebarTitle: "الأقسام",
    all: "الكل",
    games: "الألعاب",
    apps: "التطبيقات",
    discover: "استكشف التطبيقات والألعاب",
    helper: "ابحث باسم التطبيق أو اختر قسمًا للبدء.",
    search: "البحث في المتجر",
    placeholder: "ابحث عن لعبة أو تطبيق...",
    rating: "من 5",
    emptyTitle: "لا توجد نتائج مطابقة",
    emptyDesc: "جرّب كلمة بحث أخرى أو اختر قسمًا مختلفًا.",
    manager: "وضع إدارة المحتوى",
    managerDesc: "أضف تطبيقات المتجر أو عدّل بياناتها وروابط تنزيلها.",
    close: "إخفاء الإدارة",
    name: "اسم التطبيق أو اللعبة",
    category: "القسم",
    shortDesc: "وصف مختصر",
    score: "التقييم من 1 إلى 5",
    icon: "رمز الأيقونة (Emoji)",
    url: "رابط التنزيل (APK URL)",
    save: "حفظ التطبيق",
    newApp: "إضافة تطبيق جديد",
    download: "تنزيل APK",
    edit: "تعديل",
    del: "حذف",
    deleteAsk: "هل تريد حذف هذا التطبيق؟",
    confirm: "نعم، احذف",
    cancel: "إلغاء",
    results: "عرض {visible} من {total}",
    noLink: "لم يُضف رابط تنزيل لهذا التطبيق بعد.",
    badLink: "رابط التنزيل غير صالح.",
    saved: "تم حفظ تعديلات التطبيق بنجاح.",
    added: "تمت إضافة التطبيق إلى المتجر بنجاح.",
    deleted: "تم حذف التطبيق من المتجر.",
    failed: "تعذر حفظ البيانات الآن. حاول مرة أخرى.",
    ownerRoute: "وصول المالك: #owner-storek",
    darkMode: "الوضع الليلي",
    lightMode: "الوضع الفاتح",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    registerSuccess: "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.",
    wrongPass: "كلمة المرور غير صحيحة!",
    userNotFound: "اسم المستخدم غير موجود!"
  },
  en: {
    dir: "ltr",
    kicker: "Discover what fits your day",
    title: "We provide you with free apps and games in apk format.",
    description: "A curated collection of free games and applications.",
    sidebarTitle: "Categories",
    all: "All",
    games: "Games",
    apps: "Apps",
    discover: "Explore Apps & Games",
    helper: "Search by name or select a category to begin.",
    search: "Search Store",
    placeholder: "Search for a game or app...",
    rating: "out of 5",
    emptyTitle: "No matching results",
    emptyDesc: "Try another search term or different category.",
    manager: "Content Management",
    managerDesc: "Add apps or edit their details and download links.",
    close: "Hide Management",
    name: "App or Game Name",
    category: "Category",
    shortDesc: "Short Description",
    score: "Rating (1 to 5)",
    icon: "Icon Emoji",
    url: "Download Link (APK)",
    save: "Save App",
    newApp: "Add New App",
    download: "Download APK",
    edit: "Edit",
    del: "Delete",
    deleteAsk: "Delete this app?",
    confirm: "Yes, delete",
    cancel: "Cancel",
    results: "Showing {visible} of {total}",
    noLink: "No download link added yet.",
    badLink: "Invalid download link.",
    saved: "App changes saved successfully.",
    added: "App added successfully.",
    deleted: "App deleted from store.",
    failed: "Unable to save. Please try again.",
    ownerRoute: "Owner access: #owner-storek",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    loginSuccess: "Logged in successfully!",
    registerSuccess: "Account created successfully! You can log in now.",
    wrongPass: "Incorrect password!",
    userNotFound: "Username not found!"
  }
};

const grid = document.getElementById("apps-grid");
const emptyState = document.getElementById("empty-state");
const toast = document.getElementById("status-toast");
let toastTimer;

function text(key) {
  return translations[state.language][key] || translations.en[key] || "";
}

function showStatus(message) {
  toast.textContent = message;
  toast.classList.add("toast-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("toast-show"), 3800);
}

function localizedCategory(category) {
  if (category === "الألعاب") return text("games");
  if (category === "التطبيقات") return text("apps");
  return text("all");
}

function applyTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.theme);
  const themeText = document.getElementById("menu-theme-text");
  const themeIcon = document.getElementById("menu-theme-icon");
  if (state.theme === "dark") {
    themeText.textContent = text("lightMode");
    themeIcon.setAttribute("data-lucide", "sun");
  } else {
    themeText.textContent = text("darkMode");
    themeIcon.setAttribute("data-lucide", "moon");
  }
  lucide.createIcons();
  try { localStorage.setItem("storek-theme", state.theme); } catch (_) {}
}

function applyLanguage(lang) {
  state.language = lang === "en" ? "en" : "ar";
  const current = translations[state.language];
  document.documentElement.lang = state.language;
  document.documentElement.dir = current.dir;

  document.getElementById("brand-tag").textContent = state.language === "ar" ? "متجر رقمي" : "App Store";
  document.getElementById("menu-lang-text").textContent = state.language === "ar" ? "English" : "العربية";
  document.getElementById("hero-kicker").textContent = current.kicker;
  document.getElementById("hero-title").textContent = current.title;
  document.getElementById("hero-description").textContent = current.description;
  document.getElementById("sidebar-title").textContent = current.sidebarTitle;
  document.getElementById("cat-all").textContent = current.all;
  document.getElementById("cat-games").textContent = current.games;
  document.getElementById("cat-apps").textContent = current.apps;
  document.getElementById("discover-title").textContent = current.discover;
  document.getElementById("discover-helper").textContent = current.helper;
  document.getElementById("search-label").textContent = current.search;
  document.getElementById("app-search").placeholder = current.placeholder;

  document.getElementById("manager-title").textContent = `${current.manager} — كرم غلاب`;
  document.getElementById("manager-description").textContent = current.managerDesc;
  document.getElementById("manager-close").textContent = current.close;
  document.getElementById("app-name-label").textContent = current.name;
  document.getElementById("app-category-label").textContent = current.category;
  document.getElementById("app-description-label").textContent = current.shortDesc;
  document.getElementById("app-rating-label").textContent = current.score;
  document.getElementById("app-icon-label").textContent = current.icon;
  document.getElementById("app-url-label").textContent = current.url;
  document.getElementById("save-app-button").textContent = current.save;
  document.getElementById("reset-form-button").textContent = current.newApp;
  document.getElementById("empty-state-title").textContent = current.emptyTitle;
  document.getElementById("empty-state-description").textContent = current.emptyDesc;
  document.getElementById("owner-route").textContent = current.ownerRoute;

  document.getElementById("menu-theme-text").textContent = state.theme === "dark" ? current.lightMode : current.darkMode;
  document.getElementById("app-category").options[0].textContent = current.games;
  document.getElementById("app-category").options[1].textContent = current.apps;

  try { localStorage.setItem("storek-language", state.language); } catch (_) {}
  renderApps();
}

function filteredApps() {
  const query = state.query.trim().toLocaleLowerCase();
  return state.apps.filter(app => {
    const categoryMatch = state.category === "الكل" || app.category === state.category;
    const content = [app.app_name, app.description, app.category].join(" ").toLocaleLowerCase();
    return categoryMatch && (!query || content.includes(query));
  });
}

function getCardById(id) {
  return [...grid.children].find(element => element.dataset.id === id);
}

function createCard(app) {
  const fragment = document.getElementById("app-card-template").content.cloneNode(true);
  const card = fragment.querySelector("article");
  card.dataset.id = app.__backendId;
  updateCard(card, app);
  grid.appendChild(fragment);
  lucide.createIcons();
  return getCardById(app.__backendId);
}

function updateCard(card, app) {
  card.querySelector(".app-icon").textContent = app.icon_emoji || "📦";
  card.querySelector(".app-name").textContent = app.app_name;
  card.querySelector(".app-description").textContent = app.description;
  card.querySelector(".app-category-tag").textContent = localizedCategory(app.category);
  card.querySelector(".app-rating").textContent = Number(app.rating || 0).toFixed(1);
  card.querySelector(".rating-label").textContent = text("rating");
  card.querySelector(".download-label").textContent = text("download");
  card.querySelector(".edit-button").textContent = text("edit");
  card.querySelector(".delete-button").textContent = text("del");
  card.querySelector(".delete-confirm-text").textContent = text("deleteAsk");
  card.querySelector(".confirm-delete-button").textContent = text("confirm");
  card.querySelector(".cancel-delete-button").textContent = text("cancel");

  card.querySelector(".download-button").onclick = () => downloadApp(app);
  card.querySelector(".edit-button").onclick = () => beginEdit(app);
  card.querySelector(".delete-button").onclick = () => {
    card.querySelector(".delete-confirm").classList.remove("hidden");
    card.querySelector(".manager-actions").classList.add("hidden");
  };
  card.querySelector(".cancel-delete-button").onclick = () => {
    card.querySelector(".delete-confirm").classList.add("hidden");
    card.querySelector(".manager-actions").classList.remove("hidden");
  };
  card.querySelector(".confirm-delete-button").onclick = () => deleteApp(app, card);
  card.querySelector(".owner-only").classList.toggle("hidden", !state.managing);
}

function renderApps() {
  const visibleApps = filteredApps();
  const wantedIds = new Set(visibleApps.map(app => app.__backendId));

  [...grid.children].forEach(card => {
    if (!wantedIds.has(card.dataset.id)) card.remove();
  });

  visibleApps.forEach(app => {
    const card = getCardById(app.__backendId);
    if (card) updateCard(card, app);
    else createCard(app);
  });

  emptyState.classList.toggle("hidden", visibleApps.length !== 0);
  document.getElementById("result-count").textContent = text("results")
    .replace("{visible}", visibleApps.length)
    .replace("{total}", state.apps.length);
}

function downloadApp(app) {
  const url = (app.download_url || "").trim();
  if (!url) {
    showStatus(text("noLink"));
    return;
  }
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) throw new Error();
    window.open(parsed.href, "_blank", "noopener,noreferrer");
  } catch (_) {
    showStatus(text("badLink"));
  }
}

function toggleManager(show) {
  state.managing = Boolean(show);
  document.getElementById("manager-panel").classList.toggle("hidden-panel", !state.managing);
  document.querySelectorAll(".owner-only").forEach(item => item.classList.toggle("hidden", !state.managing));
  if (state.managing) document.getElementById("app-name").focus();
  renderApps();
}

function activateOwnerRoute() {
  if (window.location.hash === "#owner-storek") {
    toggleManager(true);
  }
}

function beginEdit(app) {
  if (!state.managing) return;
  document.getElementById("editing-id").value = app.__backendId;
  document.getElementById("app-name").value = app.app_name;
  document.getElementById("app-description").value = app.description;
  document.getElementById("app-category").value = app.category;
  document.getElementById("app-rating").value = app.rating;
  document.getElementById("app-url").value = app.download_url || "";
  document.getElementById("app-icon").value = app.icon_emoji || "📦";
  document.getElementById("app-name").focus();
  document.getElementById("manager-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  document.getElementById("app-form").reset();
  document.getElementById("editing-id").value = "";
  document.getElementById("app-icon").value = "📦";
  document.getElementById("app-rating").value = "4.5";
}

async function deleteApp(app, card) {
  if (!state.managing) return;
  const button = card.querySelector(".confirm-delete-button");
  button.disabled = true;
  const result = await window.dataSdk.delete(app);
  button.disabled = false;
  if (result.isOk) showStatus(text("deleted"));
  else showStatus(text("failed"));
}

// إدارة نافذة تسجيل الدخول وحسابات المستخدمين
const loginModal = document.getElementById("login-modal");
const openLoginBtn = document.getElementById("open-login-modal");
const closeLoginBtn = document.getElementById("close-login-modal");
const tabLoginBtn = document.getElementById("tab-login-btn");
const tabRegisterBtn = document.getElementById("tab-register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const userProfileSection = document.getElementById("user-profile-section");
const loggedUsername = document.getElementById("logged-username");
const logoutBtn = document.getElementById("logout-btn");

openLoginBtn.addEventListener("click", () => loginModal.classList.remove("hidden"));
closeLoginBtn.addEventListener("click", () => loginModal.classList.add("hidden"));

tabLoginBtn.addEventListener("click", () => {
  tabLoginBtn.className = "flex-1 rounded-xl py-2.5 text-sm font-bold transition bg-[var(--card-bg)] shadow-sm";
  tabRegisterBtn.className = "flex-1 rounded-xl py-2.5 text-sm font-bold text-[var(--muted)] transition";
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

tabRegisterBtn.addEventListener("click", () => {
  tabRegisterBtn.className = "flex-1 rounded-xl py-2.5 text-sm font-bold transition bg-[var(--card-bg)] shadow-sm";
  tabLoginBtn.className = "flex-1 rounded-xl py-2.5 text-sm font-bold text-[var(--muted)] transition";
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

// تسجيل حساب جديد
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("reg-user").value.trim();
  const pass = document.getElementById("reg-pass").value;
  
  const users = JSON.parse(localStorage.getItem("storek-users") || "{}");
  users[user] = pass;
  localStorage.setItem("storek-users", JSON.stringify(users));
  
  showStatus(text("registerSuccess"));
  registerForm.reset();
  tabLoginBtn.click();
});

// تسجيل الدخول والتحقق من كلمة المرور
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value;
  const remember = document.getElementById("remember-me").checked;

  const users = JSON.parse(localStorage.getItem("storek-users") || "{}");
  
  if (!users[user]) {
    showStatus(text("userNotFound"));
    return;
  }
  
  if (users[user] !== pass) {
    showStatus(text("wrongPass"));
    return;
  }

  state.currentUser = user;
  if (remember) {
    localStorage.setItem("storek-session", user);
  }

  updateAuthUI();
  loginModal.classList.add("hidden");
  showStatus(text("loginSuccess"));
  loginForm.reset();
});

function updateAuthUI() {
  if (state.currentUser) {
    loggedUsername.textContent = state.currentUser;
    userProfileSection.classList.remove("hidden");
    userProfileSection.classList.add("flex");
    openLoginBtn.classList.add("hidden");
  } else {
    userProfileSection.classList.add("hidden");
    userProfileSection.classList.remove("flex");
    openLoginBtn.classList.remove("hidden");
  }
}

logoutBtn.addEventListener("click", () => {
  state.currentUser = null;
  localStorage.removeItem("storek-session");
  updateAuthUI();
  toggleManager(false);
  showStatus("تم تسجيل الخروج");
});

// إعدادات القائمة المنسدلة
const settingsBtn = document.getElementById("settings-menu-btn");
const settingsDropdown = document.getElementById("settings-dropdown");

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsDropdown.classList.toggle("hidden");
});

document.addEventListener("click", () => settingsDropdown.classList.add("hidden"));
settingsDropdown.addEventListener("click", (e) => e.stopPropagation());

document.getElementById("menu-lang-btn").addEventListener("click", () => {
  applyLanguage(state.language === "ar" ? "en" : "ar");
  settingsDropdown.classList.add("hidden");
});

document.getElementById("menu-theme-btn").addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
  settingsDropdown.classList.add("hidden");
});

document.getElementById("app-search").addEventListener("input", event => {
  state.query = event.target.value;
  renderApps();
});

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    document.querySelectorAll(".filter-button").forEach(item => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderApps();
  });
});

document.getElementById("manager-close").addEventListener("click", () => {
  window.location.hash = "store";
  toggleManager(false);
});

document.getElementById("reset-form-button").addEventListener("click", resetForm);
window.addEventListener("hashchange", activateOwnerRoute);

document.getElementById("app-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!state.managing) return;

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const url = document.getElementById("app-url").value.trim();
  const editingId = document.getElementById("editing-id").value;
  const record = {
    app_name: document.getElementById("app-name").value.trim(),
    description: document.getElementById("app-description").value.trim(),
    category: document.getElementById("app-category").value,
    rating: Number(document.getElementById("app-rating").value),
    download_url: url,
    icon_emoji: document.getElementById("app-icon").value.trim() || "📦"
  };

  const saveButton = document.getElementById("save-app-button");
  saveButton.disabled = true;

  let result;
  if (editingId) {
    const existing = state.apps.find(item => item.__backendId === editingId);
    result = existing ? await window.dataSdk.update({ ...existing, ...record }) : null;
  } else {
    result = await window.dataSdk.create(record);
  }

  saveButton.disabled = false;

  if (result && result.isOk) {
    showStatus(editingId ? text("saved") : text("added"));
    resetForm();
  } else {
    showStatus(text("failed"));
  }
});

const dataHandler = {
  onDataChanged(data) {
    state.apps = data.slice().sort((a, b) => a.app_name.localeCompare(b.app_name, state.language));
    renderApps();
  }
};

async function initialize() {
  resetForm();
  lucide.createIcons();

  let savedLang = "ar";
  let savedTheme = "light";
  try {
    savedLang = localStorage.getItem("storek-language") || "ar";
    savedTheme = localStorage.getItem("storek-theme") || "light";
    const activeSession = localStorage.getItem("storek-session");
    if (activeSession) {
      state.currentUser = activeSession;
      updateAuthUI();
    }
  } catch (_) {}

  applyLanguage(savedLang);
  applyTheme(savedTheme);
  activateOwnerRoute();

  const result = await window.dataSdk.init(dataHandler);
  if (!result.isOk) showStatus(text("failed"));
}

initialize();
