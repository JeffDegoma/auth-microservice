import mongoose from 'mongoose'
import { Password } from '../services/passord'

//interface that describes properties that are required to create a new user
interface userAttr {
    email: string,
    password: string
}

//interface for User Model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttr): UserDoc;
}

//interface that describes properties that a User document has
interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

//SCHEMA
const userSchema = new mongoose.Schema({
    email: {type: String, required: true}, //schema type
    password: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function(done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})
userSchema.statics.build = (attrs: userAttr) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }