import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, Medal, Star, Crown, TrendingUp } from "lucide-react";

type Role = "admin" | "teacher" | "student" | "parent";

const topStudents = [
  { rank: 1, name: "Amadou Diallo", class: "TS-A", avg: 17.8, icon: Crown, color: "from-amber-400 to-yellow-500", badge: "🥇" },
  { rank: 2, name: "Fatou Coulibaly", class: "1ère S-B", avg: 17.2, icon: Medal, color: "from-slate-300 to-slate-400", badge: "🥈" },
  { rank: 3, name: "Marie Aka", class: "TS-B", avg: 16.9, icon: Medal, color: "from-amber-600 to-amber-700", badge: "🥉" },
];

const honorRoll = [
  { rank: 4, name: "Ibrahim Traoré", class: "TS-A", avg: 16.5 },
  { rank: 5, name: "Kadi Ouattara", class: "1ère S-A", avg: 16.2 },
  { rank: 6, name: "Moussa Sylla", class: "TS-B", avg: 15.8 },
  { rank: 7, name: "Aminata Bamba", class: "2nde C", avg: 15.6 },
  { rank: 8, name: "Franck Kouadio", class: "TS-A", avg: 15.4 },
  { rank: 9, name: "Aïcha Koné", class: "2nde C", avg: 15.2 },
  { rank: 10, name: "Sylvie Bohui", class: "1ère S-B", avg: 15.0 },
];

const byClass = [
  { class: "TS-A", best: "Amadou Diallo", avg: 13.2, topAvg: 17.8 },
  { class: "TS-B", best: "Marie Aka", avg: 12.8, topAvg: 16.9 },
  { class: "1ère S-A", best: "Kadi Ouattara", avg: 12.5, topAvg: 16.2 },
  { class: "1ère S-B", best: "Fatou Coulibaly", avg: 13.0, topAvg: 17.2 },
  { class: "2nde C", best: "Aminata Bamba", avg: 11.9, topAvg: 15.6 },
];

const HonorBoardPage = ({ role }: { role: Role }) => (
  <DashboardLayout role={role}>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Tableau d'honneur</h1>
      <p className="text-muted-foreground text-sm mt-1">Les meilleurs élèves de l'établissement — Trimestre 2</p>
    </div>

    {/* Podium */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {topStudents.map((s) => (
        <div key={s.rank} className={`edu-card p-6 text-center ${s.rank === 1 ? "ring-2 ring-amber-400/50 sm:order-first" : ""}`}>
          <div className="text-4xl mb-2">{s.badge}</div>
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${s.color} mx-auto flex items-center justify-center mb-3`}>
            <span className="text-white text-xl font-bold">{s.name.split(" ").map((n) => n[0]).join("")}</span>
          </div>
          <h3 className="text-sm font-bold text-foreground">{s.name}</h3>
          <p className="text-xs text-muted-foreground">{s.class}</p>
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
            <Star className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-bold text-primary">{s.avg}/20</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Full ranking */}
      <div className="edu-card">
        <div className="edu-card-header">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" /> Classement général</h3>
        </div>
        <div className="divide-y divide-border">
          {[...topStudents, ...honorRoll].map((s) => (
            <div key={s.rank} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/50 transition-colors">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{s.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.class}</p>
              </div>
              <span className="text-sm font-bold text-foreground tabular-nums">{s.avg}/20</span>
            </div>
          ))}
        </div>
      </div>

      {/* By class */}
      <div className="edu-card">
        <div className="edu-card-header">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Meilleurs par classe</h3>
        </div>
        <div className="divide-y divide-border">
          {byClass.map((c) => (
            <div key={c.class} className="px-5 py-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{c.class}</span>
                <span className="text-xs text-muted-foreground">Moy. classe : {c.avg}</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-sm text-foreground">{c.best}</span>
                <span className="text-xs font-bold text-primary ml-auto">{c.topAvg}/20</span>
              </div>
              <div className="mt-2 w-full bg-secondary rounded-full h-1.5">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(c.avg / 20) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default HonorBoardPage;
