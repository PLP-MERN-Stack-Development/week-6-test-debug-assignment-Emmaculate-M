const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bugRoutes = require('../routes/bugRoutes');
const Bug = require('../models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Bug.deleteMany(); // Clean up collection before each test
});

describe('Bug API', () => {
  it('creates a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Details' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
  });

  it('gets all bugs', async () => {
    await Bug.create({ title: 'Bug 1', description: 'test' });
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('updates a bug status', async () => {
    const bug = await Bug.create({ title: 'Bug to update', description: 'update me' });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('deletes a bug', async () => {
    const bug = await Bug.create({ title: 'Bug to delete', description: 'delete me' });
    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});
