"use client";

import { useState } from "react";
import type { ContactFormData, ContactResponse } from "@/types/contact";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: ContactResponse = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-[0.18em] text-background/50">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-2 w-full border-b border-background/20 bg-transparent py-3 text-lg text-background outline-none placeholder:text-background/30 focus:border-background/60"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-[0.18em] text-background/50">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-2 w-full border-b border-background/20 bg-transparent py-3 text-lg text-background outline-none placeholder:text-background/30 focus:border-background/60"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-[0.18em] text-background/50">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-2 w-full resize-none border-b border-background/20 bg-transparent py-3 text-lg text-background outline-none placeholder:text-background/30 focus:border-background/60"
          placeholder="Tell us about your project"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {status === "success" && (
        <p className="text-sm text-emerald-400">Message sent — we'll be in touch soon.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}