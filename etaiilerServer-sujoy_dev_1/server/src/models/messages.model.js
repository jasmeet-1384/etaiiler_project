import { Schema, model } from 'mongoose';

var Mongoose = require('mongoose');


const messagesSchema = new Schema(
    {
        conversation_id : Mongoose.Types.ObjectId,
        text : String,
        to: Mongoose.Types.ObjectId,
        from : Mongoose.Types.ObjectId,
        read : [Mongoose.Types.ObjectId]
    },
    {
        timestamps: true
    }
);

export default model('Messages', messagesSchema);
//User table name
