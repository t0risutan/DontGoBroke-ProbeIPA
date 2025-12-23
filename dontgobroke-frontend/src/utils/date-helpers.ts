import { isSameDay, isSameWeek, isSameMonth, isSameYear } from 'date-fns';

// Helfer Funktion für die Filterung der Ausgaben, verwendet Bibliothek date-fns
export function setSelectedDate(
    expenseDate: Date, 
    selectedDate: Date, 
    period: 'day' | 'week' | 'month' | 'year'
): boolean {
    const expense = new Date(expenseDate);
    const selected = new Date(selectedDate);
    switch (period) {
        case 'day':
            return isSameDay(expense, selected);
        case 'week':
            return isSameWeek(expense, selected, { weekStartsOn: 1 });
        case 'month':
            return isSameMonth(expense, selected);
        case 'year':
            return isSameYear(expense, selected);
        default:
            return false;
    }
}