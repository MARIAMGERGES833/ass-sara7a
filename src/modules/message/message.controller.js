import message from "../../../DB/models/message.model.js"
import User from "../../../DB/models/user.model.js"
import {findDocument , createDocument} from "../../../DB/dbMethods.js"



// ============================== add message =================== //
export const sendMessage = async (req, res, next) => {
    
        const { content , sendTo } = req.body
        // const { sendTo } = req.params
    
            // const userExist = await User.findById(sendTo)
            // if (!userExist) {
            //     return res.status(400).json({ message: "user not found" })
            // }
        
    const userExist = await findDocument( User , { _id : sendTo})
    if(!userExist.success) return res.status(userExist.status).json({message : userExist.msg})

        // const createMessage = await message.create({ content , sendTo })
        const createMessage = await createDocument(message ,{ content , sendTo } )
        if(!createMessage.success) return res.status(createMessage.status).json({message : createMessage.msg})

        if (!createMessage) {
            return res.status(400).json({ message: "not create message" })
        }
        res.status(201).json({ message: "message added successfully", createMessage })
    
}


// ========================== list all messages with their owners data==============//


export const listAllMessages = async (req, res, next) => {
    const { isViewed, loggedInUserId } = req.query  // message id

    const listmessages = await message.find({ sendTo : loggedInUserId , isViewed})
    .sort({createdAt : -1})

    if(!listAllMessages.length) return res.status(200).json({ message: 'no messages' })
    res.status(200).json({ message: 'Done', listmessages })
}


//===================================== update message =================//
export const markedMessage = async (req, res, next) => {
    const { _id, loggedInUserId } = req.query  // message id
   

    const updateMessage = await message.findOneAndUpdate(
    {_id : _id  , sendTo: loggedInUserId  ,  isViewed : false},
    // { isViewed : true , $inc: { __v, 1 }},
     { new: true })
    if (!updateMessage) {
        return res.status(400).json({ updateMessage: "update fail" })
    }
    res.status(200).json({ updateMessage: "updated done" , updateMessage })
}




//======================= delete message =================//
export const deletemessage = async (req, res, next) => {
    try {
        const { _id, loggedInUserId } = req.query  // message id

        const message = await message.findOneAndDelete({
            $and: [
                {
                    _id : _id
                },
                {
                    sendTo: loggedInUserId
                }
            ]
        })
        if (!message) {
            return res.json({ message: "delete fail", status: 400 })
        }
        res.json({ message: "delete done", status: 200 })
    } catch (error) {
        res.json({ message: "fail", error })
    }
}