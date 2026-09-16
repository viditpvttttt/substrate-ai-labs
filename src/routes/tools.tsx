import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolsNavigation } from "@/components/ui/ToolsNavigation";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/tools")({
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Tools – Substrate</title>
        <meta name="description" content="Explore Substrate tools including Gridline, Kernel, VOID, Folio, Arcadia, and Studio." />
      </Helmet>
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-8 text-3xl font-bold">Tools</h1>
        {/* Render the navigation component styled like the site header */}
        <ToolsNavigation />
        {/* Placeholder content – can be extended with tool-specific sections */}
        <section className="mt-12 space-y-8">
          <p className="text-muted-foreground">
            Select a tool from the navigation above to explore its features.
          </p>
        </section>
      </main>
    </Fragment>
  );
}
