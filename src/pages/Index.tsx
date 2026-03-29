import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, LayoutDashboard, BookOpen, Wallet, User,
  Check, CheckCircle2, Clock, Bell, Building, PlayCircle,
  DollarSign, Users, ChevronRight, Shield, Zap, Globe
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-foreground text-lg">EduFirst</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Architecture</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Tarifs</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary rounded-full transition-colors">
              Connexion
            </button>
            <button onClick={() => navigate("/onboarding")} className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Commencer
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen pt-20 relative overflow-hidden flex items-center" id="hero">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-lg relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg" />
            <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden relative z-10 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Collège Excellence</h3>
                    <p className="text-xs text-muted-foreground">Dashboard Admin</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> En ligne
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-2xl border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Élèves Actifs</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <p className="text-xs text-primary font-semibold mb-1">Caisse (Aujourd'hui)</p>
                  <p className="text-2xl font-bold text-primary">$35,850</p>
                </div>
              </div>
              <div className="bg-secondary rounded-2xl p-4 border border-border flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Nouveau paiement parent</p>
                  <p className="text-xs text-muted-foreground">Famille Mutombo - Tranche 2 payée</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              EduFirst est en ligne
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              La révolution numérique de la{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                gestion scolaire.
              </span>
            </h1>
            <p className="py-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              EduFirst est l'écosystème tout-en-un qui connecte l'Administration, les Professeurs, les Parents et
              les Élèves. Sécurisez vos finances, numérisez vos cours et dirigez votre école comme une startup.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/onboarding")}
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 transition-colors"
              >
                Découvrir la plateforme
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3.5 border border-border hover:bg-secondary text-foreground rounded-full font-medium transition-colors inline-flex items-center gap-2"
              >
                Voir la démo <PlayCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT - BENTO */}
      <section className="py-24 bg-card relative z-10" id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Architecture Intégrale</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">4 Portails. 1 Seule Base de données.</h3>
            <p className="mt-4 text-muted-foreground text-lg">
              Chaque acteur de l'école possède son propre espace. Les données se synchronisent en temps réel sans aucune redondance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Admin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 lg:col-span-8 flex flex-col justify-between group overflow-hidden relative bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="absolute right-0 top-0 w-64 h-64 bg-secondary rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutDashboard className="text-primary w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-3">La Tour de Contrôle Admin</h4>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Contrôle total des flux financiers, validation des inscriptions, rapports d'activité des professeurs et communication ciblée avec les parents.
                </p>
              </div>
              <div className="flex gap-3 mt-auto flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-card border border-border text-foreground font-semibold py-2 px-4 rounded-full text-sm shadow-sm">
                  <DollarSign className="w-4 h-4 text-success" /> Finances
                </span>
                <span className="inline-flex items-center gap-1.5 bg-card border border-border text-foreground font-semibold py-2 px-4 rounded-full text-sm shadow-sm">
                  <Users className="w-4 h-4 text-accent" /> RH & Profs
                </span>
              </div>
            </motion.div>

            {/* Prof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl p-8 lg:col-span-4 bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
                <BookOpen className="text-accent w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Portail Enseignant</h4>
              <p className="text-muted-foreground text-sm">
                Gestion des salles de classe, saisie des cotes, appels numériques et envoi de supports PDF directement aux élèves.
              </p>
            </motion.div>

            {/* Parent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl p-8 lg:col-span-5 bg-gradient-to-br from-card to-secondary/50 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mb-6 border border-success/20">
                <Wallet className="text-success w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Parental (Fintech)</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Paiement du minerval, suivi des cotes, alertes absences et achats d'uniformes via la boutique intégrée. Liez plusieurs enfants sur un seul compte.
              </p>
            </motion.div>

            {/* Élève */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl p-8 lg:col-span-7 flex flex-col justify-center items-center text-center bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mb-4 border border-warning/20">
                <User className="text-warning w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Espace Élève & E-Learning</h4>
              <p className="text-muted-foreground max-w-sm">
                Accès aux horaires, devoirs, aux cours et modules de préparation aux examens d'État (Premium).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
              { value: "- 70%", label: "Temps gagné en administration" },
              { value: "0%", label: "Taux de déperdition financière" },
              { value: "24/7", label: "Disponibilité des données" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-primary-foreground/70 font-medium">{stat.label}</dt>
                <dd className="order-first text-4xl font-extrabold tracking-tight sm:text-6xl text-primary-foreground">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECURITY / CIRCUIT FERMÉ */}
      <section className="py-24 bg-secondary/30 border-y border-border" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Le concept du <span className="text-primary">Circuit Fermé.</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Sur EduFirst, aucun compte "fantôme" n'existe. Un parent ne peut s'inscrire que si l'école lui a
                fourni un <b className="text-foreground">Code Élève Unique</b>. Cela garantit une base de données 100% propre et hermétique.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center font-bold text-primary shadow-md shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-foreground">Importation par l'école</h4>
                    <p className="text-sm text-muted-foreground mt-1">L'administration charge la liste des inscrits et génère les codes sécurisés.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center font-bold text-muted-foreground shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-foreground">Liaison Parentale</h4>
                    <p className="text-sm text-muted-foreground mt-1">Le parent utilise ce code pour relier son compte à l'enfant et activer le suivi financier.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl shadow-xl border border-border relative"
            >
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Zap className="w-3 h-3" /> Paiement Flexible
              </div>
              <div className="flex justify-between items-end border-b border-border pb-4 mb-6">
                <div>
                  <h4 className="text-xl font-bold text-foreground">Facture Scolaire</h4>
                  <p className="text-sm text-muted-foreground">Élève: Mutombo K. (#294A)</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Minerval Total</p>
                  <p className="text-xl font-extrabold text-foreground">1200$</p>
                </div>
              </div>
              <div className="mb-6 bg-secondary p-4 rounded-2xl border border-border">
                <div className="flex justify-between text-sm mb-2 font-semibold">
                  <span className="text-muted-foreground">Payé (Moitié par moitié)</span>
                  <span className="text-primary">600$ / 1200$</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-card rounded-xl p-4 flex justify-between items-center border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Tranche 1</p>
                      <p className="text-xs text-muted-foreground">M-Pesa - 10 Sept</p>
                    </div>
                  </div>
                  <span className="text-foreground font-bold">300$</span>
                </div>
                <div className="bg-card rounded-xl p-4 flex justify-between items-center border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Tranche 2</p>
                      <p className="text-xs text-muted-foreground">Espèces - 15 Oct</p>
                    </div>
                  </div>
                  <span className="text-foreground font-bold">300$</span>
                </div>
                <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card text-primary flex items-center justify-center shadow-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">Reste à payer</p>
                      <p className="text-xs text-primary/70">Avant le 15 Jan</p>
                    </div>
                  </div>
                  <span className="text-primary font-extrabold text-lg">600$</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="min-h-screen py-24 bg-card" id="pricing">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Rejoindre le réseau</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Nos Forfaits <span className="text-accent">Écoles</span>
            </h1>
            <p className="pt-6 text-xl text-muted-foreground font-normal max-w-2xl mx-auto">
              Choisissez le plan adapté à la taille de votre établissement. Déploiement garanti en moins de 48h.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-4">
            {/* Basic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-96 p-8 bg-card text-center rounded-3xl border border-border shadow-xl transition-transform hover:-translate-y-2"
            >
              <h2 className="text-foreground font-bold text-2xl">Basique</h2>
              <p className="pt-2 tracking-wide text-muted-foreground mb-6">Jusqu'à 200 élèves</p>
              <p>
                <span className="text-muted-foreground align-top text-lg font-medium">$</span>
                <span className="text-5xl font-extrabold text-foreground">10</span>
                <span className="text-muted-foreground font-medium">/élève/trimestre</span>
              </p>
              <hr className="mt-8 mb-8 border-border" />
              <div className="space-y-5">
                {["Portail Admin & Profs", "Portail Parents (Paiements)", "Support par email"].map((f) => (
                  <p key={f} className="flex items-center text-foreground font-medium text-left">
                    <Check className="text-success w-5 h-5 mr-3 shrink-0" /> {f}
                  </p>
                ))}
                <button
                  onClick={() => navigate("/onboarding")}
                  className="w-full py-4 bg-secondary hover:bg-secondary/80 mt-8 rounded-xl text-foreground font-bold transition-colors"
                >
                  Sélectionner
                </button>
              </div>
            </motion.div>

            {/* Standard - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full lg:w-96 p-8 bg-gradient-to-b from-primary to-accent text-center rounded-3xl border border-primary/40 shadow-2xl shadow-primary/20 transform lg:scale-110 relative z-10"
            >
              <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                <span className="bg-card text-primary font-extrabold px-4 py-1 rounded-full uppercase text-xs shadow-md tracking-wider">
                  Le plus populaire
                </span>
              </div>
              <h2 className="text-primary-foreground font-bold text-2xl">Standard</h2>
              <p className="pt-2 tracking-wide text-primary-foreground/70 mb-6">Jusqu'à 500 élèves</p>
              <p>
                <span className="text-primary-foreground/60 align-top text-lg font-medium">$</span>
                <span className="text-5xl font-extrabold text-primary-foreground">10</span>
                <span className="text-primary-foreground/60 font-medium">/élève/trimestre</span>
              </p>
              <hr className="mt-8 mb-8 border-primary-foreground/20" />
              <div className="space-y-5">
                {["Tout le plan Basique", "Boutique & Uniformes", "Portail Élève (Cours PDF)", "Support prioritaire 24/7"].map((f) => (
                  <p key={f} className="flex items-center text-primary-foreground font-medium text-left">
                    <Check className="text-primary-foreground w-5 h-5 mr-3 shrink-0" /> {f}
                  </p>
                ))}
                <button
                  onClick={() => navigate("/onboarding")}
                  className="w-full py-4 bg-card hover:bg-card/90 mt-8 rounded-xl text-primary font-extrabold transition-colors shadow-lg"
                >
                  Commencer l'intégration
                </button>
              </div>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-96 p-8 bg-card text-center rounded-3xl border border-border shadow-xl transition-transform hover:-translate-y-2"
            >
              <h2 className="text-foreground font-bold text-2xl">Premium</h2>
              <p className="pt-2 tracking-wide text-muted-foreground mb-6">Élèves Illimités</p>
              <p>
                <span className="text-3xl font-extrabold text-foreground">Sur Devis</span>
              </p>
              <hr className="mt-11 mb-8 border-border" />
              <div className="space-y-5">
                {["Tout le plan Standard", "Modules de certifications", "API & Vente de Tablettes"].map((f) => (
                  <p key={f} className="flex items-center text-foreground font-medium text-left">
                    <Check className="text-success w-5 h-5 mr-3 shrink-0" /> {f}
                  </p>
                ))}
                <button className="w-full py-4 bg-secondary hover:bg-secondary/80 mt-14 rounded-xl text-foreground font-bold transition-colors">
                  Contacter l'équipe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-extrabold text-background text-lg">EduFirst</span>
              </div>
              <p className="text-background/60 text-sm">
                L'écosystème SaaS de gestion scolaire décentralisée pour l'Afrique et au-delà.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-background mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><a href="#about" className="hover:text-background transition-colors">Architecture</a></li>
                <li><a href="#features" className="hover:text-background transition-colors">Fonctionnalités</a></li>
                <li><a href="#pricing" className="hover:text-background transition-colors">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-background mb-4">Portails</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li>Administration</li>
                <li>Enseignants</li>
                <li>Parents</li>
                <li>Élèves</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-background mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> edufirst.app</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Données sécurisées</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
            © 2026 EduFirst. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
