"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Settings,
  ListChecks,
  Users,
  FileText,
  BarChart,
  Home,
  Folder,
  Calendar,
  ClipboardList,
  File,
} from "lucide-react";

// Sidebar Configuration
const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    link: "/admin/dashboard",
  },
  {
    section: "Project Management",
    items: [
      { label: "Projects", icon: Folder, link: "/admin/dashboard/projects" },
      { label: "Tasks", icon: ListChecks, link: "/admin/dashboard/tasks" },
      { label: "Teams", icon: Users, link: "/admin/dashboard/teams" },
      { label: "Calendar", icon: Calendar, link: "/admin/dashboard/calendar" },
    ],
  },
  {
    section: "Reports & Logs",
    items: [
      { label: "Reports", icon: BarChart, link: "/admin/dashboard/reports" },
      { label: "Activity Log", icon: ClipboardList, link: "/admin/dashboard/activity-log" },
    ],
  },
  {
    section: "Resources",
    items: [
      { label: "Files", icon: File, link: "/admin/dashboard/files" },
      { label: "Documentation", icon: FileText, link: "/admin/dashboard/docs" },
    ],
  },
  {
    section: "Settings",
    items: [{ label: "Project Settings", icon: Settings, link: "/admin/dashboard/settings" }],
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get current route

  return (
    <>
      {/* Sidebar (Hidden on small screens, visible from md and above) */}
      <aside className="hidden md:flex bg-black h-screen w-64 flex-col text-gray-300 border-r border-gray-700">
        {/* Header */}
        <div className="flex items-center gap-2 p-4">
          <Flame className="text-orange-500" size={32} />
          <p className="text-lg font-semibold">ProjectMS</p>
        </div>

        {/* Vertical Divider */}
        <div className="w-full border-t border-gray-700 mb-4"></div>

        {/* Dashboard Link */}
        <div className="px-2">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              pathname === "/admin/dashboard" ? "bg-blue-500 text-white" : "hover:text-blue-500"
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Sidebar Sections */}
        <div className="flex flex-col mt-4">
          {sidebarItems
            .filter((item) => item.section)
            .map((section, index) => (
              <div key={index} className="px-4 mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2">{section.section}</p>
                <div className="flex flex-col gap-2">
                  {section.items?.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.link ?? "#"} // Ensure link is never undefined
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        pathname === item.link ? "bg-blue-500 text-white" : "hover:text-blue-500"
                      }`}
                    >
                      {React.createElement(item.icon, { size: 18 })}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Vertical Divider */}
        <div className="w-full border-t border-gray-700 mt-auto mb-4"></div>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-500">
          <span className="font-bold text-md">
            <span className="text-blue-500">Arusha</span>&nbsp;<span className="text-yellow-500">Science</span>  &copy; 2025
          </span>
        </div>
      </aside>

      {/* Bottom Navbar (Only Visible on Small Screens) */}
      <nav className="fixed bottom-0 left-0 w-full bg-black text-gray-300 border-t border-gray-700 flex md:hidden justify-around py-3">
        <Link href="/admin/dashboard" className={`flex flex-col items-center ${pathname === "/admin/dashboard" ? "text-blue-500" : "hover:text-blue-500"}`}>
          <Home size={20} />
        </Link>
        <Link href="/admin/dashboard/projects" className={`flex flex-col items-center ${pathname === "/admin/dashboard/projects" ? "text-blue-500" : "hover:text-blue-500"}`}>
          <Folder size={20} />
        </Link>
        <Link href="/admin/dashboard/tasks" className={`flex flex-col items-center ${pathname === "/admin/dashboard/tasks" ? "text-blue-500" : "hover:text-blue-500"}`}>
          <ListChecks size={20} />
        </Link>
        <Link href="/admin/dashboard/reports" className={`flex flex-col items-center ${pathname === "/admin/dashboard/reports" ? "text-blue-500" : "hover:text-blue-500"}`}>
          <BarChart size={20} />
        </Link>
        <Link href="/admin/dashboard/settings" className={`flex flex-col items-center ${pathname === "/admin/dashboard/settings" ? "text-blue-500" : "hover:text-blue-500"}`}>
          <Settings size={20} />
        </Link>
      </nav>
    </>
  );
};

export { Sidebar };
