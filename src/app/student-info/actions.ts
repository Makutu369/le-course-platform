"use server";
import { getAllMegaCenters } from "@/lib/queries/auth";

export async function fetchMegaCentersAction() {
    return await getAllMegaCenters();
  }