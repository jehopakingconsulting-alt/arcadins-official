import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { NotAllowed } from "../ui";
import MigrationValidator from "./MigrationValidator";

export const dynamic = "force-dynamic";

export default async function MigrationPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "migration.view")) return <NotAllowed />;
  return <MigrationValidator />;
}
