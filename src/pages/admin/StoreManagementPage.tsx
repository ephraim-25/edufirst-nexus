import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Package, Plus, Search, Filter, Edit, Trash2, AlertTriangle, ImagePlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  extension: string;
  image: string;
  description: string;
}

const categories = ["Toutes", "Fournitures", "Uniformes", "Manuels", "Électronique", "Cours Premium"];
const extensions = ["Toutes extensions", "Campus Nord", "Campus Sud", "Annexe Primaire"];

const initialArticles: Article[] = [
  { id: "1", name: "Cahier 200 pages Grand Format", category: "Fournitures", price: 1500, stock: 234, extension: "Toutes extensions", image: "📓", description: "Cahier grand format quadrillé" },
  { id: "2", name: "Uniforme Polo – Taille M", category: "Uniformes", price: 12000, stock: 8, extension: "Campus Nord", image: "👕", description: "Polo officiel de l'établissement" },
  { id: "3", name: "Manuel Mathématiques Tle S", category: "Manuels", price: 8500, stock: 45, extension: "Toutes extensions", image: "📘", description: "Manuel officiel programme national" },
  { id: "4", name: "Tablette Éducative 10\"", category: "Électronique", price: 125000, stock: 3, extension: "Campus Sud", image: "📱", description: "Tablette préchargée avec apps éducatives" },
  { id: "5", name: "Kit de chimie avancé", category: "Fournitures", price: 35000, stock: 2, extension: "Toutes extensions", image: "🧪", description: "Kit complet pour TP de chimie" },
  { id: "6", name: "Cours Premium – Physique", category: "Cours Premium", price: 15000, stock: 999, extension: "Toutes extensions", image: "🎓", description: "Accès annuel aux vidéos et exercices" },
  { id: "7", name: "Sac à dos EduFirst", category: "Fournitures", price: 18000, stock: 56, extension: "Toutes extensions", image: "🎒", description: "Sac robuste avec logo de l'école" },
  { id: "8", name: "Uniforme Jupe – Taille S", category: "Uniformes", price: 10000, stock: 12, extension: "Annexe Primaire", image: "👗", description: "Jupe plissée uniforme officiel" },
];

const emptyArticle = { name: "", category: "Fournitures", price: 0, stock: 0, extension: "Toutes extensions", description: "" };

const StoreManagementPage = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Toutes");
  const [extFilter, setExtFilter] = useState("Toutes extensions");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyArticle);
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Toutes" || a.category === catFilter;
    const matchExt = extFilter === "Toutes extensions" || a.extension === extFilter;
    return matchSearch && matchCat && matchExt;
  });

  const lowStock = articles.filter((a) => a.stock <= 10 && a.category !== "Cours Premium");

  const openAdd = () => { setForm(emptyArticle); setEditId(null); setShowModal(true); };
  const openEdit = (a: Article) => { setForm({ name: a.name, category: a.category, price: a.price, stock: a.stock, extension: a.extension, description: a.description }); setEditId(a.id); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || form.price <= 0) return;
    if (editId) {
      setArticles((prev) => prev.map((a) => a.id === editId ? { ...a, ...form } : a));
    } else {
      setArticles((prev) => [...prev, { ...form, id: Date.now().toString(), image: "📦" }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => setArticles((prev) => prev.filter((a) => a.id !== id));

  const totalValue = articles.reduce((s, a) => s + a.price * a.stock, 0);

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Inventaire & Boutique</h1>
        <p className="text-muted text-sm mt-1">Gestion complète du catalogue EduStore</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total articles", value: articles.length.toString(), icon: Package },
          { label: "Valeur stock", value: `${(totalValue / 1000000).toFixed(1)}M FCFA`, icon: Package },
          { label: "Stock faible", value: lowStock.length.toString(), icon: AlertTriangle, alert: lowStock.length > 0 },
          { label: "Catégories", value: (categories.length - 1).toString(), icon: Filter },
        ].map((s) => (
          <div key={s.label} className="edu-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.alert ? "bg-destructive/10" : "bg-primary/10"}`}>
                <s.icon className={`w-4 h-4 ${s.alert ? "text-destructive" : "text-primary"}`} />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="edu-card p-4 mb-6 border-l-4 border-amber-500">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-foreground">Alertes de stock bas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((a) => (
              <span key={a.id} className={`text-xs px-2.5 py-1 rounded-full font-medium ${a.stock <= 5 ? "status-error" : "status-pending"}`}>
                {a.name} — {a.stock} restant{a.stock > 1 ? "s" : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="edu-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un article…" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={extFilter} onChange={(e) => setExtFilter(e.target.value)} className="px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
            {extensions.map((e) => <option key={e}>{e}</option>)}
          </select>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="edu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-secondary">
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Article</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Catégorie</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">Extension</th>
                <th className="px-6 py-3 text-xs font-medium text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{a.image}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{a.name}</p>
                        <p className="text-xs text-muted sm:hidden">{a.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-foreground hidden sm:table-cell">{a.category}</td>
                  <td className="px-6 py-3 text-sm font-medium text-foreground tabular-nums">{a.price.toLocaleString()} FCFA</td>
                  <td className="px-6 py-3">
                    <span className={a.stock <= 5 ? "status-error" : a.stock <= 10 ? "status-pending" : "status-success"}>
                      {a.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted hidden md:table-cell">{a.extension}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        <Edit className="w-4 h-4 text-muted" />
                      </button>
                      <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted text-sm">Aucun article trouvé.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl w-full max-w-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">{editId ? "Modifier l'article" : "Nouvel article"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-secondary"><X className="w-4 h-4 text-muted" /></button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center w-full h-28 rounded-xl bg-secondary border-2 border-dashed border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
                  <div className="text-center">
                    <ImagePlus className="w-6 h-6 text-muted mx-auto mb-1" />
                    <span className="text-xs text-muted">Uploader une photo</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Nom de l'article</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Prix (FCFA)</label>
                    <input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Stock</label>
                    <input type="number" value={form.stock || ""} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Catégorie</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                      {categories.filter((c) => c !== "Toutes").map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Extension</label>
                    <select value={form.extension} onChange={(e) => setForm({ ...form, extension: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                      {extensions.map((e) => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Annuler</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]">
                  {editId ? "Mettre à jour" : "Ajouter l'article"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default StoreManagementPage;
