import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Clock, ClipboardList, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const classes = [
  { name: "Mathématiques 101", level: "Terminale S", students: 34, next: "Lun 08:00" },
  { name: "Physique-Chimie", level: "Première S", students: 28, next: "Mar 10:00" },
  { name: "Algèbre Avancée", level: "Terminale S", students: 22, next: "Mer 14:00" },
  { name: "Statistiques", level: "Seconde", students: 38, next: "Jeu 08:00" },
];

const pendingGrades = [
  { class: "Mathématiques 101", assignment: "Contrôle Q2 — Intégrales", due: "Aujourd'hui", count: 34 },
  { class: "Physique-Chimie", assignment: "TP Électrocinétique", due: "Demain", count: 28 },
  { class: "Algèbre Avancée", assignment: "Devoir maison #4", due: "Dans 3 jours", count: 18 },
];

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bonjour, M. Konaté</h1>
        <p className="text-muted text-sm mt-1">Département de Mathématiques — 4 classes actives</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Classes */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-3">Classes actives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div key={cls.name} className="edu-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <span className="status-success">{cls.level}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{cls.name}</h3>
                <p className="text-xs text-muted mt-1">{cls.students} étudiants</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
                  <Clock className="w-3 h-3" />
                  Prochain cours : {cls.next}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Upload */}
          <div className="edu-card p-6 mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">Déposer un document</h2>
            <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <FileUp className="w-8 h-8 text-muted mx-auto mb-2" />
              <p className="text-sm text-muted">Glissez vos fichiers de cours ou devoirs ici</p>
              <p className="text-xs text-muted/60 mt-1">PDF, DOCX, PPTX — Max 20 Mo</p>
            </div>
          </div>
        </div>

        {/* Pending Grades */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Notes en attente</h2>
            <Button variant="default" size="sm">
              <ClipboardList className="w-3.5 h-3.5" />
              Saisie rapide
            </Button>
          </div>
          <div className="space-y-3">
            {pendingGrades.map((g) => (
              <div key={g.assignment} className="edu-card p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">{g.class}</span>
                  <span className="status-pending">{g.due}</span>
                </div>
                <h3 className="text-sm font-medium text-foreground">{g.assignment}</h3>
                <p className="text-xs text-muted mt-1">{g.count} copies à corriger</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
