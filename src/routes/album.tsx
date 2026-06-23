import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { MOMENTS, groupByDate, prettyDate, stickerById, moodColor } from "@/lib/mock-data";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Álbum · Aquí y Allá" },
      { name: "description", content: "El álbum privado de los dos." },
    ],
  }),
  component: AlbumPage,
});

// Deterministic pseudo-random for stable rotations per id
function seeded(id: string, salt = 0) {
  let h = salt;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}
const rot = (id: string) => {
  const r = (seeded(id) % 700) / 100 - 3.5; // -3.5..3.5deg
  return `rotate(${r.toFixed(2)}deg)`;
};
const tapeColors = ["#E7DDF8", "#DDEAF6", "#DDE8DF", "#FBEFD3", "#F3E0E8"];
const tapeColor = (id: string, salt = 0) => tapeColors[seeded(id, salt) % tapeColors.length];

function AlbumPage() {
  const groups = groupByDate(MOMENTS);

  return (
    <div className="paper-bg min-h-screen">
      <AppShell>
        <PageHeader
          eyebrow="Recuerdos"
          title="Álbum"
          subtitle="Un cuaderno de los días que se han ido quedando."
        />

        <div className="space-y-14">
          {groups.map(([date, list], gi) => (
            <section key={date} className="relative">
              {/* Date header as taped sticky note */}
              <div className="relative mb-8 flex items-end justify-between">
                <div
                  className="sticky-note relative inline-block"
                  style={{ transform: `rotate(${gi % 2 === 0 ? -2 : 1.5}deg)` }}
                >
                  <span
                    className="tape-strip"
                    style={{
                      top: -10,
                      left: 18,
                      background: tapeColor(date),
                      transform: "rotate(-6deg)",
                    }}
                  />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Día
                  </p>
                  <h2 className="font-display text-2xl leading-tight">{prettyDate(date)}</h2>
                </div>
                <Link
                  to="/album/$date"
                  params={{ date }}
                  className="font-display text-sm italic text-primary underline decoration-dotted underline-offset-4"
                >
                  abrir el día →
                </Link>
              </div>

              {/* Scrapbook collage */}
              <div className="relative grid grid-cols-6 gap-4">
                {list.map((m, i) => {
                  const sticker = stickerById(m.stickerId);
                  const big = i % 3 === 0;
                  const span = big ? "col-span-4" : "col-span-3";
                  const variant = i % 4;
                  return (
                    <Link
                      key={m.id}
                      to="/moments/$id"
                      params={{ id: m.id }}
                      className={`${span} group relative block transition-transform hover:-translate-y-1 hover:rotate-0`}
                      style={{ transform: rot(m.id) }}
                    >
                      {/* Tape on top */}
                      <span
                        className="tape-strip z-10"
                        style={{
                          top: -10,
                          left: "50%",
                          marginLeft: -35,
                          background: tapeColor(m.id),
                          transform: `rotate(${(seeded(m.id, 3) % 14) - 7}deg)`,
                        }}
                      />

                      {variant === 0 ? (
                        // Polaroid
                        <div className="polaroid">
                          <img
                            src={m.photo}
                            alt=""
                            className="aspect-[4/5] w-full object-cover"
                            loading="lazy"
                          />
                          <p className="mt-2 font-display text-[13px] leading-snug text-foreground">
                            {m.message}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {m.localTime} · {m.authorCity}
                          </p>
                        </div>
                      ) : variant === 1 ? (
                        // Photo with mood frame
                        <div
                          className="rounded-[6px] p-2 shadow-card"
                          style={{ background: moodColor(m.mood) }}
                        >
                          <img
                            src={m.photo}
                            alt=""
                            className="aspect-square w-full rounded-[3px] object-cover"
                            loading="lazy"
                          />
                          <div className="px-1 pb-1 pt-2">
                            <p className="font-display text-[13px] leading-tight">{m.message}</p>
                            <p className="text-[10px] text-muted-foreground">{m.localTime}</p>
                          </div>
                        </div>
                      ) : variant === 2 ? (
                        // Ticket / cinema strip
                        <div className="overflow-hidden rounded-[10px] bg-white shadow-card">
                          <div className="relative">
                            <img
                              src={m.photo}
                              alt=""
                              className="aspect-[5/4] w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 top-0 h-3 bg-[radial-gradient(circle_at_6px_50%,_transparent_3px,_#fff_3.5px)] [background-size:12px_12px]" />
                            <div className="absolute inset-x-0 bottom-0 h-3 bg-[radial-gradient(circle_at_6px_50%,_transparent_3px,_#fff_3.5px)] [background-size:12px_12px]" />
                          </div>
                          <div className="flex items-center justify-between px-3 py-2">
                            <p className="truncate font-display text-[13px]">{m.message}</p>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                              {m.authorCity.slice(0, 3)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        // Sticky note dominant
                        <div className="sticky-note">
                          <img
                            src={m.photo}
                            alt=""
                            className="mb-2 aspect-[5/3] w-full rounded-[2px] object-cover"
                            loading="lazy"
                          />
                          <p className="font-display text-[14px] leading-snug">{m.message}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {m.localTime} · {m.authorCity}
                          </p>
                        </div>
                      )}

                      {sticker && (
                        <span
                          className="absolute -right-2 -bottom-2 z-20 grid h-10 w-10 place-items-center rounded-full text-lg shadow-soft"
                          style={{
                            background: sticker.color,
                            transform: `rotate(${(seeded(m.id, 7) % 30) - 15}deg)`,
                          }}
                          aria-hidden
                        >
                          {sticker.glyph}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Doodle accents */}
                <span
                  className="pointer-events-none absolute -left-3 top-6 font-display text-2xl text-violet/40"
                  aria-hidden
                >
                  ✦
                </span>
                <span
                  className="pointer-events-none absolute right-2 bottom-2 font-display text-xl text-primary/30"
                  aria-hidden
                >
                  ♡
                </span>
              </div>
            </section>
          ))}
        </div>
      </AppShell>
    </div>
  );
}
