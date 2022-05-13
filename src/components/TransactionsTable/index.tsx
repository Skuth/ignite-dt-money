import { useEffect, useState } from "react"

import { api } from "../../services/api"

import { Container } from "./styles"

interface Transaction {
  id: string
  title: string
  type: "deposit" | "withdraw",
  category: string
  amount: number
  createAt: Date
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get("transactions")
      .then(res => res.data)
      .then(res => setTransactions(res.transactions))
  }, [])
  

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {Number(transaction.amount).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Date(transaction.createAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}