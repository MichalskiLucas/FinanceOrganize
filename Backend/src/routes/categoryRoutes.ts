import { Router } from "express";
import { createCategory, listCategories, updateCategory} from '../controllers/categoryController';

const router = Router();

router.post('/', createCategory);
router.get('/', listCategories);
router.put('/:id', updateCategory);

export default router;
