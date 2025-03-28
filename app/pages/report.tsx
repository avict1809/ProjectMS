"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react"
import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for charts
const taskStatusData = [
  { name: "Completed", value: 42, color: "hsl(var(--primary))" },
  { name: "In Progress", value: 15, color: "#FFBB28" },
  { name: "Blocked", value: 3, color: "#FF8042" },
  { name: "Not Started", value: 5, color: "#CCCCCC" },
]

const weeklyProgressData = [
  { name: "Week 1", tasks: 12, progress: 65 },
  { name: "Week 2", tasks: 8, progress: 50 },
  { name: "Week 3", tasks: 15, progress: 75 },
  { name: "Week 4", tasks: 10, progress: 60 },
  { name: "Week 5", tasks: 14, progress: 80 },
  { name: "Week 6", tasks: 7, progress: 40 },
]

const burndownData = [
  { name: "Oct 1", planned: 65, actual: 65 },
  { name: "Oct 8", planned: 55, actual: 58 },
  { name: "Oct 15", planned: 45, actual: 50 },
  { name: "Oct 22", planned: 35, actual: 42 },
  { name: "Oct 29", planned: 25, actual: 30 },
  { name: "Nov 5", planned: 15, actual: 22 },
  { name: "Nov 12", planned: 5, actual: 15 },
  { name: "Nov 19", planned: 0, actual: 8 },
]


export default function ProjectReportPage() {
  const [chartType, setChartType] = useState("bar")

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Status Report</h1>
          <p className="text-muted-foreground">Comprehensive overview of project progress and metrics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="project-alpha">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-alpha">Project Alpha</SelectItem>
              <SelectItem value="project-beta">Project Beta</SelectItem>
              <SelectItem value="project-gamma">Project Gamma</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42/65</div>
            <Progress value={64} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">12 tasks completed this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <Progress value={30} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Deadline: Nov 24, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <Progress value={72} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">$36,000 of $50,000 used</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
            <CardDescription>Breakdown of tasks by their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ChartContainer
                config={{
                  tasks: {
                    label: "Tasks",
                  },
                  completed: {
                    label: "Completed",
                    color: "hsl(var(--primary))",
                  },
                  inProgress: {
                    label: "In Progress",
                    color: "#FFBB28",
                  },
                  blocked: {
                    label: "Blocked",
                    color: "#FF8042",
                  },
                  notStarted: {
                    label: "Not Started",
                    color: "#CCCCCC",
                  },
                }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Team Workload</CardTitle>
            <CardDescription>Current task distribution among team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">Lead Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>8 tasks</Badge>
                  <Progress value={80} className="h-2 w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Miller" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Miller</p>
                    <p className="text-xs text-muted-foreground">UI Designer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>6 tasks</Badge>
                  <Progress value={60} className="h-2 w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="David Chen" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">David Chen</p>
                    <p className="text-xs text-muted-foreground">Backend Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>10 tasks</Badge>
                  <Progress value={100} className="h-2 w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Emily Wong" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Emily Wong</p>
                    <p className="text-xs text-muted-foreground">QA Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>5 tasks</Badge>
                  <Progress value={50} className="h-2 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Current project risks and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-600 dark:text-red-400">API Integration Delay</h4>
                    <p className="text-sm text-muted-foreground">
                      Third-party API integration is delayed due to documentation issues.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        High Risk
                      </Badge>
                      <span className="text-xs text-muted-foreground">Impact: Schedule</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-600 dark:text-yellow-400">Resource Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Backend developer availability may be limited in the coming sprint.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      >
                        Medium Risk
                      </Badge>
                      <span className="text-xs text-muted-foreground">Impact: Resources</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-600 dark:text-blue-400">Scope Creep</h4>
                    <p className="text-sm text-muted-foreground">
                      Client has requested additional features not in original scope.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        Low Risk
                      </Badge>
                      <span className="text-xs text-muted-foreground">Impact: Budget</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Milestone Timeline</CardTitle>
            <CardDescription>Key project milestones and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 border-l space-y-6">
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-green-500 border-4 border-background">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-medium">Project Kickoff</h4>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Oct 1, 2023</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-green-500 border-4 border-background">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-medium">Design Approval</h4>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Oct 15, 2023</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-yellow-500 border-4 border-background">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-medium">MVP Release</h4>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    In Progress
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Nov 10, 2023</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-gray-300 border-4 border-background dark:bg-gray-600">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-medium">User Testing</h4>
                  <Badge variant="outline">Not Started</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Nov 20, 2023</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-gray-300 border-4 border-background dark:bg-gray-600">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <h4 className="font-medium">Final Delivery</h4>
                  <Badge variant="outline">Not Started</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Dec 5, 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Project Progress Trends</CardTitle>
            <CardDescription>Task completion and burndown over time</CardDescription>
          </div>
          <Tabs value={chartType} onValueChange={setChartType} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bar">Weekly Tasks</TabsTrigger>
              <TabsTrigger value="line">Burndown Chart</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                trends: {
                  label: "Trends",
                },
                tasks: {
                  label: "Tasks Completed",
                  color: "hsl(var(--primary))",
                },
                progress: {
                  label: "Progress %",
                  color: "#82ca9d",
                },
                planned: {
                  label: "Planned Tasks Remaining",
                  color: "#8884d8",
                },
                actual: {
                  label: "Actual Tasks Remaining",
                  color: "#82ca9d",
                },
              }}
              className="w-full h-full"
            >
              {chartType === "bar" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyProgressData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="tasks" name="Tasks Completed" fill="var(--color-tasks)" />
                    <Bar dataKey="progress" name="Progress %" fill="var(--color-progress)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={burndownData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="planned"
                      name="Planned Tasks Remaining"
                      stroke="var(--color-planned)"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="actual" name="Actual Tasks Remaining" stroke="var(--color-actual)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

