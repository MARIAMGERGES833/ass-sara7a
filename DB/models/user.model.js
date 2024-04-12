// user model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        min: 3,
        max: 9
    },
    email: {
        type: String,
        unique: true
        // required: true
    },
    password: {
        type: String
        // required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    age:{
        type:Number,
        min : [10 , "to short age"],
        max : [60 , "to long age"]
        
    },
    vertfyEmail:{
        type : Boolean,
        default : false, 
    },
    isActive:{
        type : Boolean,
        default : true, 
    }
    
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

export default User