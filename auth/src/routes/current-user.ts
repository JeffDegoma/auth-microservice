import express from 'express'
import {currentUser} from '../middlewares/current-user'
// import {requireAuth} from '../middlewares/require-auth' //uncomment to test requireAuth middleware

const router = express.Router()

//check who the current user is
router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUser || null}) //currentUser is a property assigned on the request object
})


export {router as currentUserRouter}

/**************** turn this into a middleware ****************/

// import express from 'express' 
// import jwt from 'jsonwebtoken'

// const router = express.Router()

// router.get('/api/users/currentuser', (req, res) => {
//     // const users = await User.find()
//     // res.send({users})
//     if (!req.session?.jwt){
//     // if(!req.session || req.session.jwt ) { same as above but might not alway work
//         return res.send({currentUser: null})
//     }
//     try {
//         const payload = jwt.verify( //jwt.verify will return an error if there is one. try catch
//             req.session.jwt,
//             'asdfg'
//         )
//         res.send({currentUser: payload})
//     } catch (e) {
//         res.send({currentUser: null})
//     }
// })

// export { router as currentUserRouter} 