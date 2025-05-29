// #region imports
import request from 'supertest';
import app from '../src/server'; 
import mongoose from 'mongoose';
// #endregion imports

// /tests/operations.test.ts

/** 
 * Test for POST /api/v1/operations endpoint 
 */
describe('POST /api/v1/operations', () => {
  it('should return 200 for valid addition', async () => {
    const res = await request(app)
      .post('/api/v1/operations')
      .send({ number1: 5, number2: 3, operation: '+' });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  it('should return 400 for division by zero', async () => {
    const res = await request(app)
      .post('/api/v1/operations')
      .send({ number1: 10, number2: 0, operation: '/' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/division by zero/i);
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/operations')
      .send({ operation: '+' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/number1 is required/i);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
