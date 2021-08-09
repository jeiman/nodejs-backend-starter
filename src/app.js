/**
 * Project providing ride related routes
 * https://github.com/xendit/backend-coding-test
 * @module ride/routes
 */

'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const logger = require('./common/logger');
const repository = require('./repository/rides');

module.exports = (db) => {
  const rideRepo = repository(db);
  /**
   * Health check
   * @name /health
  */
  app.get('/health', (req, res) => res.send('Healthy'));

  /**
   * Create a Ride.
   * @param {Object} req.body - Request body object
   * @param {number} req.body.start_lat - Pickup location latitude of the rider
   * @param {number} req.body.start_long - Pickup location longitude of the rider
   * @param {number} req.body.end_lat - Drop off location latitude of the rider
   * @param {number} req.body.end_long - Drop off location latitude of the rider
   * @param {string} req.body.rider_name - Rider name
   * @param {string} req.body.driver_name - Driver name
   * @param {string} req.body.driver_vehicle - Driver's vehicle name (Ex: Toyota)
   * @param {Array.<Object>} - returns ride array object
   */
  app.post('/rides', jsonParser, async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
      // eslint-disable-next-line camelcase
      const error_code = 'VALIDATION_ERROR';
      const message = 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively';
      // example of logging to winston logger
      logger.error(`Error at /rides %s %s %s`, error_code, message, JSON.stringify(req.body));
      return res.send({
        error_code,
        message
      });
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      });
    }

    try {
      const rows = await rideRepo.create(req.body);

      return res.send(rows);
    } catch (error) {
      logger.error(`Error %s`, JSON.stringify(error));
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
      });
    }
  });

  /**
   * Get all rides.
   * @name /rides
   * @returns {Array.<Object>} List of rides.
   */
  app.get('/rides', async (req, res) => {
    try {
      const rows = await rideRepo.getAll(req.query);
      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      return res.send({
        page: req.query.page,
        perpage: req.query.perpage,
        rows
      });
    } catch (error) {
      logger.error(`Error %s`, JSON.stringify(error));
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
      });
    }
  });

  /**
   * Get a ride.
   * @name /rides/:id
   */
  app.get('/rides/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || typeof id !== 'number') {
      return res.send({
        error_code: 'INVALID_INPUT',
        message: 'Invalid input. Input must integer'
      });
    }

    try {
      const rows = await rideRepo.getById(req.params.id);
      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        });
      }

      return res.send(rows);
    } catch (error) {
      logger.error(`Error %s`, JSON.stringify(error));
      return res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
      });
    }
  });

  return app;
};
