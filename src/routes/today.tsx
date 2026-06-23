import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { MomentCard } from "@/components/app/MomentCard";
import { MOMENTS, ME, PARTNER } from "@/lib/mock-data";

export const Route = createFileRoute("/today")({
  head: () => ({
    meta: [
      { title: "Hoy · Aquí y Allá" },
      { name: "description", content: "Momentos del día compartidos entre dos." },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const today = MOMENTS.filter((m) => m.date === "2026-06-23");
  const fecha = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <AppShell>
      <PageHeader
        eyebrow={`${ME.city} · ${PARTNER.city}`}
        title="Hola, Adrián."
        subtitle={fecha.charAt(0).toUpperCase() + fecha.slice(1)}
      />

      <Link
        to="/create"
        className="mb-6 flex items-center justify-between rounded-2xl border border-dashed border-border bg-cream px-4 py-4 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
      >
        <span>Guardar un momento</span>
        <span className="font-display text-xl text-primary">+</span>
      </Link>

      <div className="space-y-5">
        {today.map((m) => (
          <MomentCard key={m.id} moment={m} />
        ))}
      </div>
    </AppShell>
  );
}
