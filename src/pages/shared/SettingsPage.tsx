import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Globe, Sun, Moon, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

type Role = "admin" | "teacher" | "student" | "parent";

const SettingsPage = ({ role }: { role: Role }) => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  const handleDarkMode = (val: boolean) => {
    setDarkMode(val);
    document.documentElement.classList.toggle("dark", val);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    toast({ title: "Succès", description: "Mot de passe mis à jour avec succès." });
    setPasswords({ old: "", new: "", confirm: "" });
  };

  return (
    <DashboardLayout role={role}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>

        {/* Security */}
        <div className="edu-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Sécurité</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="old-pw" className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" />Mot de passe actuel</Label>
              <div className="relative">
                <Input id="old-pw" type={showOld ? "text" : "password"} value={passwords.old} onChange={(e) => setPasswords({ ...passwords, old: e.target.value })} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-pw">Nouveau mot de passe</Label>
              <div className="relative">
                <Input id="new-pw" type={showNew ? "text" : "password"} value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-pw">Confirmer</Label>
              <Input id="confirm-pw" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="••••••••" required />
            </div>
            <Button type="submit" size="sm">Mettre à jour</Button>
          </form>
        </div>

        {/* Preferences */}
        <div className="edu-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Préférences</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium text-foreground">Mode sombre</p>
                <p className="text-xs text-muted-foreground">Activer le thème sombre</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={handleDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Langue</p>
              <p className="text-xs text-muted-foreground">Langue de l'interface</p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ar">🇸🇦 العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SettingsPage;
