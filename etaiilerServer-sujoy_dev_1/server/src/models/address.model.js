import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const addressSchema = new Schema(
    {
        user_id: {
            type: String,
        },
        role: {
            type: String
        },
        longitude: {
            type: String
        },
        latitude: {
            type: String
        },
        active: {
            type: String
        },
        addressLine1: {
            type: String
        },
        addressLine2: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default model('Address', addressSchema);
//User table name
