import { Router } from "express";
import { createUser,  listUsers, updateUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.put('/:id', updateUser);

export default router;