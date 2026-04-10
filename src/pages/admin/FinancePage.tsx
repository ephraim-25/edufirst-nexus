import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DollarSign, TrendingUp, AlertCircle, Wallet, FileText, MessageSquare, Download, Filter, ArrowUpRight } from "lucide-react";
import { generateReceiptPDF } from "@/lib/generateReceipt";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const revenueByMonth = [
  { month: "Jan", minerval: 3200000, boutique: 420000, premium: 180000 },
  { month: "Fév", minerval: 3800000, boutique: 380000, premium: 220000 },
  { month: "Mar", minerval: 4100000, boutique: 510000, premium: 290000 },
  { month: "Avr", minerval: 3900000, boutique: 460000, premium: 240000 },
  { month: "Mai", minerval: 4600000, boutique: 580000, premium: 320000 },
  { month: "Jun", minerval: 5200000, boutique: 640000, premium: 360000 },
];

const pieData = [
  { name: "Minervals", value: 24800000, color: "#9156FF" },
  { name: "Boutique", value: 2990000, color: "#38bdf8" },
  { name: "Cours Premium", value: 1610000, color: "#34d399" },
];

const unpaid = [
  { id: "1", parent: "Famille Diallo", student: "Amadou Diallo", class: "Tle S", amount: 450000, dueDate: "15 Mar 2025", daysLate: 26 },
  { id: "2", parent: "Famille Mbeki", student: "Sarah Mbeki", class: "1ère L", amount: 225000, dueDate: "01 Avr 2025", daysLate: 9 },
  { id: "3", parent: "Famille Konaté", student: "Ibrahim Konaté", class: "2nde A", amount: 450000, dueDate: "20 Fév 2025", daysLate: 49 },
  { id: "4", parent: "Famille Traoré", student: "Fatou Traoré", class: "Tle S", amount: 150000, dueDate: "10 Avr 2025", daysLate: 0 },
];

const transactions = [
  { id: "T001", date: "10 Avr 2025", description: "Paiement minerval — Famille Diallo", category: "Minerval", extension: "Campus Nord", amount: 225000, type: "credit" },
  { id: "T002", date: "09 Avr 2025", description: "Achat EduStore — Kit scientifique", category: "Boutique", extension: "Campus Sud", amount: 35000, type: "credit" },
  { id: "T003", date: "09 Avr 2025", description: "Remboursement — Uniforme défectueux", category: "Boutique", extension: "Campus Nord", amount: -12000, type: "debit" },
  { id: "T004", date: "08 Avr 2025", description: "Abonnement Cours Premium Physique", category: "Premium", extension: "Toutes", amount: 15000, type: "credit" },
  { id: "T005", date: "08 Avr 2025", description: "Paiement minerval — Famille Mbeki", category: "Minerval", extension: "Annexe Primaire", amount: 225000, type: "credit" },
  { id: "T006", date: "07 Avr 2025", description: "Achat EduStore — 10x Cahiers", category: "Boutique", extension: "Campus Nord", amount: 15000, type: "credit" },
  { id: "T007", date: "06 Avr 2025", description: "Frais d'examen — Trimestre 2", category: "Minerval", extension: "Toutes", amount: 180000, type: "credit" },
];

type Tab = "revenus" | "impayes" | "historique";

const FinancePage = () => {
  const [tab, setTab] = useState<Tab>("revenus");
  const [txFilter, setTxFilter] = useState("Toutes");

  const totalRevenue = pieData.reduce((s, d) => s + d.value, 0);
  const totalUnpaid = unpaid.reduce((s, u) => s + u.amount, 0);

  const filteredTx = txFilter === "Toutes" ? transactions : transactions.filter((t) => t.category === txFilter || t.extension === txFilter);

  const tabs: { key: Tab; label: string }[] = [
    { key: "revenus", label: "Revenus" },
    { key: "impayes", label: "Impayés" },
    { key: "historique", label: "Historique" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Finance & Trésorerie</h1>
        <p className="text-muted text-sm mt-1">Vue complète des performances financières</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Revenus totaux", value: `${(totalRevenue / 1000000).toFixed(1)}M FCFA`, icon: DollarSign, change: "+18.2%" },
          { label: "Solde disponible", value: "12.4M FCFA", icon: Wallet, change: "+5.1%" },
          { label: "Impayés", value: `${(totalUnpaid / 1000).toFixed(0)}K FCFA`, icon: AlertCircle, alert: true },
          { label: "Croissance", value: "+23%", icon: TrendingUp, change: "vs trim. dernier" },
        ].map((s) => (
          <div key={s.label} className="edu-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.alert ? "bg-destructive/10" : "bg-primary/10"}`}>
                <s.icon className={`w-4 h-4 ${s.alert ? "text-destructive" : "text-primary"}`} />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground tabular-nums">{s.value}</div>
            {s.change && (
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                <span className="text-xs text-emerald-600 font-medium">{s.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-6 w-fit">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted hover:text-foreground"}`}>
            {t.label}
            {t.key === "impayes" && unpaid.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/20 text-destructive text-xs font-bold">{unpaid.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab: Revenus */}
      {tab === "revenus" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 edu-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-1">Revenus par catégorie</h3>
              <p className="text-xs text-muted mb-4">6 derniers mois</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(145,86,255,0.06)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${v / 1000000}M`} />
                    <Tooltip formatter={(v: number) => [`${v.toLocaleString()} FCFA`]} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow-surface)" }} />
                    <Legend />
                    <Bar dataKey="minerval" name="Minervals" fill="#9156FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="boutique" name="Boutique" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="premium" name="Premium" fill="#34d399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="edu-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Répartition globale</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                      {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v.toLocaleString()} FCFA`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-foreground">{d.name}</span>
                    </div>
                    <span className="text-muted tabular-nums">{(d.value / 1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wallet */}
          <div className="edu-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Portefeuille de l'établissement</h3>
                <p className="text-xs text-muted">Solde consolidé de toutes les extensions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Solde total", value: "12 400 000 FCFA", sub: "Tous campus" },
                { label: "Entrées ce mois", value: "+4 200 000 FCFA", sub: "56 transactions" },
                { label: "Sorties ce mois", value: "-1 800 000 FCFA", sub: "12 transactions" },
              ].map((w) => (
                <div key={w.label} className="p-4 rounded-xl bg-secondary">
                  <p className="text-xs text-muted mb-1">{w.label}</p>
                  <p className="text-lg font-bold text-foreground tabular-nums">{w.value}</p>
                  <p className="text-xs text-muted mt-1">{w.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Impayés */}
      {tab === "impayes" && (
        <div className="edu-card overflow-hidden">
          <div className="edu-card-header">
            <h3 className="text-sm font-semibold text-foreground">Retards de paiement</h3>
            <span className="text-xs text-muted">{unpaid.length} famille{unpaid.length > 1 ? "s" : ""}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-secondary">
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Parent / Élève</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Classe</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Montant dû</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">Échéance</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Retard</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {unpaid.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-3">
                      <p className="text-sm font-medium text-foreground">{u.parent}</p>
                      <p className="text-xs text-muted">{u.student}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground hidden sm:table-cell">{u.class}</td>
                    <td className="px-6 py-3 text-sm font-medium text-foreground tabular-nums">{u.amount.toLocaleString()} FCFA</td>
                    <td className="px-6 py-3 text-sm text-muted hidden md:table-cell">{u.dueDate}</td>
                    <td className="px-6 py-3">
                      <span className={u.daysLate > 30 ? "status-error" : u.daysLate > 0 ? "status-pending" : "status-success"}>
                        {u.daysLate > 0 ? `${u.daysLate}j` : "À jour"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                          <MessageSquare className="w-3 h-3" /> Relancer
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                          <FileText className="w-4 h-4 text-muted" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Historique */}
      {tab === "historique" && (
        <div className="space-y-4">
          <div className="edu-card p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["Toutes", "Minerval", "Boutique", "Premium"].map((f) => (
                  <button key={f} onClick={() => setTxFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${txFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted hover:text-foreground"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors">
                <Download className="w-4 h-4" /> Exporter CSV
              </button>
            </div>
          </div>

          <div className="edu-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-secondary">
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Réf</th>
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">Extension</th>
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider text-right">Montant</th>
                    <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider text-right">Reçu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {filteredTx.map((t) => (
                    <tr key={t.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-3">
                        <span className="text-xs font-mono text-muted">{t.id}</span>
                        <p className="text-xs text-muted sm:hidden mt-0.5">{t.date}</p>
                      </td>
                      <td className="px-6 py-3">
                        <p className="text-sm text-foreground">{t.description}</p>
                        <p className="text-xs text-muted">{t.date}</p>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground hidden sm:table-cell">{t.category}</td>
                      <td className="px-6 py-3 text-sm text-muted hidden md:table-cell">{t.extension}</td>
                      <td className={`px-6 py-3 text-sm font-medium text-right tabular-nums ${t.amount < 0 ? "text-destructive" : "text-emerald-600"}`}>
                        {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()} FCFA
                      </td>
                      <td className="px-6 py-3 text-right">
                        {t.type === "credit" && (
                          <button onClick={() => generateReceiptPDF(t)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Télécharger le reçu">
                            <FileText className="w-4 h-4 text-primary" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FinancePage;
