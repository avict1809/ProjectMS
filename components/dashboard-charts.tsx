"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Sample data - replace with your actual data
const projectStatusData = [
  { name: "Completed", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Not Started", value: 5 },
  { name: "Delayed", value: 3 },
]

const taskCompletionData = [
  { date: "2024-01", completed: 15, total: 20 },
  { date: "2024-02", completed: 18, total: 22 },
  { date: "2024-03", completed: 25, total: 30 },
  { date: "2024-04", completed: 22, total: 25 },
  { date: "2024-05", completed: 30, total: 35 },
  { date: "2024-06", completed: 28, total: 32 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Project Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
          <CardDescription>Distribution of projects by status</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                color: "hsl(var(--chart-1))",
              },
              inProgress: {
                label: "In Progress",
                color: "hsl(var(--chart-2))",
              },
              notStarted: {
                label: "Not Started",
                color: "hsl(var(--chart-3))",
              },
              delayed: {
                label: "Delayed",
                color: "hsl(var(--chart-4))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value, entry, index) => (
                    <span style={{ color: COLORS[index % COLORS.length] }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Task Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion</CardTitle>
          <CardDescription>Task completion over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                color: "hsl(var(--chart-1))",
              },
              total: {
                label: "Total",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", { month: "short" })
                  }}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--color-completed)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

