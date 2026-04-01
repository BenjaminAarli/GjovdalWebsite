import { pgTable, serial, integer, boolean, timestamp, text, varchar, PgArray } from 'drizzle-orm/pg-core';
import pg from 'pg';

// The PostgreSQL table creation code. 
// CREATE TABLE public.Purchase (
//     id SERIAL PRIMARY KEY,
//     fname VARCHAR(255) NOT NULL,                       -- purchaser's name
//     email VARCHAR(320) NOT NULL,                      -- email (320 chars per RFC)
//     date_of_purchase TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- timestamp with timezone
//     cellphone VARCHAR(20),                            -- optional phone number
//     tickets VARCHAR(10)[] NOT NULL,                    -- array of ticket ID strings
//     notes VARCHAR(255)
//     vipps_confirmed BOOLEAN DEFAULT false,  // true when payment is verified
//     vipps_payment_id VARCHAR(100),           // Vipps payment reference
//     vipps_payment_status VARCHAR(20)        // 'SUCCESS', 'FAILED', 'PENDING' 
// );

export const purchase = pgTable(
    'purchase', {
        id: serial('id').primaryKey(),
        fullname: varchar('name', { length: 255 }).notNull(),
        email: varchar('email', { length: 320 }).notNull(),
        cellphone: varchar('cellphone', { length: 20 }).notNull(),
        tickets: text('tickets').notNull(),
        date_of_purchase: timestamp('date_of_purchase', { withTimezone: true }).defaultNow().notNull(),
        notes: varchar('notes', { length: 255 }),
        vipps_confirmed: boolean('vipps_confirmed').default(false), 
        vipps_payment_id: varchar('vipps_payment_id', { length: 100 }), 
        vipps_payment_status: varchar('vipps_payment_status', { length: 20})
});

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
  host: `/cloudsql/${process.env.instance_connection_name}`,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});