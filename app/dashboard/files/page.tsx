import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderGrid } from "@/components/folder-grid"
import { FileGrid } from "@/components/file-grid"
import { ChevronDown, Grid2X2, List, Plus, Upload } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function FilesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Files</h1>
          <p className="text-muted-foreground">Manage and organize your project files</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New Folder</DropdownMenuItem>
              <DropdownMenuItem>New Document</DropdownMenuItem>
              <DropdownMenuItem>New Spreadsheet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="border rounded-md flex">
            <Button variant="ghost" size="icon" className="rounded-r-none">
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-l-none border-l">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/files">Files</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Project ProjectMS </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared with me</TabsTrigger>
          <TabsTrigger value="tasks">Task Files</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Task Folders</h2>
              <FolderGrid />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Files</h2>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
            <FileGrid />
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Task Folders</h2>
              <FolderGrid />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <FileGrid />
        </TabsContent>
        <TabsContent value="shared">
          <FileGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}

