"use server";
import { getAllMegaCenters } from "@/lib/queries/queries";

export default async function ServerMegaCenters({
  children,
}: {
  children: (
    data: Awaited<ReturnType<typeof getAllMegaCenters>>
  ) => React.ReactNode;
}) {
  const data = await getAllMegaCenters();

  return <>{children(data)}</>;
}
