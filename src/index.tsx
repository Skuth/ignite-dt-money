import React from "react"
import ReactDOM from "react-dom/client"
import { createServer, Model } from "miragejs"
import { faker } from "@faker-js/faker"

import { App } from "./App"

createServer({
  models: {
    transactions: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: faker.random.uuid(),
          title: faker.random.words(),
          type: "deposit",
          category: faker.random.word(),
          amount: faker.finance.amount(),
          createAt: faker.date.recent()
        },
        {
          id: faker.random.uuid(),
          title: faker.random.words(),
          type: "withdraw",
          category: faker.random.word(),
          amount: faker.finance.amount(),
          createAt: faker.date.recent()
        }
      ]
    })
  },

  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all("transactions")
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody)
      data.createdAt = new Date()

      return schema.create("transactions", data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)