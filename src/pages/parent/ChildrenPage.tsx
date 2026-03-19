import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, User, GraduationCap, BarChart3, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Child {
  id: string;
  name: string;
  class: string;
  average: number;
  rank: number;
  totalStudents: number;
  initials: string;
  subjects: { name: string; grade: number }[];
}

const initialChildren: Child[] = [
  {
    id: "1", name: "Moussa Ba", class: "Terminale S", average: 15.2, rank: 3, totalStudents: 35, initials: "MB",
    subjects: [{ name: "Maths", grade: 17 }, { name: "Physique", grade: 14 }, { name: "SVT", grade: 15 }, { name: "Français", grade: 14.5 }],
  },
  {
    id: "2", name: "Aminata Ba", class: "4ème A", average: 13.8, rank: 8, totalStudents: 40, initials: "AB",
    subjects: [{ name: "Maths", grade: 12 }, { name: "Français", grade: 15 }, { name: "Histoire", grade: 14 }, { name: "Anglais", grade: 14 }],
  },
];

const ChildrenPage = () => {
  const { toast } = useToast();
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const newChild: Child = {
      id: String(Date.now()),
      name: "Ibrahima Ba",
      class: "6ème B",
      average: 11.5,
      rank: 15,
      totalStudents: 38,
      initials: "IB",
      subjects: [{ name: "Maths", grade: 10 }, { name: "Français", grade: 13 }],
    };
    setChildren([...children, newChild]);
    setDialogOpen(false);
    setSearchCode("");
    toast({ title: "Enfant ajouté", description: `${newChild.name} a été lié à votre compte.` });
  };

  return (
    <DashboardLayout role="parent">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mes Enfants</h1>
            <p className="text-sm text-muted-foreground">{children.length} enfant{children.length !== 1 && "s"} lié{children.length !== 1 && "s"}</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} variant="hero">
            <Plus className="w-4 h-4" /> Ajouter un enfant
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {children.map((child) => (
              <motion.div key={child.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="edu-card p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{child.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{child.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><GraduationCap className="w-3 h-3" />{child.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{child.average}/20</p>
                    <p className="text-xs text-muted-foreground">{child.rank}e / {child.totalStudents}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {child.subjects.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{s.name}</span>
                        <span className="font-semibold text-foreground">{s.grade}/20</span>
                      </div>
                      <Progress value={(s.grade / 20) * 100} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add child dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un enfant</DialogTitle>
              <DialogDescription>Entrez le code d'inscription fourni par l'établissement pour lier votre enfant.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddChild} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="code">Code d'inscription</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="code" placeholder="Ex: EDU-2025-MN001" className="pl-10" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} required />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
                <Button type="submit">Lier l'enfant</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default ChildrenPage;
