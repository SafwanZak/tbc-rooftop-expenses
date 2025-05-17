import ExpenseTracker from "@/components/expense-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ExpenseTracker />
      </div>
    </main>
  )
}
