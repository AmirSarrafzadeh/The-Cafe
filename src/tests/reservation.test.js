process.env.NODE_ENV = 'test';
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Reservation = require('../models/reservationModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Reservation.deleteMany(); // Clear the database between tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/v1/reservations', () => {
  it('should create a new reservation', async () => {
    const reservation= {
      name: 'John Doe',
      email: 'lebabamath@gmail.com',
      phone: '1234567890',
      date: '2022-12-12',
      time: '12:00',
      people: 2,
      message: 'This is a test reservation'
    };
    const res = await request(app)
      .post('/api/v1/reservations')
      .send(reservation);
    
    const reservationFound = await Reservation.findOne({ uid: res.body.data.uid });
    expect(reservationFound).toBeTruthy();
    // expect(res.statusCode).toEqual(201); // Created
    // expect(res.body).toHaveProperty('data');
    // expect(res.body.data).toMatchObject(reservation)
  })
})