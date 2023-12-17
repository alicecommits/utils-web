//ALICE MODIF
//TBD try with Express again and if too complicated, Koa
require("dotenv").config()
const express = require("express")
const cors = require('cors')
const multer  = require('multer')
const upload = multer()

const app = express()

const PORT = 3002; // for file upload trials
//const PORT = process.env.PORT to use sth else than 3000

const { Client } = require("@notionhq/client")
const notion = new Client({ auth: process.env.NOTION_KEY })

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(cors())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html")
})


// Custom File API endpoint for file upload and observe server-side
app.post('/upload-single-file', upload.single('fileField'), function (req, res, next) {
  
  // req.file is the `file` file
  console.log(`${req.file} has saved on svr and can be used further.`)
  
  // req.body will hold the text fields, if there were any
  // TO DO from the form that goes with the file
})

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log("Your refreshed app is listening on port " + listener.address().port)
})
