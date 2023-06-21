import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const followingSchema = new Schema(
    {
        followingId: {
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

export default model('Following',followingSchema);

