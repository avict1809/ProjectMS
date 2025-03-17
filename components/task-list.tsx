"use client"
import { Calendar, Edit, MoreHorizontal, Trash2, AlertTriangle } from "lucide-react"
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "in-progress":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dateString: string) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    return dueDate < today && !dateString.includes("completed")
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted/40 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card key={task.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-xl">{task.title}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditTask(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteTask(task.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {task.status === "todo" ? "To Do" : task.status === "in-progress" ? "In Progress" : "Completed"}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
            </div>

            {task.challenges && (
              <div className="bg-muted p-3 rounded-md mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium mb-1">Challenges Faced:</p>
                    <p className="text-sm">{task.challenges}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span
                        className={
                          isOverdue(task.dueDate) && task.status !== "completed" ? "text-destructive font-medium" : ""
                        }
                      >
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isOverdue(task.dueDate) && task.status !== "completed" ? "This task is overdue!" : "Due date"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm">{task.assignee}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

