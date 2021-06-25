import express from "express";
const router = express.Router();

import BoardController from "../../controllers/BoardController";

router.get('/', BoardController.All);
router.get('/:id', BoardController.GetById);
router.post('/write', BoardController.Write);

export default router;