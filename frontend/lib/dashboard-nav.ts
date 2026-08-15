import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/types/dashboard";
import {
  LayoutDashboard,
  Layers,
  Info,
  Wrench,
  FolderKanban,
  MessageSquareQuote,
  Newspaper,
  Mail,
  Users,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[]; // omit = visible to all authenticated roles
}

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Hero", href: "/dashboard/hero", icon: Layers },
  { label: "About", href: "/dashboard/about", icon: Info },
  { label: "Services", href: "/dashboard/services", icon: Wrench },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Testimonials", href: "/dashboard/reviews", icon: MessageSquareQuote },
  { label: "Blog", href: "/dashboard/blog", icon: Newspaper },
  { label: "Contact", href: "/dashboard/contact", icon: Mail },
  { label: "Team", href: "/dashboard/team", icon: Users, roles: ["admin"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin"] },
];

export function visibleNavItems(role: UserRole): NavItem[] {
  return dashboardNav.filter((item) => !item.roles || item.roles.includes(role));
}
