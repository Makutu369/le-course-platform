import { getAllMegaCenters } from "@/lib/queries/auth";
import AuthDialog from "./auth-dialog";

export default async function AuthDialogWrapper() {
  const megaCenters = await getAllMegaCenters();

  return <AuthDialog megaCenters={megaCenters} />;
}
