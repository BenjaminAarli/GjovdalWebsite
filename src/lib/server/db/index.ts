import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';
import { env } from '$env/dynamic/private';

export function getDatabase() {
    if (!env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set.');
    }
    return drizzle(env.DATABASE_URL)
}
