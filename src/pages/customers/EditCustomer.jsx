import { useState, useEffect } from "react"
import { useCustomers } from "@/context/CustomersContext"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EditCustomer = () => {
  const { id } = useParams()
  const { customers, updateCustomer } = useCustomers()
  const navigate = useNavigate()

  const customer = customers.find((c) => c.id === Number(id))
  const [formData, setFormData] = useState(customer || { name: "", email: "", phone: "" })

  useEffect(() => {
    if (customer) setFormData(customer)
  }, [customer])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateCustomer(Number(id), formData)
    navigate("/customers")
  }

  if (!customer) return <p className="p-6">Customer not found</p>

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Edit Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <Button type="submit">Update Customer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCustomer
