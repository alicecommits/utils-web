//Trial with Express
require("dotenv").config()
const express = require("express")
const cors = require('cors')
const multer  = require('multer')

// code to store the file on disk with multer
const UPLOAD_DIR = __dirname + "/uploadFiles"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// axios svr side with Node
//const axios = require('axios'); // svr side require for req to 3rd party

const app = express()

const PORT = 3002; // for file upload trials
//const PORT = process.env.PORT to use sth else than 3000

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
    // req.file is the `file` file
    console.log(`svr msg - file has saved on svr and can be used further.`)

    // here processing towards 3rd party API


    // response to send back to client (and to append to HTML UI TODO)
    res.json({ message: "successful file upload!", 
    data: req.file,
    url: `http://localhost:${PORT}/${req.file.originalname}`})

  } catch (error) {
    res.json({ message: "error - ", error })
  }
})

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log("Express SVR - Your refreshed app is listening on port " + listener.address().port)
})
