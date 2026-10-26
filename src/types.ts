export type TransactionType = 'income' | 'expense'

export interface TransactionInput {
  amount: number
  category: string
  date: string
  description: string
  type: TransactionType
}

export interface Transaction extends TransactionInput {
  id: number
}

export interface TransactionDraft {
  amount: string
  category: string
  date: string
  description: string
  type: TransactionType
}

export type BudgetMap = Record<string, number>

export interface FinanceSnapshot {
  transactions: Transaction[]
  budget: BudgetMap
  categories: string[]
  exampleUser: string | null
}

export interface AccessibilityPreferences {
  highContrast: boolean
  textSize: string
  reducedMotion: boolean
  enhancedFocus: boolean
  keyboardHelper: boolean
}

export type FinancialTipKind = 'positive' | 'warning' | 'caution' | 'info'

export interface FinancialTip {
  icon: string
  title: string
  description: string
  type: FinancialTipKind
}

export interface TransactionsState {
  transactions: Transaction[]
  exampleUser: string | null
}

export function isTransactionType(value: unknown): value is TransactionType {
  return value === 'income' || value === 'expense'
}

export function updateTransactionDraft(
  draft: TransactionDraft,
  name: string,
  value: string,
): TransactionDraft {
  switch (name) {
    case 'amount':
    case 'category':
    case 'date':
    case 'description':
      return { ...draft, [name]: value }
    case 'type':
      return { ...draft, type: value === 'income' ? 'income' : 'expense' }
    default:
      return draft
  }
}
