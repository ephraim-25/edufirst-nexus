// EduFirst — PDF receipt generator (HTML print-to-PDF, no dependencies)
window.generateReceiptPDF = (tx) => {
  const html = `
    <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px;color:#0F172A;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="font-size:28px;font-weight:800;color:#9156FF;">EduFirst</div>
        <p style="font-size:12px;color:#64748B;margin-top:4px;">Plateforme de Gestion Scolaire</p>
      </div>
      <div style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="font-size:18px;font-weight:700;margin:0;">Reçu de paiement</h2>
          <span style="background:#F5EDFF;color:#9156FF;font-size:11px;font-weight:600;padding:4px 12px;border-radius:999px;">N° ${tx.id}</span>
        </div>
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748B;">Date</td><td style="padding:10px 0;text-align:right;font-weight:500;">${tx.date}</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748B;">Description</td><td style="padding:10px 0;text-align:right;font-weight:500;">${tx.description}</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748B;">Catégorie</td><td style="padding:10px 0;text-align:right;font-weight:500;">${tx.category}</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748B;">Extension</td><td style="padding:10px 0;text-align:right;font-weight:500;">${tx.extension || "—"}</td></tr>
          <tr><td style="padding:14px 0;color:#64748B;font-size:16px;font-weight:600;">Montant</td><td style="padding:14px 0;text-align:right;font-size:18px;font-weight:700;color:#059669;">${(tx.amount > 0 ? "+" : "") + tx.amount.toLocaleString("fr-FR")} FCFA</td></tr>
        </table>
      </div>
      <div style="text-align:center;padding:16px;background:#F8FAFC;border-radius:12px;">
        <p style="font-size:11px;color:#94A3B8;margin:0;">Lycée International Victor Hugo — Kinshasa</p>
        <p style="font-size:11px;color:#94A3B8;margin:4px 0 0;">Document généré automatiquement par EduFirst</p>
      </div>
    </div>`;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>Reçu ${tx.id}</title><style>@media print{body{margin:0}@page{margin:1cm}}</style></head><body>${html}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
};
