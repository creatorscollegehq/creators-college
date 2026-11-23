"use client";

import { useEffect, useState } from "react";

export interface AccessStatus {
  signedIn: boolean;
  enrolled: boolean;
  name: string | null;
}

const SIGNED_OUT: AccessStatus = { signedIn: false, enrolled: false, name: null };

let cached: AccessStatus | null = null;
let inflight: Promise<AccessStatus> | null = null;
const listeners = new Set<(status: AccessStatus) => void>();

function publish(status: AccessStatus) {
  cached = status;
  for (const listener of listeners) listener(status);
}

function loadStatus(): Promise<AccessStatus> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch("/api/access/status", { cache: "no-store" })
      .then(async (response) => (response.ok ? ((await response.json()) as AccessStatus) : SIGNED_OUT))
      .catch(() => SIGNED_OUT)
      .then((status) => {
        publish(status);
        inflight = null;
        return status;
      });
  }
  return inflight;
}

/** One shared request for the whole page: header, sticky bar and CTA buttons. */
export function useAccessStatus(): AccessStatus {
  const [status, setStatus] = useState<AccessStatus>(cached ?? SIGNED_OUT);

  useEffect(() => {
    listeners.add(setStatus);
    let active = true;
    void loadStatus().then((next) => {
      if (active) setStatus(next);
    });
    return () => {
      active = false;
      listeners.delete(setStatus);
    };
  }, []);

  return status;
}

/** Call after login/logout so the next render asks the server again. */
export function resetAccessStatus() {
  cached = null;
  inflight = null;
}
