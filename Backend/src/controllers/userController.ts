import { Request, Response } from 'express';
import { pool } from '../config/db';
import crypto from 'crypto';

export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, password_hash, type } = req.body;

        const encryptedPassword = crypto.createHash('md5').update(password_hash).digest('hex');

        const query = `
            INSERT INTO users (name, email, password_hash, type)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, type, created_at;
        `;

        const result = await pool.query(query, [name, email, encryptedPassword, type || 'DEFAULT']);
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;        
        const { name, email, type } = req.body;

        const query = `
            UPDATE users
               SET name = $1,
                   email = $2,
                   type = $3
             WHERE id = $4
         RETURNING id, name, email, type, created_at;
        `;

        const result = await pool.query(query, [name, email, type, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function listUsers(req: Request, res: Response) {
    try {
        const result = await pool.query('SELECT id, name, email, type, created_at FROM users ORDER BY id');
        res.json(result.rows);
    } catch (error: any) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = `DELETE FROM users WHERE id = $1 RETURNING id;`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error: any) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: error.message });
    }
}
