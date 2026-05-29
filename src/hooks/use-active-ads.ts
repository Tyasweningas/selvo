"use client";

import { logError } from "@/lib/error-handler";
import adsService from "@/services/ads.service";
import { Ads } from "@/types/ads";
import { useEffect, useState } from "react";

const CACHE_KEY = "selvo:active-ads";
const SEEN_KEY = "selvo:seen-ads";
const TTL_MS = 5 * 60 * 1000; // 5 menit

interface CachedPayload {
  fetchedAt: number;
  ads: Ads[];
}

const readCache = (): CachedPayload | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (
      !parsed ||
      typeof parsed.fetchedAt !== "number" ||
      !Array.isArray(parsed.ads)
    ) {
      return null;
    }
    if (Date.now() - parsed.fetchedAt > TTL_MS) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (payload: CachedPayload) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
};

const readSeen = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(SEEN_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
};

const writeSeen = (set: Set<string>) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
};

/**
 * Fetch iklan aktif dengan cache 5 menit di sessionStorage.
 * Mengembalikan satu iklan random yang belum pernah ditampilkan ke
 * user di sesi ini. Bila semua sudah pernah dilihat, reset list seen.
 */
export function useActiveAdsPick(): {
  ad: Ads | null;
  loading: boolean;
  markAsSeen: (adsId: string) => void;
} {
  const [ad, setAd] = useState<Ads | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const pickAd = (ads: Ads[]): Ads | null => {
      if (ads.length === 0) return null;
      let seen = readSeen();
      let candidates = ads.filter((a) => !seen.has(a.adsId));
      if (candidates.length === 0) {
        // Reset seen ketika sudah lihat semua iklan.
        seen = new Set();
        candidates = ads;
      }
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      return pick ?? null;
    };

    const cached = readCache();
    if (cached && cached.ads.length > 0) {
      const pick = pickAd(cached.ads);
      setAd(pick);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    adsService
      .listActiveAds({ limit: 20 })
      .then((res) => {
        if (cancelled) return;
        const ads = res.data ?? [];
        writeCache({ fetchedAt: Date.now(), ads });
        setAd(pickAd(ads));
      })
      .catch((err) => {
        logError(err, "useActiveAdsPick");
        if (!cancelled) setAd(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const markAsSeen = (adsId: string) => {
    const seen = readSeen();
    seen.add(adsId);
    writeSeen(seen);
  };

  return { ad, loading, markAsSeen };
}
