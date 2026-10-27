"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

const GA_ID = "G-D418QEH1D5";
const GTM_ID = "GTM-WDMNVL34";
const META_PIXEL_ID = "1584046740011776";

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export default function DeferredThirdParty() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    let timer = 0;
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

    const cleanup = () => {
      events.forEach((event) => window.removeEventListener(event, load));
      if (timer) window.clearTimeout(timer);
    };

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;
      cleanup();

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
      injectScript("cc-ga-script", `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);

      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      injectScript("cc-gtm-script", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);

      const existing = (window as unknown as { fbq?: Fbq }).fbq;
      const queued = existing?.queue ?? [];
      const fbq = ((...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      }) as Fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      (window as unknown as { fbq: Fbq }).fbq = fbq;

      injectScript("cc-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", META_PIXEL_ID);
      fbq("track", "PageView");
      queued.forEach((args) => fbq(...args));
    };

    events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));
    timer = window.setTimeout(load, 8000);

    return cleanup;
  }, []);

  return null;
}
