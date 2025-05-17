"use client"

import { useState } from "react"
import { expenseData } from "@/data/expenses"
import ExpenseSection from "./expense-section"
import { Calculator, FileUp, Receipt } from "lucide-react"

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(expenseData)

  // Calculate grand total
  const grandTotal = expenses.reduce((total, day) => {
    const dayTotal = day.items.reduce((sum, item) => sum + item.cost, 0)
    return total + dayTotal
  }, 0)

  // Handle receipt upload
  const handleReceiptUpload = (dayIndex: number, file: File) => {
    const newExpenses = [...expenses]
    newExpenses[dayIndex].receipt = file.name
    setExpenses(newExpenses)
  }

  // Mark day as paid
  const markAsPaid = (dayIndex: number) => {
    const newExpenses = [...expenses]
    newExpenses[dayIndex].paid = !newExpenses[dayIndex].paid
    setExpenses(newExpenses)
  }

  // Count paid and unpaid days
  const paidDays = expenses.filter((day) => day.paid).length
  const unpaidDays = expenses.length - paidDays

  // Calculate paid and unpaid amounts
  const paidAmount = expenses
    .filter((day) => day.paid)
    .reduce((total, day) => {
      return total + day.items.reduce((sum, item) => sum + item.cost, 0)
    }, 0)

  const unpaidAmount = grandTotal - paidAmount

  // Count days with receipts
  const daysWithReceipts = expenses.filter((day) => day.receipt).length

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">TBC Rooftop Construction And Daily Expenses</h1>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-900">৳{grandTotal.toLocaleString()}</p>
            <div className="flex items-center mt-2 text-gray-500">
              <Calculator className="w-4 h-4 mr-1" />
              <span className="text-sm">{expenses.length} expense days</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-green-700 mb-2">Paid</h3>
            <p className="text-2xl font-bold text-green-600">৳{paidAmount.toLocaleString()}</p>
            <div className="flex items-center mt-2 text-green-500">
              <Receipt className="w-4 h-4 mr-1" />
              <span className="text-sm">{paidDays} days paid</span>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-red-700 mb-2">Unpaid</h3>
            <p className="text-2xl font-bold text-red-600">৳{unpaidAmount.toLocaleString()}</p>
            <div className="flex items-center mt-2 text-red-500">
              <FileUp className="w-4 h-4 mr-1" />
              <span className="text-sm">{unpaidDays} days pending</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            Receipts uploaded: {daysWithReceipts}/{expenses.length} days
          </p>
        </div>
      </div>

      {/* Expense Sections */}
      <div className="space-y-6">
        {expenses.map((day, dayIndex) => (
          <ExpenseSection
            key={dayIndex}
            day={day}
            dayIndex={dayIndex}
            onReceiptUpload={handleReceiptUpload}
            onMarkAsPaid={markAsPaid}
          />
        ))}
      </div>

      {/* Grand Total */}
      <div className="mt-8 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Grand Total</h2>
          <p className="text-2xl font-bold">৳{grandTotal.toLocaleString()}</p>
        </div>
        <div className="mt-2 text-gray-300 text-sm">
          <span className="mr-4">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            Paid: ৳{paidAmount.toLocaleString()} ({paidDays} days)
          </span>
          <span>
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            Unpaid: ৳{unpaidAmount.toLocaleString()} ({unpaidDays} days)
          </span>
        </div>
      </div>
    </div>
  )
}
