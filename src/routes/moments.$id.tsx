import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { MomentFlipCard } from "@/components/app/MomentFlipCard";
import { MOMENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/moments/$id")({
  component: MomentDetailPage,
  notFoundComponent: () => (
    <AppShell>
      <p className="text-sm text-muted-foreground">No encontramos este momento.</p>
    </AppShell>
  ),
});

function MomentDetailPage() {
  const { id } = Route.useParams();
  const moment = MOMENTS.find((m) => m.id === id);

  return (
    <AppShell>
      <Link to="/today" className="mb-4 inline-block text-xs text-muted-foreground hover:text-primary">
        ← Volver
      </Link>
      {moment ? (
        <>
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {moment.authorName} · {moment.authorCity}
            </p>
            <p className="font-display text-lg">{moment.localTime}</p>
          </div>
          <MomentFlipCard moment={moment} />
        </>
      ) : (
        <p className="text-sm text-muted-foreground">No encontramos este momento.</p>
      )}
    </AppShell>
  );
}
