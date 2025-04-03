// Mock data structure to simulate API response
export interface User {
    id: number
    name: string
    avatar: string
    initials: string
  }
  
  export interface ActivityLog {
    id: number
    timestamp: string // ISO string format
    userId: number
    actionType: ActivityType
    description: string
    project: string
    task: string | null
  }
  
  export type ActivityType =
    | "task_created"
    | "comment_added"
    | "task_completed"
    | "file_uploaded"
    | "task_assigned"
    | "task_updated"
    | "project_created"
  
  // Action type mapping for badges
  export const actionTypeMap = {
    task_created: { label: "Task Created", color: "bg-green-100 text-green-800" },
    comment_added: { label: "Comment Added", color: "bg-blue-100 text-blue-800" },
    task_completed: { label: "Task Completed", color: "bg-purple-100 text-purple-800" },
    file_uploaded: { label: "File Uploaded", color: "bg-yellow-100 text-yellow-800" },
    task_assigned: { label: "Task Assigned", color: "bg-indigo-100 text-indigo-800" },
    task_updated: { label: "Task Updated", color: "bg-orange-100 text-orange-800" },
    project_created: { label: "Project Created", color: "bg-pink-100 text-pink-800" },
  }
  
  // Mock users data
  export const users: User[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    {
      id: 2,
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    {
      id: 5,
      name: "Michael Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
  ]
  
  // Mock activity logs data
  export const activityLogs: ActivityLog[] = [
    {
      id: 1,
      timestamp: "2025-04-03T14:30:00Z",
      userId: 1,
      actionType: "task_created",
      description: "Created task 'Implement user authentication'",
      project: "Website Redesign",
      task: "Implement user authentication",
    },
    {
      id: 2,
      timestamp: "2025-04-03T13:15:00Z",
      userId: 2,
      actionType: "comment_added",
      description: "Added comment on 'Design homepage mockup'",
      project: "Website Redesign",
      task: "Design homepage mockup",
    },
    {
      id: 3,
      timestamp: "2025-04-03T11:45:00Z",
      userId: 3,
      actionType: "task_completed",
      description: "Marked task 'Setup project repository' as complete",
      project: "Website Redesign",
      task: "Setup project repository",
    },
    {
      id: 4,
      timestamp: "2025-04-02T16:20:00Z",
      userId: 1,
      actionType: "file_uploaded",
      description: "Uploaded file 'design-specs.pdf'",
      project: "Website Redesign",
      task: "Design specifications",
    },
    {
      id: 5,
      timestamp: "2025-04-02T14:10:00Z",
      userId: 4,
      actionType: "task_assigned",
      description: "Assigned task 'Implement user authentication' to Alex Johnson",
      project: "Website Redesign",
      task: "Implement user authentication",
    },
    {
      id: 6,
      timestamp: "2025-04-02T10:30:00Z",
      userId: 2,
      actionType: "task_updated",
      description: "Updated due date for 'Design homepage mockup'",
      project: "Website Redesign",
      task: "Design homepage mockup",
    },
    {
      id: 7,
      timestamp: "2025-04-01T15:45:00Z",
      userId: 5,
      actionType: "project_created",
      description: "Created project 'Website Redesign'",
      project: "Website Redesign",
      task: null,
    },
    {
      id: 8,
      timestamp: "2025-04-01T11:20:00Z",
      userId: 3,
      actionType: "comment_added",
      description: "Added comment on 'Project timeline'",
      project: "Website Redesign",
      task: "Project timeline",
    },
    {
      id: 9,
      timestamp: "2025-03-31T16:45:00Z",
      userId: 4,
      actionType: "task_created",
      description: "Created task 'Setup CI/CD pipeline'",
      project: "Website Redesign",
      task: "Setup CI/CD pipeline",
    },
    {
      id: 10,
      timestamp: "2025-03-31T14:30:00Z",
      userId: 1,
      actionType: "task_completed",
      description: "Marked task 'Initial project planning' as complete",
      project: "Website Redesign",
      task: "Initial project planning",
    },
  ]
  
  // Function to simulate fetching data from an API
  export async function fetchActivityLogs(): Promise<{
    users: User[]
    logs: ActivityLog[]
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    return {
      users,
      logs: activityLogs,
    }
  }
  
  