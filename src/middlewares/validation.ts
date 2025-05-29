// #region imports
import type { Request, Response, NextFunction } from "express";
import { validationResult, body, ValidationChain } from 'express-validator';
// #endregion imports

/**
 * Performs the arithmetic operation based on the provided inputs.
 * @param number1 - The first number.
 * @param number2 - The second number.
 * @param operation - The operation to perform (e.g., "+", "-", "*", "/").
 * @returns The result of the operation.
 * @throws Error if the operation is invalid or if division by zero is attempted.
 */
export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) : Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: errors.array().map(err => err.msg).join(", "),
      timestamp: new Date().toISOString()
    });
  }
  next();
};

/**
 * Validates the input for the arithmetic operation.
 * @returns An array of validation rules.
 */
export const validateOperation: ValidationChain[] = [
  body("number1")
    .notEmpty().withMessage("number1 is required")
    .isNumeric().withMessage("number1 must be a number")
    .custom(value => Math.abs(Number(value)) < 1e10)
    .withMessage("number1 is too large"),

  body("number2")
    .notEmpty().withMessage("number2 is required")
    .isNumeric().withMessage("number2 must be a number")
    .custom(value => Math.abs(Number(value)) < 1e10)
    .withMessage("number2 is too large"),

  body("operation")
    .notEmpty().withMessage("operation is required")
    .isIn(["+", "-", "*", "/"])
    .withMessage("Invalid operation type")
];
