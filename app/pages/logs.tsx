"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronDown, Filter, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchActivityLogs, type ActivityLog, actionTypeMap, type User as UserType } from "@/app/api/mock-data"

export default function ProjectLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState("all")
  const [selectedAction, setSelectedAction] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchActivityLogs()
        setUsers(data.users)
        setLogs(data.logs)
      } catch (error) {
        console.error("Error fetching activity logs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Process logs to include user data
  const processedLogs = logs.map((log) => {
    const user = users.find((u) => u.id === log.userId)
    return {
      ...log,
      user,
      timestampDate: parseISO(log.timestamp),
    }
  })

  // Filter logs based on search query, selected user, action type, and date
  const filteredLogs = processedLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.task && log.task.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesUser = selectedUser === "all" || log.userId.toString() === selectedUser

    const matchesAction = selectedAction === "all" || log.actionType === selectedAction

    const matchesDate =
      !date ||
      (log.timestampDate.getDate() === date.getDate() &&
        log.timestampDate.getMonth() === date.getMonth() &&
        log.timestampDate.getFullYear() === date.getFullYear())

    return matchesSearch && matchesUser && matchesAction && matchesDate
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
                <CardDescription>
                  {loading ? "Loading logs..." : `Showing ${filteredLogs.length} activities`}
                </CardDescription>
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
              <Select value={selectedUser} onValueChange={setSelectedUser} disabled={loading}>
                <SelectTrigger className="w-[180px]">
                  <User className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAction} onValueChange={setSelectedAction} disabled={loading}>
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
                    disabled={loading}
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
                <Button variant="ghost" size="sm" onClick={() => setDate(undefined)} className="h-9" disabled={loading}>
                  Clear date
                </Button>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <Card key={log.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={log.user?.avatar} alt={log.user?.name} />
                            <AvatarFallback>{log.user?.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center flex-wrap gap-2">
                                <p className="font-medium">{log.user?.name}</p>
                                <Badge className={actionTypeMap[log.actionType]?.color}>
                                  {actionTypeMap[log.actionType]?.label}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                                {format(log.timestampDate, "MMM d, yyyy 'at' h:mm a")}
                              </span>
                            </div>
                            <p className="mt-2">{log.description}</p>
                            <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground mt-2">
                              <span>Project: {log.project}</span>
                              {log.task && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <span>Task: {log.task}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

