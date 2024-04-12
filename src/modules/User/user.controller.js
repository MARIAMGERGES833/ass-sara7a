
import User from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs'
/**
 * finders methods
 * find   = findAll()
 * findById = findByPk()
 * findOne = findOne()
 */


/** create Methods
     * create
     * save
     * insertMany
*/

// ========================= SignUp API =========================
export const signUp = async (req, res, next) => {
    // data
    const { username, email, age, password } = req.body
    // email check 
    const isEmailDuplicate = await User.findOne({ email })
    if (isEmailDuplicate) {
        return res.status(400).json({
            message: "Email is already exists"
        })
    }
    
    //=========================== create method =====================//
    let hashPassword = bcrypt.hashSync(password, 9)
    const createUser = await User.create({ username, email, age, password: hashPassword })


    if (!createUser) {
        return res.status(400).json({
            message: "register failed",
            status: 400
        })
    }
    res.status(200).json({
        message: "register success",
        status: 200,
        createUser
    })
}

/**
 * updateOne
 * findByIdAndUpdate
 * findOneAndUpdate
 * 
 * updateMany
 * findOneAndReplace
 */

//================================signin====================
export const signin = async (req, res, next) => {
    const { username, email, age, password } = req.body
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.json({
            message: "invalid login",
            status: 400
        })
    }

    console.log(password, user.password)
    // =========compare password=============
    const isSamePass = bcrypt.compareSync(password, user.password)   // boolean
    if (!isSamePass) {
        return res.json({
            message: "invalid password",
            status: 400
        })
    }
    res.json({
        message: "success login",
        status: 200
    })
}






// ========================= update API =========================
export const updateAccount = async (req, res, next) => {
    const { username, email } = req.body
    const { _id } = req.query
    let objUpdate = {}
    if (username) {
        const isNameDuplicate = await User.findOne({ username })
        if (isNameDuplicate) {
            return res.json({
                message: "Name is already exists"
            })
        }
        objUpdate.username = username
    }
    if (email) {
        const isEmailDuplicate = await User.findOne({ email })
        if (isEmailDuplicate) {
            return res.json({
                message: "Email is already exists"
            })
        }
        objUpdate.email = email
    }
    //=================================== update one =================
    const updateUser = await User.updateOne({ _id }, objUpdate)
    if (!updateUser.modifiedCount) {
        return res.json({
            message: 'User Updated failed',
            status: 400
        })
    }
    res.json({
        message: 'User Updated successfully',
        status: 200
    })

}


/**
 * deleteOne
 * findByIdAndDelete
 * findOneAndADelete
 * 
 * deleteMany
 * findOneAndRemove
 */


//================================ delete API=======================
export const deleteAccount = async (req, res, next) => {
    try {
        const { _id, loggedinId } = req.query
        const user = await User.findOneAndDelete({
            _id: loggedinId
        })

        if (!user) {
            return res.json({
                message: 'User deleted fail',
                user
            })
        }


        res.json({
            message: 'User deleted successfully',
            user
        })
    } catch (error) {
        res.json({
            message: 'catch in delete user',
            error
        })
    }
}



export const getUserData = async (req, res, next) => {
    const { _id } = req.params
    const user = await User.findById( _id, "username")
    if (!user) {
        return res.json({
            message: "invalid id",
            status: 400
        })
    }
    res.json({
        message: "done",
        user

    })
}