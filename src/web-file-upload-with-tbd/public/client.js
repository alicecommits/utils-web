// This file is run by the browser each time your view template is loaded
const DUMMY_URL = "http://localhost:3002/upload-single-file" //3003 for Koa

// get file Form
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

  /*
  const dbName = event.target.dbName.value
  const body = JSON.stringify({ dbName })
  */
  const formData = new FormData(fileForm)

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

  /*
  const newFileResponse = await fetch(DUMMY_URL, {
    method: "POST",
    body: formData,
  })

  // console logging client side
  console.log("resp from svr: ", newFileResponse)
  */
}



/*
submitButton.onsubmit = () => {
  //event.preventDefault()

  // capture file
  let fileElement = document.getElementsByName("fileInput")
  console.log('fileElt captured OK client side: ', fileElement)
  //let fileForm = document.getElementById("fileForm")
  // TODO capture file info

  // check if user had selected a file
  if (fileElement.files.length === 0) {
    alert('please choose a file')
    return
  }

  // packaging the uploaded file into FormData format
  let formData = new FormData()
  formData.set('fileField', fileElement)


  axios.post(DUMMY_URL, formData, {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          console.log(`upload process: ${percentCompleted}%`)
        }
      })
        .then(res => {
          console.log(res.data)
          console.log(res.data.url)
        })

}
*/

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