import { useTransactions } from "../../hooks/TransactionsContext"

import { Container } from "./styles"

export const TransactionsTable = () => {
  const { transactions } = useTransactions()

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
                {Number(
                  transaction.type === "deposit"
                    ? transaction.amount
                    : transaction.amount * -1
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}