"use server";
import { getAllMegaCenters } from "@/lib/queries/queries";
import AuthDialog from "./auth-dialog";

export default async function AuthDialogWrapper() {
  const megaCenters = await getAllMegaCenters();

  return <AuthDialog centers={megaCenters} />;
}
