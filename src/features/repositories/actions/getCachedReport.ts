"use server";

import { getCachedReport } from "../cache/reportCache";

export async function getCachedRepositoryReport() {
  return getCachedReport();
}