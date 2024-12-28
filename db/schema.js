import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  mobileNumber: varchar('mobile_number', { length: 15 }),
  pinnum: varchar('pin_number', { length: 15 }),
  address: varchar({ length: 500 }),
  office_address: varchar({ length: 500 }),
  rollNumber: varchar('roll_number', { length: 15 }),
});
