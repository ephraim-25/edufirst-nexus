import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BookOpen, CreditCard, MessageSquare, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/DashboardLayout";

type Role = "admin" | "teacher" | "student" | "parent";

interface Notification {
  id: string;
  type: "grade" | "message" | "payment" | "info";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const iconMap = {
  grade: BookOpen,
  message: MessageSquare,
  payment: CreditCard,
  info: Bell,
};

const colorMap = {
  grade: "bg-primary/10 text-primary",
  message: "bg-blue-50 text-blue-600",
  payment: "bg-amber-50 text-amber-600",
  info: "bg-secondary text-muted-foreground",
};

const initialNotifications: Notification[] = [
  { id: "1", type: "grade", title: "Nouvelle note disponible", description: "Mathématiques — Contrôle du 15 Mars : 16/20", time: "Il y a 2 heures", read: false },
  { id: "2", type: "payment", title: "Rappel de paiement", description: "L'échéance du trimestre 2 est dans 5 jours.", time: "Il y a 5 heures", read: false },
  { id: "3", type: "message", title: "Message de M. Sow", description: "Réunion parent-professeur le Vendredi 21 Mars à 15h.", time: "Hier", read: false },
  { id: "4", type: "info", title: "Mise à jour système", description: "EduFirst v2.1 est disponible avec de nouvelles fonctionnalités.", time: "Il y a 2 jours", read: true },
  { id: "5", type: "grade", title: "Bulletin trimestriel", description: "Le bulletin du 1er trimestre est prêt à être consulté.", time: "Il y a 3 jours", read: true },
  { id: "6", type: "payment", title: "Paiement confirmé", description: "Votre paiement de 75 000 FCFA a été reçu.", time: "Il y a 1 semaine", read: true },
];

const NotificationsPage = ({ role }: { role: Role }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [loading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DashboardLayout role={role}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">{unreadCount} non lue{unreadCount !== 1 && "s"}</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCircle2 className="w-4 h-4" /> Tout marquer comme lu
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="edu-card p-4 flex items-start gap-4">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence>
              {notifications.map((n) => {
                const Icon = iconMap[n.type];
                return (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className={`edu-card p-4 flex items-start gap-4 cursor-pointer transition-all ${!n.read ? "ring-1 ring-primary/20" : "opacity-75"}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {!n.read && <Circle className="w-2 h-2 fill-primary text-primary shrink-0" />}
                        <h4 className="text-sm font-semibold text-foreground truncate">{n.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Aucune notification</p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
