import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function TeamCollaboration() {
  const teams = [
    {
      name: "Frontend Squad",
      members: 6,
      activeTasks: 12,
      completedTasks: 87,
      progress: 68,
      technologies: ["React", "Next.js", "Tailwind"],
      members_preview: [
        { name: "Alex K", image: "/placeholder.svg?height=40&width=40" },
        { name: "Maria L", image: "/placeholder.svg?height=40&width=40" },
        { name: "John D", image: "/placeholder.svg?height=40&width=40" },
      ],
    },
    {
      name: "Backend Team",
      members: 4,
      activeTasks: 8,
      completedTasks: 64,
      progress: 72,
      technologies: ["Node.js", "PostgreSQL", "Redis"],
      members_preview: [
        { name: "Sarah M", image: "/placeholder.svg?height=40&width=40" },
        { name: "David R", image: "/placeholder.svg?height=40&width=40" },
      ],
    },
    {
      name: "DevOps Crew",
      members: 3,
      activeTasks: 5,
      completedTasks: 42,
      progress: 85,
      technologies: ["Docker", "Kubernetes", "AWS"],
      members_preview: [
        { name: "James T", image: "/placeholder.svg?height=40&width=40" },
        { name: "Lisa P", image: "/placeholder.svg?height=40&width=40" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {teams.map((team, index) => (
        <Card key={index} className=" border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{team.name}</h3>
                <div className="text-gray-400">{team.members} members</div>
              </div>

              <div className="flex mt-4 md:mt-0">
                <div className="flex -space-x-2">
                  {team.members_preview.map((member, i) => (
                    <Avatar key={i} className="border-2 border-gray-800 h-8 w-8">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members > team.members_preview.length && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 text-xs">
                      +{team.members - team.members_preview.length}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Team Progress</span>
                <span className="text-sm font-medium">{team.progress}%</span>
              </div>
              <Progress value={team.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-400">Active Tasks</div>
                <div className="font-medium">{team.activeTasks}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Completed Tasks</div>
                <div className="font-medium">{team.completedTasks}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Technologies</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {team.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

