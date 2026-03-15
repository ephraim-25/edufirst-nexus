import DashboardLayout from "@/components/DashboardLayout";
import { User, TrendingUp, BookOpen, ShoppingBag, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const children = [
  { name: "Aminata Diallo", class: "Terminale S", average: 15.2, rank: 3 },
  { name: "Ibrahim Diallo", class: "Seconde A", average: 13.8, rank: 8 },
];

const storeItems = [
  { name: "Manuel Mathématiques Terminale S", price: "12 500 FCFA", required: true, image: "📘" },
  { name: "Kit de chimie avancé", price: "8 900 FCFA", required: true, image: "🧪" },
  { name: "Cours Premium — Physique-Chimie", price: "5 000 FCFA / trim.", required: false, image: "🎓" },
  { name: "Uniforme officiel (Taille M)", price: "15 000 FCFA", required: false, image: "👔" },
];

const recentGrades = [
  { subject: "Mathématiques", grade: "16/20", date: "12 Fév", child: "Aminata" },
  { subject: "Français", grade: "14/20", date: "10 Fév", child: "Aminata" },
  { subject: "Histoire-Géo", grade: "12/20", date: "9 Fév", child: "Ibrahim" },
  { subject: "SVT", grade: "15/20", date: "8 Fév", child: "Ibrahim" },
];

const ParentDashboard = () => {
  return (
    <DashboardLayout role="parent">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Espace Famille Diallo</h1>
        <p className="text-muted text-sm mt-1">Lycée International Victor Hugo — 2 enfants inscrits</p>
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {children.map((child) => (
          <div key={child.name} className="edu-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{child.name}</h3>
                <p className="text-xs text-muted">{child.class}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground tabular-nums">{child.average}/20</p>
                <p className="text-xs text-muted">Rang : {child.rank}e</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <div className="lg:col-span-2 edu-card">
          <div className="edu-card-header">
            <h3 className="text-sm font-semibold text-foreground">Notes récentes</h3>
          </div>
          <div className="divide-y divide-secondary">
            {recentGrades.map((g, i) => (
              <div key={i} className="px-6 py-3.5 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{g.subject}</p>
                    <p className="text-xs text-muted">{g.child} — {g.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">{g.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EduStore */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">EduStore</h2>
            <span className="text-xs text-muted">Articles recommandés</span>
          </div>
          <div className="space-y-3">
            {storeItems.map((item) => (
              <div key={item.name} className="edu-card p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
                      {item.required && (
                        <Star className="w-3 h-3 text-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-primary mt-1 tabular-nums">{item.price}</p>
                  </div>
                </div>
                <Button variant="default" size="sm" className="w-full mt-3">
                  <ShoppingBag className="w-3.5 h-3.5" /> Ajouter au panier
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
