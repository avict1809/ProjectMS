"use client"
import Link from "next/link";
import { Bell, Sparkles, HelpCircle } from "lucide-react";

const SlimSidebar = () => {
  return (
    <aside className="hidden md:flex bg-black h-screen w-16 md:flex-col items-center py-4 border-r border-gray-700">
      {/* Profile Picture */}
      <div className="w-10 h-10 rounded-full bg-gray-500 mb-6"></div>

      {/* Icons with Links */}
      <nav className="flex flex-col space-y-6 text-gray-400">
        <Link href="/dashboard/notifications" className="cursor-pointer hover:text-white">
          <Bell size={24} />
        </Link>
        <Link href="/dashboard/features" className="cursor-pointer hover:text-white">
          <Sparkles size={24} />
        </Link>
        <Link href="/docs" className="cursor-pointer hover:text-white">
          <HelpCircle size={24} />
        </Link>
      </nav>

      {/* Spacer to push icons up */}
      <div className="flex-grow"></div>
    </aside>
  );
};

export { SlimSidebar };
