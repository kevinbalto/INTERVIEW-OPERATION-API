// #region imports
import type { Request, Response } from "express";
import Operation from "../models/Operation";
// #endregion imports

/**
 * OperationController handles the arithmetic operations and their storage in the database.
 * It provides methods to create a new operation, validate inputs, and perform calculations.
 */
export class OperationController {

  /**
   * Handles the creation of a new operation.
   * Validates the input, performs the calculation, and saves the operation to the database.
   * @param req - The request object containing the operation details.
   * @param res - The response object to send back the result or error.
   * @returns A JSON response with the operation result or an error message.
   */
  public static createOperation = async (req: Request, res: Response): Promise<Response> => {
    const { number1, number2, operation } = req.body;
    const startTime = Date.now();

    try {
      const result = OperationController.performCalculation(number1, number2, operation);
      const responseTime = Date.now() - startTime;

      await Operation.create({
        operation,
        inputs: JSON.stringify({ number1, number2 }),
        result: result.toString(),
        responseTime
      });

      return res.status(200).json({
        status: "success",
        operation,
        inputs: { number1, number2 },
        result,
        timestamp: new Date().toISOString(),
        responseTime
      });

    } catch (error: any) {
      const message = error.message === "Division by zero" || error.message === "Invalid operation"
        ? error.message
        : "Internal server error";

      const statusCode = message === "Internal server error" ? 500 : 400;

      return res.status(statusCode).json({
        status: "error",
        message,
        timestamp: new Date().toISOString()
      });
    }
  };


  //#region Private Methods

  /**
   * Performs the arithmetic operation based on the provided inputs.
   * @param number1 - The first number.
   * @param number2 - The second number.
   * @param operation - The operation to perform ("+", "-", "*", "/").
   * @returns The result of the operation.
   * @throws Error if the operation is invalid or if division by zero is attempted.
   */
  private static performCalculation(number1: number, number2: number, operation: string): number {
    switch (operation) {
      case "+":
        return number1 + number2;
      case "-":
        return number1 - number2;
      case "*":
        return number1 * number2;
      case "/":
        if (number2 === 0) {
          throw new Error("Division by zero");
        }
        return number1 / number2;
      default:
        throw new Error("Invalid operation");
    }
  };
  
  //#endregion
}