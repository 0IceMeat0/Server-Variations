import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    host: 'localhost',
    port: 5000,
    database: 'node_postgres',
});
