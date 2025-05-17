export interface ExpenseItem {
  desc: string
  cost: number
}

export interface ExpenseDay {
  date: string
  items: ExpenseItem[]
  paid: boolean
  receipt?: string
}
