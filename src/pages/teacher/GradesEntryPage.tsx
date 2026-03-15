import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Check, Save, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface GradeEntry {
  id: string;
  name: string;
  grade: string;
  comment: string;
  saved: boolean;
}

const classOptions = [
  { id: "math101-ts1", label: "Mathématiques 101 — Terminale S1", assignment: "Contrôle Q2 — Intégrales" },
  { id: "phys-1s1", label: "Physique-Chimie — Première S1", assignment: "TP Électrocinétique" },
  { id: "alg-ts2", label: "Algèbre Avancée — Terminale S2", assignment: "Devoir maison #4" },
];

const studentsByClass: Record<string, GradeEntry[]> = {
  "math101-ts1": [
    { id: "STU-001", name: "Aminata Diallo", grade: "", comment: "", saved: false },
    { id: "STU-002", name: "Kouadio Yao", grade: "", comment: "", saved: false },
    { id: "STU-005", name: "Marie-Claire Bamba", grade: "", comment: "", saved: false },
    { id: "STU-008", name: "Jean-Baptiste N'Guessan", grade: "", comment: "", saved: false },
    { id: "STU-011", name: "Awa Kouyaté", grade: "", comment: "", saved: false },
    { id: "STU-012", name: "Moussa Diabaté", grade: "", comment: "", saved: false },
  ],
  "phys-1s1": [
    { id: "STU-003", name: "Fatoumata Traoré", grade: "", comment: "", saved: false },
    { id: "STU-009", name: "Mariame Sanogo", grade: "", comment: "", saved: false },
    { id: "STU-013", name: "Adama Cissé", grade: "", comment: "", saved: false },
  ],
  "alg-ts2": [
    { id: "STU-005", name: "Marie-Claire Bamba", grade: "", comment: "", saved: false },
    { id: "STU-014", name: "Oumar Sidibé", grade: "", comment: "", saved: false },
    { id: "STU-015", name: "Kadiatou Bah", grade: "", comment: "", saved: false },
  ],
};

const GradesEntryPage = () => {
  const [selectedClass, setSelectedClass] = useState(classOptions[0].id);
  const [grades, setGrades] = useState<Record<string, GradeEntry[]>>(studentsByClass);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentClass = classOptions.find((c) => c.id === selectedClass)!;
  const currentGrades = grades[selectedClass] || [];

  const updateGrade = (studentId: string, field: "grade" | "comment", value: string) => {
    setGrades((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map((s) =>
        s.id === studentId ? { ...s, [field]: value, saved: false } : s
      ),
    }));
  };

  const saveAll = () => {
    setGrades((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map((s) => ({ ...s, saved: true })),
    }));
    toast.success(`Notes enregistrées pour ${currentClass.label.split(" — ")[0]}`);
  };

  const filledCount = currentGrades.filter((s) => s.grade !== "").length;
  const totalCount = currentGrades.length;

  return (
    <DashboardLayout role="teacher">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saisie des notes</h1>
          <p className="text-muted text-sm mt-1">{filledCount}/{totalCount} notes saisies</p>
        </div>
        <Button variant="hero" onClick={saveAll}>
          <Save className="w-4 h-4" /> Enregistrer tout
        </Button>
      </div>

      {/* Class Selector */}
      <div className="edu-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative flex-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-background rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
              <span>{currentClass.label}</span>
              <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-surface z-10 py-1 overflow-hidden"
              >
                {classOptions.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => { setSelectedClass(cls.id); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      cls.id === selectedClass ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {cls.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          <div className="edu-card px-4 py-2 bg-background">
            <span className="text-xs text-muted">Évaluation :</span>
            <span className="text-sm font-medium text-foreground ml-2">{currentClass.assignment}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="edu-card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Progression</span>
          <span className="text-xs font-semibold text-foreground tabular-nums">{Math.round((filledCount / totalCount) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(filledCount / totalCount) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Grade Grid */}
      <div className="edu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Étudiant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider w-28">Note /20</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Commentaire</th>
                <th className="px-6 py-3 w-16 text-center text-xs font-medium text-muted uppercase tracking-wider">État</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {currentGrades.map((student, i) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.03 }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      value={student.grade}
                      onChange={(e) => updateGrade(student.id, "grade", e.target.value)}
                      placeholder="—"
                      className="w-20 h-9 px-3 rounded-lg bg-background shadow-surface text-sm font-semibold text-foreground tabular-nums placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-center"
                    />
                  </td>
                  <td className="px-6 py-3 hidden sm:table-cell">
                    <input
                      type="text"
                      value={student.comment}
                      onChange={(e) => updateGrade(student.id, "comment", e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="w-full h-9 px-3 rounded-lg bg-background text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                  </td>
                  <td className="px-6 py-3 text-center">
                    {student.saved ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    ) : student.grade ? (
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mx-auto">
                        <div className="w-2 h-2 rounded-full bg-muted/30" />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GradesEntryPage;
