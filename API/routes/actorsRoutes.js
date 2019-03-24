'use strict';
module.exports = function (app) {
  var actors = require('../controllers/actorsCtrl');
  var authController = require('../controllers/authCtrl');

  /**
   * Post an actor 
   * RequiredRoles: None
   * @section actors
   * @type post
   * @url /v1/actors
   * @param {string} role (explorer|administrator|manager|sponsor) 
  */

  app.route('/v1/actors')
    .post(actors.create_an_actor);

  /**
   * Put an actor
   * RequiredRoles: to be the proper actor
   * @section actors
   * @type put
   * @url /v1/actors/:email
  */
  app.route('/v1/actors/:email')
    .put(actors.update_an_actor_v1);

  /**
   * Put an actor
   *    RequiredRoles: to be the proper actor
   * Get an actor
   *    RequiredRoles: any
	 *
	 * @section actors
	 * @type get put
	 * @url /v1/actors/:actorId
  */
  app.route('/v2/actors/:actorId')
    .get(actors.read_an_actor)
    .put(authController.verifyUser(['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR']), 
    actors.update_an_actor_v2);
    //Explorer, sponsor y manager no puede modificar la info de otro explorer/sponsor/manager


  /**
  * Put to Validate a manager by actorId
  *    RequiredRole: Administrator
  *
  * @section actors
  * @type put
  * @url /v1/actors/:actorId/validate
  * @param {string} actorId
  */
  app.route('/v1/actors/:actorId/validate')
    .put(actors.validate_an_actor)

}