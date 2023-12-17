const axios = require('axios')
// This file is run by the browser each time your view template is loaded

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form

// file submission and status
const submitButton = document.querySelector('button');

//custom file upload response
const statusMessage = document.getElementById('statusMessage');
const fileResponseEl = document.getElementById("fileResponse")


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
  // TO DO capture text fields with it
  formData.set('fileField', fileElement)

  // to do send file info (text) alongside file itself
  axios.post("http://localhost:3001/upload-single-file", formData, {
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


/*
function handleSubmit(event) {
  event.preventDefault()

  uploadFiles()
}

// with Fetch API
function uploadFiles() {
  const url = 'https://httpbin.org/post'
  const formData = new FormData(fileForm)

  const fetchOptions = {
    method: 'post',
    body: formData
  }

  fetch(url, fetchOptions);
}

// with XMLHttpRequest - to enable tracking file upload progress
function uploadFiles() {
  const url = 'https://httpbin.org/post';
  const method = 'post';

  const xhr = new XMLHttpRequest();

  const data = new FormData(fileForm);

  xhr.open(method, url);
  xhr.send(data);
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