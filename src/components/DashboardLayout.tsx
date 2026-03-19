import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, LayoutDashboard, Users, BookOpen,
  ShoppingBag, BarChart3, Settings, LogOut, Bell, Search,
  ClipboardList, FileText, Heart, Menu, X, MessageCircle,
  Calendar, Shield, Briefcase, Bus, Newspaper, Wallet, Trophy, Building2
} from "lucide-react";
import CampusSwitcher from "./CampusSwitcher";

type Role = "admin" | "teacher" | "student" | "parent";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/admin" },
    { label: "Vue d'ensemble", icon: Building2, path: "/dashboard/admin/overview" },
    { label: "Étudiants", icon: Users, path: "/dashboard/admin/students" },
    { label: "Gestion des Accès", icon: ClipboardList, path: "/dashboard/admin/access" },
    { label: "Discipline", icon: Shield, path: "/dashboard/admin/discipline" },
    { label: "Ressources Humaines", icon: Briefcase, path: "/dashboard/admin/hr" },
    { label: "Finances", icon: BarChart3, path: "/dashboard/admin/finances" },
    { label: "Calendrier", icon: Calendar, path: "/dashboard/admin/calendar" },
    { label: "Transports", icon: Bus, path: "/dashboard/admin/transport" },
    { label: "Messagerie", icon: MessageCircle, path: "/dashboard/admin/chat" },
    { label: "Mur de l'école", icon: Newspaper, path: "/dashboard/admin/wall" },
    { label: "Tableau d'honneur", icon: Trophy, path: "/dashboard/admin/honor" },
    { label: "EduStore", icon: ShoppingBag, path: "/dashboard/admin/store" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/admin/settings" },
  ],
  teacher: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/teacher" },
    { label: "Mes classes", icon: BookOpen, path: "/dashboard/teacher/classes" },
    { label: "Notes", icon: ClipboardList, path: "/dashboard/teacher/grades" },
    { label: "Discipline", icon: Shield, path: "/dashboard/teacher/discipline" },
    { label: "Calendrier", icon: Calendar, path: "/dashboard/teacher/calendar" },
    { label: "Messagerie", icon: MessageCircle, path: "/dashboard/teacher/chat" },
    { label: "Mur de l'école", icon: Newspaper, path: "/dashboard/teacher/wall" },
    { label: "Bibliothèque", icon: FileText, path: "/dashboard/teacher/library" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/teacher/settings" },
  ],
  student: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/student" },
    { label: "Mes cours", icon: BookOpen, path: "/dashboard/student/courses" },
    { label: "Mes notes", icon: ClipboardList, path: "/dashboard/student/grades" },
    { label: "Calendrier", icon: Calendar, path: "/dashboard/student/calendar" },
    { label: "Mur de l'école", icon: Newspaper, path: "/dashboard/student/wall" },
    { label: "Tableau d'honneur", icon: Trophy, path: "/dashboard/student/honor" },
    { label: "Notifications", icon: Bell, path: "/dashboard/student/notifications" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/student/settings" },
  ],
  parent: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/parent" },
    { label: "Mes Enfants", icon: Heart, path: "/dashboard/parent/children" },
    { label: "Portefeuille", icon: Wallet, path: "/dashboard/parent/wallet" },
    { label: "Calendrier", icon: Calendar, path: "/dashboard/parent/calendar" },
    { label: "Messagerie", icon: MessageCircle, path: "/dashboard/parent/chat" },
    { label: "Mur de l'école", icon: Newspaper, path: "/dashboard/parent/wall" },
    { label: "Tableau d'honneur", icon: Trophy, path: "/dashboard/parent/honor" },
    { label: "EduStore", icon: ShoppingBag, path: "/dashboard/parent/store" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/parent/settings" },
  ],
};

const roleLabels: Record<Role, string> = {
  admin: "Administration",
  teacher: "Espace Professeur",
  student: "Espace Étudiant",
  parent: "Espace Parent",
};

interface DashboardLayoutProps {
  children: ReactNode;
  role: Role;
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = navByRole[role];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const sidebarContent = (
    <>
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">EduFirst</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted" />
        </button>
      </div>

      {role === "admin" && <CampusSwitcher />}

      <div className="px-4 mb-2">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">{roleLabels[role]}</span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mt-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-secondary hover:text-foreground transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-card flex-col shadow-surface shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 w-72 bg-card shadow-surface flex flex-col z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-card shadow-surface flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Rechercher (⌘K)"
                className="bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="sm:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
              <Search className="w-4 h-4 text-muted" />
            </button>
            <Link to={`/dashboard/${role}/notifications`} className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4 text-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Link>
            <Link to={`/dashboard/${role}/profile`} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:ring-2 hover:ring-primary/30 transition-all">
              <span className="text-xs font-semibold text-primary">AD</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
