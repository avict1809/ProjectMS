"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, Flag, GitPullRequest, CheckCircle, Clock, Award, Users } from "lucide-react"
import ContributionGraph from "@/components/contribution-graph"
import ProjectStats from "@/components/project-stats"
import TeamCollaboration from "@/components/team-collaboration"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  console.log(activeTab)

  return (
    <div className="min-h-screen 0 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-2 border-gray-700">
              <img src="/placeholder.svg?height=96&width=96" alt="User avatar" />
            </Avatar>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Aaron Victor</h1>
                <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                  Project Lead
                </Badge>
              </div>
              <div className="text-gray-400 mt-1">Joined 15 Mar 2023</div>
              <div className="text-gray-400">Current streak: 14 days</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>12 teams</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={16} />
                  <span>Top contributor</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-0">
            <StatCard title="Projects Started" value="147" icon={<Flag className="h-5 w-5 text-blue-400" />} />
            <StatCard title="Projects Completed" value="70" icon={<CheckCircle className="h-5 w-5 text-green-400" />} />
            <StatCard title="Projects Pending" value="77" icon={<Clock className="h-5 w-5 text-purple-400" />} />
          </div>
        </div>

        {/* Performance Metrics */}
        <Card className="mb-8  border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard title="Task Completion Rate" value="92%" subtext="Last 30 days" />
              <MetricCard title="On-time Delivery" value="88%" subtext="Last 30 days" />
              <MetricCard title="Dept satisfaction" value="A+" subtext="Based on SITU dpt" />
              <MetricCard title="Team Satisfaction" value="4.8/5" subtext="Based on 36 reviews" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className=" border-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card className=" border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Project involvement</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <VelocityCard title="Team Planning" value="95%" timeframe="15 min" />
                  <VelocityCard title="Task Execution" value="87%" timeframe="30 min" />
                  <VelocityCard title="Consistency" value="92%" timeframe="5 days" />
                  <VelocityCard title="Accomplishments" value="98%" timeframe="120 min" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <ProjectStats />
          </TabsContent>

          <TabsContent value="teams" className="mt-4">
            <TeamCollaboration />
          </TabsContent>

          <TabsContent value="contributions" className="mt-4">
            <Card className=" border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contribution Activity</h2>
                <div className="space-y-4">
                  <ActivityItem
                    title="Finished designing front-end"
                    time="2 hours ago"
                    type="Task Update"
                  />
                  <ActivityItem title="Updated list of tools" time="Yesterday" type="review" />
                  <ActivityItem
                    title="Uploaded files"
                    time="2 days ago"
                    type="issue"
                  />
                  <ActivityItem title="Reported an issue" time="3 days ago" type="deployment" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contribution Graph */}
        <Card className=" border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">453 contributions in the last year</h2>
              <div className="flex items-center gap-2 text-sm">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-emerald-900 rounded-sm"></div>
                  <div className="w-3 h-3 bg-emerald-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                  <div className="w-3 h-3 bg-emerald-300 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>
            <ContributionGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon } : {title: string, value: string | number, icon: React.ReactNode}) {
  return (
    <div className=" rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function MetricCard({ title, value, subtext }: {title: string, value: string | number, subtext: string}) {
  return (
    <div className="flex flex-col">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{subtext}</div>
    </div>
  )
}

function VelocityCard({ title, value, timeframe }: {title: string, value: string | number, timeframe: string}) {
  return (
    <div className="0 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{timeframe}</div>
    </div>
  )
}

function ActivityItem({ title, time, type }: {title: string, time: string, type: string}) {
  const getIcon = () => {
    switch (type) {
      case "pull-request":
        return <GitPullRequest className="h-5 w-5 text-purple-400" />
      case "review":
        return <CheckCircle className="h-5 w-5 text-blue-400" />
      case "issue":
        return <Flag className="h-5 w-5 text-yellow-400" />
      case "deployment":
        return <CalendarClock className="h-5 w-5 text-green-400" />
      default:
        return <GitPullRequest className="h-5 w-5" />
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg">
      {getIcon()}
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-400">{time}</div>
      </div>
    </div>
  )
}

