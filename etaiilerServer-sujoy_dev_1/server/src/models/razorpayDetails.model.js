import { Schema, model } from 'mongoose';
var Mongoose = require('mongoose');

const razorpaydetailsSchema = new Schema(
    {
        razorpay_payment_id: {
            type: String
        },
        razorpay_order_id: {
            type: String
        },
        razorpay_signature:{
            type : String
        },
        amount : {
            type : String
        }
    },
    {
        timestamps: true
    }
);

export default model('Razorpaydetails',razorpaydetailsSchema);

