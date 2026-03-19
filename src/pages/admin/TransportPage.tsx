import DashboardLayout from "@/components/DashboardLayout";
import { Bus, MapPin, Users, Clock } from "lucide-react";

const routes = [
  { id: 1, name: "Ligne A — Cocody", bus: "Bus 01", driver: "Bakary Coulibaly", departure: "06:30", arrival: "07:15", students: ["Amadou Diallo", "Fatou Coulibaly", "Moussa Keita", "Aïcha Koné", "Ibrahim Traoré"], stops: ["Angré", "Riviera 2", "Cocody Centre", "Campus Nord"] },
  { id: 2, name: "Ligne B — Yopougon", bus: "Bus 02", driver: "Seydou Diarra", departure: "06:15", arrival: "07:10", students: ["Kadi Ouattara", "Moussa Sylla", "Aminata Bamba"], stops: ["Yopougon Maroc", "Adjamé", "Plateau", "Campus Nord"] },
  { id: 3, name: "Ligne C — Marcory", bus: "Bus 03", driver: "Jean-Paul N'Guessan", departure: "06:20", arrival: "07:20", students: ["Franck Kouadio", "Marie Aka", "Sylvie Bohui", "Paul Ehui", "Rita Gnamba", "Marc Koffi"], stops: ["Marcory Zone 4", "Treichville", "Plateau", "Campus Nord"] },
];

const TransportPage = () => (
  <DashboardLayout role="admin">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Suivi des transports</h1>
      <p className="text-muted-foreground text-sm mt-1">Itinéraires et listes d'élèves par bus</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Bus actifs", value: routes.length, icon: Bus, color: "text-primary bg-primary/10" },
        { label: "Élèves transportés", value: routes.reduce((s, r) => s + r.students.length, 0), icon: Users, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "Arrêts desservis", value: new Set(routes.flatMap((r) => r.stops)).size, icon: MapPin, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
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

    <div className="space-y-4">
      {routes.map((route) => (
        <div key={route.id} className="edu-card">
          <div className="edu-card-header">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{route.name}</h3>
            </div>
            <span className="text-xs text-muted-foreground">{route.bus} · {route.driver}</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Départ {route.departure}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Arrivée {route.arrival}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {route.students.length} élèves</span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-foreground mb-2">Itinéraire</p>
              <div className="flex items-center gap-1 flex-wrap">
                {route.stops.map((stop, i) => (
                  <div key={stop} className="flex items-center gap-1">
                    <span className="text-xs px-2 py-1 rounded-lg bg-primary/5 text-primary font-medium">{stop}</span>
                    {i < route.stops.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Élèves</p>
              <div className="flex flex-wrap gap-1.5">
                {route.students.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);

export default TransportPage;
