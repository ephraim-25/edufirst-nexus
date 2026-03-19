import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Building2, BookOpen, Heart,
  Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterRole = "admin" | "teacher" | "parent";

const roles = [
  { id: "admin" as const, label: "Établissement", icon: Building2, description: "Chef d'établissement" },
  { id: "teacher" as const, label: "Professeur", icon: BookOpen, description: "Enseignant" },
  { id: "parent" as const, label: "Parent", icon: Heart, description: "Parent d'élève" },
];

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RegisterRole>("teacher");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", specialty: "", password: "", confirm: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "admin") {
      navigate("/onboarding");
      return;
    }
    navigate(`/dashboard/${selectedRole}`);
  };

  const specialtyLabel = selectedRole === "teacher" ? "Spécialité / Matière" : "Lien de parenté";
  const specialtyPlaceholder = selectedRole === "teacher" ? "Ex: Mathématiques" : "Ex: Père, Mère, Tuteur";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-5/12 bg-primary relative flex-col justify-between p-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">EduFirst</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4">
            Rejoignez la communauté EduFirst
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Créez votre compte et accédez à une plateforme de gestion scolaire moderne et intuitive.
          </p>
        </div>
        <p className="relative z-10 text-primary-foreground/50 text-sm">© 2025 EduFirst. Tous droits réservés.</p>
      </motion.div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EduFirst</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Créer un compte</h2>
            <p className="text-muted-foreground mt-1">Choisissez votre profil pour commencer</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3 rounded-xl text-center transition-all duration-200 ${
                  selectedRole === role.id
                    ? "bg-primary/10 ring-2 ring-primary text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                <role.icon className="w-5 h-5 mx-auto mb-1.5" />
                <span className="text-xs font-semibold block">{role.label}</span>
              </button>
            ))}
          </div>

          {/* Student notice */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary text-muted-foreground text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Les comptes <strong className="text-foreground">Élèves</strong> sont créés par l'Établissement ou le Parent depuis leur tableau de bord.</span>
          </div>

          <AnimatePresence mode="wait">
            {selectedRole === "admin" ? (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  L'inscription d'un établissement se fait via notre assistant d'onboarding en 2 étapes.
                </p>
                <Button onClick={() => navigate("/onboarding")} className="w-full" variant="hero" size="lg">
                  Démarrer l'onboarding
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key={selectedRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="name" placeholder="Jean Dupont" className="pl-10" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="jean@email.com" className="pl-10" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="inviteCode">Code Invitation (fourni par l'école)</Label>
                  <Input id="inviteCode" placeholder="Ex: EDU-NORD-2025" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
                  <p className="text-[11px] text-muted-foreground">Ce code vous rattache automatiquement à l'établissement.</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="specialty">{specialtyLabel}</Label>
                  <Input id="specialty" placeholder={specialtyPlaceholder} value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="confirm" type="password" placeholder="••••••••" className="pl-10" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
                  </div>
                </div>

                <Button type="submit" className="w-full" variant="hero" size="lg">
                  Créer mon compte
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">Se connecter</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
