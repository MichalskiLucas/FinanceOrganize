import { Request, Response } from 'express';
import { pool } from '../config/db';

export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, password_hash } = req.body;

        const query = `INSERT INTO users (name, email, password_hash)
                       VALUES ($1, $2, $3)
                       RETURNING *;`;

        const result = await pool.query(query, [name, email, password_hash]);
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;        
        const { name, email } = req.body;

        const query = `UPDATE users
                          SET name = $1, email = $2
                        WHERE id = $3
                       RETURNING *;`;

        const result = await pool.query(query, [name, email, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function listUsers(req: Request, res: Response) {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json(result.rows);
}
