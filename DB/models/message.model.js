import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 1

    },
    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isViewed: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

const message = mongoose.model('Message', messageSchema)
export default message


// relation betweem two models
/**
 * ref
 * refPath
 */