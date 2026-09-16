"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { AboutStatsFields } from "@/components/AboutStats";
import type { AboutPvmFields } from "@/components/AboutPvm";

type Tab = "stats" | "vision" | "services";

type SaveState = "idle" | "saving" | "saved" | "error";

const emptyPvm: AboutPvmFields = {
  purpose: "",
  vision: "",
  mission: "",
};

const emptyStats: AboutStatsFields = {
  founded: 2020,
  clients: 0,
  projects: 0,
  industries: 0,
  countries: 0,
  employees: 0,
};

export default function AboutDashboardPage() {
  const [tab, setTab] = useState<Tab>("stats");
  const [statsForm, setStatsForm] = useState<AboutStatsFields>(emptyStats);
  const [pvmForm, setPvmForm] = useState<AboutPvmFields>(emptyPvm);
  const [pvmSaveState, setPvmSaveState] = useState<SaveState>("idle");
  const [pvmError, setPvmError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tab !== "vision") return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setPvmError(null);
      try {
        const res = await fetch("/api/content/about-pvm");
        if (res.status === 404) {
          if (!cancelled) setPvmForm(emptyPvm);
          return;
        }
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (!cancelled) setPvmForm({ ...emptyPvm, ...data.fields });
      } catch (err) {
        if (!cancelled) {
          setPvmError(err instanceof Error ? err.message : "Failed to load vision content");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  useEffect(() => {
    if (tab !== "stats") return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/content/about-stats");
        if (res.status === 404) {
          if (!cancelled) setStatsForm(emptyStats);
          return;
        }
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (!cancelled) setStatsForm({ ...emptyStats, ...data.fields });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load stats");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  function updatePvm(key: keyof AboutPvmFields, value: string) {
    setPvmForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handlePvmSubmit(e: FormEvent) {
    e.preventDefault();
    setPvmSaveState("saving");
    setPvmError(null);

    try {
      const res = await fetch("/api/content/about-pvm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pvmForm),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Save failed (${res.status})`);
      }

      setPvmSaveState("saved");
      setTimeout(() => setPvmSaveState("idle"), 2000);
    } catch (err) {
      setPvmSaveState("error");
      setPvmError(err instanceof Error ? err.message : "Save failed");
    }
  }

  function updateStat(key: keyof AboutStatsFields, value: string) {
    setStatsForm((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    setError(null);

    try {
      const res = await fetch("/api/content/about-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statsForm),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Save failed (${res.status})`);
      }

      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (err) {
      setSaveState("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  const statFields: { key: keyof AboutStatsFields; label: string }[] = [
    { key: "founded", label: "Founded in (year)" },
    { key: "clients", label: "Clients" },
    { key: "projects", label: "Projects" },
    { key: "industries", label: "Industries" },
    { key: "countries", label: "Countries" },
    { key: "employees", label: "Employees" },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-medium">About</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Stats, Purpose/Vision/Mission, and Services shown on the About page.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-1 border-b border-border">
        {([
          { id: "stats", label: "Stats" },
          { id: "vision", label: "Vision" },
          { id: "services", label: "Services" },
        ] as const).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "stats" &&
        (loading ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {statFields.map((f) => (
                <Field key={f.key} label={f.label}>
                  <input
                    type="number"
                    value={statsForm[f.key]}
                    onChange={(e) => updateStat(f.key, e.target.value)}
                    className={inputClass}
                  />
                </Field>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t border-border pt-6">
              <button
                type="submit"
                disabled={saveState === "saving"}
                className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saveState === "saving" ? "Saving…" : "Save changes"}
              </button>

              {saveState === "saved" && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-green-600" /> Saved
                </span>
              )}
              {saveState === "error" && (
                <span className="flex items-center gap-1.5 text-sm text-destructive">
                  <AlertCircle size={16} /> {error}
                </span>
              )}
            </div>
          </form>
        ))}

      {tab === "vision" &&
        (loading ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handlePvmSubmit} className="space-y-6">
            <Field label="Purpose">
              <textarea
                value={pvmForm.purpose}
                onChange={(e) => updatePvm("purpose", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
            <Field label="Vision">
              <textarea
                value={pvmForm.vision}
                onChange={(e) => updatePvm("vision", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
            <Field label="Mission">
              <textarea
                value={pvmForm.mission}
                onChange={(e) => updatePvm("mission", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>

            <div className="flex items-center gap-3 border-t border-border pt-6">
              <button
                type="submit"
                disabled={pvmSaveState === "saving"}
                className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {pvmSaveState === "saving" ? "Saving…" : "Save changes"}
              </button>

              {pvmSaveState === "saved" && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-green-600" /> Saved
                </span>
              )}
              {pvmSaveState === "error" && (
                <span className="flex items-center gap-1.5 text-sm text-destructive">
                  <AlertCircle size={16} /> {pvmError}
                </span>
              )}
            </div>
          </form>
        ))}
      {tab === "services" && (
        <p className="py-8 text-sm text-muted-foreground">
          Services tab coming next.
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
