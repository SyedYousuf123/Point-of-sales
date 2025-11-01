import { createContext, useContext, useState } from "react"

const SalesContext = createContext()

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([])

  const addSale = (sale) => {
    const newId = sales.length + 1 // incremental numeric ID
    const newSale = {
      ...sale,
      id: `SALE-${String(newId).padStart(3, "0")}`, // e.g. SALE-001, SALE-002
    }
    setSales((prev) => [...prev, newSale])
  }

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  )
}

export const useSales = () => useContext(SalesContext)
