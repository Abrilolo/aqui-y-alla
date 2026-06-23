import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { MOMENTS, groupByDate, prettyDate } from "@/lib/mock-data";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Álbum · Aquí y Allá" },
      { name: "description", content: "El álbum privado de los dos." },
    ],
  }),
  component: AlbumPage,
});

function AlbumPage() {
  const groups = groupByDate(MOMENTS);

  return (
    <AppShell>
      <PageHeader eyebrow="Recuerdos" title="Álbum" subtitle="Los días que se han ido quedando." />

      <div className="space-y-8">
        {groups.map(([date, list]) => (
          <section key={date}>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-display text-lg">{prettyDate(date)}</h2>
              <Link
                to="/album/$date"
                params={{ date }}
                className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
              >
                Ver día
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {list.map((m) => (
                <Link
                  key={m.id}
                  to="/moments/$id"
                  params={{ id: m.id }}
                  className="soft-card overflow-hidden"
                >
                  <img src={m.photo} alt="" className="aspect-square w-full object-cover" />
                  <div className="px-3 py-2">
                    <p className="truncate font-display text-sm">{m.message}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {m.localTime} · {m.authorCity}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
