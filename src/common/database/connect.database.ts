import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Pool } from 'pg'
import { config } from 'src/config/envConfig'

@Injectable()
export class DBService implements OnModuleInit, OnModuleDestroy {

    private pool: Pool

    async onModuleInit() {
        this.pool = new Pool({
            host: config.DATABASE.HOST,
            password: config.DATABASE.PASS,
            user: config.DATABASE.USER,
            port: config.DATABASE.PORT,
            database: config.DATABASE.NAME
        })
        // coonect database
        try {
            const client = await this.pool.connect();
            console.log('✅ Postgres databasega muvaffaqiyatli ulandi!');
            client.release();
        } catch (err) {
            console.error('❌ Postgres ulanishida xatolik:', err.message);
        }
    }

    // ------------------ QUERY ------------------
    async query(sql: string, params?: any[]) {
        const result = await this.pool.query(sql, params);
        return result.rows;
    }

    async onModuleDestroy() {
        await this.pool.end();
        console.log('🛑 Postgres ulanish yopildi.');
    }
}