// src/routes/_app/route.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/sidebar-left";

export const Route = createFileRoute("/_app")({
  component: () => (
    <SidebarProvider>
      <SidebarLeft />
      <Outlet />
    </SidebarProvider>
  ),
});
