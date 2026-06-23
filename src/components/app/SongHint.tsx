export function SongHint({ label = "este momento tiene una canción" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-lilac/50 px-3 py-1 text-[11px] text-accent-foreground">
      <span aria-hidden className="font-display">♪</span>
      <span className="italic">{label}</span>
    </div>
  );
}
