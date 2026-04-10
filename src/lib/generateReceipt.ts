export const generateReceiptPDF = (transaction: {
  id: string;
  date: string;
  description: string;
  category: string;
  extension: string;
  amount: number;
}) => {
  const receiptHTML = `
    <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px;color:#1e293b;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="font-size:28px;font-weight:800;color:#9156FF;">EduFirst</div>
        <p style="font-size:12px;color:#64748b;margin-top:4px;">Plateforme de Gestion Scolaire</p>
      </div>
      <div style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="font-size:18px;font-weight:700;margin:0;">Reçu de paiement</h2>
          <span style="background:#f0e6ff;color:#9156FF;font-size:11px;font-weight:600;padding:4px 12px;border-radius:999px;">N° ${transaction.id}</span>
        </div>
        <table style="width:100%;font-size:14px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Date</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;">${transaction.date}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Description</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;">${transaction.description}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Catégorie</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;">${transaction.category}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Extension</td>
            <td style="padding:10px 0;text-align:right;font-weight:500;">${transaction.extension}</td>
          </tr>
          <tr>
            <td style="padding:14px 0;color:#64748b;font-size:16px;font-weight:600;">Montant</td>
            <td style="padding:14px 0;text-align:right;font-size:18px;font-weight:700;color:#059669;">${transaction.amount > 0 ? "+" : ""}${transaction.amount.toLocaleString()} FCFA</td>
          </tr>
        </table>
      </div>
      <div style="text-align:center;padding:16px;background:#f8fafc;border-radius:12px;">
        <p style="font-size:11px;color:#94a3b8;margin:0;">Lycée International Victor Hugo — Kinshasa</p>
        <p style="font-size:11px;color:#94a3b8;margin:4px 0 0;">Document généré automatiquement par EduFirst</p>
      </div>
    </div>
  `;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reçu ${transaction.id} — EduFirst</title>
      <style>
        @media print {
          body { margin: 0; }
          @page { margin: 1cm; }
        }
      </style>
    </head>
    <body>${receiptHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 300);
};
