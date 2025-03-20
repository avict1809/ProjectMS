"use client"

import { useEffect, useRef } from "react"

export default function ContributionGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate contribution data (mock data)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["", "Mon", "", "Wed", "", "Fri", ""]

    // Generate random contribution data
    const contributions = Array(52)
      .fill(0)
      .map(() =>
        Array(7)
          .fill(0)
          .map(() => Math.floor(Math.random() * 5)),
      )

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw month labels
    ctx.font = "12px system-ui, sans-serif"
    ctx.fillStyle = "#9ca3af"
    const cellSize = 14
    const cellMargin = 4
    const totalCellSize = cellSize + cellMargin
    const startX = 30 // Leave space for day labels
    const startY = 30 // Leave space for month labels

    // Draw month labels
    months.forEach((month, i) => {
      const x = startX + i * 4.3 * totalCellSize
      ctx.fillText(month, x, 20)
    })

    // Draw day labels
    days.forEach((day, i) => {
      if (day) {
        ctx.fillText(day, 0, startY + i * totalCellSize + cellSize / 2)
      }
    })

    // Draw contribution cells
    contributions.forEach((week, weekIndex) => {
      week.forEach((level, dayIndex) => {
        const x = startX + weekIndex * totalCellSize
        const y = startY + dayIndex * totalCellSize

        // Set color based on contribution level
        let color
        switch (level) {
          case 0:
            color = "#1e293b"
            break // No contributions
          case 1:
            color = "#064e3b"
            break // Few contributions
          case 2:
            color = "#065f46"
            break // Some contributions
          case 3:
            color = "#047857"
            break // More contributions
          case 4:
            color = "#10b981"
            break // Many contributions
          default:
            color = "#1e293b"
        }

        ctx.fillStyle = color
        ctx.fillRect(x, y, cellSize, cellSize)
        ctx.strokeStyle = "#0f172a"
        ctx.strokeRect(x, y, cellSize, cellSize)
      })
    })
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <canvas ref={canvasRef} className="w-full h-[160px]"></canvas>
      </div>
    </div>
  )
}

