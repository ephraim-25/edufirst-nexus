import DashboardLayout from "@/components/DashboardLayout";
import { Building2, Users, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const campusData = [
  { name: "Campus Nord", revenue: 8200000, students: 487, teachers: 32, color: "hsl(var(--primary))" },
  { name: "Campus Sud", revenue: 5100000, students: 312, teachers: 21, color: "hsl(262 60% 55%)" },
  { name: "Annexe Primaire", revenue: 3900000, students: 448, teachers: 28, color: "hsl(262 50% 70%)" },
];

const revenueByMonth = [
  { month: "Jan", nord: 1400, sud: 850, primaire: 650 },
  { month: "Fév", nord: 1600, sud: 900, primaire: 700 },
  { month: "Mar", nord: 1700, sud: 950, primaire: 750 },
  { month: "Avr", nord: 1500, sud: 880, primaire: 680 },
  { month: "Mai", nord: 1800, sud: 1020, primaire: 780 },
  { month: "Jun", nord: 2000, sud: 1100, primaire: 850 },
];

const totals = {
  revenue: campusData.reduce((s, c) => s + c.revenue, 0),
  students: campusData.reduce((s, c) => s + c.students, 0),
  teachers: campusData.reduce((s, c) => s + c.teachers, 0),
};

const OverviewPage = () => (
  <DashboardLayout role="admin">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Vue d'ensemble</h1>
      <p className="text-muted-foreground text-sm mt-1">Statistiques consolidées de toutes les extensions</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Revenus totaux", value: `${(totals.revenue / 1e6).toFixed(1)}M FCFA`, icon: DollarSign },
        { label: "Élèves inscrits", value: totals.students.toLocaleString(), icon: Users },
        { label: "Enseignants", value: totals.teachers, icon: Building2 },
      ].map((s) => (
        <div key={s.label} className="edu-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-xl font-bold text-foreground">{s.value}</div>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            <span className="text-xs text-emerald-600 font-medium">+15% vs trimestre</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 edu-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Revenus par extension (×1000 FCFA)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="nord" name="Campus Nord" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sud" name="Campus Sud" fill="hsl(262 60% 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="primaire" name="Annexe Primaire" fill="hsl(262 50% 70%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="edu-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Répartition des élèves</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={campusData} dataKey="students" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}>
                {campusData.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-2">
          {campusData.map((c) => (
            <div key={c.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-foreground font-medium">{c.name}</span>
              <span className="text-muted-foreground ml-auto">{c.students}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="edu-card">
      <div className="edu-card-header">
        <h3 className="text-sm font-semibold text-foreground">Détails par extension</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Extension</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Élèves</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Enseignants</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Revenus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {campusData.map((c) => (
              <tr key={c.name} className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-foreground flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </td>
                <td className="px-6 py-3 text-sm text-foreground tabular-nums">{c.students}</td>
                <td className="px-6 py-3 text-sm text-foreground tabular-nums">{c.teachers}</td>
                <td className="px-6 py-3 text-sm text-foreground tabular-nums">{(c.revenue / 1e6).toFixed(1)}M FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default OverviewPage;
