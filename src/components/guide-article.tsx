import { type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Clock, Lightbulb } from "lucide-react";
import { AdSlotInArticle } from "@/components/ads/ad-slot";
import { FAQSection } from "@/components/faq-section";

export type GuideBodyItem = string | { list: string[] };

export interface GuideSection {
  heading: string;
  body: GuideBodyItem[];
}

export interface GuideRelatedTool {
  name: string;
  href: string;
  description: string;
}

interface GuideArticleProps {
  category: string;
  title: string;
  description: string;
  updatedLabel: string;
  readLabel: string;
  intro: string[];
  sections: GuideSection[];
  keyTakeaways: string[];
  takeawaysLabel: string;
  faqs: { question: string; answer: string }[];
  relatedTools: GuideRelatedTool[];
  relatedToolsLabel: string;
  backLabel: string;
}

function BodyItems({ body }: { body: GuideBodyItem[] }): ReactNode {
  return body.map((item, i) =>
    typeof item === "string" ? (
      <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
        {item}
      </p>
    ) : (
      <ul key={i} className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
        {item.list.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ul>
    )
  );
}

export function GuideArticle({
  category,
  title,
  description,
  updatedLabel,
  readLabel,
  intro,
  sections,
  keyTakeaways,
  takeawaysLabel,
  faqs,
  relatedTools,
  relatedToolsLabel,
  backLabel,
}: GuideArticleProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <header className="mt-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{category}</Badge>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readLabel}
          </span>
          <span aria-hidden>·</span>
          <span>{updatedLabel}</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      </header>

      <div className="mt-8">
        {intro.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </div>

      {keyTakeaways.length > 0 && (
        <Card className="mt-8 border-primary/20 bg-primary/[0.03]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-primary" />
              {takeawaysLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              {keyTakeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <AdSlotInArticle className="mt-8" />

      {sections.map((section, i) => (
        <section key={i} className="mt-8">
          <h2 className="font-heading text-2xl font-semibold">
            {section.heading}
          </h2>
          <BodyItems body={section.body} />
        </section>
      ))}

      {faqs.length > 0 && (
        <section className="mt-10">
          <FAQSection faqs={faqs} />
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="mt-10 border-t pt-8">
          <h2 className="mb-3 font-heading text-xl font-semibold">
            {relatedToolsLabel}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-colors group-hover:border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      {tool.name}
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
