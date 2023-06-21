import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const followSchema = new Schema(
    {
        followId: {
            type: Mongoose.Types.ObjectId
        },
        user_id: {
            type: Mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
);

export default model('Follow',followSchema);

