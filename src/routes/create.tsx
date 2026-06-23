import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { MoodPicker, PhotoModeSelector, StickerPicker } from "@/components/app/Pickers";
import { type Mood, stickerById } from "@/lib/mock-data";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Crear momento · Aquí y Allá" },
      { name: "description", content: "Arma un pequeño recuerdo." },
    ],
  }),
  component: CreatePage,
});

type Step = "modo" | "foto" | "mood" | "mensaje" | "sticker" | "guino" | "preview";

const PLACEHOLDER_PHOTO =
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&h=1200&fit=crop&auto=format";

function CreatePage() {
  const navigate = useNavigate();
  const [fast, setFast] = useState(true);
  const [step, setStep] = useState<Step>("modo");
  const [mode, setMode] = useState<"postal" | "aqui-estoy">("postal");
  const [mood, setMood] = useState<Mood>();
  const [message, setMessage] = useState("");
  const [stickerId, setStickerId] = useState<string>();
  const [hint, setHint] = useState("");

  const order: Step[] = fast
    ? ["foto", "mood", "preview"]
    : ["modo", "foto", "mood", "mensaje", "sticker", "guino", "preview"];
  const idx = order.indexOf(step);
  const canNext = step !== "mood" || Boolean(mood);

  const next = () => setStep(order[Math.min(idx + 1, order.length - 1)]);
  const prev = () => setStep(order[Math.max(idx - 1, 0)]);
  const sticker = stickerById(stickerId);

  return (
    <AppShell>
      <PageHeader eyebrow="Nuevo" title="Guardar un momento" />

      <div className="mb-5 inline-flex rounded-full bg-cream p-1 text-xs">
        <button
          onClick={() => {
            setFast(true);
            setStep("foto");
          }}
          className={`rounded-full px-3 py-1.5 ${fast ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          Modo rápido
        </button>
        <button
          onClick={() => {
            setFast(false);
            setStep("modo");
          }}
          className={`rounded-full px-3 py-1.5 ${!fast ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          Modo completo
        </button>
      </div>

      <div className="mb-6 h-1 w-full rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((idx + 1) / order.length) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        {step === "modo" && (
          <section>
            <h2 className="mb-3 font-display text-xl">Modo de foto</h2>
            <PhotoModeSelector value={mode} onChange={setMode} />
          </section>
        )}

        {step === "foto" && (
          <section>
            <h2 className="mb-3 font-display text-xl">Foto</h2>
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-cream">
              <img src={PLACEHOLDER_PHOTO} alt="" className="aspect-[4/5] w-full object-cover opacity-90" />
              {mode === "aqui-estoy" && (
                <div className="absolute left-3 top-3 grid h-20 w-16 -rotate-3 place-items-center rounded-md border-2 border-white bg-paleblue text-[10px] text-muted-foreground shadow-card">
                  selfie
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {mode === "postal" ? "Postal — una foto del lugar." : "Aquí estoy — foto + mini selfie."}
            </p>
          </section>
        )}

        {step === "mood" && (
          <section>
            <h2 className="mb-3 font-display text-xl">¿Cómo te sientes?</h2>
            <MoodPicker value={mood} onChange={setMood} />
          </section>
        )}

        {step === "mensaje" && (
          <section>
            <h2 className="mb-3 font-display text-xl">Mensaje breve</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={140}
              rows={3}
              placeholder="Te estoy guardando este lugar."
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
            />
            <p className="mt-1 text-right text-[11px] text-muted-foreground">{message.length}/140</p>
          </section>
        )}

        {step === "sticker" && (
          <section>
            <h2 className="mb-3 font-display text-xl">Sticker</h2>
            <StickerPicker value={stickerId} onChange={setStickerId} />
          </section>
        )}

        {step === "guino" && (
          <section>
            <h2 className="mb-1 font-display text-xl">Guiño oculto</h2>
            <p className="mb-3 text-xs text-muted-foreground">
              Una pista para el feed. La referencia completa se guarda solo en el álbum.
            </p>
            <input
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="hay un guiño escondido aquí"
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
            />
          </section>
        )}

        {step === "preview" && (
          <section>
            <h2 className="mb-3 font-display text-xl">Vista previa</h2>
            <div className="soft-card overflow-hidden">
              <div className="relative">
                <img src={PLACEHOLDER_PHOTO} alt="" className="aspect-[4/5] w-full object-cover" />
                {sticker && (
                  <span
                    className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-lg shadow-soft"
                    style={{ background: sticker.color }}
                  >
                    {sticker.glyph}
                  </span>
                )}
              </div>
              <div className="space-y-2 p-4">
                <p className="text-[11px] text-muted-foreground">Adrián compartió un momento</p>
                <p className="font-display text-[17px]">
                  {message || "Te estoy guardando este lugar."}
                </p>
                {hint && (
                  <p className="text-[11px] italic text-muted-foreground">
                    <span className="mr-1 font-display">♪</span>
                    {hint}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground disabled:opacity-40"
        >
          Atrás
        </button>
        {step !== "preview" ? (
          <button
            onClick={next}
            disabled={!canNext}
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground disabled:opacity-50"
          >
            Continuar
          </button>
        ) : (
          <button
            onClick={() => navigate({ to: "/today" })}
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            Publicar
          </button>
        )}
      </div>
    </AppShell>
  );
}
