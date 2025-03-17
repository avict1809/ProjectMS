"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
interface contrib{ date: Date; count: number; level: number; }

export function ProjectContributions() {
  // In a real app, this data would come from your API
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Mon", "Wed", "Fri"]

  // Generate sample contribution data
  const generateContributions = () => {
    const contributions: contrib[] = []
    for (let month = 0; month < 12; month++) {
      for (let day = 0; day < 3; day++) {
        for (let week = 0; week < 4; week++) {
          // Random contribution level (0-4)
          const level = Math.floor(Math.random() * 5)
          contributions.push({
            date: new Date(2023, month, week * 7 + day * 2 + 1),
            count: level === 0 ? 0 : level * Math.floor(Math.random() * 5 + 1),
            level,
          })
        }
      }
    }
    return contributions
  }

  const contributions = generateContributions()

  // Get contribution level (0-4) for a specific day and month
  const getContributionLevel = (day: string, month: string) => {
    const dayIndex = days.indexOf(day)
    const monthIndex = months.indexOf(month)

    if (dayIndex === -1 || monthIndex === -1) return 0

    // Find a contribution that matches this day and month
    const weekOffset = Math.floor(Math.random() * 4) // Just for demonstration
    const contribution = contributions.find(
      (c) =>
        c.date.getMonth() === monthIndex &&
        c.date.getDay() === (dayIndex * 2 + 1) % 7 &&
        Math.floor(c.date.getDate() / 7) === weekOffset,
    )

    return contribution ? contribution.level : 0
  }

  // Get color based on contribution level
  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-100 dark:", // Level 0 (no contributions)
      "bg-emerald-200 dark:bg-emerald-900", // Level 1
      "bg-emerald-300 dark:bg-emerald-800", // Level 2
      "bg-emerald-400 dark:bg-emerald-700", // Level 3
      "bg-emerald-500 dark:bg-emerald-600", // Level 4
    ]
    return colors[level]
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="flex">
            <div className="w-12"></div>
            {months.map((month) => (
              <div key={month} className="flex-1 text-center text-sm text-muted-foreground">
                {month}
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className="flex items-center">
              <div className="w-12 text-sm text-muted-foreground">{day}</div>
              {months.map((month) => (
                <div key={`${day}-${month}`} className="flex-1 p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`h-4 w-full rounded-sm ${getLevelColor(getContributionLevel(day, month))}`}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {getContributionLevel(day, month) === 0
                            ? "No contributions"
                            : `${getContributionLevel(day, month) * 2} contributions`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between">
            <button className="text-xs text-blue-500 hover:underline">Learn how we count contributions</button>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`h-3 w-3 rounded-sm ${getLevelColor(level)}`}></div>
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

