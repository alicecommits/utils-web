// This file is run by the browser each time your view template is loaded
const DUMMY_URL = "http://localhost:3002/upload-single-file" //3003 for Koa

// get file Form + its content
const fileForm = document.getElementById("fileForm")

//TODO afterwards - custom file upload response in UI
//const submitButton = document.querySelector('button');
const statusMessage = document.getElementById('statusMessage')
const fileResponseEl = document.getElementById("fileResponse")

// Attach submit event handler (the entire async routine) to fileForm
// fileForm contains all our file + info filled by the user in /views/index.html
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
  const newFileReponse = await axios.post(DUMMY_URL, formData, {
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log(`upload process: ${percentCompleted}%`)
    }
  })
  
  console.log("resp from svr: ", newFileReponse.data, " - find the file at: ", newFileReponse.data.url)

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