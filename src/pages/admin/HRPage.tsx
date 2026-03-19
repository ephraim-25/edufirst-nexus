import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Briefcase, Clock, DollarSign, Search, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const teachers = [
  { id: 1, name: "M. Konaté Seydou", subject: "Mathématiques", contract: "CDI", since: "Sept 2019", hours: "18h/sem", salary: "450 000 FCFA", status: "Actif", avatar: "KS" },
  { id: 2, name: "Mme. Touré Aminata", subject: "Français", contract: "CDI", since: "Sept 2020", hours: "20h/sem", salary: "420 000 FCFA", status: "Actif", avatar: "TA" },
  { id: 3, name: "M. Bamba Ousmane", subject: "Physique-Chimie", contract: "CDD", since: "Jan 2024", hours: "16h/sem", salary: "380 000 FCFA", status: "Actif", avatar: "BO" },
  { id: 4, name: "Mme. Diarra Fatoumata", subject: "Histoire-Géo", contract: "CDI", since: "Sept 2018", hours: "18h/sem", salary: "470 000 FCFA", status: "Congé", avatar: "DF" },
  { id: 5, name: "M. Diarra Ibrahima", subject: "EPS", contract: "CDD", since: "Sept 2023", hours: "14h/sem", salary: "320 000 FCFA", status: "Actif", avatar: "DI" },
  { id: 6, name: "Mme. Sanogo Marie", subject: "Anglais", contract: "CDI", since: "Sept 2021", hours: "16h/sem", salary: "400 000 FCFA", status: "Actif", avatar: "SM" },
];

const HRPage = () => {
  const [search, setSearch] = useState("");
  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="admin">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ressources humaines</h1>
          <p className="text-muted-foreground text-sm mt-1">Dossiers enseignants, contrats et paie</p>
        </div>
        <Button variant="default" size="sm" className="gap-2 self-start"><Download className="w-4 h-4" /> Exporter</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Enseignants", value: teachers.length, icon: Users, color: "text-primary bg-primary/10" },
          { label: "CDI", value: teachers.filter((t) => t.contract === "CDI").length, icon: Briefcase, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "CDD", value: teachers.filter((t) => t.contract === "CDD").length, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
          { label: "Masse salariale", value: "2.44M", icon: DollarSign, color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
        ].map((s) => (
          <div key={s.label} className="edu-card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="edu-card">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un enseignant..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Enseignant</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Matière</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden md:table-cell">Contrat</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden lg:table-cell">Horaires</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Salaire</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Statut</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{t.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">Depuis {t.since}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-foreground">{t.subject}</td>
                  <td className="px-6 py-3 text-sm text-foreground hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.contract === "CDI" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}>{t.contract}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground hidden lg:table-cell">{t.hours}</td>
                  <td className="px-6 py-3 text-sm text-foreground tabular-nums hidden sm:table-cell">{t.salary}</td>
                  <td className="px-6 py-3">
                    <span className={t.status === "Actif" ? "status-success" : "status-pending"}>{t.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRPage;
