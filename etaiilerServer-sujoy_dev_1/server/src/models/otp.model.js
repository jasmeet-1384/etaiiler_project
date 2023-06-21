
import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
    {
        phoneNumber: {
            type: Number,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: { type: Date, default: Date.now, index: { expires: 300 } }

        //after 5 min it will get deleted automatically from databse
    },
    {
        timestamps: true
    }
);

export default model('Otp', otpSchema);
//User table name
