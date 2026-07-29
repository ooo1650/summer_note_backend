import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middelwares/auth.js';

test('accepts a plain token from the token cookie', async () => {
  process.env.JWT_SECRET = 'test-secret';
  const token = jwt.sign({ id: 'user-123', email: 'user@example.com' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  let nextCalled = false;
  const req = {
    cookies: { token },
    headers: {},
  };
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  await new Promise((resolve) => {
    authenticateToken(req, res, () => {
      nextCalled = true;
      resolve();
    });
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.id, 'user-123');
  assert.equal(req.user.email, 'user@example.com');
});
