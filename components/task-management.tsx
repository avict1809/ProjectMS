"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import type { Task } from "@/types/task"

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design User Interface",
      description: "Create wireframes and mockups for the new dashboard",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-03-15",
      assignee: "Alex Johnson",
      project: "Website Redesign",
      challenges: "Ensuring consistency across all device sizes has been challenging",
    },
    {
      id: "2",
      title: "Implement Authentication",
      description: "Set up user authentication with JWT and role-based access",
      status: "todo",
      priority: "high",
      dueDate: "2025-03-20",
      assignee: "Sam Wilson",
      project: "Website Redesign",
      challenges: "",
    },
    {
      id: "3",
      title: "Database Schema Design",
      description: "Design the database schema for the new features",
      status: "completed",
      priority: "medium",
      dueDate: "2025-03-10",
      assignee: "Jamie Lee",
      project: "Backend Overhaul",
      challenges: "Had to redesign the relationship between users and projects tables",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleAddTask = () => {
    setSelectedTask(null)
    setIsFormOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setIsFormOpen(true)
  }

  const handleSaveTask = (task: Task) => {
    if (task.id) {
      // Update existing task
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    } else {
      // Add new task
      const newTask = {
        ...task,
        id: Date.now().toString(),
      }
      setTasks([...tasks, newTask])
    }
    setIsFormOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    if (selectedTask?.id === taskId) {
      setSelectedTask(null)
      setIsFormOpen(false)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && task.status === activeTab
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">Manage and track your project tasks</p>
        </div>
        <Button onClick={handleAddTask} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <TaskList tasks={filteredTasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />

        {isFormOpen && (
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <TaskForm task={selectedTask} onSave={handleSaveTask} onCancel={() => setIsFormOpen(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

