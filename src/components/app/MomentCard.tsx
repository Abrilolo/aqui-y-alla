import { Link } from "@tanstack/react-router";
import { type Moment, stickerById } from "@/lib/mock-data";
import { SongHint } from "./SongHint";

/**
 * Feed card — intentionally minimal.
 * Never reveal hidden references (movie / song title / mood metadata).
 */
export function MomentCard({ moment }: { moment: Moment }) {
  const sticker = stickerById(moment.stickerId);
  const hasHidden = Boolean(moment.hidden?.song || moment.hiddenHint);

  return (
    <Link
      to="/moments/$id"
      params={{ id: moment.id }}
      className="soft-card block overflow-hidden"
    >
      <div className="relative">
        <img
          src={moment.photo}
          alt=""
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
        {moment.mode === "aqui-estoy" && moment.selfie && (
          <img
            src={moment.selfie}
            alt=""
            className="absolute left-3 top-3 h-20 w-16 rotate-[-3deg] rounded-md border-2 border-white object-cover shadow-card"
          />
        )}
        {sticker && (
          <span
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-lg shadow-soft"
            style={{ background: sticker.color }}
            aria-label={`Sticker ${sticker.label}`}
          >
            {sticker.glyph}
          </span>
        )}
      </div>

      <div className="space-y-3 px-4 py-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{moment.authorName} compartió un momento</span>
          <span>
            {moment.localTime} · {moment.authorCity}
          </span>
        </div>
        <p className="font-display text-[17px] leading-snug text-foreground">
          {moment.message}
        </p>
        {hasHidden && <SongHint label={moment.hiddenHint ?? "este momento tiene una canción"} />}
      </div>
    </Link>
  );
}
