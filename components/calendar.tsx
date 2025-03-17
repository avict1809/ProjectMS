"use client"

import React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define the Milestone type
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

export default function ProjectManagementPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  // Function to highlight dates with milestones
  const isDayWithMilestone = (date: Date) => {
    return milestones.some(
      (milestone) =>
        milestone.date.getDate() === date.getDate() &&
        milestone.date.getMonth() === date.getMonth() &&
        milestone.date.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Project Timeline</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Project Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between px-10">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  milestone: (date) => isDayWithMilestone(date),
                }}
                modifiersStyles={{
                  milestone: { fontWeight: "bold", backgroundColor: "rgba(0, 120, 255, 0.1)" },
                }}
              />
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border hidden md:block"
                modifiers={{
                  milestone: (date) => isDayWithMilestone(date),
                }}
                modifiersStyles={{
                  milestone: { fontWeight: "bold", backgroundColor: "rgba(0, 120, 255, 0.1)" },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Milestones Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 h-[19.2rem] overflow-y-auto">
                {milestones.map((milestone) => (
                  <li key={milestone.id} className="flex justify-between items-center bg-secondary p-1 rounded-xl">
                    <div>
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-gray-500">{milestone.date.toLocaleDateString()}</p>
                    </div>
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "default"
                          : milestone.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

