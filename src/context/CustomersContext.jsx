import { createContext, useContext, useState } from "react"

const CustomersContext = createContext()

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Walk-in Customer", phone: "" }, // ✅ default fallback customer
  ])

  const addCustomer = (customer) => {
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1
    setCustomers([...customers, { ...customer, id: newId }])
  }

  const updateCustomer = (id, updated) => {
    setCustomers(customers.map(c => (c.id === id ? { ...c, ...updated } : c)))
  }

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <CustomersContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomersContext.Provider>
  )
}

export const useCustomers = () => useContext(CustomersContext)
