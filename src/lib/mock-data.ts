export type Mood =
  | "feliz"
  | "tranquilo"
  | "melancolico"
  | "te-extrano"
  | "risa"
  | "queria-vieras"
  | "cansado"
  | "random";

export const MOODS: { id: Mood; label: string; color: string }[] = [
  { id: "feliz", label: "Feliz", color: "var(--sage)" },
  { id: "tranquilo", label: "Tranquilo/a", color: "var(--paleblue)" },
  { id: "melancolico", label: "Melancólico/a", color: "var(--lilac)" },
  { id: "te-extrano", label: "Te extraño", color: "#F3E0E8" },
  { id: "risa", label: "Me dio risa", color: "#FBEFD3" },
  { id: "queria-vieras", label: "Quería que lo vieras", color: "var(--lilac)" },
  { id: "cansado", label: "Cansado/a", color: "var(--cream)" },
  { id: "random", label: "Random", color: "var(--paleblue)" },
];

export type Sticker = {
  id: string;
  label: string;
  category: "nuestros" | "mios" | "tuyos" | "viaje" | "reacciones";
  glyph: string; // small abstract symbol; replace with real assets later
  color: string;
};

export const STICKERS: Sticker[] = [
  { id: "dragon", label: "Dragón pequeño", category: "nuestros", glyph: "✦", color: "var(--lilac)" },
  { id: "estrella-lila", label: "Estrella lila", category: "nuestros", glyph: "★", color: "var(--lilac)" },
  { id: "luna", label: "Luna", category: "nuestros", glyph: "☾", color: "var(--paleblue)" },
  { id: "flor", label: "Flor minimalista", category: "mios", glyph: "❋", color: "var(--sage)" },
  { id: "nube", label: "Nube", category: "mios", glyph: "◠", color: "var(--paleblue)" },
  { id: "corazon", label: "Corazón discreto", category: "nuestros", glyph: "♡", color: "#F3E0E8" },
  { id: "gatito", label: "Gatito molesto", category: "tuyos", glyph: "ᘛ", color: "var(--cream)" },
  { id: "ticket", label: "Ticket de viaje", category: "viaje", glyph: "⌇", color: "var(--cream)" },
  { id: "cinta", label: "Cinta scrapbook", category: "viaje", glyph: "▱", color: "var(--lilac)" },
  { id: "ok", label: "Va", category: "reacciones", glyph: "✓", color: "var(--sage)" },
];

export type Reaction = {
  from: "yo" | "tu";
  text?: string;
  stickerId?: string;
  at: string;
};

export type Moment = {
  id: string;
  authorName: string;
  authorCity: string;
  date: string; // YYYY-MM-DD
  localTime: string;
  photo: string;
  selfie?: string;
  mode: "postal" | "aqui-estoy";
  mood: Mood;
  message: string;
  stickerId?: string;
  hiddenHint?: string; // visible in feed as a subtle line
  // Hidden context — only revealed on album reverse:
  hidden?: {
    movie?: string;
    song?: { title: string; artist: string; link?: string };
    place?: string;
    note?: string;
    insideJoke?: string;
  };
  reactions?: Reaction[];
};

const img = (seed: string, w = 900, h = 1200) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format`;

export const ME = { name: "Adrián", city: "Tokyo", tz: "Asia/Tokyo" };
export const PARTNER = { name: "Renata", city: "Ciudad de México", tz: "America/Mexico_City" };

export const MOMENTS: Moment[] = [
  {
    id: "m1",
    authorName: "Adrián",
    authorCity: "Tokyo",
    date: "2026-06-23",
    localTime: "15:00",
    photo: img("1493976040374-85c8e12f0c0e"),
    mode: "postal",
    mood: "melancolico",
    message: "Te estoy guardando este lugar.",
    stickerId: "estrella-lila",
    hiddenHint: "este momento tiene una canción",
    hidden: {
      movie: "Your Name",
      song: { title: "Sparkle", artist: "RADWIMPS" },
      place: "Suga Shrine stairs",
      note: "Si algún día venimos juntos, esta foto cuenta como prólogo.",
    },
    reactions: [
      { from: "tu", text: "¿De dónde era esa frase?", at: "15:42" },
      { from: "yo", text: "De la película de dragones.", at: "15:50" },
      { from: "tu", stickerId: "corazon", at: "15:51" },
    ],
  },
  {
    id: "m2",
    authorName: "Renata",
    authorCity: "Ciudad de México",
    date: "2026-06-23",
    localTime: "08:20",
    photo: img("1509042239860-f550ce710b93"),
    selfie: img("1544005313-94ddf0286df2", 400, 400),
    mode: "aqui-estoy",
    mood: "tranquilo",
    message: "Café antes de empezar el día.",
    stickerId: "nube",
    hidden: {
      song: { title: "Sunday", artist: "HONNE" },
      note: "El barista ya me reconoce.",
    },
    reactions: [{ from: "yo", stickerId: "corazon", at: "23:25" }],
  },
  {
    id: "m3",
    authorName: "Adrián",
    authorCity: "Tokyo",
    date: "2026-06-22",
    localTime: "21:10",
    photo: img("1542051841857-5f90071e7989"),
    mode: "postal",
    mood: "queria-vieras",
    message: "Tan bonita como el día que te fuiste.",
    stickerId: "dragon",
    hiddenHint: "hay un guiño escondido aquí",
    hidden: {
      movie: "Cómo entrenar a tu dragón 2",
      insideJoke: "Él en realidad dijo: te extrañé muchísimo.",
    },
    reactions: [],
  },
  {
    id: "m4",
    authorName: "Renata",
    authorCity: "Ciudad de México",
    date: "2026-06-21",
    localTime: "19:45",
    photo: img("1502602898657-3e91760cbb34"),
    mode: "postal",
    mood: "te-extrano",
    message: "Hoy el cielo se puso de tu color.",
    stickerId: "luna",
    hidden: { place: "Azotea de casa" },
    reactions: [{ from: "yo", text: "Lila otra vez.", at: "05:10" }],
  },
  {
    id: "m5",
    authorName: "Adrián",
    authorCity: "Kyoto",
    date: "2026-06-20",
    localTime: "11:30",
    photo: img("1528360983277-13d401cdc186"),
    mode: "postal",
    mood: "feliz",
    message: "Encontré un patio que te encantaría.",
    stickerId: "flor",
    hidden: {
      place: "Templo en Kyoto",
      song: { title: "Light Years", artist: "The National" },
    },
    reactions: [],
  },
];

export function groupByDate(moments: Moment[]) {
  const map = new Map<string, Moment[]>();
  for (const m of moments) {
    if (!map.has(m.date)) map.set(m.date, []);
    map.get(m.date)!.push(m);
  }
  return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

export function prettyDate(date: string) {
  const today = new Date();
  const d = new Date(date + "T00:00:00");
  const diff = Math.round(
    (new Date(today.toDateString()).getTime() - new Date(d.toDateString()).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
}

export function moodLabel(id: Mood) {
  return MOODS.find((m) => m.id === id)?.label ?? id;
}
export function moodColor(id: Mood) {
  return MOODS.find((m) => m.id === id)?.color ?? "var(--cream)";
}
export function stickerById(id?: string) {
  return STICKERS.find((s) => s.id === id);
}
