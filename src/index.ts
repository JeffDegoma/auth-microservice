import mongoose from 'mongoose'
import { app } from './app'

const DBstart = async () => {
    try {
        // await mongoose.connect('mongodb://mongo:27017/auth', { //connect to local mongo docker image
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth', { //connect to k8s mongo deployment
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('connected to db')
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => {
    console.log('listening on port 3000')
})

DBstart()