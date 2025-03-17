import { Folder, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const taskFolders = [
  { id: 1, name: "Design Tasks", count: 12, updatedAt: "2 days ago" },
  { id: 2, name: "Development", count: 24, updatedAt: "1 day ago" },
  { id: 3, name: "Marketing", count: 8, updatedAt: "3 days ago" },
  { id: 4, name: "Research", count: 5, updatedAt: "5 hours ago" },
  { id: 5, name: "Client Feedback", count: 3, updatedAt: "Just now" },
  { id: 6, name: "Project Resources", count: 18, updatedAt: "1 week ago" },
]

export function FolderGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
      {taskFolders.map((folder) => (
        <Link href={`/files/folder/${folder.id}`} key={folder.id} className="block">
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center pt-6">
              <div className="relative">
                <Folder className="h-16 w-16 text-blue-500" />
                <div className="absolute -top-1 -right-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h3 className="font-medium mt-2 text-center">{folder.name}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
              <span>{folder.count} files</span>
              <span>{folder.updatedAt}</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

