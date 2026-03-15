import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, Users, DollarSign, ShoppingBag, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200000 },
  { month: "Fév", revenue: 4800000 },
  { month: "Mar", revenue: 5100000 },
  { month: "Avr", revenue: 4900000 },
  { month: "Mai", revenue: 5600000 },
  { month: "Jun", revenue: 6200000 },
];

const stats = [
  { label: "Revenus trimestriels", value: "15 800 000 FCFA", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Étudiants inscrits", value: "1 247", change: "+48", up: true, icon: Users },
  { label: "Ventes EduStore", value: "342 000 FCFA", change: "+8.3%", up: true, icon: ShoppingBag },
  { label: "Croissance", value: "+23%", change: "vs Q3", up: true, icon: TrendingUp },
];

const activity = [
  { time: "Il y a 5 min", text: "Inscription de 3 nouveaux étudiants en Terminale S", type: "info" },
  { time: "Il y a 12 min", text: "Paiement reçu — Famille Diallo (Trimestre 2)", type: "success" },
  { time: "Il y a 30 min", text: "Stock faible : Cahiers de mathématiques (12 restants)", type: "warning" },
  { time: "Il y a 1h", text: "Rapport de notes Q2 généré par M. Konaté", type: "info" },
  { time: "Il y a 2h", text: "Nouvelle commande EduStore — Kit scientifique Premium", type: "success" },
];

const inventory = [
  { item: "Cahiers de mathématiques", stock: 12, status: "Faible" },
  { item: "Kit de chimie avancé", stock: 3, status: "Critique" },
  { item: "Manuel Histoire-Géo T.", stock: 28, status: "OK" },
  { item: "Uniformes (Taille M)", stock: 8, status: "Faible" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted text-sm mt-1">Lycée International Victor Hugo — Vue d'ensemble</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="edu-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground tabular-nums">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.up ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              )}
              <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 edu-card p-6">
          <div className="edu-card-header px-0 pt-0">
            <h3 className="text-sm font-semibold text-foreground">Revenus mensuels</h3>
            <span className="text-xs text-muted">6 derniers mois</span>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9156FF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#9156FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(145,86,255,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${v / 1000000}M`} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} FCFA`, "Revenus"]}
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow-surface)" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#9156FF" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="edu-card p-6">
          <div className="edu-card-header px-0 pt-0">
            <h3 className="text-sm font-semibold text-foreground">Activité récente</h3>
          </div>
          <div className="mt-4 space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.type === "success" ? "bg-emerald-500" : a.type === "warning" ? "bg-amber-500" : "bg-primary"
                }`} />
                <div>
                  <p className="text-sm text-foreground leading-snug">{a.text}</p>
                  <span className="text-xs text-muted">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="edu-card">
        <div className="edu-card-header">
          <h3 className="text-sm font-semibold text-foreground">Alertes inventaire EduStore</h3>
          <span className="text-xs text-muted">{inventory.length} articles</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Article</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {inventory.map((item) => (
                <tr key={item.item} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-3 text-sm text-foreground">{item.item}</td>
                  <td className="px-6 py-3 text-sm text-foreground tabular-nums">{item.stock}</td>
                  <td className="px-6 py-3">
                    <span className={
                      item.status === "Critique" ? "status-error" :
                      item.status === "Faible" ? "status-pending" : "status-success"
                    }>
                      {item.status}
                    </span>
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

export default AdminDashboard;
