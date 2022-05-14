import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from "react"

import { api } from "../services/api"

interface Transaction {
  id: string
  title: string
  type: "deposit" | "withdraw",
  category: string
  amount: number
  createdAt: Date
}

interface Summary {
  deposits: number
  withdraws: number
  total: number
}

type CreateTransactionProps = Pick<Transaction, "title" | "amount" | "type" | "category">

interface TransactionsContextData {
  transactions: Transaction[]
  summary: Summary
  createTransaction: (payload: CreateTransactionProps) => Promise<void>
}

interface TransactionsProviderProps {
  children?: ReactNode
}

const TransactionsContext = createContext({} as TransactionsContextData)

const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary>({
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  const createTransaction = useCallback(
    async (payload: CreateTransactionProps) => {
      await api.post("/transactions", {
        ...payload,
        createdAt: new Date()
      })
        .then(res => res.data)
        .then(res => {
          setTransactions(state => [
            ...state,
            res.transactions
          ])
        })
    },
    []
  )

  useEffect(() => {
    api.get("transactions")
      .then(res => res.data)
      .then(res => {
        setTransactions(res.transactions)
      })
  }, [])

  useEffect(() => {
    const summaryData = transactions.reduce((prev, current) => {
      if (current.type === "deposit") {
        prev.deposits += Number(current.amount)
        prev.total += Number(current.amount)
      } else {
        prev.withdraws += Number(current.amount)
        prev.total -= Number(current.amount)
      }

      return prev
    }, {
      deposits: 0,
      withdraws: 0,
      total: 0
    })
    
    setSummary(summaryData)
  }, [transactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        summary,
        createTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = (): TransactionsContextData => {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error("useTransactions must be used within an TransactionsProvider")
  }

  return context
}

export { TransactionsProvider, useTransactions };