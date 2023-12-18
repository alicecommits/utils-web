// This file is run by the browser each time your view template is loaded
const DUMMY_URL = "http://localhost:3002/upload-single-file" //3003 for Koa

// get file Form + its content
const fileForm = document.getElementById("fileForm")

// file submission and status
//const submitButton = document.querySelector('button');

//TODO afterwards - custom file upload response in UI
const statusMessage = document.getElementById('statusMessage')
const fileResponseEl = document.getElementById("fileResponse")

/**
 * Attach submit event handlers to each form included in /views/index.html
 */
// Attach submit event to fileForm in the Notion demo style
fileForm.onsubmit = async function (event) {
  event.preventDefault()

  const formData = new FormData(fileForm)
  const fileDescr = event.target.myFileDescr.value
  //const body = JSON.stringify({ fileDescr })
  const fileCat = event.target.selectFileCat.value
  
  //attempt 1 at adding field descri - setter with formData
  formData.set('myFileDescr', fileDescr)
  formData.set('myFileCat', fileCat)

  // attempt with axios
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
// interactions with file upload status
function resetFormState() {
  submitButton.disabled = true;
  updateStatusMessage(`🤷‍♂ Nothing's uploaded`)
}

function updateStatusMessage(text) {
  statusMessage.textContent = text;
}
*/