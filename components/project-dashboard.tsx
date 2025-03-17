"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ProjectContributions } from "@/components/project-contributions"
import { ProjectTools } from "@/components/project-tools"
import { ProjectSummary } from "@/components/project-summary"

export function ProjectDashboard() {
  // This would come from your API in a real application
  const project = {
    name: "Marketing Website Redesign",
    description:
      "Complete overhaul of the company marketing website with new branding, improved UX, and optimized performance for mobile devices.",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    status: "In Progress",
    members: [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Project Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "alex@example.com",
      },
      {
        id: 2,
        name: "Sam Wilson",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "sam@example.com",
      },
      {
        id: 3,
        name: "Taylor Smith",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "taylor@example.com",
      },
      {
        id: 4,
        name: "Jordan Lee",
        role: "Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "jordan@example.com",
      },
      {
        id: 5,
        name: "Casey Brown",
        role: "Content Strategist",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "casey@example.com",
      },
    ],
    tools: [
      { id: 1, name: "Figma", category: "Design", icon: "figma" },
      { id: 2, name: "React", category: "Frontend", icon: "code" },
      { id: 3, name: "Node.js", category: "Backend", icon: "server" },
      { id: 4, name: "GitHub", category: "Version Control", icon: "github" },
      { id: 5, name: "Slack", category: "Communication", icon: "message-square" },
      { id: 6, name: "Notion", category: "Documentation", icon: "file-text" },
      { id: 7, name: "Vercel", category: "Deployment", icon: "globe" },
    ],
    summary: {
      tasksDone: 78,
      tasksTotal: 120,
      documents: 45,
      pendingReports: 3,
    },
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{project.status}</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{project.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Members</CardTitle>
              <CardDescription>Team members working on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {project.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
              <CardDescription>Team activity over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectContributions />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tools & Technologies</CardTitle>
              <CardDescription>Tools and technologies used in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectTools tools={project.tools} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>Overview of project progress and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectSummary summary={project.summary} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

