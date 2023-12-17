// This file is run by the browser each time your view template is loaded

/**
 * Define variables that reference elements included in /views/index.html:
 */

// Forms
const dbForm = document.getElementById("databaseForm")
const pageForm = document.getElementById("pageForm")
const blocksForm = document.getElementById("blocksForm")
const commentForm = document.getElementById("commentForm")


// Table cells where API responses will be appended
const dbResponseEl = document.getElementById("dbResponse")
const pageResponseEl = document.getElementById("pageResponse")
const blocksResponseEl = document.getElementById("blocksResponse")
const commentResponseEl = document.getElementById("commentResponse")


/**
 * Functions to handle appending new content to /views/index.html
 */

// Appends the API response to the UI
const appendApiResponse = function (apiResponse, el) {
  console.log(apiResponse)

  // Add success message to UI
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.innerHTML = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)
  // See browser console for more information
  if (apiResponse.message === "error") return

  // Add ID of Notion item (db, page, comment) to UI
  const newParagraphId = document.createElement("p")
  newParagraphId.innerHTML = "ID: " + apiResponse.data.id
  el.appendChild(newParagraphId)

  // Add URL of Notion item (db, page) to UI
  if (apiResponse.data.url) {
    const newAnchorTag = document.createElement("a")
    newAnchorTag.setAttribute("href", apiResponse.data.url)
    newAnchorTag.innerText = apiResponse.data.url
    el.appendChild(newAnchorTag)
  }
}

// Appends the blocks API response to the UI
const appendBlocksResponse = function (apiResponse, el) {
  console.log(apiResponse)

  // Add success message to UI
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.innerHTML = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)

  // Add block ID to UI
  const newParagraphId = document.createElement("p")
  newParagraphId.innerHTML = "ID: " + apiResponse.data.results[0].id
  el.appendChild(newParagraphId)
}

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form
dbForm.onsubmit = async function (event) {
  event.preventDefault()

  const dbName = event.target.dbName.value
  const body = JSON.stringify({ dbName })

  const newDBResponse = await fetch("/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const newDBData = await newDBResponse.json()

  appendApiResponse(newDBData, dbResponseEl)
}

pageForm.onsubmit = async function (event) {
  event.preventDefault()

  const dbID = event.target.newPageDB.value
  const pageName = event.target.newPageName.value
  const recDescr = event.target.recDescr.value
  const recFood = event.target.recFood.value
  //console.log("recFood value looks like: ", recFood, "of type ", typeof(recFood))
  const header = event.target.header.value

  const body = JSON.stringify({ dbID, 
    pageName, 
    header, 
    recDescr,
    recFood })

  const newPageResponse = await fetch("/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newPageData = await newPageResponse.json()
  appendApiResponse(newPageData, pageResponseEl)
}

blocksForm.onsubmit = async function (event) {
  event.preventDefault()

  const pageID = event.target.pageID.value
  const content = event.target.content.value
  const body = JSON.stringify({ pageID, content })

  const newBlockResponse = await fetch("/blocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newBlockData = await newBlockResponse.json()
  appendBlocksResponse(newBlockData, blocksResponseEl)
}

commentForm.onsubmit = async function (event) {
  event.preventDefault()

  const pageID = event.target.pageIDComment.value
  const comment = event.target.comment.value
  const body = JSON.stringify({ pageID, comment })

  const newCommentResponse = await fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newCommentData = await newCommentResponse.json()
  appendApiResponse(newCommentData, commentResponseEl)
}


// --------------- FILE UPLOADING TRIALS --------------------------




//custom file form
const fileForm = document.getElementById("fileForm")
const fileInput = document.getElementById("myfile")

// file submission and status
const statusMessage = document.getElementById('statusMessage');
const submitButton = document.querySelector('button');

//custom file upload response
const fileResponseEl = document.getElementById("fileResponse")


fileForm.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()

  uploadFiles()
}

/* 
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
*/

// with XMLHttpRequest - to enable tracking file upload progress
function uploadFiles() {
  const url = 'https://httpbin.org/post';
  const method = 'post';

  const xhr = new XMLHttpRequest();

  const data = new FormData(fileForm);

  xhr.open(method, url);
  xhr.send(data);
}

// interactions with file upload status
function resetFormState() {
  submitButton.disabled = true;
  updateStatusMessage(`🤷‍♂ Nothing's uploaded`)
}

function updateStatusMessage(text) {
  statusMessage.textContent = text;
}