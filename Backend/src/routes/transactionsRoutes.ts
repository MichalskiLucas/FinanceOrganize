import { Router } from "express";
import { createTransaction,  deleteTransaction,  listTransactions, updateTransaction } from '../controllers/transactionsController';

const router = Router();

router.post('/', createTransaction);
router.get('/', listTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction)

export default router;