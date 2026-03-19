import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AlertTriangle, Clock, UserX, FileWarning, Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "admin" | "teacher";

const incidents = [
  { id: 1, student: "Amadou Diallo", class: "TS-A", type: "Absence", date: "12/03/2025", desc: "Absence non justifiée — cours de Physique", severity: "warning", teacher: "M. Konaté" },
  { id: 2, student: "Fatou Coulibaly", class: "1ère S-B", type: "Retard", date: "11/03/2025", desc: "Retard de 20 minutes — cours de Français", severity: "info", teacher: "Mme. Touré" },
  { id: 3, student: "Ibrahim Traoré", class: "TS-A", type: "Avertissement", date: "10/03/2025", desc: "Comportement perturbateur en classe", severity: "error", teacher: "M. Bamba" },
  { id: 4, student: "Aïcha Koné", class: "2nde C", type: "Absence", date: "10/03/2025", desc: "Absence justifiée — certificat médical fourni", severity: "success", teacher: "Mme. Touré" },
  { id: 5, student: "Moussa Sylla", class: "TS-B", type: "Retard", date: "09/03/2025", desc: "Retard de 10 minutes — EPS", severity: "info", teacher: "M. Diarra" },
  { id: 6, student: "Kadi Ouattara", class: "1ère S-A", type: "Avertissement", date: "08/03/2025", desc: "Utilisation du téléphone en classe", severity: "error", teacher: "M. Konaté" },
];

const stats = [
  { label: "Absences", count: 24, icon: UserX, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
  { label: "Retards", count: 18, icon: Clock, color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
  { label: "Avertissements", count: 7, icon: FileWarning, color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
];

const DisciplinePage = ({ role }: { role: Role }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");

  const filtered = incidents.filter((i) =>
    (filter === "Tous" || i.type === filter) &&
    (i.student.toLowerCase().includes(search.toLowerCase()) || i.class.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout role={role}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion de la discipline</h1>
          <p className="text-muted-foreground text-sm mt-1">Absences, retards et avertissements</p>
        </div>
        <Button variant="default" size="sm" className="gap-2 self-start">
          <Plus className="w-4 h-4" /> Signaler un incident
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="edu-card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.label} ce mois</p>
            </div>
          </div>
        ))}
      </div>

      <div className="edu-card">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un élève..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2">
            {["Tous", "Absence", "Retard", "Avertissement"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Élève</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Classe</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Description</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((i) => (
                <tr key={i.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{i.student}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{i.class}</td>
                  <td className="px-6 py-3">
                    <span className={i.type === "Avertissement" ? "status-error" : i.type === "Absence" ? "status-pending" : "status-success"}>{i.type}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground hidden sm:table-cell max-w-xs truncate">{i.desc}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground tabular-nums">{i.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DisciplinePage;
