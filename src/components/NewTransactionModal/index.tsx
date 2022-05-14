import { useState } from "react"

import Modal from "react-modal"

import closeImg from "../../assets/close.svg"

import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

import { useTransactions } from "../../hooks/TransactionsContext"

import { Container, TransactionTypeContainer, RadioBox } from "./styles"

interface NewTransactionModalProps {
  isOpen: boolean
  onCloseNewTransactionModal: () => void
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onCloseNewTransactionModal
}) => {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState<string>("")

  const [type, setType] = useState<"deposit" | "withdraw">("deposit")

  const resetValues = () => {
    setTitle("")
    setAmount(0)
    setCategory("")
    setType("deposit")
  }

  const handleCreateNewTransaction = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const payload = {
      title,
      amount,
      type,
      category
    }

    createTransaction(payload)
      .then(() => handleCloseModal())
  }

  const handleCloseModal = () => {
    resetValues()

    onCloseNewTransactionModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={handleCloseModal}
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}