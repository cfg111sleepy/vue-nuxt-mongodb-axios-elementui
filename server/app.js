const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')
const commetRoutes = require('./routes/comment.routers')
const keys = require('./keys/keys.dev')

const app = express()


mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('db connected...'))
    .catch(e => console.error(e))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commetRoutes)


module.exports = app
