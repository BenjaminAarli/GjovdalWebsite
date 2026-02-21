import { pgTable, serial, integer, boolean } from 'drizzle-orm/pg-core';
import pg from 'pg';

export const user = pgTable('user', { id: serial('id').primaryKey(), age: integer('age') });
export const ticket = pgTable(
    'ticket', {
        id: serial('id').primaryKey(), 
        buy_date: integer('date'), 
        ticket_days: integer('ticket_days')
            .default(1),
        is_demo: boolean('is_demo')
            .notNull()
            .default(true),
        price: integer('price')
            .notNull()         
            .default(200),
    });

const pool = new pg.Pool({
  host: `/cloudsql/${process.env.instance_connection_namE}`,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});