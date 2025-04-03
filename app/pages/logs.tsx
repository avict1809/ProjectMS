"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Filter, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for project logs
const mockLogs = [
  {
    id: 1,
    timestamp: new Date("2025-04-03T14:30:00"),
    user: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    actionType: "task_created",
    description: "Created task 'Implement user authentication'",
    project: "Website Redesign",
    task: "Implement user authentication",
  },
  {
    id: 2,
    timestamp: new Date("2025-04-03T13:15:00"),
    user: {
      id: 2,
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    actionType: "comment_added",
    description: "Added comment on 'Design homepage mockup'",
    project: "Website Redesign",
    task: "Design homepage mockup",
  },
  {
    id: 3,
    timestamp: new Date("2025-04-03T11:45:00"),
    user: {
      id: 3,
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
    },
    actionType: "task_completed",
    description: "Marked task 'Setup project repository' as complete",
    project: "Website Redesign",
    task: "Setup project repository",
  },
  {
    id: 4,
    timestamp: new Date("2025-04-02T16:20:00"),
    user: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    actionType: "file_uploaded",
    description: "Uploaded file 'design-specs.pdf'",
    project: "Website Redesign",
    task: "Design specifications",
  },
  {
    id: 5,
    timestamp: new Date("2025-04-02T14:10:00"),
    user: {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    actionType: "task_assigned",
    description: "Assigned task 'Implement user authentication' to Alex Johnson",
    project: "Website Redesign",
    task: "Implement user authentication",
  },
  {
    id: 6,
    timestamp: new Date("2025-04-02T10:30:00"),
    user: {
      id: 2,
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    actionType: "task_updated",
    description: "Updated due date for 'Design homepage mockup'",
    project: "Website Redesign",
    task: "Design homepage mockup",
  },
  {
    id: 7,
    timestamp: new Date("2025-04-01T15:45:00"),
    user: {
      id: 5,
      name: "Michael Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    actionType: "project_created",
    description: "Created project 'Website Redesign'",
    project: "Website Redesign",
    task: null,
  },
]

// Action type mapping for badges
const actionTypeMap = {
  task_created: { label: "Task Created", color: "bg-green-100 text-green-800" },
  comment_added: { label: "Comment Added", color: "bg-blue-100 text-blue-800" },
  task_completed: { label: "Task Completed", color: "bg-purple-100 text-purple-800" },
  file_uploaded: { label: "File Uploaded", color: "bg-yellow-100 text-yellow-800" },
  task_assigned: { label: "Task Assigned", color: "bg-indigo-100 text-indigo-800" },
  task_updated: { label: "Task Updated", color: "bg-orange-100 text-orange-800" },
  project_created: { label: "Project Created", color: "bg-pink-100 text-pink-800" },
}

export default function ProjectLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState("all")
  const [selectedAction, setSelectedAction] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Filter logs based on search query, selected user, action type, and date
  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.task && log.task.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesUser = selectedUser === "all" || log.user.id.toString() === selectedUser

    const matchesAction = selectedAction === "all" || log.actionType === selectedAction

    const matchesDate =
      !date ||
      (log.timestamp.getDate() === date.getDate() &&
        log.timestamp.getMonth() === date.getMonth() &&
        log.timestamp.getFullYear() === date.getFullYear())

    return matchesSearch && matchesUser && matchesAction && matchesDate
  })

  // Get unique users for the filter
  const uniqueUsers = Array.from(new Set(mockLogs.map((log) => log.user.id))).map((userId) => {
    const user = mockLogs.find((log) => log.user.id === userId)?.user
    return user
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Project Activity Logs</h1>
          <p className="text-muted-foreground">View all activities performed by team members in your project.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Showing {filteredLogs.length} activities</CardDescription>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8 md:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-[180px]">
                  <User className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user?.id} value={user?.id.toString() || ""}>
                      {user?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-[180px]">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {Object.entries(actionTypeMap).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              {date && (
                <Button variant="ghost" size="sm" onClick={() => setDate(undefined)} className="h-9">
                  Clear date
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={log.user.avatar} alt={log.user.name} />
                      <AvatarFallback>{log.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="font-medium">{log.user.name}</p>
                          <Badge
                            className={`ml-2 ${actionTypeMap[log.actionType as keyof typeof actionTypeMap].color}`}
                          >
                            {actionTypeMap[log.actionType as keyof typeof actionTypeMap].label}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(log.timestamp, "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      <p>{log.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Project: {log.project}</span>
                        {log.task && (
                          <>
                            <span>•</span>
                            <span>Task: {log.task}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No logs found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

