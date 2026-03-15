import { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, LayoutDashboard, Users, BookOpen,
  ShoppingBag, BarChart3, Settings, LogOut, Bell, Search,
  ClipboardList, FileText, Home, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "admin" | "teacher" | "student" | "parent";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/admin" },
    { label: "Étudiants", icon: Users, path: "/dashboard/admin/students" },
    { label: "Finances", icon: BarChart3, path: "/dashboard/admin/finances" },
    { label: "EduStore", icon: ShoppingBag, path: "/dashboard/admin/store" },
    { label: "Paramètres", icon: Settings, path: "/dashboard/admin/settings" },
  ],
  teacher: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/teacher" },
    { label: "Mes classes", icon: BookOpen, path: "/dashboard/teacher/classes" },
    { label: "Notes", icon: ClipboardList, path: "/dashboard/teacher/grades" },
    { label: "Bibliothèque", icon: FileText, path: "/dashboard/teacher/library" },
  ],
  student: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/student" },
    { label: "Mes cours", icon: BookOpen, path: "/dashboard/student/courses" },
    { label: "Mes notes", icon: ClipboardList, path: "/dashboard/student/grades" },
    { label: "Notifications", icon: Bell, path: "/dashboard/student/notifications" },
  ],
  parent: [
    { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard/parent" },
    { label: "Suivi enfant", icon: Heart, path: "/dashboard/parent/child" },
    { label: "EduStore", icon: ShoppingBag, path: "/dashboard/parent/store" },
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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card flex flex-col shadow-surface shrink-0">
        <div className="p-5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">EduFirst</span>
        </div>

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
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-card shadow-surface flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Rechercher (⌘K)"
              className="bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4 text-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AD</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
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
