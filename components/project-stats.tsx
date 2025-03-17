import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Code2, GitPullRequest, Users } from "lucide-react"

export default function ProjectStats() {
  const projects = [
    {
      name: "Project Phoenix",
      role: "Project Lead",
      progress: 75,
      team: 8,
      tasks: { completed: 42, total: 56 },
      prs: 24,
      commits: 187,
      status: "In Progress",
    },
    {
      name: "Dashboard Redesign",
      role: "Frontend Developer",
      progress: 92,
      team: 5,
      tasks: { completed: 38, total: 41 },
      prs: 18,
      commits: 94,
      status: "Review",
    },
    {
      name: "API Integration",
      role: "Backend Developer",
      progress: 100,
      team: 4,
      tasks: { completed: 29, total: 29 },
      prs: 15,
      commits: 76,
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={index} className="border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <div className="text-gray-400">{project.role}</div>
              </div>
              <div
                className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === "Completed"
                    ? "bg-green-900/30 text-green-400"
                    : project.status === "Review"
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-yellow-900/30 text-yellow-400"
                }`}
              >
                {project.status}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatItem icon={<Users className="h-4 w-4 text-blue-400" />} label="Team Size" value={project.team} />
              <StatItem
                icon={<CheckCircle2 className="h-4 w-4 text-green-400" />}
                label="Tasks"
                value={`${project.tasks.completed}/${project.tasks.total}`}
              />
              <StatItem
                icon={<GitPullRequest className="h-4 w-4 text-purple-400" />}
                label="Pull Requests"
                value={project.prs}
              />
              <StatItem icon={<Code2 className="h-4 w-4 text-yellow-400" />} label="Commits" value={project.commits} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value:  string | number}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  )
}

