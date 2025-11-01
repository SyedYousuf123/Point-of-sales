import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useSales } from "@/context/SalesContext"

export default function SalesChart() {
  const { sales } = useSales()

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const weeklyData = days.map((day, idx) => {
    const total = sales
      .filter((s) => new Date(s.date).getDay() === idx)
      .reduce((sum, s) => sum + s.total, 0)
    return { day, sales: total }
  })

  return (
    <Card>
      <CardHeader><CardTitle>Weekly Sales</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
