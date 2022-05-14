import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"

import { useTransactions } from "../../hooks/TransactionsContext"

import { Container } from "./styles"

export const Summary = () => {
  const { summary } = useTransactions()

  const formatMoney = (value: number) =>{ 
    return String(
      Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
    )
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" draggable={false} />
        </header>

        <span>{formatMoney(summary.deposits)}</span>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" draggable={false} />
        </header>

        <span>{formatMoney(summary.withdraws * -1)}</span>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" draggable={false} />
        </header>

        <span>{formatMoney(summary.total)}</span>
      </div>
    </Container>
  )
}