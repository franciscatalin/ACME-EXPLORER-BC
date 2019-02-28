'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BannerSchema = new Schema({
    
    actorId: {
        type: mongoose.ObjectId,
        ref: 'Actor',
        required: 'Kindly enter a valid sponsor of application'
    },

    trip: {
        type: mongoose.ObjectId,
        ref: 'Trip',
        required: 'Kindly enter a valid trip of banner'
    },

    description: {
        type: String,
        maxlength:255
    },
    link: {
        type: String
       
    },

    price: {
        type: Number

    },

    if_paid: {
        type: Boolean,
        default: false
    },

    picture: [{
        data: Buffer,
        contentType: String
    }],

    created: {
        type: Date,
        default: Date.now
    }
    


},


    { strict: false }
);



module.exports = mongoose.model('Banner', BannerSchema);