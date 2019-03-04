'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the actor name'
    },
    surname: {
        type: String,
        required: 'Kindly enter the actor surname'
    },
    email: {
        type: String,
        required: 'Kindly enter the actor email',
        unique: true,
        validate: [emailValidation, "invalid emmail"]
    },
    password: {
        type: String,
        minlength: 5,
        required: 'Kindly enter the actor password'
    },
    phone: {
        type: String,

    },
    address: {
        type: String
    },
    role: [{
        type: String,
        required: 'Kindly enter the user role(s)',
        enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR']
    }],
    created: {
        type: Date,
        default: Date.now
    }
},
    { strict: false }
);

// Custom validation for email
function emailValidation(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
}

module.exports = mongoose.model('Actors', ActorSchema);