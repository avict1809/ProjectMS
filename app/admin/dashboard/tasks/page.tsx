import TaskManagement from "@/components/task-management"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Task Management",
  description: "Manage your tasks effectively and seamlessly at ease!"
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TaskManagement />
    </main>
  )
}

