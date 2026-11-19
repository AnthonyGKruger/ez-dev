/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { CookieNotice, MouseGlow, ScrollToTop } from "../components/Overlays";
import { Button, Lottie } from "../components/ui";
import { ui } from "../content";
import { GTM_ID } from "../lib/analytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo";
import appCss from "../styles/main.css?url";

const HOTJAR_ID = 3647050;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/media/logos/ezdev-logo.png`,
  email: "anthony@ezdev.solutions",
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://github.com/AnthonyGKruger",
    "https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/",
  ],
};

// GTM and Hotjar load in production builds only, so local dev isn't tracked.
const analyticsScripts = import.meta.env.PROD
  ? [
      ...(GTM_ID
        ? [
            {
              children: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});`,
            },
            { src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`, async: true },
          ]
        : []),
      {
        children: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
      },
    ]
  : [];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0b1420" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organization) },
      ...analyticsScripts,
    ],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="relative min-h-screen bg-body-bg">
          <MouseGlow />
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieNotice />
          <ScrollToTop />
        </div>
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: () => <ErrorPage notFound />,
  errorComponent: ({ error }: ErrorComponentProps) => (
    <ErrorPage error={error instanceof Error ? error : undefined} />
  ),
});

// Non-404 errors get generic copy so they aren't mistaken for a missing page.
const ErrorPage = ({ notFound = false, error }: { notFound?: boolean; error?: Error }) => {
  const copy = ui.errorPage;
  const title = notFound ? copy.notFoundTitle : copy.title;
  const subtitle = notFound ? copy.notFoundSubtitle : copy.subtitle;
  return (
    <section className="py-44">
      <title>{`${title} · ${SITE_NAME}`}</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Lottie src={notFound ? "/lotties/404.json" : "/lotties/500.json"} size="300px" />
        <p className="mt-6 px-5 text-center text-2xl text-ink">{title}</p>
        <p className="mt-5 px-5 text-center font-thin text-body italic">
          {subtitle}
        </p>
        {error && import.meta.env.DEV && (
          <p className="mt-4 text-center text-sm text-faint">{error.message}</p>
        )}
        <div className="mt-6 flex gap-4">
          <Button to="/">{copy.goHome}</Button>
        </div>
      </div>
    </section>
  );
};
