import { useState } from "react";
import { Building2, ChevronDown, Check } from "lucide-react";

const campuses = [
  { id: "nord", name: "Campus Nord", students: 487, city: "Abidjan" },
  { id: "sud", name: "Campus Sud", students: 312, city: "Abidjan" },
  { id: "primaire", name: "Annexe Primaire", students: 448, city: "Bouaké" },
];

const CampusSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(campuses[0]);

  return (
    <div className="relative px-3 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all text-left"
      >
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{selected.name}</p>
          <p className="text-[10px] text-muted-foreground">{selected.students} élèves · {selected.city}</p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-3 right-3 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-40 overflow-hidden">
            {campuses.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelected(c); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-secondary transition-colors ${selected.id === c.id ? "bg-primary/5" : ""}`}
              >
                <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.students} élèves</p>
                </div>
                {selected.id === c.id && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CampusSwitcher;
