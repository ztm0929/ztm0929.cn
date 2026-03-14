import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        { text: "小白教程库", url: "/tutorials", active: "nested-url" },
        { text: "关于我", url: "/about", active: "nested-url" },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
