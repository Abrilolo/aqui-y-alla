import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { MomentCard } from "@/components/app/MomentCard";
import { MOMENTS, prettyDate } from "@/lib/mock-data";

export const Route = createFileRoute("/album/$date")({
  component: AlbumDayPage,
});

function AlbumDayPage() {
  const { date } = Route.useParams();
  const list = MOMENTS.filter((m) => m.date === date);

  return (
    <AppShell>
      <Link to="/album" className="mb-4 inline-block text-xs text-muted-foreground hover:text-primary">
        ← Álbum
      </Link>
      <PageHeader eyebrow="Día" title={prettyDate(date)} />
      <div className="space-y-5">
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin momentos guardados este día.</p>
        ) : (
          list.map((m) => <MomentCard key={m.id} moment={m} />)
        )}
      </div>
    </AppShell>
  );
}
