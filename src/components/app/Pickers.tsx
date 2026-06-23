import { MOODS, STICKERS, type Mood, type Sticker } from "@/lib/mock-data";

export function MoodPicker({
  value,
  onChange,
}: {
  value?: Mood;
  onChange: (m: Mood) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              active ? "border-primary text-foreground" : "border-border text-muted-foreground"
            }`}
            style={{ background: active ? m.color : "transparent" }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

export function StickerPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (id: string | undefined) => void;
}) {
  const cats: Sticker["category"][] = ["nuestros", "mios", "tuyos", "viaje", "reacciones"];
  const labels: Record<Sticker["category"], string> = {
    nuestros: "Nuestros",
    mios: "Míos",
    tuyos: "Tuyos",
    viaje: "Viaje",
    reacciones: "Reacciones",
  };
  return (
    <div className="space-y-4">
      {cats.map((c) => {
        const list = STICKERS.filter((s) => s.category === c);
        if (list.length === 0) return null;
        return (
          <div key={c}>
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {labels[c]}
            </p>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => {
                const active = value === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onChange(active ? undefined : s.id)}
                    className={`grid h-12 w-12 place-items-center rounded-2xl text-lg transition ${
                      active ? "ring-2 ring-primary" : ""
                    }`}
                    style={{ background: s.color }}
                    title={s.label}
                  >
                    {s.glyph}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PhotoModeSelector({
  value,
  onChange,
}: {
  value: "postal" | "aqui-estoy";
  onChange: (v: "postal" | "aqui-estoy") => void;
}) {
  const opts: { id: "postal" | "aqui-estoy"; label: string; hint: string }[] = [
    { id: "postal", label: "Postal", hint: "Una sola foto del lugar" },
    { id: "aqui-estoy", label: "Aquí estoy", hint: "Foto principal + mini selfie" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`soft-card p-4 text-left transition ${
            value === o.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <p className="font-display text-base">{o.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{o.hint}</p>
        </button>
      ))}
    </div>
  );
}
