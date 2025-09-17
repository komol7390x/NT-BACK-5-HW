import { Injectable } from '@nestjs/common'
import { DBService } from 'src/common/database/connect.database';

@Injectable()
export class AdminQueryService {
    constructor(private readonly db: DBService) { }

    // ----------------------- CREATE ADMIN TABLE -----------------------
    async ensureAdminTable() {
        const exists = await this.checkTable('admin');

        if (!exists) {
            const sql = `
        CREATE TABLE admin (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          hashed_password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
            await this.db.query(sql);
        }
    }

    // ----------------------- CREATE -----------------------
    async create(table_name: string, data: any) {
        // avval table borligini ta’minlaymiz
        if (table_name === 'admin') {
            await this.ensureAdminTable();
        }

        const payload = data.createAdminDto ?? data;

        const columns = Object.keys(payload);
        const values = Object.values(payload);
        const placeholders = columns.map((_, i) => `$${i + 1}`);

        const sql = `
      INSERT INTO ${table_name} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')}) 
      RETURNING *;
    `;

        return this.db.query(sql, values);
    }

    // ----------------------- CHECK TABLE -----------------------
    async checkTable(table_name: string): Promise<boolean> {
        try {
            const sql = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = $1
        ) AS exists;
      `;
            const result = await this.db.query(sql, [table_name]);
            return result[0]?.exists ?? false;
        } catch (error) {
            console.log(`❌ Jadval tekshirishda xatolik: ${table_name}`);
            return false;
        }
    }
}
