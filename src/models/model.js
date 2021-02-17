import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Please enter a email address'
    },
    password: {
        type: String,
        required: 'Please enter a password'
    },
    watchList: {
        type: [String],
        default: [],
    },
    // {'fb': 3, 'amzn': 10}
    portfolio: { // MongoDB map accepts key as String, value can be customized type.
        type: Map,
        of: Number, 
        default: {},
    },
    fund: {
        type: Number,
        default: 0,
    }
});