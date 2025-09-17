import { Injectable } from '@nestjs/common';
import { DBService } from 'src/common/database/connect.database';

@Injectable()
export class ProductQueryService {
  constructor(private readonly db: DBService) {}

  // ----------------------- CREATE PRODUCT TABLE -----------------------
  async ensureProductTable() {
    const exists = await this.checkTable('product');

    if (!exists) {
      const sql = `
        CREATE TABLE product (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255)  UNIQUE NOT NULL,
          price INT NOT NULL,
          quantity INT NOT NULL,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await this.db.query(sql);
    }
  }

  // ----------------------- CREATE -----------------------
  async create(table_name: string, data: any) {
    if (table_name === 'product') {
      await this.ensureProductTable();
    }

    const payload = data.createProductDto ?? data;

    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    // query
    const sql = `
      INSERT INTO ${table_name} (${keys.join(', ')})
      VALUES (${placeholders.join(', ')}) 
      RETURNING *;
    `;

    try {
      const result = await this.db.query(sql, values);
      if (result[0]) {
        return { message: true, data: result };
      }
    } catch (error) {
      const data = error;
      return { message: false, error: data };
    }
  }

  // ----------------------- FIND ALL -----------------------

  async findAll(table_name: string, values: number = 10) {
    if (table_name === 'product') {
      await this.ensureProductTable();
    }
    // query
    const sql = `SELECT * FROM ${table_name} ORDER BY "created_at" DESC LIMIT $1`;
    try {
      const result = await this.db.query(sql, [values]);
      if (result) {
        return { message: true, data: result };
      }
    } catch (error) {
      const data = error.detail;
      return { message: false, error: data };
    }
  }

  // ----------------------- FIND BY ID -----------------------

  async findById(table_name: string, id: number = 1) {
    if (table_name === 'product') {
      await this.ensureProductTable();
    }
    // query
    const sql = `SELECT * FROM ${table_name}  WHERE id=$1`;
    try {
      const result = await this.db.query(sql, [id]);

      if (result[0] && result.length > 0) {
        const data = result[0];
        return { message: true, data };
      } else if (result.length == 0) {
        return { message: false, data: 'not found Product' };
      }
    } catch (error) {
      const data = error.detail;
      return { message: false, error: data };
    }
  }
  // ----------------------- FIND BY ONE -----------------------

  async findByOne(table_name: string, name: string = '') {
    const sql = `SELECT * FROM ${table_name}  WHERE ${[name]}=$1`;
    try {
      const result = await this.db.query(sql, [name]);
        
      if (result[0] && result.length > 0) {
        return { message: true, data: result };
      } else if (result.length == 0) {
        return { message: false, data: 'not found user' };
      }
    } catch (error) {
        const data = error.detail;
        console.log(error);
        
      return { message: false, error: data };
    }
  }
  // ----------------------- UPDATE -----------------------
  async update(table_name: string, data: any, id: number) {
    if (table_name === 'product') {
      await this.ensureProductTable();
    }

    const payload = data.updateAdminDto ?? data;

    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const query = keys.map((key, i) => `"${key}" = $${i + 1}`).join(', ');

    // query
    const sql = `
    UPDATE ${table_name}
    SET ${query}
    WHERE id = $${keys.length + 1}
    RETURNING *;
    `;

    try {
      const result = await this.db.query(sql, [...values, id]);
      if (result[0]) {
        return { message: true, data: result };
      }
    } catch (error) {
      const data = error.detail;
      return { message: false, error: data };
    }
  }
  // ----------------------- DELETE -----------------------

  async delete(table_name: string, id: number) {
    if (table_name === 'product') {
      await this.ensureProductTable();
    }
    // query
    const sql = `DELETE FROM ${table_name} WHERE id = $1 RETURNING *;`;
    try {
      const result: any = await this.db.query(sql, [id]);

      if (result.rows[0] && result.rows.length > 0) {
        return { message: true, data: {} };
      } else if (result.length == 0) {
        return { message: false, data: 'not found product' };
      }
    } catch (error) {
      const data = error.detail;
      return { message: false, error: data };
    }
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
