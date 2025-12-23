export interface ExpenseDto {
    id: string
    userId: number
    title: string
    amount: number
    category: string
    date: Date
    description: string
    createdAt: Date
}

export interface ExpenseCreateDto {
    title: string
    amount: number
    category: string
    date: Date
    description: string
    createdAt: Date
}

export interface ExpenseDeleteDto {
    id: string
    userId: number
    title: string
    amount: number
    category: string
    date: Date
    description: string
    createdAt: Date
}
