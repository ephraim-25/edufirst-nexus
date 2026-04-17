// EduFirst — Sidebar layout for dashboard pages
const NAV_BY_ROLE = {
  admin: [
    { label: "Tableau de bord", icon: "home", href: "admin-dashboard.html" },
    { label: "Vue Globale", icon: "globe", href: "admin-overview.html" },
    { label: "Étudiants", icon: "users", href: "admin-students.html" },
    { label: "Gestion des Accès", icon: "shield", href: "admin-users.html" },
    { label: "Inventaire", icon: "package", href: "admin-store.html" },
    { label: "Finances", icon: "chart", href: "admin-finance.html" },
    { label: "RH", icon: "user", href: "admin-hr.html" },
    { label: "Discipline", icon: "alert", href: "admin-discipline.html" },
    { label: "Transport", icon: "bus", href: "admin-transport.html" },
    { label: "Calendrier", icon: "calendar", href: "calendar.html" },
    { label: "Mur de l'école", icon: "building", href: "school-wall.html" },
    { label: "Tableau d'honneur", icon: "trophy", href: "honor-board.html" },
    { label: "Messages", icon: "msg", href: "messages.html" },
    { label: "Notifications", icon: "bell", href: "notifications.html" },
    { label: "Paramètres", icon: "settings", href: "settings.html" },
  ],
  teacher: [
    { label: "Tableau de bord", icon: "home", href: "teacher-dashboard.html" },
    { label: "Saisie des notes", icon: "edit", href: "teacher-grades.html" },
    { label: "Calendrier", icon: "calendar", href: "calendar.html" },
    { label: "Mur de l'école", icon: "building", href: "school-wall.html" },
    { label: "Tableau d'honneur", icon: "trophy", href: "honor-board.html" },
    { label: "Messages", icon: "msg", href: "messages.html" },
    { label: "Notifications", icon: "bell", href: "notifications.html" },
    { label: "Profil", icon: "user", href: "profile.html" },
    { label: "Paramètres", icon: "settings", href: "settings.html" },
  ],
  parent: [
    { label: "Tableau de bord", icon: "home", href: "parent-dashboard.html" },
    { label: "Mes Enfants", icon: "users", href: "parent-children.html" },
    { label: "Portefeuille", icon: "wallet", href: "parent-wallet.html" },
    { label: "EduStore", icon: "bag", href: "edustore.html" },
    { label: "Calendrier", icon: "calendar", href: "calendar.html" },
    { label: "Mur de l'école", icon: "building", href: "school-wall.html" },
    { label: "Messages", icon: "msg", href: "messages.html" },
    { label: "Notifications", icon: "bell", href: "notifications.html" },
    { label: "Paramètres", icon: "settings", href: "settings.html" },
  ],
  student: [
    { label: "Tableau de bord", icon: "home", href: "student-dashboard.html" },
    { label: "EduStore", icon: "bag", href: "edustore.html" },
    { label: "Calendrier", icon: "calendar", href: "calendar.html" },
    { label: "Mur de l'école", icon: "building", href: "school-wall.html" },
    { label: "Tableau d'honneur", icon: "trophy", href: "honor-board.html" },
    { label: "Messages", icon: "msg", href: "messages.html" },
    { label: "Notifications", icon: "bell", href: "notifications.html" },
    { label: "Profil", icon: "user", href: "profile.html" },
    { label: "Paramètres", icon: "settings", href: "settings.html" },
  ],
};

const ROLE_LABELS = { admin: "Établissement", teacher: "Professeur", parent: "Parent", student: "Étudiant" };

window.renderLayout = ({ role = "admin", title = "", subtitle = "", showCampus = true } = {}) => {
  const items = NAV_BY_ROLE[role] || NAV_BY_ROLE.admin;
  const currentPage = location.pathname.split("/").pop() || "index.html";

  const sidebarHTML = `
    <aside id="sidebar" class="fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-border z-40 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col">
      <div class="px-5 py-5 border-b border-border flex items-center gap-2">
        <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
          ${icon("graduation", "w-5 h-5")}
        </div>
        <div>
          <div class="font-bold text-foreground">EduFirst</div>
          <div class="text-[10px] uppercase tracking-wider text-muted">${ROLE_LABELS[role]}</div>
        </div>
      </div>
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        ${items.map((it) => `
          <a href="${it.href}" class="sidebar-link ${it.href === currentPage ? "active" : ""}">
            ${icon(it.icon)}
            <span>${it.label}</span>
          </a>
        `).join("")}
      </nav>
      <div class="px-3 py-4 border-t border-border">
        <a href="login.html" class="sidebar-link text-red-500 hover:bg-red-50">
          ${icon("logout")}
          <span>Déconnexion</span>
        </a>
      </div>
    </aside>
  `;

  const headerHTML = `
    <header class="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
      <button id="sidebar-toggle" class="lg:hidden p-2 rounded-lg hover:bg-primary-soft">${icon("menu", "w-5 h-5")}</button>
      <div class="flex-1 max-w-md hidden md:block">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted">${icon("search", "w-4 h-4")}</span>
          <input type="text" placeholder="Rechercher..." class="input pl-10" />
        </div>
      </div>
      <div class="flex items-center gap-3">
        ${showCampus && role === "admin" ? '<div id="campus-switcher-slot"></div>' : ""}
        <a href="notifications.html" class="p-2 rounded-lg hover:bg-primary-soft text-muted hover:text-primary relative">
          ${icon("bell", "w-5 h-5")}
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </a>
        <a href="profile.html" class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-semibold text-sm">A</a>
      </div>
    </header>
  `;

  const titleHTML = (title || subtitle) ? `
    <div class="px-4 lg:px-8 pt-6 pb-2 fade-in">
      ${title ? `<h1 class="text-2xl font-bold text-foreground">${title}</h1>` : ""}
      ${subtitle ? `<p class="text-muted text-sm mt-1">${subtitle}</p>` : ""}
    </div>
  ` : "";

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="min-h-screen flex">
      ${sidebarHTML}
      <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 z-30 hidden lg:hidden"></div>
      <div class="flex-1 min-w-0 flex flex-col">
        ${headerHTML}
        ${titleHTML}
        <main id="page-main" class="flex-1 px-4 lg:px-8 py-6 slide-up"></main>
      </div>
    </div>
  `);

  // Move existing body content into main
  const main = document.getElementById("page-main");
  document.querySelectorAll("body > [data-page-content]").forEach((el) => main.appendChild(el));

  // Sidebar toggle (mobile)
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  document.getElementById("sidebar-toggle")?.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  });
  overlay?.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });

  if (showCampus && role === "admin") {
    renderCampusSwitcher("campus-switcher-slot");
  }
};
