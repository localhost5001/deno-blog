import { Pool } from 'postgres';

const POOL_SIZE = Number.parseInt(Deno.env.get('DB_POOL_SIZE') ?? '10')

export const dbConnPool = new Pool({
  database: Deno.env.get('DB_NAME'),
	hostname: Deno.env.get('DB_HOST'),
	port: Number.parseInt(Deno.env.get('DB_PORT') ?? '5432'),
	user: Deno.env.get('DB_USER'),
	password: Deno.env.get('DB_PWD'),
}, POOL_SIZE);
