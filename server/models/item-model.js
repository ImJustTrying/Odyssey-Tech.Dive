const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    
          
        
           
*/
const Item = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        keyFindings: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        hoursAd: {
            type: Number,
            required: true
        },
        brix: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        imageName: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('item', Item);
