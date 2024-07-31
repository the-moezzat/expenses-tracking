import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_auth/')({
  component: Index
})

function Index() {
  const { isLoading, data } = useQuery({
    queryKey: ['expenses-total'],
    queryFn: getTotalExpenses
  })

  return (
    <main className="dark">
      <Card className=" max-w-lg mx-auto my-24">
        <CardHeader>
          <CardTitle>Track you expenses</CardTitle>
          <CardDescription>
            Keep track of your expenses and stay on budget
          </CardDescription>
        </CardHeader>
        <CardContent>{isLoading ? 'Loading...' : data?.total}</CardContent>
      </Card>
    </main>
  )
}

async function getTotalExpenses() {
  const res = await api.expenses.total.$get()
  return await res.json()
}
