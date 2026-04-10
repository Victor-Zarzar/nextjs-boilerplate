"use client";

import useDisableDevTools from "@/hooks/disable-dev";
import type { DevToolsGuardProps } from "@/types/dev";

export default function DevToolsGuard({
  unauthorizedPath = "/unauthorized",
}: DevToolsGuardProps) {
  useDisableDevTools(unauthorizedPath);
  return null;
}
