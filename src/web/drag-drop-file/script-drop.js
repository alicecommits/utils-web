function dropHandler(ev) {
    console.log("File(s) dropped");
    //different colour to view successful drop
    ev.currentTarget.style.backgroundColor = 'pink';
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        
        //const listZone = document.getElementById("img_list");

        // If dropped items aren't files, reject them

        if (item.kind === "file") {
          const file = item.getAsFile();

            //if not an image open 1 file in a new tab
            //window.open works for 1 file, not multi
            //console.log logs them all OK though
            file.src = URL.createObjectURL(file);
            window.open(file.src, "_blank");

            console.log(`… file[${i}].name = ${file.name}`);

        // below lines to try using mutiple image files
        // to do the MDN tutorials before
        /*
          if (file.type === "image/*") {

            const listItem = document.createElement("li");
            const para = document.createElement("p");

            const image = document.createElement("img");
            image.src = URL.createObjectURL(file);

            listItem.appendChild(image);
            listItem.appendChild(para);
            listZone.appendChild(listItem);
        */
        }
      });
    
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {

          file.src = URL.createObjectURL(file);
          window.open(file.src, "_blank");

        console.log(`… file[${i}].name = ${file.name}`);


      });
    }
  }

  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    ev.currentTarget.style.backgroundColor = 'yellow';
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  function dragLeaveHandler(ev) {

    ev.currentTarget.style.backgroundColor = '#6DB65B';
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }