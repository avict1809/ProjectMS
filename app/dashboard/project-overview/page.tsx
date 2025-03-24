import { ProjectDashboard } from "@/components/project-dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Project Overview'
}

export default function Home() {
  return <ProjectDashboard />
}

