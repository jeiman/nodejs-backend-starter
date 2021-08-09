'use strict';

const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const chai = require('chai');
const expect = chai.expect;

describe('API Routes', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });
  describe('Rides', () => {
    let rideId;
    it('should return 0 ride records', (done) => {
      request(app)
        .get('/rides')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.error_code).to.be.equal('RIDES_NOT_FOUND_ERROR');
          done();
        });
    });
    it('should NOT create a ride', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 90.00,
          'start_long': 181.00,
          'end_lat': 90.00,
          'end_long': 90.00,
          'rider_name': 'Manjunath',
          'driver_name': 'Dough',
          'driver_vehicle': 'Toyota'
        })
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).include.all.keys('error_code', 'message');
          expect(res.body.error_code).to.be.equal('VALIDATION_ERROR');
          done();
        });
    });
    it('should create a ride', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 90.00,
          'start_long': 90.00,
          'end_lat': 90.00,
          'end_long': 90.00,
          'rider_name': 'Manjunath',
          'driver_name': 'Dough',
          'driver_vehicle': 'Toyota'
        })
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.statusCode).to.be.equal(200);
          rideId = res.body[0].rideID;
          done();
        });
    });
    it('should return a ride', (done) => {
      request(app)
        .get(`/rides/${rideId}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body[0].driverVehicle).to.be.equal('Toyota');
          done();
        });
    });
    it('should throw an error as ride does not exists', (done) => {
      request(app)
        .get(`/rides/100`)
        .end((err, res) => {
          if (err) console.error(err);
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).include.all.keys('error_code', 'message');
          expect(res.body.error_code).to.be.equal('RIDES_NOT_FOUND_ERROR');
          done();
        });
    });
    it('should throw an error as rideId is not an integer', (done) => {
      request(app)
        .get(`/rides/hello`)
        .end((err, res) => {
          if (err) console.error(err);
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).include.all.keys('error_code', 'message');
          expect(res.body.error_code).to.be.equal('INVALID_INPUT');
          done();
        });
    });
  });
});
