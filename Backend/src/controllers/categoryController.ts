import { Request, Response } from "express";
import { pool } from '../config/db';

export async function createCategory(req: Request, res: Response) {
    try{
        const { name, type, color } = req.body;

        const query = `INSERT INTO categories (name, type, color)
                       VALUES ($1, $2, $3)
                       RETURNING *;`;

        const result = await pool.query(query, [name, type, color]);
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'Categoria já cadastrada' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function updateCategory(req: Request, res: Response){
    try {
        const { id } = req.params;
        const { name, type, color } = req.body;

        const query = `UPDATE categories
                          SET name = $1, type = $2, color = $3
                        WHERE id = $4
                    RETURNING *;`;
        
        const result = await pool.query(query, [name, type, color, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não cadastrada' });
        }

        res.json(result.rows[0]);
    } catch (error: any) {
        if (error.code === 23505) {
            return res.status(400).json({ message: 'Categoria já cadastrada' });
        }
        res.status(500).json({ error: error.message });
    }
}

export async function listCategories(req: Request, res: Response) {
    const result = await pool.query('SELECT id, name, type, color FROM categories');
    res.json(result.rows);
}