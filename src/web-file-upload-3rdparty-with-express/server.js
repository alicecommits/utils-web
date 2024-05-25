//Trial with Express
require("dotenv").config()
const express = require("express")
const cors = require('cors')

//const axios = require('axios'); // svr side require for req to 3rd party

// Require the upload middleware and upload dir
const uploadModule = require('./upload')
const upload = uploadModule.upload
const UPLOAD_DIR = uploadModule.UPLOAD_DIR

const app = express()

const PORT = 3002;
//const PORT = process.env.PORT to use other port than 3002

// values are looked up based on user's selection in drop down in UI
constObjectDemo = require("./constObjectDemo")
const foodObj = constObjectDemo.foodObj

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(cors())

app.use(express.static(UPLOAD_DIR))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html")
})

// Custom File API endpoint for file upload and observe server-side
app.post('/upload-single-file', upload.single('fileInput'), function (req, res, next) {
  try {
    // retrieving informative fields against the file
    const description = req.body.myFileDescr
    const fileCat = req.body.myFileCat
    const fileCatVisual = foodObj[fileCat]

    // TODO demo 1 - post a text file to httpbin.org/post endpoint



    // TODO demo 2 - since httpbin mirrors what we send,
    // TODO using WireMockCloud to simulate validating expected formData "schema" on 3rd-party


    // req.file is the `file` file
    console.log(`svr msg - file descri "${description}" has saved on svr.`)

    // response to send back to client (and to append to HTML UI TODO)
    res.json({ message: "successful file upload!", 
    data: req.file,
    description: description,
    fileCategory: fileCatVisual,
    url: `http://localhost:${PORT}/${req.file.originalname}`})

  } catch (error) {
    res.json({ message: "error - ", error })
  }
})

// to use to trial several hitting of the single upload routes
app.post('/upload-test-route', upload.single('fileInput'), function (req, res, next) {
  try {
    // retrieving informative fields against the file
    const descr = req.body.myFileDescr
    const cat = req.body.myFileCat
    // finding corresponding file cat in foodObj
    const catVisual = foodObj[cat]


    console.log(`svr msg - file descri "${descr}" has saved on svr.`)
    // response to send back to client
    res.json({ message: "successful file upload!", 
    data: req.file,
    description: descr,
    fileCategory: catVisual,
    url: `http://localhost:${PORT}/${req.file.originalname}`})

  } catch (error) {
    res.json({ message: "error - ", error })
  }
})

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log("Express SVR - Your refreshed app is listening on port " + listener.address().port)
})
