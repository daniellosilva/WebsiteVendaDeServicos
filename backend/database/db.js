import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'backend', 'database', 'servicos.db');

const dbPromise = open({
    filename: 'dbPath',
    driver: sqlite3.Database
})

export const db = await dbPromise