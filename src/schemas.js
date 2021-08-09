'use strict';

module.exports = (db) => {
  const createRideTableSchema = `
      CREATE TABLE Rides
      (
      rideID INTEGER PRIMARY KEY AUTOINCREMENT,
      startLat DECIMAL NOT NULL,
      startLong DECIMAL NOT NULL,
      endLat DECIMAL NOT NULL,
      endLong DECIMAL NOT NULL,
      riderName TEXT NOT NULL,
      driverName TEXT NOT NULL,
      driverVehicle TEXT NOT NULL,
      created DATETIME default CURRENT_TIMESTAMP
      )
  `;

  const createRideTableSchema2 = `
      CREATE TABLE Rides2
      (
      rideID INTEGER PRIMARY KEY AUTOINCREMENT,
      startLat DECIMAL NOT NULL,
      startLong DECIMAL NOT NULL,
      endLat DECIMAL NOT NULL,
      endLong DECIMAL NOT NULL,
      riderName TEXT NOT NULL,
      driverName TEXT NOT NULL,
      driverVehicle TEXT NOT NULL,
      created DATETIME default CURRENT_TIMESTAMP
      )
  `;;

  const createRideTableSchema3 = `
      CREATE TABLE Rides3
      (
      rideID INTEGER PRIMARY KEY AUTOINCREMENT,
      startLat DECIMAL NOT NULL,
      startLong DECIMAL NOT NULL,
      endLat DECIMAL NOT NULL,
      endLong DECIMAL NOT NULL,
      riderName TEXT NOT NULL,
      driverName TEXT NOT NULL,
      driverVehicle TEXT NOT NULL,
      created DATETIME default CURRENT_TIMESTAMP
      )
  `;;

  db.run(createRideTableSchema);
  db.run(createRideTableSchema2);
  db.run(createRideTableSchema3);

  return db;
};
