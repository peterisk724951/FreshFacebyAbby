import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Fresh Face by Abby",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
