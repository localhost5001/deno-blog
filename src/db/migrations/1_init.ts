import { AbstractMigration, ClientPostgreSQL } from 'https://deno.land/x/nessie@2.0.1/mod.ts'

export default class extends AbstractMigration<ClientPostgreSQL> {
    async up(): Promise<void> {
        await this.client.queryArray(`
            CREATE TABLE Users (
                user_id SERIAL PRIMARY KEY,
                name UNIQUE VARCHAR NOT NULL,
                password VARCHAR(50) NOT NULL,
                email varchar(255) UNIQUE NOT NULL,
                created_on TIMESTAMP NOT NULL
            )
        `)

        await this.client.queryArray(`
            CREATE TABLE Roles (
                role_id SERIAL PRIMARY KEY,
                name varchar(50) UNIQUE NOT NULL
            )
        `)

        await this.client.queryArray(`
            CREATE TABLE UsersRoles (
                user_id INT NOT NULL,
                role_ID INT NOT NULL,
                grant_date TIMESTAMP,
                PRIMARY KEY (user_id, role_id),
                FOREIGN KEY (user_id)
                    REFERENCES Users (user_id)
                FOREIGN KEY (role_id)
                    REFERENCES Roles (role_id)
            )
        `)

        await this.client.queryArray(`
            CREATE TABLE Categories (
                category_id SERIAL PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(300) NOT NULL
            )
        `)
        
        await this.client.queryArray(`
            CREATE TABLE Posts (
                post_id SERIAL PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                content VARCHAR(MAX) NOT NULL,
                user_id INT NOT NULL,
                category_id INT NOT NULL,
                FOREIGN KEY (user_id)
                    REFERENCES Users (user_id)
                FOREIGN KEY (category_id)
                    REFERENCES Categories (category_id)
            )
        `)
    }

    async down(): Promise<void> {
        await this.client.queryArray('DROP TABLE Posts')

        await this.client.queryArray('DROP TABLE Categories')

        await this.client.queryArray('DROP TABLE UsersRoles')
        
        await this.client.queryArray('DROP TABLE Roles')

        await this.client.queryArray('DROP TABLE Users')
    }
}
