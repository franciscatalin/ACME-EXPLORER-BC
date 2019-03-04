'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    explorer: {
        type: mongoose.ObjectId,
        ref: 'Actor',
        required: 'Kindly enter a valid explorer of application'
    },
    trip: {
        type: mongoose.ObjectId,
        ref: 'Trip',
        required: 'Kindly enter a valid trip of application'
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'DUE', 'REJECTED', 'ACCEPTED', 'CANCELLED']
    },
    comment: {
        type: String,
        maxlength: 255
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
    cancelationMoment: {
        type: Date,
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    }
},
    { strict: false }
);

ApplicationSchema.index({ status: 1 });

module.exports = mongoose.model('Applications', ApplicationSchema);