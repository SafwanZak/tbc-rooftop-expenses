"use client"

import { useState } from "react"
import type { ExpenseDay } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Upload, X } from "lucide-react"

interface ExpenseSectionProps {
  day: ExpenseDay
  dayIndex: number
  onReceiptUpload: (dayIndex: number, file: File) => void
  onMarkAsPaid: (dayIndex: number) => void
}

export default function ExpenseSection({ day, dayIndex, onReceiptUpload, onMarkAsPaid }: ExpenseSectionProps) {
  const [expanded, setExpanded] = useState(false)

  // Calculate daily total
  const dailyTotal = day.items.reduce((total, item) => total + item.cost, 0)

  return (
    <Card className={`border-l-4 ${day.paid ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div>
          <CardTitle className="text-xl font-bold">{day.date}</CardTitle>
          <div className="text-sm text-gray-500 mt-1">
            {day.items.length} items · ৳{dailyTotal.toLocaleString()}
            {day.receipt && (
              <span className="text-green-600 ml-2 flex items-center inline-flex">
                <Check className="w-3 h-3 mr-1" /> Receipt uploaded
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={day.paid ? "success" : "destructive"}>{day.paid ? "Paid" : "Unpaid"}</Badge>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-gray-500">
            {expanded ? "Hide" : "Show"} Details
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent>
          <ul className="space-y-3">
            {day.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{item.desc}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold">৳{item.cost.toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <div className="relative">
              <input
                type="file"
                id={`receipt-${dayIndex}`}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onReceiptUpload(dayIndex, e.target.files[0])
                  }
                }}
              />
              <Button variant="outline" size="sm" className={day.receipt ? "text-green-600 border-green-600" : ""}>
                {day.receipt ? <Check className="w-4 h-4 mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
                {day.receipt ? "Receipt Uploaded" : "Upload Receipt"}
              </Button>
              {day.receipt && <p className="text-xs text-green-600 mt-1">{day.receipt}</p>}
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg">Total: ৳{dailyTotal.toLocaleString()}</p>
              <Button
                variant={day.paid ? "outline" : "default"}
                onClick={() => onMarkAsPaid(dayIndex)}
                className={day.paid ? "border-green-600 text-green-600" : ""}
              >
                {day.paid ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Mark as Unpaid
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Mark as Paid
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
