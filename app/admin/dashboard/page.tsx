import { MainDiv } from "@/components/maindiv"
import { Navbar } from "@/components/navbar"
import Services from "@/components/services"
import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardSummary } from "@/components/dashboard-summary"
import { Folder, ListChecks, Users, Calendar, BarChart, ClipboardList, File, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NezukoMS",
  description: "Welcome to Nezuko",
}

const servicesData = [
  {
    section: "Project Management",
    items: [
      { label: "Projects", icon: Folder, link: "/dashboard/projects" },
      { label: "Tasks", icon: ListChecks, link: "/dashboard/tasks" },
      { label: "Teams", icon: Users, link: "/dashboard/teams" },
      { label: "Calendar", icon: Calendar, link: "/dashboard/calendar" },
    ],
  },
  {
    section: "Reports & Logs",
    items: [
      { label: "Reports", icon: BarChart, link: "/dashboard/reports" },
      { label: "Activity Log", icon: ClipboardList, link: "/dashboard/activity-log" },
    ],
  },
  {
    section: "Resources",
    items: [
      { label: "Files", icon: File, link: "/dashboard/files" },
      { label: "Documentation", icon: FileText, link: "/dashboard/docs" },
    ],
  },
]

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black items-center">
      <div className="w-full max-w-6xl lg:px-2">
        <Navbar />
        <MainDiv />
        {/* Summary Cards */}
        <DashboardSummary />
        {/* Charts */}
        <DashboardCharts />
        {/* Project Management */}
        <Services data={servicesData} />
      </div>
    </div>
  )
}

export default Dashboard

