import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getUser } from '../kinde';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3, 'Title must be at least 3 character long'),
  amount: z.number(),
});

type Expense = z.infer<typeof expenseSchema>;

const expenses: Expense[] = [
  {
    id: 1,
    title: 'Rent',
    amount: 1000,
  },
  {
    id: 2,
    title: 'Groceries',
    amount: 100,
  },
  {
    id: 3,
    title: 'Utilities',
    amount: 200,
  },
];


export const expensesRoute = new Hono().use(getUser)
  .get('/', (c) => c.json({ expenses }))
  .post(
    '/',
    zValidator('json', expenseSchema.omit({ id: true })),
    async (c) => {
      const expense = c.req.valid('json');
      expenses.push({ id: expenses.length + 1, ...expense });
      return c.json({
        expenses,
      });
    },
  )
  .get('/:id{[0-9]+}', (c) => {
    const id = parseInt(c.req.param('id'));

    const expense = expenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .get('/total', (c) => {
    const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ total });
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = parseInt(c.req.param('id'));

    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }

    expenses.splice(index, 1);
    return c.json({ expenses });
  });
