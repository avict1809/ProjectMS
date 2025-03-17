"use client"

import { useState } from "react"
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontal,
  FileSpreadsheetIcon,
  FileIcon as FilePresentationIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const files = [
  {
    id: 1,
    name: "Project Brief.docx",
    type: "document",
    size: "245 KB",
    updatedAt: "2 days ago",
    thumbnail: null,
  },
  {
    id: 2,
    name: "Design Mockup.png",
    type: "image",
    size: "1.2 MB",
    updatedAt: "1 day ago",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Budget.xlsx",
    type: "spreadsheet",
    size: "345 KB",
    updatedAt: "3 days ago",
    thumbnail: null,
  },
  {
    id: 4,
    name: "Presentation.pptx",
    type: "presentation",
    size: "2.8 MB",
    updatedAt: "5 hours ago",
    thumbnail: null,
  },
  {
    id: 5,
    name: "Team Photo.jpg",
    type: "image",
    size: "3.4 MB",
    updatedAt: "Just now",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Requirements.pdf",
    type: "document",
    size: "567 KB",
    updatedAt: "1 week ago",
    thumbnail: null,
  },
  {
    id: 7,
    name: "Logo Design.png",
    type: "image",
    size: "845 KB",
    updatedAt: "2 days ago",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Meeting Notes.docx",
    type: "document",
    size: "125 KB",
    updatedAt: "Yesterday",
    thumbnail: null,
  },
]

export function FileGrid() {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])

  const toggleFileSelection = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileTextIcon className="h-12 w-12 text-blue-500" />
      case "image":
        return <ImageIcon className="h-12 w-12 text-green-500" />
      case "spreadsheet":
        return <FileSpreadsheetIcon className="h-12 w-12 text-emerald-500" />
      case "presentation":
        return <FilePresentationIcon className="h-12 w-12 text-orange-500" />
      default:
        return <FileIcon className="h-12 w-12 text-gray-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card key={file.id} className="h-full hover:bg-accent/50 transition-colors group">
          <CardContent className="p-4 relative">
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox
                checked={selectedFiles.includes(file.id)}
                onCheckedChange={() => toggleFileSelection(file.id)}
              />
            </div>
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col items-center justify-center pt-6 pb-2">
              {file.thumbnail ? (
                <div className="relative h-24 w-24 mb-2 rounded overflow-hidden">
                  <Image src={file.thumbnail || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                </div>
              ) : (
                getFileIcon(file.type)
              )}
              <h3 className="font-medium mt-2 text-center text-sm truncate max-w-full">{file.name}</h3>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
            <span>{file.type}</span>
            <span>{file.size}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

