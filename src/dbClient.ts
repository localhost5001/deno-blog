import { Client } from 'postgres';

export const client = new Client({
	database: Deno.env.get('DB_NAME'),
	hostname: Deno.env.get('DB_HOST'),
	port: Number.parseInt(Deno.env.get('DB_PORT') ?? '5432'),
	user: Deno.env.get('DB_USER'),
	password: Deno.env.get('DB_PWD'),
});
