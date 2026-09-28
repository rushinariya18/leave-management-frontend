import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./DropdownMenu.css";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={containerRef}>
      <button type="button" className="dropdown__trigger" onClick={() => setOpen((prev) => !prev)}>
        {trigger}
      </button>
      {open && (
        <div className="dropdown__menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
};
