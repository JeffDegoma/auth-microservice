import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose  from 'mongoose'
import { app } from '../app'

let mongo: any
//jest hook
beforeAll(async () => {
    jest.setTimeout(10000);
    // mongo = new MongoMemoryServer()
    // mongo = await MongoMemoryServer.create({ binary: { version: '6.0.0' } });
    mongo = await MongoMemoryServer.create();
    // await mongo.start()
    const mongoURI = mongo.getUri()

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})


beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async() => {
    // await mongo.stop()
    await mongoose.connection.close()
})