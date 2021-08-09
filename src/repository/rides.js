module.exports = (db) => {
  /**
     *
     * Create a ride.
     * @param {Object} params
    */
  const create = (params) => {
    return new Promise((resolve, reject) => {
      const values = [params.start_lat, params.start_long, params.end_lat, params.end_long, params.rider_name, params.driver_name, params.driver_vehicle];
      db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
        if (err) {
          reject(err);
        }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
          if (err) {
            reject(err);
          }

          resolve(rows);
        });
      });
    });
  };

  /**
   * Get all rides.
   * @param {*} params
   */
  const getAll = (params) => {
    const page = params.page || 1;
    const perpage = params.perpage || 10;
    const offset = page === 1 ? 1 : (page - 1) * perpage;
    const query = `SELECT * FROM Rides LIMIT ${perpage} OFFSET ${offset}`;

    return new Promise((resolve, reject) => {
      db.all(query, (error, rows) => {
        if (error) {
          reject(error);
        }

        resolve(rows);
      });
    });
  };

  /**
   * Get a ride.
   * @param {number} id
   */
  const getById = (id) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Rides WHERE rideID = ?`, id, function (err, rows) {
        if (err) {
          reject(err);
        };

        resolve(rows);
      });
    });
  };

  return {
    create,
    getAll,
    getById
  };
};
