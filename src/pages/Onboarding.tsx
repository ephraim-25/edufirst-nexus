import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Upload, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "",
    features: ["Jusqu'à 50 étudiants", "Gestion des notes de base", "1 administrateur", "Support par email"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "2 500 FCFA",
    period: "/ étudiant / trimestre",
    features: ["Étudiants illimités", "EduStore intégré", "Cours premium", "Rapports avancés", "Support prioritaire"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    features: ["Multi-campus", "API personnalisée", "Formation sur site", "Account manager dédié", "SLA garanti"],
    highlighted: false,
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/dashboard/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        layout
        className="w-full max-w-3xl"
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">EduFirst</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Enregistrez votre école</h1>
          <p className="text-muted mt-1">Étape {step} sur 2</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 max-w-xs mx-auto mb-10">
          <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
          <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="edu-card p-8"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Identité de votre établissement</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nom de l'école</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Lycée International Victor Hugo"
                    className="w-full h-11 px-4 rounded-lg bg-background shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Domaine</label>
                  <div className="flex items-center gap-0">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="lycee-victor-hugo"
                      className="flex-1 h-11 px-4 rounded-l-lg bg-background shadow-surface text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                    <span className="h-11 px-4 flex items-center bg-secondary text-muted text-sm rounded-r-lg font-medium">
                      .edufirst.io
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Logo de l'école</label>
                  <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-sm text-muted">Glissez-déposez ou cliquez pour télécharger</p>
                    <p className="text-xs text-muted/60 mt-1">PNG, JPG jusqu'à 2 Mo</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="hero" onClick={() => setStep(2)}>
                  Continuer <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const isSelected = selectedPlan === plan.name;
                  return (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`edu-card p-6 text-left transition-all duration-200 ${
                        isSelected ? "ring-2 ring-primary" : ""
                      } ${plan.highlighted ? "relative" : ""}`}
                    >
                      {plan.highlighted && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          Recommandé
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                      <div className="mt-2 mb-4">
                        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                        {plan.period && (
                          <span className="text-sm text-muted ml-1">{plan.period}</span>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-muted">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Retour
                </Button>
                <Button variant="hero" onClick={handleComplete}>
                  Créer mon établissement
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Onboarding;
