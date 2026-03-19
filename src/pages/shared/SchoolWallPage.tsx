import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Heart, MessageCircle, Share2, Image, Send, MoreHorizontal, Award, PartyPopper, Megaphone } from "lucide-react";

type Role = "admin" | "teacher" | "student" | "parent";

const posts = [
  { id: 1, author: "Administration", avatar: "AD", time: "Il y a 2h", type: "announcement", icon: Megaphone, content: "📣 Rappel : les inscriptions pour le trimestre 3 sont ouvertes jusqu'au 28 mars. Rendez-vous à la page Finances pour effectuer le paiement.", likes: 24, comments: 5, image: null },
  { id: 2, author: "M. Konaté", avatar: "MK", time: "Il y a 5h", type: "achievement", icon: Award, content: "🏆 Félicitations à Amadou Diallo (TS-A) qui a remporté le 1er prix au Concours National de Mathématiques ! Toute l'école est fière de toi !", likes: 87, comments: 23, image: null },
  { id: 3, author: "Administration", avatar: "AD", time: "Hier", type: "event", icon: PartyPopper, content: "🎉 Retour en images sur la Journée Portes Ouvertes ! Plus de 200 familles ont visité notre campus. Merci à tous les enseignants et élèves bénévoles pour leur engagement.", likes: 56, comments: 12, image: "🖼️ 8 photos" },
  { id: 4, author: "Mme. Touré", avatar: "MT", time: "Il y a 2 jours", type: "achievement", icon: Award, content: "📚 Le club de lecture a terminé sa 10e œuvre de l'année : « Les Soleils des Indépendances » d'Ahmadou Kourouma. Bravo aux 15 membres du club !", likes: 34, comments: 8, image: null },
  { id: 5, author: "Administration", avatar: "AD", time: "Il y a 3 jours", type: "announcement", icon: Megaphone, content: "🏫 Travaux d'amélioration : la nouvelle salle informatique sera opérationnelle dès lundi prochain avec 30 postes équipés.", likes: 45, comments: 15, image: null },
];

const SchoolWallPage = ({ role }: { role: Role }) => {
  const [newPost, setNewPost] = useState("");

  return (
    <DashboardLayout role={role}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Mur de l'école</h1>
          <p className="text-muted-foreground text-sm mt-1">Actualités, réussites et annonces</p>
        </div>

        {role === "admin" && (
          <div className="edu-card p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">AD</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Partagez une actualité avec l'école..."
                  className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors">
                    <Image className="w-4 h-4" /> Photo
                  </button>
                  <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Publier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="edu-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{post.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{post.author}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${post.type === "announcement" ? "bg-primary/10 text-primary" : post.type === "achievement" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"}`}>
                        <post.icon className="w-2.5 h-2.5 inline mr-0.5" />
                        {post.type === "announcement" ? "Annonce" : post.type === "achievement" ? "Réussite" : "Événement"}
                      </span>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-secondary"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <div className="mt-3 p-8 rounded-xl bg-secondary/60 flex items-center justify-center text-sm text-muted-foreground">
                      <Image className="w-5 h-5 mr-2" /> {post.image}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto">
                      <Share2 className="w-4 h-4" /> Partager
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchoolWallPage;
