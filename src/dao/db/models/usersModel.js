import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});


export default model("users", userSchema);