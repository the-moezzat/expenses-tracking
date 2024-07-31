import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { getUser } from '../kinde'
import { db } from '../db'
import { expenses as expensesSchema } from '../db/schema/expenses'
import { and, desc, eq, sum } from 'drizzle-orm'

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3, 'Title must be at least 3 character long'),
  amount: z.string()
})

export const expensesRoute = new Hono()
  .use(getUser)
  .get('/', async c => {
    const userId = c.var.user.id
    const expense = await db
      .select()
      .from(expensesSchema)
      .where(eq(expensesSchema.userId, userId))
      .orderBy(desc(expensesSchema.createAt))
      .limit(100)
    console.log(expense)
    return c.json({ expense })
  })
  .post('/', zValidator('json', expenseSchema.omit({ id: true })), async c => {
    const expense = c.req.valid('json')

    const newExpense = await db
      .insert(expensesSchema)
      .values({
        ...expense,
        userId: c.var.user.id
      })
      .returning()

    return c.json({
      newExpense
    })
  })
  .get('/:id{[0-9]+}', async c => {
    const id = parseInt(c.req.param('id'))

    const expense = await db
      .select()
      .from(expensesSchema)
      .where(
        and(eq(expensesSchema.id, id), eq(expensesSchema.userId, c.var.user.id))
      )
      .orderBy(desc(expensesSchema.createAt))
      .then(res => res[0])

    if (!expense) {
      return c.notFound()
    }

    return c.json({ expense })
  })
  .get('/total', async c => {
    const total = await db
      .select({ total: sum(expensesSchema.amount) })
      .from(expensesSchema)
      .where(eq(expensesSchema.userId, c.var.user.id))
      .limit(1)
      .then(res => res[0])

    return c.json(total)
  })
  .delete('/:id{[0-9]+}', async c => {
    const id = parseInt(c.req.param('id'))
    const userId = c.var.user.id

    const expenses = await db
      .delete(expensesSchema)
      .where(and(eq(expensesSchema.id, id), eq(expensesSchema.userId, userId)))
      .returning()
      .then(res => res[0])

    if (!expenses) {
      return c.notFound()
    }

    return c.json({ expenses })
  })
