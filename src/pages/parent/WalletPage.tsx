import DashboardLayout from "@/components/DashboardLayout";
import { DollarSign, Download, Receipt, CreditCard, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const summary = { total: 1850000, paid: 1350000, pending: 350000, overdue: 150000 };

const transactions = [
  { id: 1, label: "Minerval — Trimestre 2", amount: 450000, date: "01/03/2025", status: "Payé", type: "tuition", child: "Amadou" },
  { id: 2, label: "Frais d'examen T2", amount: 75000, date: "28/02/2025", status: "Payé", type: "exam", child: "Amadou" },
  { id: 3, label: "EduStore — Kit scientifique", amount: 35000, date: "25/02/2025", status: "Payé", type: "store", child: "Fatou" },
  { id: 4, label: "Minerval — Trimestre 2", amount: 450000, date: "01/03/2025", status: "Payé", type: "tuition", child: "Fatou" },
  { id: 5, label: "Transport scolaire — Mars", amount: 50000, date: "05/03/2025", status: "En attente", type: "transport", child: "Amadou" },
  { id: 6, label: "Minerval — Trimestre 3", amount: 450000, date: "15/04/2025", status: "En attente", type: "tuition", child: "Amadou" },
  { id: 7, label: "Frais de cantine — Février", amount: 40000, date: "01/02/2025", status: "En retard", type: "other", child: "Fatou" },
  { id: 8, label: "EduStore — Uniformes", amount: 85000, date: "15/01/2025", status: "Payé", type: "store", child: "Amadou" },
];

const WalletPage = () => (
  <DashboardLayout role="parent">
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portefeuille numérique</h1>
        <p className="text-muted-foreground text-sm mt-1">Historique des paiements et reçus</p>
      </div>
      <Button variant="default" size="sm" className="gap-2 self-start"><CreditCard className="w-4 h-4" /> Effectuer un paiement</Button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total facturé", value: `${(summary.total / 1e6).toFixed(2)}M`, icon: DollarSign, color: "text-primary bg-primary/10" },
        { label: "Payé", value: `${(summary.paid / 1e6).toFixed(2)}M`, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" },
        { label: "En attente", value: `${(summary.pending / 1e3).toFixed(0)}K`, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
        { label: "En retard", value: `${(summary.overdue / 1e3).toFixed(0)}K`, icon: AlertCircle, color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
      ].map((s) => (
        <div key={s.label} className="edu-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-foreground tabular-nums">{s.value} FCFA</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="edu-card mb-4">
      <div className="p-4 border-b border-border">
        <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(summary.paid / summary.total) * 100}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{((summary.paid / summary.total) * 100).toFixed(0)}% des frais payés</p>
      </div>
    </div>

    <div className="edu-card">
      <div className="edu-card-header">
        <h3 className="text-sm font-semibold text-foreground">Historique des transactions</h3>
        <span className="text-xs text-muted-foreground">{transactions.length} transactions</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Description</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Enfant</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Montant</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Statut</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-3 text-sm text-foreground">{t.label}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground hidden sm:table-cell">{t.child}</td>
                <td className="px-6 py-3 text-sm font-medium text-foreground tabular-nums">{t.amount.toLocaleString()} F</td>
                <td className="px-6 py-3 text-sm text-muted-foreground tabular-nums hidden sm:table-cell">{t.date}</td>
                <td className="px-6 py-3">
                  <span className={t.status === "Payé" ? "status-success" : t.status === "En attente" ? "status-pending" : "status-error"}>{t.status}</span>
                </td>
                <td className="px-6 py-3">
                  {t.status === "Payé" && (
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Télécharger le reçu">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default WalletPage;
