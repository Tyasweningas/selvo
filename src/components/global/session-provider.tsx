"use client";

import { useAuthStore } from "@/store/auth-store";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthStateHydrator = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const hydrateFromSession = useAuthStore((state) => state.hydrateFromSession);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    hydrateFromSession(session ?? null);
  }, [hydrateFromSession, session, status]);

  return <>{children}</>;
};

const AuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthStateHydrator>{children}</AuthStateHydrator>
    </SessionProvider>
  );
};

export default AuthSessionProvider;
