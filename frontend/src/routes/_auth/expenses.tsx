import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'

export const Route = createFileRoute('/_auth/expenses')({
  component: Expenses
})

async function getExpenses() {
  const expenses = await api.expenses.$get()
  if (!expenses.ok) {
    throw new Error('An error occurred')
  }
  return await expenses.json()
}

function Expenses() {
  const { isLoading, data: expenses } = useQuery({
    queryKey: ['expenses-list'],
    queryFn: getExpenses
  })

  return (
    <Table className={'max-w-3xl mx-auto'}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton className="h-[20px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className=" h-[20px] rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          expenses?.expense.map(expense => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
