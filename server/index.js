const express = require ('express')
const session = require ('express-session')
require('dotenv').config()
const checkForSession = require ('./middlewares/checkForSession')
const swagController = require ('./controllers/swagController')
const authController = require ('./controllers/authController')
const cartController = require ('./controllers/cartController')
const searchController = require ('./controllers/searchController')

const app = express()

const {SERVER_PORT, SESSION_SECRET} = process.env

app.use (express.json())
app.use (
    session ({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)
app.use(checkForSession)
app.use(express.static(`${_dirname}/../build`))

app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.post('/api/user', authController.getUser)

app.get('/api/swag', swagController.read)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', searchController.search)

app.listen (SERVER_PORT, () => {
    console.log (`Server listening on port ${SERVER_PORT}.`)
})


