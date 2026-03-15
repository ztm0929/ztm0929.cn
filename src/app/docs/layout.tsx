import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { tutorialsSource } from "@/lib/source";
import { GraduationCap, Tags } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      sidebar={{
        tabs: [
          { title: "小白教程库", url: "/docs", description: "Step-by-step guides to learn the application.", icon: <GraduationCap /> },
          { title: "杂记", url: "/notes", description: "Random thoughts and notes.", icon: <Tags /> },
        ],
      }}
      tree={tutorialsSource.pageTree}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
