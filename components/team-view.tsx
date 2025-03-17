"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Mail, Phone, MoreVertical, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    department: "Management",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: 2,
    name: "Sam Williams",
    role: "Frontend Developer",
    email: "sam.williams@example.com",
    phone: "+1 (555) 234-5678",
    department: "Development",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: 3,
    name: "Taylor Smith",
    role: "Backend Developer",
    email: "taylor.smith@example.com",
    phone: "+1 (555) 345-6789",
    department: "Development",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "UI/UX Designer",
    email: "jordan.lee@example.com",
    phone: "+1 (555) 456-7890",
    department: "Design",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: 5,
    name: "Casey Brown",
    role: "QA Engineer",
    email: "casey.brown@example.com",
    phone: "+1 (555) 567-8901",
    department: "Quality Assurance",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active",
  },
  {
    id: 6,
    name: "Riley Garcia",
    role: "DevOps Engineer",
    email: "riley.garcia@example.com",
    phone: "+1 (555) 678-9012",
    department: "Operations",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive",
  },
]

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter team members based on search query and filters
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter

    const matchesStatus = statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Get unique departments for filter dropdown
  const departments = ["all", ...new Set(teamMembers.map((member) => member.department))]
  const statuses = ["all", ...new Set(teamMembers.map((member) => member.status))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <Button className="sm:ml-2">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button> */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.charAt(0)}
                      {member.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={'/dashboard/profile'}>View Profile</Link>
                        </DropdownMenuItem>
                    {/* <DropdownMenuItem>Assign to Project</DropdownMenuItem> */}
                    {/* <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Badge
                variant={
                  member.status === "Active" ? "default" : member.status === "On Leave" ? "destructive" : "secondary"
                }
              >
                {member.status}
              </Badge>
              <span className="text-sm text-muted-foreground">{member.department}</span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No team members found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

