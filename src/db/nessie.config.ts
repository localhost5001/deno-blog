import { NessieConfig, ClientPostgreSQL } from 'https://deno.land/x/nessie@2.0.1/mod.ts'

export const client = new ClientPostgreSQL({
    database: "nessie",
    hostname: "localhost",
    port: 5432,
    user: "root",
    password: "pwd",
})

const config: NessieConfig = {
    client: client,
    migrationFolders: ["./migrations"],
    seedFolders: ["./seeds"],
    additionalMigrationFiles: [],
    additionalSeedFiles: [],
    debug: false,
}

export default config
