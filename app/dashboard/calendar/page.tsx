import ProjectManagementPage from "@/components/calendar";
import Timeline from "@/components/timeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Timeline Page",
}

type Milestone = {
  id: number
  title: string
  date: Date
  status: "completed" | "in-progress" | "upcoming"
}

// Sample milestone data
const milestones: Milestone[] = [
  { id: 1, title: "Project Kickoff", date: new Date(2024, 5, 1), status: "completed" },
  { id: 2, title: "Design Phase Complete", date: new Date(2024, 6, 15), status: "completed" },
  { id: 3, title: "MVP Release", date: new Date(2025, 7, 30), status: "in-progress" },
  { id: 4, title: "User Testing", date: new Date(2025, 8, 15), status: "in-progress" },
  { id: 5, title: "Final Release", date: new Date(2025, 9, 1), status: "in-progress" },
  { id: 6, title: "Assesment", date: new Date(2025, 9, 1), status: "upcoming" },
  { id: 7, title: "Project Launching", date: new Date(2025, 9, 5), status: "upcoming" },
  { id: 8, title: "Project presentation", date: new Date(2025, 9, 12), status: "upcoming" },
]
const Page = () => {
  return (
    <>
      <ProjectManagementPage />
      <Timeline milestones={milestones}/>
    </>

  )
}

export default Page;  