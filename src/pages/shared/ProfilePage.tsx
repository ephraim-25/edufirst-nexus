import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin, Calendar, Edit3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";

type Role = "admin" | "teacher" | "student" | "parent";

const profileData: Record<Role, { name: string; email: string; phone: string; address: string; joined: string; role: string; initials: string }> = {
  admin: { name: "Amadou Diallo", email: "amadou@edufirst.com", phone: "+221 77 123 45 67", address: "Dakar, Sénégal", joined: "Septembre 2024", role: "Chef d'établissement", initials: "AD" },
  teacher: { name: "Fatou Sow", email: "fatou.sow@edufirst.com", phone: "+221 76 234 56 78", address: "Dakar, Sénégal", joined: "Octobre 2024", role: "Professeur de Mathématiques", initials: "FS" },
  student: { name: "Moussa Ndiaye", email: "moussa.n@edufirst.com", phone: "+221 78 345 67 89", address: "Dakar, Sénégal", joined: "Janvier 2025", role: "Élève - Terminale S", initials: "MN" },
  parent: { name: "Aïssatou Ba", email: "aissatou.ba@email.com", phone: "+221 77 456 78 90", address: "Dakar, Sénégal", joined: "Novembre 2024", role: "Parent d'élève", initials: "AB" },
};

const ProfilePage = ({ role }: { role: Role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = profileData[role];
  const [form, setForm] = useState(data);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setIsEditing(false); }, 800);
  };

  const infoItems = [
    { icon: Mail, label: "Email", key: "email" as const },
    { icon: Phone, label: "Téléphone", key: "phone" as const },
    { icon: MapPin, label: "Adresse", key: "address" as const },
    { icon: Calendar, label: "Membre depuis", key: "joined" as const },
  ];

  return (
    <DashboardLayout role={role}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Mon Profil</h1>

        {/* Avatar card */}
        <div className="edu-card p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <Avatar className="w-20 h-20 text-lg">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{form.initials}</AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center bg-foreground/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
              <p className="text-muted-foreground text-sm">{form.role}</p>
            </div>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={loading}>
              {isEditing ? <><Save className="w-4 h-4" /> Enregistrer</> : <><Edit3 className="w-4 h-4" /> Modifier</>}
            </Button>
          </div>
        </div>

        {/* Info card */}
        <div className="edu-card p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Informations personnelles</h3>
          {loading ? (
            <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, label, key }) => (
                <div key={key} className="space-y-1.5">
                  <Label className="flex items-center gap-2 text-muted-foreground"><Icon className="w-3.5 h-3.5" />{label}</Label>
                  {isEditing && key !== "joined" ? (
                    <Input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                  ) : (
                    <p className="text-sm text-foreground font-medium pl-1">{form[key]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ProfilePage;
