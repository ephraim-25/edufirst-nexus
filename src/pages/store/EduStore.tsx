import { useState, createContext, useContext, ReactNode } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ShoppingBag, Plus, Minus, X, ShoppingCart, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  required: boolean;
  description: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  { id: "P001", name: "Manuel Mathématiques Terminale S", category: "Manuels", price: 12500, image: "📘", required: true, description: "Édition 2025 — Programme officiel", stock: 45 },
  { id: "P002", name: "Manuel Physique-Chimie Première S", category: "Manuels", price: 11000, image: "📗", required: true, description: "Édition 2025 — Exercices corrigés inclus", stock: 32 },
  { id: "P003", name: "Kit de chimie avancé", category: "Fournitures", price: 8900, image: "🧪", required: true, description: "Tubes, béchers, réactifs de base", stock: 3 },
  { id: "P004", name: "Calculatrice scientifique TI-82", category: "Fournitures", price: 25000, image: "🔢", required: false, description: "Mode examen activable", stock: 18 },
  { id: "P005", name: "Cours Premium — Physique-Chimie", category: "Cours Premium", price: 5000, image: "🎓", required: false, description: "Accès trimestriel — Vidéos + exercices", stock: 999 },
  { id: "P006", name: "Cours Premium — Mathématiques", category: "Cours Premium", price: 5000, image: "🎓", required: false, description: "Accès trimestriel — Préparation BAC", stock: 999 },
  { id: "P007", name: "Uniforme officiel (Taille M)", category: "Uniformes", price: 15000, image: "👔", required: false, description: "Polo + pantalon — Coton premium", stock: 8 },
  { id: "P008", name: "Uniforme officiel (Taille L)", category: "Uniformes", price: 15000, image: "👔", required: false, description: "Polo + pantalon — Coton premium", stock: 22 },
  { id: "P009", name: "Cahier de mathématiques 200p", category: "Fournitures", price: 2500, image: "📓", required: false, description: "Grands carreaux — Couverture rigide", stock: 12 },
  { id: "P010", name: "Sac à dos EduFirst", category: "Accessoires", price: 18000, image: "🎒", required: false, description: "Ergonomique — Compartiment laptop", stock: 15 },
];

const categories = ["Tous", "Manuels", "Fournitures", "Cours Premium", "Uniformes", "Accessoires"];

interface EduStoreProps {
  role: "admin" | "parent";
}

const EduStore = ({ role }: EduStoreProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "Tous" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <DashboardLayout role={role}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">EduStore</h1>
          <p className="text-muted text-sm mt-1">Fournitures, manuels et cours premium</p>
        </div>
        <Button
          variant="outline"
          className="relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart className="w-4 h-4" />
          Panier
          {totalItems > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* Filters */}
      <div className="edu-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-background rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un article..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  category === cat
                    ? "bg-primary/10 text-primary"
                    : "bg-background text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className="edu-card p-5 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{product.image}</span>
              {product.required && (
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Requis</span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground leading-snug">{product.name}</h3>
            <p className="text-xs text-muted mt-1 flex-1">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-base font-bold text-foreground tabular-nums">
                  {product.price.toLocaleString()} FCFA
                </span>
                {product.stock <= 10 && (
                  <p className="text-[10px] text-amber-600 font-medium mt-0.5">
                    {product.stock} en stock
                  </p>
                )}
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="edu-card p-12 text-center">
          <p className="text-sm text-muted">Aucun article trouvé.</p>
        </div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card shadow-surface z-50 flex flex-col"
            >
              <div className="p-5 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Panier</h2>
                  <p className="text-xs text-muted">{totalItems} article{totalItems !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-muted" />
                </button>
              </div>

              <div className="flex-1 overflow-auto px-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-10 h-10 text-muted/30 mx-auto mb-3" />
                    <p className="text-sm text-muted">Votre panier est vide</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 bg-background rounded-xl p-3">
                      <span className="text-2xl">{item.product.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted tabular-nums">{item.product.price.toLocaleString()} FCFA</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-card shadow-surface flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3 text-foreground" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-6 text-center tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-card shadow-surface flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3 text-foreground" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 shrink-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted">Total</span>
                    <span className="text-xl font-bold text-foreground tabular-nums">
                      {totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      toast.success("Commande confirmée !");
                      setCart([]);
                      setCartOpen(false);
                    }}
                  >
                    Commander
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default EduStore;
