import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";
import { Space_Grotesk } from "next/font/google";
import DashboardShell from "@/components/DashboardShell";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className={spaceGrotesk.className}>{children}</div>;
  }

  return (
    <div className={spaceGrotesk.className}>
      <DashboardShell
        role={session.user.role}
        userName={session.user.name ?? "User"}
        userEmail={session.user.email ?? ""}
      >
        {children}
      </DashboardShell>
    </div>
  );
}