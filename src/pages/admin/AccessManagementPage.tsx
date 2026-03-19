import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Shield, BookOpen, Heart, GraduationCap, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/DashboardLayout";

interface Account {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent";
  status: "active" | "pending" | "suspended";
  createdAt: string;
  initials: string;
}

const roleMeta: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  admin: { label: "Admin", icon: Shield, color: "bg-primary/10 text-primary" },
  teacher: { label: "Professeur", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  student: { label: "Élève", icon: GraduationCap, color: "bg-emerald-50 text-emerald-600" },
  parent: { label: "Parent", icon: Heart, color: "bg-amber-50 text-amber-600" },
};

const statusStyles: Record<string, string> = {
  active: "status-success",
  pending: "status-pending",
  suspended: "status-error",
};

const statusLabels: Record<string, string> = { active: "Actif", pending: "En attente", suspended: "Suspendu" };

const accounts: Account[] = [
  { id: "1", name: "Amadou Diallo", email: "amadou@edufirst.com", role: "admin", status: "active", createdAt: "Sept 2024", initials: "AD" },
  { id: "2", name: "Fatou Sow", email: "fatou.sow@edufirst.com", role: "teacher", status: "active", createdAt: "Oct 2024", initials: "FS" },
  { id: "3", name: "Ousmane Fall", email: "ousmane.f@edufirst.com", role: "teacher", status: "active", createdAt: "Oct 2024", initials: "OF" },
  { id: "4", name: "Moussa Ndiaye", email: "moussa.n@edufirst.com", role: "student", status: "active", createdAt: "Jan 2025", initials: "MN" },
  { id: "5", name: "Awa Diop", email: "awa.d@edufirst.com", role: "student", status: "pending", createdAt: "Mar 2025", initials: "AD" },
  { id: "6", name: "Aïssatou Ba", email: "aissatou@email.com", role: "parent", status: "active", createdAt: "Nov 2024", initials: "AB" },
  { id: "7", name: "Ibrahima Sy", email: "ibrahima.s@email.com", role: "parent", status: "suspended", createdAt: "Dec 2024", initials: "IS" },
  { id: "8", name: "Khady Mbaye", email: "khady.m@edufirst.com", role: "student", status: "active", createdAt: "Jan 2025", initials: "KM" },
];

const AccessManagementPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading] = useState(false);

  const filtered = accounts.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  const stats = {
    total: accounts.length,
    admin: accounts.filter((a) => a.role === "admin").length,
    teacher: accounts.filter((a) => a.role === "teacher").length,
    student: accounts.filter((a) => a.role === "student").length,
    parent: accounts.filter((a) => a.role === "parent").length,
  };

  return (
    <DashboardLayout role="admin">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des Accès</h1>
          <p className="text-sm text-muted-foreground">{stats.total} comptes enregistrés</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["admin", "teacher", "student", "parent"] as const).map((r) => {
            const meta = roleMeta[r];
            return (
              <div key={r} className="edu-card p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${meta.color}`}>
                  <meta.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stats[r]}</p>
                  <p className="text-xs text-muted-foreground">{meta.label}s</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Rechercher un compte..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Tous les rôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="teacher">Professeur</SelectItem>
              <SelectItem value="student">Élève</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="edu-card overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead className="hidden sm:table-cell">Rôle</TableHead>
                  <TableHead className="hidden md:table-cell">Créé</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => {
                  const meta = roleMeta[a.role];
                  return (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{a.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{a.name}</p>
                            <p className="text-xs text-muted-foreground">{a.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>
                          <meta.icon className="w-3 h-3" />{meta.label}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{a.createdAt}</TableCell>
                      <TableCell><span className={statusStyles[a.status]}>{statusLabels[a.status]}</span></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                            <DropdownMenuItem>Modifier le rôle</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Suspendre</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AccessManagementPage;
