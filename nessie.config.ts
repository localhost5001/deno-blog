import { NessieConfig, ClientPostgreSQL } from 'https://deno.land/x/nessie@2.0.1/mod.ts'

export const client = new ClientPostgreSQL({
    database: Deno.env.get('DB_NAME'),
    hostname: Deno.env.get('DB_HOST'),
    port: Number.parseInt(Deno.env.get('DB_PORT') ?? '5432'),
    user: Deno.env.get('DB_USER'),
    password: Deno.env.get('DB_PWD'),
})

const config: NessieConfig = {
    client: client,
    debug: false,
}

export default config
