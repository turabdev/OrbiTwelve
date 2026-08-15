import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import DashboardShell from "@/components/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // No session: this is /dashboard/login (or middleware hasn't redirected yet).
  // Render bare — no shell chrome on the login screen.
  if (!session) return <>{children}</>;

  return (
    <DashboardShell
      role={session.user.role}
      userName={session.user.name ?? "User"}
      userEmail={session.user.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
