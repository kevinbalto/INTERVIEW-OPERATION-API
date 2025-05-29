// #region imports
import { Router } from 'express';
import { OperationController } from '../../controllers/OperationController';
import { handleInputErrors, validateOperation } from '../../middlewares/validation';
// #endregion imports

const router = Router()

/**
 * @swagger
 * /api/v1/operations:
 *   post:
 *     summary: Perform an arithmetic operation
 *     tags:
 *       - Operations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number1:
 *                 type: number
 *               number2:
 *                 type: number
 *               operation:
 *                 type: string
 *                 enum: ["+", "-", "*", "/"]
 *     responses:
 *       200:
 *         description: Operation successful
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  validateOperation,
  handleInputErrors,
  OperationController.createOperation
);

export default router;