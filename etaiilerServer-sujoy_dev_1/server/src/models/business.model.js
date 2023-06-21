import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const businessSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        country : {
            type:String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        addressLine1: {
            type: String
        },
        addressLine2: {
            type: String
        },
        pincode: {
            type: Number
        },
        productCategory: {
            type: String
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        natureOfBusiness: {
            type: String
        },
        website: {
            type: String
        },
        role: {
            type: String
        },
        fcmToken: {
            type: String
        },
        os: {
            type: String
        },
        image: {
            type: String
        },
        followers: [{ type: Mongoose.Types.ObjectId }],
        following: [{ type: Mongoose.Types.ObjectId }],
        gpsAddress: { type: Mongoose.Types.ObjectId }
    },
    {
        timestamps: true
    }
);

export default model('Business', businessSchema);
//User table name
