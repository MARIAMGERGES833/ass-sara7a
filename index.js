import express from 'express'
import userRouter from './src/modules/User/user.routes.js'
import messageRouter from './src/modules/message/message.routes.js'
import db_connection from './DB/connection.js'
import { config } from 'dotenv'
config()
const app = express()
const port = 3000

app.use(express.json())
app.use('/user', userRouter)
app.use('/msg', messageRouter)


// console.log(process.env.CONNECTION_URL_LOCAL)
db_connection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// mongoDB => ODM mongoose
// local mongoDB compass
// host: mongoAtlas