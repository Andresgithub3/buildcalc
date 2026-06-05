"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

const SUBJECT_KEYS = ["bug", "suggestion", "feedback", "other"] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "bug" as (typeof SUBJECT_KEYS)[number],
    message: "",
    botcheck: "", // honeypot — must stay empty
  });

  // If the key isn't configured at build time, fall back to email only.
  if (!ACCESS_KEY) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        {t("form.unconfigured")}{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-primary hover:underline"
        >
          {siteConfig.email}
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-6">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h3 className="mt-3 font-heading text-lg font-semibold">
          {t("form.successTitle")}
        </h3>
        <p className="mt-1 text-muted-foreground">{t("form.successBody")}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.botcheck) return; // bot filled the honeypot — silently drop
    setStatus("submitting");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: `[SlabCalc] ${t(`form.subjects.${form.subject}`)}`,
          message: form.message,
          from_name: "SlabCalc Contact Form",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot: hidden from users, tempting to bots */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={form.botcheck}
        onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("form.nameLabel")}</Label>
          <Input
            id="name"
            required
            value={form.name}
            disabled={submitting}
            placeholder={t("form.namePlaceholder")}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("form.emailLabel")}</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            disabled={submitting}
            placeholder={t("form.emailPlaceholder")}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t("form.subjectLabel")}</Label>
        <select
          id="subject"
          value={form.subject}
          disabled={submitting}
          onChange={(e) =>
            setForm({
              ...form,
              subject: e.target.value as (typeof SUBJECT_KEYS)[number],
            })
          }
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 md:text-sm dark:bg-input/30"
        >
          {SUBJECT_KEYS.map((key) => (
            <option key={key} value={key}>
              {t(`form.subjects.${key}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("form.messageLabel")}</Label>
        <Textarea
          id="message"
          required
          rows={6}
          value={form.message}
          disabled={submitting}
          placeholder={t("form.messagePlaceholder")}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {t("form.errorBody")}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium underline"
            >
              {siteConfig.email}
            </a>
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting}>
          <Send className="h-4 w-4" />
          {submitting ? t("form.sending") : t("form.submit")}
        </Button>
        <p className="text-xs text-muted-foreground">{t("form.privacyNote")}</p>
      </div>
    </form>
  );
}
