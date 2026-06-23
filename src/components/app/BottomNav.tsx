import { Link } from "@tanstack/react-router";

const items = [
  { to: "/today", label: "Hoy" },
  { to: "/create", label: "Crear" },
  { to: "/album", label: "Álbum" },
  { to: "/settings", label: "Ajustes" },
] as const;

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-background/90 backdrop-blur-md"
      aria-label="Navegación principal"
    >
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.to} className="flex">
            <Link
              to={it.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs"
            >
              <span className="font-display text-[15px] leading-none">{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
