import DashboardLayout from "@/components/DashboardLayout";
import { Clock, BookOpen, TrendingUp, Bell, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const gradeProgress = [
  { month: "Sep", average: 12.5 },
  { month: "Oct", average: 13.2 },
  { month: "Nov", average: 14.1 },
  { month: "Déc", average: 13.8 },
  { month: "Jan", average: 14.5 },
  { month: "Fév", average: 15.2 },
];

const todayClasses = [
  { name: "Mathématiques 101", time: "08:00 - 10:00", room: "Salle A12", teacher: "M. Konaté" },
  { name: "Français Littéraire", time: "10:30 - 12:00", room: "Salle B04", teacher: "Mme Diop" },
  { name: "Physique-Chimie", time: "14:00 - 16:00", room: "Labo C2", teacher: "M. Traoré" },
];

const homeworkDue = [
  { subject: "Mathématiques", title: "Exercices — Suites numériques", due: "Aujourd'hui" },
  { subject: "Français", title: "Dissertation — L'étranger, Camus", due: "Demain" },
];

const notifications = [
  { text: "Nouvelle note en Physique-Chimie : 16/20", time: "Il y a 2h", type: "grade" },
  { text: "M. Konaté a déposé un nouveau cours", time: "Il y a 5h", type: "course" },
  { text: "Rappel : Devoir de Français pour demain", time: "Hier", type: "homework" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bonjour, Aminata</h1>
        <p className="text-muted text-sm mt-1">Terminale S — Lycée International Victor Hugo</p>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="edu-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Prochain cours</p>
              <p className="text-sm font-semibold text-foreground">Mathématiques — 08:00</p>
            </div>
          </div>
        </div>
        <div className="edu-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Devoirs à rendre</p>
              <p className="text-sm font-semibold text-foreground">{homeworkDue.length} aujourd'hui</p>
            </div>
          </div>
        </div>
        <div className="edu-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Moyenne générale</p>
              <p className="text-sm font-semibold text-foreground tabular-nums">15.2 / 20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Progress */}
        <div className="lg:col-span-2 edu-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Progression des notes</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradeProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(145,86,255,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis domain={[10, 20]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  formatter={(value: number) => [`${value} / 20`, "Moyenne"]}
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow-surface)" }}
                />
                <Line type="monotone" dataKey="average" stroke="#9156FF" strokeWidth={2.5} dot={{ fill: "#9156FF", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications */}
        <div className="edu-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  n.type === "grade" ? "bg-emerald-500" : n.type === "course" ? "bg-primary" : "bg-amber-500"
                }`} />
                <div>
                  <p className="text-sm text-foreground leading-snug">{n.text}</p>
                  <span className="text-xs text-muted">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="edu-card mt-6">
        <div className="edu-card-header">
          <h3 className="text-sm font-semibold text-foreground">Emploi du temps — Aujourd'hui</h3>
        </div>
        <div className="divide-y divide-secondary">
          {todayClasses.map((cls) => (
            <div key={cls.name} className="px-6 py-3.5 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground tabular-nums w-28">{cls.time}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{cls.name}</p>
                  <p className="text-xs text-muted">{cls.teacher} — {cls.room}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
