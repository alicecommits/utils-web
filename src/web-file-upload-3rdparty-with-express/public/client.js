// This file is run by the browser each time your view template is loaded
const DUMMY_URL_SINGLE = "http://localhost:3002/upload-single-file"


// --------------------- SINGLE FILE UPLOAD DEMO ----------------------------- //
// get file Form + its content
const fileForm = document.getElementById("fileForm")

//TODO afterwards - custom file upload response in UI
//const submitButton = document.querySelector('button');
const statusMessage = document.getElementById('statusMessage')
const fileResponseEl = document.getElementById("fileResponse")

// Attach submit event handler to fileForm
fileForm.onsubmit = async function (event) {
  event.preventDefault()

  const formData = new FormData(fileForm)
  const fileDescr = event.target.myFileDescr.value
  //const body = JSON.stringify({ fileDescr })
  const fileCat = event.target.selectFileCat.value
  
  //attempt 1 at adding text fields - set on formData
  formData.set('myFileDescr', fileDescr)
  formData.set('myFileCat', fileCat)

  // building POST request to server with axios
  // because apparently axios allows upload progress tracking
  // where fetch doesn't
  const newFileReponse = await axios.post(DUMMY_URL_SINGLE, formData, {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log(`upload process: ${percentCompleted}%`)
    }
  })
  console.log("resp from svr: ", newFileReponse.data, " - find the file at: ", newFileReponse.data.url)

}
// --------------------------------------------------------------------------- //


// --------------------- MULTIFILE UPLOAD DEMO ----------------------------- //
async function submitBoth() {

  const results = await Promise.allSettled(

    // tip: document.forms is an array-like object (HTMLCollection)
    // it can be parsed into an actual Array using Array.from()
    // each form of the array is then fed to the request to send
    Array.from(document.forms, async form => {

      const formElts = document.getElementById(form.id).elements
      //const fileInputValue = formElts["fileInput"].value
      const descrValue = formElts["myFileDescr"].value
      const catValue = formElts["selectFileCat"].value

      const resp = await sendFile(
        `http://localhost:3002/upload-test-route`, 
        form, 
        descrValue, 
        catValue)
      
      return resp
    })
  )
  // Promise settlement info
  results.forEach((result) => { 
    result.status === "fulfilled" ? 
    console.log("fulfilled", result.value) : console.log("rejected", result.reason)
  })
}


// formData + Axios request + upload progress tracking wrapper code
async function sendFile(url, form, descrValue, catValue) {

  // prep formData for the request
  let formData = new FormData(form)
  formData.set('myItemName', descrValue)
  formData.set('myFileCat', catValue)

  //send the file to the relevant upload endpoint <url>
  const axiosResp = await axios.post(url, formData, {
    
    //upload progress tracking
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log(`upload process: ${percentCompleted}%`)
    }
  })
  //console log resp from svr into browser (client) console
  console.log("sendFile exec - axiosResp from svr: ", axiosResp.data)

  return axiosResp
}


/*
TODO later - interactions with file upload status + response in UI
function resetFormState() {
  submitButton.disabled = true;
  updateStatusMessage(`🤷‍♂ Nothing's uploaded`)
}

function updateStatusMessage(text) {
  statusMessage.textContent = text;
}
*/