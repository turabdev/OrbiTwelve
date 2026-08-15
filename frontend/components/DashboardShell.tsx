"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";
import { dashboardNav, visibleNavItems } from "@/lib/dashboard-nav";
import type { UserRole } from "@/types/dashboard";

interface DashboardShellProps {
  role: UserRole;
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

export default function DashboardShell({
  role,
  userName,
  userEmail,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = visibleNavItems(role);
  const activeItem =
    [...items]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ??
    items[0];

  return (
    <div className="flex min-h-screen bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-(--color-dark-panel) border-r border-(--color-border,rgba(255,255,255,0.08)) transition-all duration-200 ease-out
        ${collapsed ? "w-18" : "w-65"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 font-mono text-[10px] text-white">
              OW
            </span>
            {!collapsed && (
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/90">
                Orbitwelve
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/60 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="space-y-0.5">
            {items.map((item) => {
              const isActive = item.href === activeItem.href;
              const Icon = item.icon;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent)
                    ${isActive ? "text-white" : "text-white/55 hover:text-white/90"}`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 origin-center bg-(--color-accent) transition-transform duration-150
                      ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-75"}`}
                      aria-hidden="true"
                    />
                    <Icon size={17} className="shrink-0" strokeWidth={1.75} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-(--color-border,rgba(255,255,255,0.08)) p-3">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="mb-2 hidden w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs text-white/50 hover:text-white/90 md:flex"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            {!collapsed && "Collapse"}
          </button>

          <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[11px] text-white/80">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-white/90">{userName}</p>
                <p className="truncate text-[10px] uppercase tracking-wider text-(--color-accent)">
                  {role}
                </p>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
              className="shrink-0 text-white/40 hover:text-white/90"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div
        className={`flex flex-1 flex-col transition-[margin] duration-200 ease-out ${
          collapsed ? "md:ml-18" : "md:ml-65"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-(--color-border,rgba(0,0,0,0.08)) bg-background px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-gray-500 hover:text-gray-900 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-medium">{activeItem.label}</h1>
          </div>
          <span className="hidden font-mono text-[11px] text-gray-400 sm:inline">
            {userEmail}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
