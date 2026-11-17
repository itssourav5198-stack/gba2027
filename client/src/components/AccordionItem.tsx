import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`accordion-item ${open ? "is-open" : ""}`}>
      <button type="button" className="accordion-trigger" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span>{title}</span><ChevronDown size={18} aria-hidden="true" />
      </button>
      <div className="accordion-panel" hidden={!open}><div>{children}</div></div>
    </div>
  );
}
