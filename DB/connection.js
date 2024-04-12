
// db connection
import mongoose from 'mongoose'


const db_connection = async () => {
    await mongoose.connect('mongodb://localhost:27017/sara7a')
        .then((res) => console.log(`db connected successfully`))
        .catch((err) => console.log(`db connection failed`, err))
}


export default db_connection;

// url => mongodb://l27.0.0.1:27017/mongo-s1
/**
 * host
 * username
 * password
 * database
 */
