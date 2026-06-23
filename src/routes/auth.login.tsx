import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Aquí y Allá" },
      { name: "description", content: "Un espacio solo para ustedes dos." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between px-6 py-12">
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Aquí y Allá
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight">
            Un espacio solo para ustedes dos.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Guarden los momentos del día, aunque estén en horarios y países distintos.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/today" });
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Tu nombre
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adrián"
              className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-3 font-display text-base text-primary-foreground transition hover:opacity-90"
          >
            Entrar
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Privado. Solo dos personas.
          </p>
        </form>
      </div>
    </div>
  );
}
