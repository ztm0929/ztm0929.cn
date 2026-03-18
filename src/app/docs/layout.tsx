import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { tutorialsSource } from "@/lib/source";
import { GraduationCap, Tags } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={tutorialsSource.pageTree}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
