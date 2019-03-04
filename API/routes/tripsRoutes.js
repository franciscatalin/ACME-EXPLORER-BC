'use strict';
module.exports = function (app) {
  var trip = require('../controllers/tripsCtrl');

    /**
     * Post an trip
     * RequiredRoles: None
     * get an trip 
     * RequiredRoles: None
     * @section application
     * @type post get
     * @url /v1/applications
     * param {string} sortedBy (category)
    */ 
    app.route('/v1/trips')
        .post(trip.create_an_trip)
        .get(trip.list_all_trips);

    /**
     * Put an applications
     * Delete an applications
     * @section applications
     * @type  put delete
     * @url /v1/application/:ticker
    */
    app.route('/v1/trips/:ticker')
        .put(trip.update_an_trip)
        .delete(trip.delete_an_trip);
}