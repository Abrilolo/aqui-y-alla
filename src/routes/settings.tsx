import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { ME, PARTNER, STICKERS } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Ajustes · Aquí y Allá" }] }),
  component: SettingsPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Tu cuenta" title="Ajustes" />

      <section className="soft-card mb-5 p-5">
        <h2 className="mb-2 font-display text-lg">Perfil</h2>
        <Row label="Nombre" value={ME.name} />
        <Row label="Ciudad" value={ME.city} />
        <Row label="Zona horaria" value={ME.tz} />
      </section>

      <section className="soft-card mb-5 p-5">
        <h2 className="mb-2 font-display text-lg">Pareja</h2>
        <Row label="Nombre" value={PARTNER.name} />
        <Row label="Ciudad" value={PARTNER.city} />
        <Row label="Zona horaria" value={PARTNER.tz} />
      </section>

      <section className="soft-card mb-5 p-5">
        <h2 className="mb-3 font-display text-lg">Stickers</h2>
        <div className="flex flex-wrap gap-2">
          {STICKERS.map((s) => (
            <span
              key={s.id}
              className="grid h-10 w-10 place-items-center rounded-2xl text-lg"
              style={{ background: s.color }}
              title={s.label}
            >
              {s.glyph}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Pronto podrás subir stickers personalizados.
        </p>
      </section>

      <section className="soft-card p-5">
        <h2 className="mb-2 font-display text-lg">Preferencias</h2>
        <Row label="Idioma" value="Español" />
        <Row label="Notificaciones" value="Suaves" />
      </section>
    </AppShell>
  );
}
