import { useCustomers } from "@/context/CustomersContext"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const CustomersList = () => {
  const { customers, deleteCustomer } = useCustomers()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <CardTitle className="text-lg font-semibold">
            Customers List
          </CardTitle>
          <Button
            onClick={() => navigate("/customers/add")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            + Add Customer
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="p-4 sm:p-6">
          {/* ✅ Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            {customers.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No customers found. Add one to get started!
              </div>
            ) : (
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c) => (
                    <TableRow
                      key={c.id}
                      className="hover:bg-indigo-50 transition-colors"
                    >
                      <TableCell>{c.id}</TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {c.name}
                      </TableCell>
                      <TableCell>{c.email || "—"}</TableCell>
                      <TableCell>{c.phone || "—"}</TableCell>
                      <TableCell className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/customers/edit/${c.id}`)}
                          className="hover:border-indigo-500 hover:text-indigo-600"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this customer?")) {
                              deleteCustomer(c.id)
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* ✅ Mobile View */}
          <div className="block md:hidden space-y-4">
            {customers.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No customers found. Add one to get started!
              </div>
            ) : (
              customers.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-gray-800 text-lg">
                      {c.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      📧 {c.email || "No email"}
                    </div>
                    <div className="text-sm text-gray-500">
                      📞 {c.phone || "No phone"}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/customers/edit/${c.id}`)}
                      className="hover:border-indigo-500 hover:text-indigo-600 transition"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this customer?")) {
                          deleteCustomer(c.id)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomersList
