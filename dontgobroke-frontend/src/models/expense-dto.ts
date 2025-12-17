export interface ExpenseDto {
    id: number
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

export interface ExpenseUpdateDto {
    id: number
    userId: number
    title: string
    amount: number
    category: string
    date: Date
    description: string
}
