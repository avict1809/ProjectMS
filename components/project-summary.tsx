"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

interface ProjectSummaryProps {
  summary: {
    tasksDone: number
    tasksTotal: number
    documents: number
    pendingReports: number
  }
}

export function ProjectSummary({ summary }: ProjectSummaryProps) {
  const taskCompletionPercentage = Math.round((summary.tasksDone / summary.tasksTotal) * 100)

  // Data for the bar chart
  const barChartData = [
    { name: "Tasks Done", value: summary.tasksDone },
    { name: "Tasks Remaining", value: summary.tasksTotal - summary.tasksDone },
    { name: "Documents", value: summary.documents },
    { name: "Pending Reports", value: summary.pendingReports },
  ]

  // Data for the pie chart
  const pieChartData = [
    { name: "Completed", value: summary.tasksDone },
    { name: "Remaining", value: summary.tasksTotal - summary.tasksDone },
  ]

  const COLORS = ["#10b981", "#f43f5e", "#3b82f6", "#f59e0b"]

  // Chart configuration
  const chartConfig: ChartConfig = {
    colors: {
      theme: {
        light: COLORS[0], 
        dark: COLORS[1],  
      },
    },
  };  

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.tasksDone} / {summary.tasksTotal}
            </div>
            <Progress value={taskCompletionPercentage} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">{taskCompletionPercentage}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.documents}</div>
            <p className="mt-2 text-xs text-muted-foreground">Project documentation and files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pendingReports}</div>
            <p className="mt-2 text-xs text-muted-foreground">Reports awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCompletionPercentage}%</div>
            <p className="mt-2 text-xs text-muted-foreground">Overall project completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Metrics</CardTitle>
            <CardDescription>Overview of key project metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="font-medium">{payload[0].name}</div>
                              <div className="text-muted-foreground">{payload[0].value}</div>
                            </ChartTooltipContent>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Progress of task completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

