import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Check, CheckCheck } from "lucide-react";

type Role = "admin" | "teacher" | "student" | "parent";

const channels = [
  { id: 1, name: "Coordination Pédagogique", type: "Admin ↔ Profs", avatar: "CP", unread: 3, online: true, lastMsg: "Réunion demain à 10h", time: "09:45" },
  { id: 2, name: "M. Konaté", type: "Prof · Maths", avatar: "MK", unread: 0, online: true, lastMsg: "Notes du trimestre envoyées", time: "08:30" },
  { id: 3, name: "Famille Diallo", type: "Parent", avatar: "FD", unread: 1, online: false, lastMsg: "Merci pour le bulletin", time: "Hier" },
  { id: 4, name: "Communications Officielles", type: "Admin ↔ Parents", avatar: "CO", unread: 5, online: true, lastMsg: "Rappel : frais T2 avant le 15", time: "Hier" },
  { id: 5, name: "Mme. Touré", type: "Prof · Français", avatar: "MT", unread: 0, online: false, lastMsg: "Programme semaine prochaine ?", time: "Lun" },
  { id: 6, name: "Famille Ouattara", type: "Parent", avatar: "FO", unread: 0, online: false, lastMsg: "D'accord, merci", time: "Dim" },
];

const messages = [
  { id: 1, sender: "M. Konaté", text: "Bonjour, j'ai terminé la saisie des notes du trimestre 2 pour les Terminales S.", time: "08:15", self: false, read: true },
  { id: 2, sender: "Vous", text: "Parfait ! Est-ce que les moyennes de classe sont conformes aux attentes ?", time: "08:20", self: true, read: true },
  { id: 3, sender: "M. Konaté", text: "Oui, la moyenne générale est de 13.2/20, en hausse par rapport au T1 (12.8). Les résultats en calcul intégral sont très bons.", time: "08:25", self: false, read: true },
  { id: 4, sender: "Vous", text: "Excellent progrès. Pouvez-vous partager le rapport détaillé par élève ?", time: "08:28", self: true, read: true },
  { id: 5, sender: "M. Konaté", text: "Bien sûr, je vous l'envoie dans l'après-midi. J'ajoute aussi les observations individuelles.", time: "08:30", self: false, read: false },
];

const ChatPage = ({ role }: { role: Role }) => {
  const [activeChat, setActiveChat] = useState(channels[0]);
  const [newMsg, setNewMsg] = useState("");
  const [search, setSearch] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);

  const filtered = channels.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role={role}>
      <div className="h-[calc(100vh-7.5rem)] flex rounded-2xl overflow-hidden border border-border bg-card">
        {/* Sidebar conversations */}
        <div className={`${showMobileList ? "flex" : "hidden"} md:flex w-full md:w-80 lg:w-96 flex-col border-r border-border`}>
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {filtered.map((ch) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChat(ch); setShowMobileList(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/60 transition-colors ${activeChat.id === ch.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{ch.avatar}</span>
                  </div>
                  {ch.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{ch.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{ch.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground truncate">{ch.lastMsg}</span>
                    {ch.unread > 0 && (
                      <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">{ch.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className={`${showMobileList ? "hidden" : "flex"} md:flex flex-1 flex-col`}>
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <button onClick={() => setShowMobileList(true)} className="md:hidden p-1 rounded-lg hover:bg-secondary">
              <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{activeChat.avatar}</span>
              </div>
              {activeChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{activeChat.name}</p>
              <p className="text-xs text-muted-foreground">{activeChat.online ? "En ligne" : "Hors ligne"} · {activeChat.type}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:block"><Phone className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:block"><Video className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4 bg-secondary/20">
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground bg-secondary px-3 py-1 rounded-full">Aujourd'hui</span>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.self ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${msg.self ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border border-border text-foreground rounded-bl-md"}`}>
                  {!msg.self && <p className="text-xs font-semibold text-primary mb-1">{msg.sender}</p>}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${msg.self ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.self && (msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Smile className="w-5 h-5 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Paperclip className="w-5 h-5 text-muted-foreground" /></button>
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Écrire un message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                onKeyDown={(e) => e.key === "Enter" && newMsg.trim() && setNewMsg("")}
              />
              <button className="p-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-colors" onClick={() => newMsg.trim() && setNewMsg("")}>
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
