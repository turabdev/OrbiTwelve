"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { HeroProps, HeroSocial } from "@/types/portfolios";
import { Loader2, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

const CONTENT_KEY = "hero";

type SaveState = "idle" | "saving" | "saved" | "error";

const emptyForm: Required<Omit<HeroProps, "socials">> & { socials: HeroSocial[] } = {
  eyebrow: "",
  title: "",
  description: "",
  trust: "",
  background: "",
  thumbnail: "",
  socials: [],
};

export default function HeroDashboardPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/content/${CONTENT_KEY}`);
        if (res.status === 404) {
          // Nothing saved yet — leave the form at its empty defaults.
          return;
        }
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (!cancelled) {
          setForm({ ...emptyForm, ...data.fields });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load hero content");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSocial(index: number, patch: Partial<HeroSocial>) {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function addSocial() {
    setForm((prev) => ({
      ...prev,
      socials: [...prev.socials, { label: "", href: "" }],
    }));
  }

  function removeSocial(index: number) {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    setError(null);

    try {
      const res = await fetch(`/api/content/${CONTENT_KEY}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-medium">Hero</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Content shown in the home page hero banner.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Eyebrow">
          <input
            value={form.eyebrow}
            onChange={(e) => updateField("eyebrow", e.target.value)}
            placeholder="Orbitwelve"
            className={inputClass}
          />
        </Field>

        <Field label="Title">
          <textarea
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Creative digital work that ships."
            rows={2}
            className={inputClass}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="A portfolio hero built for landing pages and editorial case studies."
            rows={3}
            className={inputClass}
          />
        </Field>

        <Field label="Trust line">
          <input
            value={form.trust}
            onChange={(e) => updateField("trust", e.target.value)}
            placeholder="Trusted by ambitious teams"
            className={inputClass}
          />
        </Field>

        <Field label="Background image URL">
          <input
            value={form.background}
            onChange={(e) => updateField("background", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>

        <Field label="Thumbnail image URL">
          <input
            value={form.thumbnail}
            onChange={(e) => updateField("thumbnail", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Socials
            </label>
            <button
              type="button"
              onClick={addSocial}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="space-y-2">
            {form.socials.map((social, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={social.label}
                  onChange={(e) => updateSocial(i, { label: e.target.value })}
                  placeholder="Label (e.g. Instagram)"
                  className={`${inputClass} w-32 shrink-0`}
                />
                <input
                  value={social.href}
                  onChange={(e) => updateSocial(i, { href: e.target.value })}
                  placeholder="https://..."
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeSocial(i)}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  aria-label="Remove social link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {form.socials.length === 0 && (
              <p className="text-xs text-muted-foreground">No social links yet.</p>
            )}
          </div>
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