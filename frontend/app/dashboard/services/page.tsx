"use client";

import { useEffect, useState } from "react";

interface ServiceTool {
  name: string;
  logoUrl: string;
}

interface ProjectCard {
  title: string;
  summary: string;
  href: string;
}

interface ServiceNode {
  serviceId: string;
  title: string;
  description: string;
  tools: ServiceTool[];
  orbitSize: number;
  projects: [ProjectCard, ProjectCard]; // form-level: fixed 2, same
  // constraint as the API route's validator — kept as a tuple type
  // HERE (client-side, pre-submit) even though it can't survive the
  // JSON round-trip, so the compiler still catches obvious mistakes
  // while editing this file.
  published: boolean;
}

const EMPTY_PROJECT: ProjectCard = { title: "", summary: "", href: "" };

const EMPTY_SERVICE = (): ServiceNode => ({
  serviceId: "",
  title: "",
  description: "",
  tools: [],
  orbitSize: 120,
  projects: [{ ...EMPTY_PROJECT }, { ...EMPTY_PROJECT }],
  published: true,
});

export default function ServicesPathwayDashboard() {
  const [services, setServices] = useState<ServiceNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<
    { type: "saved" | "error"; message: string } | null
  >(null);

  useEffect(() => {
    fetch("/api/services-pathway")
      .then((res) => res.json())
      .then((data: ServiceNode[]) => {
        setServices(
          data.length > 0
            ? data.map((s) => ({
                ...s,
                // Defend against a doc that somehow doesn't have
                // exactly 2 (e.g. hand-edited in the DB) — pad or
                // truncate so the form always renders 2 fixed rows.
                projects: [
                  s.projects[0] ?? { ...EMPTY_PROJECT },
                  s.projects[1] ?? { ...EMPTY_PROJECT },
                ] as [ProjectCard, ProjectCard],
              }))
            : [EMPTY_SERVICE()]
        );
      })
      .catch(() =>
        setStatus({ type: "error", message: "Failed to load services." })
      )
      .finally(() => setLoading(false));
  }, []);

  function updateService(index: number, patch: Partial<ServiceNode>) {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );
  }

  function updateProject(
    serviceIndex: number,
    projectIndex: 0 | 1,
    patch: Partial<ProjectCard>
  ) {
    setServices((prev) =>
      prev.map((s, i) => {
        if (i !== serviceIndex) return s;
        const projects = [...s.projects] as [ProjectCard, ProjectCard];
        projects[projectIndex] = { ...projects[projectIndex], ...patch };
        return { ...s, projects };
      })
    );
  }

  function addTool(serviceIndex: number) {
    updateService(serviceIndex, {
      tools: [...services[serviceIndex].tools, { name: "", logoUrl: "" }],
    });
  }

  function updateTool(
    serviceIndex: number,
    toolIndex: number,
    patch: Partial<ServiceTool>
  ) {
    const tools = services[serviceIndex].tools.map((t, i) =>
      i === toolIndex ? { ...t, ...patch } : t
    );
    updateService(serviceIndex, { tools });
  }

  function removeTool(serviceIndex: number, toolIndex: number) {
    updateService(serviceIndex, {
      tools: services[serviceIndex].tools.filter((_, i) => i !== toolIndex),
    });
  }

  function addService() {
    setServices((prev) => [...prev, EMPTY_SERVICE()]);
  }

  function removeService(index: number) {
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  function moveService(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= services.length) return;
    setServices((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    // Client-side guard mirroring the API's validator — catches an
    // obviously-blank service before the round trip instead of
    // surfacing a 400 with no context.
    const emptyTitleIndex = services.findIndex((s) => !s.title.trim());
    if (emptyTitleIndex !== -1) {
      setStatus({
        type: "error",
        message: `Service #${emptyTitleIndex + 1} needs a title before saving.`,
      });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/services-pathway", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Save failed.");
      }
      const saved: ServiceNode[] = await res.json();
      setServices(saved);
      setStatus({ type: "saved", message: "Saved." });
    } catch (e) {
      setStatus({
        type: "error",
        message: e instanceof Error ? e.message : "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 opacity-60">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Services Pathway</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
          style={{ background: "var(--color-accent)" }}
        >
          {saving ? "Saving…" : "Save all"}
        </button>
      </div>

      {status && (
        <p
          className={`mb-6 text-sm ${
            status.type === "error" ? "text-red-400" : "text-green-400"
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-10">
        {services.map((service, si) => (
          <div
            key={si}
            className="rounded-lg border p-6"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest opacity-60">
                Service {si + 1}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveService(si, -1)}
                  disabled={si === 0}
                  className="text-sm opacity-70 disabled:opacity-20"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveService(si, 1)}
                  disabled={si === services.length - 1}
                  className="text-sm opacity-70 disabled:opacity-20"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeService(si)}
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* (1) Header */}
            <label className="mb-1 block text-xs opacity-60">
              Service ID (slug — used as the anchor id, lowercase-hyphenated)
            </label>
            <input
              value={service.serviceId}
              onChange={(e) =>
                updateService(si, { serviceId: e.target.value })
              }
              placeholder="web-development"
              className="mb-3 w-full rounded-md bg-transparent p-2 text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            />

            <label className="mb-1 block text-xs opacity-60">Header</label>
            <input
              value={service.title}
              onChange={(e) => updateService(si, { title: e.target.value })}
              placeholder="Web Development"
              className="mb-3 w-full rounded-md bg-transparent p-2 text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            />

            {/* (2) Details */}
            <label className="mb-1 block text-xs opacity-60">Details</label>
            <textarea
              value={service.description}
              onChange={(e) =>
                updateService(si, { description: e.target.value })
              }
              rows={3}
              className="mb-4 w-full rounded-md bg-transparent p-2 text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            />

            {/* (3) Tool logo URLs + (4) orbit sizing */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs opacity-60">
                  Tools (orbiting logos)
                </label>
                <button
                  onClick={() => addTool(si)}
                  className="text-xs opacity-70"
                >
                  + Add tool
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {service.tools.map((tool, ti) => (
                  <div key={ti} className="flex gap-2">
                    <input
                      value={tool.name}
                      onChange={(e) =>
                        updateTool(si, ti, { name: e.target.value })
                      }
                      placeholder="Tool name"
                      className="w-1/3 rounded-md bg-transparent p-2 text-sm"
                      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                    <input
                      value={tool.logoUrl}
                      onChange={(e) =>
                        updateTool(si, ti, { logoUrl: e.target.value })
                      }
                      placeholder="Logo URL"
                      className="flex-1 rounded-md bg-transparent p-2 text-sm"
                      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                    <button
                      onClick={() => removeTool(si, ti)}
                      className="px-2 text-sm text-red-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {service.tools.length === 0 && (
                  <p className="text-xs opacity-40">
                    No tools yet — add at least one for the ring to render.
                  </p>
                )}
              </div>
            </div>

            <label className="mb-1 block text-xs opacity-60">
              Orbit size (px — one value applies to all tool logos for this
              service)
            </label>
            <input
              type="number"
              min={40}
              max={400}
              value={service.orbitSize}
              onChange={(e) =>
                updateService(si, {
                  orbitSize: Number(e.target.value) || 120,
                })
              }
              className="mb-4 w-32 rounded-md bg-transparent p-2 text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            />

            {/* (5) Project cards — fixed 2, URL field */}
            <label className="mb-2 block text-xs opacity-60">
              Project cards (exactly 2)
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {([0, 1] as const).map((pi) => (
                <div
                  key={pi}
                  className="rounded-md p-3"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <input
                    value={service.projects[pi].title}
                    onChange={(e) =>
                      updateProject(si, pi, { title: e.target.value })
                    }
                    placeholder="Project title"
                    className="mb-2 w-full rounded-md bg-transparent p-2 text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  />
                  <input
                    value={service.projects[pi].summary}
                    onChange={(e) =>
                      updateProject(si, pi, { summary: e.target.value })
                    }
                    placeholder="Summary"
                    className="mb-2 w-full rounded-md bg-transparent p-2 text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  />
                  <input
                    value={service.projects[pi].href}
                    onChange={(e) =>
                      updateProject(si, pi, { href: e.target.value })
                    }
                    placeholder="/projects/slug"
                    className="w-full rounded-md bg-transparent p-2 text-sm"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addService}
        className="mt-6 rounded-md px-4 py-2 text-sm"
        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
      >
        + Add service
      </button>
    </div>
  );
}
