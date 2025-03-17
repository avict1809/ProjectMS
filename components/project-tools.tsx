"use client"

import { Code, FileText, Figma, Github, Globe, MessageSquare, Server, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Tool {
  id: number
  name: string
  category: string
  icon: string
}

interface ProjectToolsProps {
  tools: Tool[]
}

export function ProjectTools({ tools }: ProjectToolsProps) {
  // Map icon names to Lucide icons
  const getIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
      figma: Figma,
      code: Code,
      server: Server,
      github: Github,
      "message-square": MessageSquare,
      "file-text": FileText,
      globe: Globe,
    }

    const IconComponent = icons[iconName] || FileText
    return <IconComponent className="h-5 w-5" />
  }

  // Group tools by category
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = []
      }
      acc[tool.category].push(tool)
      return acc
    },
    {} as Record<string, Tool[]>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-medium">{category}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categoryTools.map((tool) => (
              <div key={tool.id} className="flex items-center gap-3 rounded-lg border p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {getIcon(tool.icon)}
                </div>
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <Badge variant="outline" className="mt-1">
                    {tool.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

