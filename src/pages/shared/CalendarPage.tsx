import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, BookOpen, PartyPopper, AlertTriangle } from "lucide-react";

type Role = "admin" | "teacher" | "student" | "parent";

const events = [
  { date: "2025-03-03", title: "Rentrée scolaire T2", type: "event", color: "bg-primary" },
  { date: "2025-03-10", title: "Examen de Maths — TS", type: "exam", color: "bg-amber-500" },
  { date: "2025-03-14", title: "Conseil de classe", type: "event", color: "bg-primary" },
  { date: "2025-03-17", title: "Examen de Physique — TS", type: "exam", color: "bg-amber-500" },
  { date: "2025-03-21", title: "Journée portes ouvertes", type: "event", color: "bg-emerald-500" },
  { date: "2025-03-24", title: "Congés de Pâques", type: "holiday", color: "bg-rose-500" },
  { date: "2025-03-28", title: "Fin des congés", type: "holiday", color: "bg-rose-500" },
];

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year: number, month: number) => { const d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; };

const CalendarPage = ({ role }: { role: Role }) => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2);
  const [view, setView] = useState<"month" | "week">("month");

  const daysCount = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const calDays = Array.from({ length: firstDay }, () => null).concat(Array.from({ length: daysCount }, (_, i) => i + 1));

  const getEvents = (day: number) => events.filter((e) => e.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);

  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  return (
    <DashboardLayout role={role}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendrier scolaire</h1>
          <p className="text-muted-foreground text-sm mt-1">Examens, congés et événements</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-secondary p-1">
            {(["month", "week"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                {v === "month" ? "Mois" : "Semaine"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="edu-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={prev} className="p-2 rounded-lg hover:bg-secondary transition-colors"><ChevronLeft className="w-4 h-4 text-foreground" /></button>
          <h2 className="text-sm font-bold text-foreground">{months[month]} {year}</h2>
          <button onClick={next} className="p-2 rounded-lg hover:bg-secondary transition-colors"><ChevronRight className="w-4 h-4 text-foreground" /></button>
        </div>

        <div className="grid grid-cols-7">
          {days.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground border-b border-border">{d}</div>
          ))}
          {calDays.map((day, i) => {
            const dayEvents = day ? getEvents(day) : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <div key={i} className={`min-h-[80px] sm:min-h-[100px] p-1.5 border-b border-r border-border ${!day ? "bg-secondary/30" : "hover:bg-secondary/40 transition-colors"}`}>
                {day && (
                  <>
                    <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}`}>{day}</span>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.map((ev, j) => (
                        <div key={j} className={`${ev.color} text-white text-[10px] px-1.5 py-0.5 rounded truncate`}>{ev.title}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Examens", icon: BookOpen, count: events.filter((e) => e.type === "exam").length, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
          { label: "Événements", icon: PartyPopper, count: events.filter((e) => e.type === "event").length, color: "text-primary bg-primary/10" },
          { label: "Congés", icon: AlertTriangle, count: events.filter((e) => e.type === "holiday").length, color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
        ].map((s) => (
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
    </DashboardLayout>
  );
};

export default CalendarPage;
