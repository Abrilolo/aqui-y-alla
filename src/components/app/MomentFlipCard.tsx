import { useState } from "react";
import { type Moment, moodColor, moodLabel, stickerById } from "@/lib/mock-data";

export function MomentFlipCard({ moment }: { moment: Moment }) {
  const [flipped, setFlipped] = useState(false);
  const sticker = stickerById(moment.stickerId);

  return (
    <div className="flip-perspective">
      <div
        className={`relative flip-inner ${flipped ? "flipped" : ""}`}
        style={{ minHeight: 560 }}
      >
        {/* Front */}
        <div className="flip-face soft-card overflow-hidden">
          <div className="relative">
            <img
              src={moment.photo}
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
            {moment.mode === "aqui-estoy" && moment.selfie && (
              <img
                src={moment.selfie}
                alt=""
                className="absolute left-3 top-3 h-24 w-20 rotate-[-3deg] rounded-md border-2 border-white object-cover shadow-card"
              />
            )}
            {sticker && (
              <span
                className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-xl shadow-soft"
                style={{ background: sticker.color }}
              >
                {sticker.glyph}
              </span>
            )}
          </div>
          <div className="space-y-3 px-5 py-5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{moment.localTime}</span>
              <span>{moment.authorCity}</span>
            </div>
            <p className="font-display text-xl leading-snug">{moment.message}</p>
            <button
              onClick={() => setFlipped(true)}
              className="mt-2 inline-flex items-center rounded-full border border-border bg-cream px-4 py-2 text-xs tracking-wide text-foreground transition hover:bg-lilac/40"
            >
              Voltear recuerdo
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="flip-face flip-back absolute inset-0 soft-card overflow-hidden bg-cream">
          <div className="flex h-full flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-[11px] text-foreground"
                style={{ background: moodColor(moment.mood) }}
              >
                {moodLabel(moment.mood)}
              </span>
              <button
                onClick={() => setFlipped(false)}
                className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Cerrar
              </button>
            </div>

            <p className="font-display text-lg leading-snug">{moment.message}</p>

            <dl className="space-y-3 text-sm">
              {moment.hidden?.note && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Guiño
                  </dt>
                  <dd className="italic text-foreground">{moment.hidden.note}</dd>
                </div>
              )}
              {moment.hidden?.movie && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Película
                  </dt>
                  <dd>{moment.hidden.movie}</dd>
                </div>
              )}
              {moment.hidden?.song && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Canción
                  </dt>
                  <dd>
                    {moment.hidden.song.title}{" "}
                    <span className="text-muted-foreground">· {moment.hidden.song.artist}</span>
                  </dd>
                </div>
              )}
              {moment.hidden?.place && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Lugar
                  </dt>
                  <dd>{moment.hidden.place}</dd>
                </div>
              )}
              {moment.hidden?.insideJoke && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Entre nosotros
                  </dt>
                  <dd className="italic">{moment.hidden.insideJoke}</dd>
                </div>
              )}
            </dl>

            {moment.reactions && moment.reactions.length > 0 && (
              <div className="mt-auto rounded-2xl bg-white p-3">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Conversación
                </p>
                <ul className="space-y-2">
                  {moment.reactions.map((r, i) => {
                    const st = stickerById(r.stickerId);
                    return (
                      <li
                        key={i}
                        className={`flex ${r.from === "yo" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                            r.from === "yo" ? "bg-lilac/60" : "bg-cream"
                          }`}
                        >
                          {r.text}
                          {st && <span className="ml-1 text-base">{st.glyph}</span>}
                          <div className="mt-0.5 text-[10px] text-muted-foreground">{r.at}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
