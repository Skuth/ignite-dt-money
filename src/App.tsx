import { useState } from "react"
import Modal from "react-modal"

import { GlobalStyle } from "./styles/global";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root')

export const App = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleOpenNewTransactionModal = () => {
    setModalOpen(true)
  }

  const handleCloseNewTransactionModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <GlobalStyle />

      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />

      <NewTransactionModal
        isOpen={isModalOpen}
        onCloseNewTransactionModal={handleCloseNewTransactionModal}
      />
    </>
  );
}

export default App;
