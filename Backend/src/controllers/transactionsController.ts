import { Request, Response } from 'express';
import { pool } from '../config/db';

export async function createTransaction(req: Request, res: Response) {
    try {
        const {
            user_id,
            category_id,
            description,
            amount,
            type,
            transaction_date,
            recurring,
            notes
        } = req.body;

        const query = `
            INSERT INTO transactions (
                user_id, category_id, description, amount, type, transaction_date, recurring, notes
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [
            user_id,
            category_id,
            description,
            amount,
            type,
            transaction_date,
            recurring ?? false,
            notes ?? null
        ];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function updateTransaction(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {
            category_id,
            description,
            amount,
            type,
            transaction_date,
            recurring,
            notes
        } = req.body;

        const query = `
            UPDATE transactions
               SET category_id = $1,
                   description = $2,
                   amount = $3,
                   type = $4,
                   transaction_date = $5,
                   recurring = $6,
                   notes = $7
             WHERE id = $8
         RETURNING *;
        `;

        const values = [
            category_id,
            description,
            amount,
            type,
            transaction_date,
            recurring ?? false,
            notes ?? null,
            id
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error: any) {
        console.error('Erro ao atualizar transação:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function listTransactions(req: Request, res: Response) {
    try {
        const { user_id } = req.params;

        const query = `
            SELECT t.*, c.name AS category_name
              FROM transactions t
              JOIN categories c ON c.id = t.category_id
             WHERE t.user_id = $1
          ORDER BY t.transaction_date DESC;
        `;

        const result = await pool.query(query, [user_id]);
        res.json(result.rows);
    } catch (error: any) {
        console.error('Erro ao listar transações:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteTransaction(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const query = `DELETE FROM transactions WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }

        res.json({ message: 'Transação removida com sucesso' });
    } catch (error: any) {
        console.error('Erro ao deletar transação:', error);
        res.status(500).json({ error: error.message });
    }
}
