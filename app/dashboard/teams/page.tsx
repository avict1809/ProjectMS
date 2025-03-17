import { TeamView } from "@/components/team-view"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Teams',
  description: 'View your team and manage the work flow',
};


export default function TeamPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>
      <TeamView />
    </div>
  )
}

