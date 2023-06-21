import { Schema, model } from 'mongoose';

var Mongoose = require('mongoose');


const conversationSchema = new Schema(
    {
        users: [Mongoose.Types.ObjectId],
        recentMessage: String,
        read : {type : Boolean , default : false},
    },
    {
        timestamps: true
    }
);

export default model('Conversation', conversationSchema);
//User table name
