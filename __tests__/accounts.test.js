const request = require('supertest');
const app = require('../app');
const store = require('../data/accounts');

beforeEach(() => {
  store.reset();
});

describe('GET /api/accounts', () => {
  it('should return status 200 and two accounts; first holder is Alice', async () => {
    const res = await request(app).get('/api/accounts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].holder).toBe('Alice');
  });
});

describe('POST /api/accounts', () => {
  it('should add Charlie and respond with 201 including Charlie', async () => {
    const payload = { id: 3, holder: 'Charlie', balance: 7000 };
    const res = await request(app).post('/api/accounts').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(payload);
  });

  it('should validate negative balance and return 400', async () => {
    const payload = { id: 4, holder: 'Dave', balance: -10 };
    const res = await request(app).post('/api/accounts').send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ error: 'Balance cannot be negative' });
  });
});

describe('PUT /api/accounts/:id', () => {
  it('should update Bob’s balance from 3000 to 4000', async () => {
    const res = await request(app).put('/api/accounts/2').send({ balance: 4000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.balance).toBe(4000);
    expect(res.body.holder).toBe('Bob');
  });

  it('should reject negative balance with 400', async () => {
    const res = await request(app).put('/api/accounts/2').send({ balance: -1 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ error: 'Balance cannot be negative' });
  });

  it('returns 404 for non-existent account', async () => {
    const res = await request(app).put('/api/accounts/999').send({ balance: 100 });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/accounts/:id', () => {
  it('should delete Alice (id=1) and return list without her', async () => {
    const res = await request(app).delete('/api/accounts/1');
    expect(res.statusCode).toBe(200);
    const ids = res.body.map(a => a.id);
    expect(ids).not.toContain(1);
  });

  it('returns 404 for non-existent account', async () => {
    const res = await request(app).delete('/api/accounts/999');
    expect(res.statusCode).toBe(404);
  });
});
