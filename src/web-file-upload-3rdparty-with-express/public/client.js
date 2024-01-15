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
// TODO REWRITE submitBoth - INSTEAD OF THE FOR LOOP BELOW,
// CODE THE COLLECTION OF EACH PARALLEL REQUEST
// AWAIT FETCH BECOMES AWAIT sendFile
// EVEN THOUGH THE UPLOAD URL IS CONSTANT - EG BELOW
/*
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array of ids
const responses = await Promise.allSettled(
	ids.map(async id => {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`
		); // Send request for each id
	})
);
*/
function submitBoth() {

  for (let i = 0; i < document.forms.length; i++) {
    
    const accessedForm = document.forms[i]
    const formElts = document.getElementById(accessedForm.id).elements;
    
    const fileInputValue = formElts["fileInput"].value
    const descrValue = formElts["myFileDescr"].value
    const catValue = formElts["selectFileCat"].value

    console.log(`form #${accessedForm.id} maps to ` +
    `fileInput #${fileInputValue}, ` + 
    `descr: '${descrValue}', ` + 
    `category: ${catValue}`)

    //Send and await all promises, but since we care about settling of each file
    // use Promise all settled
    sendFile(DUMMY_URL_SINGLE, accessedForm, descrValue, catValue)
    
  }
  
}


// formData + Axios request + upload progress tracking wrapper code
async function sendFile(url, form, descrValue, catValue) {

  // prep formData for the request
  let formData = new FormData(form)
  formData.set('myFileDescr', descrValue)
  formData.set('myFileCat', catValue)

  //send the file to the relevant upload endpoint <url>
  const newFileResponse = await axios.post(url, formData, {
    
    //upload progress tracking
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log(`upload process: ${percentCompleted}%`)
    }

  })

  console.log("resp from svr: ", newFileResponse.data, " - find the file at: ", newFileResponse.data.url)
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