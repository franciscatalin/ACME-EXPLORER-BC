'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    trip: {
        type: mongoose.ObjectId,
        ref: 'Trip'
    },
    ticker: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: 'Kindly enter the  ticker of application'
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'DUE', 'REJECTED', 'ACCEPTED', 'CANCELLED']
    },
    comment: {
        type: String,
        maxlength:255
    },
    reject_reason: {
        type: String
    },
    if_paid: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
},
    { strict: false }
);

module.exports = mongoose.model('Applications', ApplicationSchema);