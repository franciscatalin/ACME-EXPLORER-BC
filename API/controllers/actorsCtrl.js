'use strict';
//             ACTOR 
var mongoose = require('mongoose'),
  admin = require('firebase-admin'),
  Actor = mongoose.model('Actors');
  var authController = require('./authCtrl');
exports.create_an_actor = function (req, res) {
  console.log((req.body));
  var new_actor = new Actor(req.body);
  new_actor.save(function (err, actor) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(actor);
    }
  });
};

exports.read_an_actor = function(req, res) {
  Actor.findById(req.params.actorId, function(err, actor) {
    if (err){
      res.status(500).send(err);
    }
    else{
      res.json(actor);
    }
  });
};

exports.update_an_actor_v1 = function (req, res) {
  /*
  Check that the user is the proper actor and if not: res.status(403);
   "an access token is valid, but requires more privileges"
  */
  console.log((req.body));
  Actor.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true },
    function (err, actor) {
      if (err) {
        res.send(err);
      } else {
        res.json(actor);
      }
    });
};

exports.update_an_actor_v2 = function(req, res) {
  //Explorer, Sponsor and Manager can update theirselves, administrators can update any actor
  Actor.findById(req.params.actorId, async function(err, actor) {
    if (err){
      res.send(err);
    }
    else{
      console.log('actor: '+actor);
      var idToken = req.headers['idtoken'];
      //WE NEED the FireBase custom token in the req.header['idToken']... it is created by FireBase!!
      if (actor.role.includes('EXPLORER') || actor.role.includes('MANAGER') || actor.role.includes('SPONSOR')){
        var authenticatedUserId = await authController.getUserId(idToken);
        if (authenticatedUserId == req.params.actorId){
          Actor.findOneAndUpdate({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
            if (err){
              res.send(err);
            }
            else{
              res.json(actor);
            }
          });
        } else{
          res.status(403); //Auth error
          res.send('The Actor is trying to update an Actor that is not himself!');
        }    
      } else if (actor.role.includes('ADMINISTRATOR')){
          Actor.findOneAndUpdate({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
            if (err){
              res.send(err);
            }
            else{
              res.json(actor);
            }
          });
      } else {
        res.status(405); //Not allowed
        res.send('The Actor has unidentified roles');
      }
    }
  });
};

exports.login_an_actor = async function (req, res) {
  console.log('starting login an actor');
  var emailParam = req.query.email;
  var password = req.query.password;
  Actor.findOne({ email: emailParam }, function (err, actor) {
    if (err) { res.send(err); }

    // No actor found with that email as username
    else if (!actor) {
      res.status(401); //an access token isn’t provided, or is invalid
      res.json({ message: 'forbidden', error: err });
    }

    else if ((actor.role.includes('MANAGER')) && (actor.validated == false)) {
      res.status(403); //an access token is valid, but requires more privileges
      res.json({ message: 'forbidden', error: err });
    }
    else {
      // Make sure the password is correct
      // console.log('En actor Controller pass: ' + password);
      actor.verifyPassword(password, async function (err, isMatch) {
        if (err) {
          res.send(err);
        }

        // Password did not match
        else if (!isMatch) {
          //res.send(err);
          res.status(401); //an access token isn’t provided, or is invalid
          res.json({ message: 'forbidden', error: err });
        }

        else {
          try {
            var customToken = await admin.auth().createCustomToken(actor.email);
          } catch (error) {
            console.log("Error creating custom token:", error);
          }
          actor.customToken = customToken;
          console.log('Login Success... sending JSON with custom token');
          res.json(actor);
        }
      });
    }
  });
};

exports.validate_an_actor = function (req, res) {
  //Check that the user is an Administrator and if not: res.status(403);
  // "an access token is valid, but requires more privileges"
  console.log("Validating an actor with id: " + req.params.actorId);
  Actor.findOneAndUpdate(
    { _id: req.params.actorId },
    { $set: { "validated": "true" } },
    { new: true },
    function (err, actor) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(actor);
      }
    });
};

exports.delete_an_actor = function (req, res) {
  Actor.deleteOne({ _id: req.params.actorId }, function (err, actor) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json({ message: 'Actor successfully deleted' });
    }
  });
};