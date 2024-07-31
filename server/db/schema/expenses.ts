import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core'

export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: varchar('name', { length: 256 }),
    amount: numeric('amount', { precision: 12, scale: 2 }),
    createAt: timestamp('created_at').defaultNow()
  },
  expenses => {
    return {
      userIdIndex: index('user-idx').on(expenses.userId)
    }
  }
)
