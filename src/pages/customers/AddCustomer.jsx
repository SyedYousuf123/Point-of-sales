import { useState } from "react"
import { useCustomers } from "@/context/CustomersContext"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const AddCustomer = () => {
  const { addCustomer } = useCustomers()
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addCustomer(formData)
    setFormData({ name: "", email: "", phone: "" }) 
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Add Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <Button type="submit">Add Customer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCustomer
