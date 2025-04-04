// app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/adminsidebar";
import { SlimSidebar } from "@/components/slimSider";

export const metadata = {
  title: "Admin Panel",
  description: "Restricted to Admin users",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/unauthorized"); // Make sure you have a page for this
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen">
        <Sidebar />
        <div className="py-5 lg:px-5 w-full h-screen overflow-auto dark:bg-black dark:text-white">
          {children}
        </div>
        <SlimSidebar />
      </div>
    </ThemeProvider>
  );
}
