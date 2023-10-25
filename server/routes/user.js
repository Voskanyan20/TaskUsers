const express = require('express')
const control = require('../controllers/controllers')
const multer = require('multer')
const route = express.Router()

const storage = multer.diskStorage({
  destination: '../Frontend/public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })

route.post('/createUser', upload.single('file'), control.user.createUser)
route.get('/getUsers', control.user.getUser)
route.post('/searchUsers', control.user.searchUsers)

module.exports = route
