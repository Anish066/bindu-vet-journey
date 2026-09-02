
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "c0d1kbg1",
  dataset: "production",
  apiVersion: "2026-09-01",
  useCdn: true,
});

