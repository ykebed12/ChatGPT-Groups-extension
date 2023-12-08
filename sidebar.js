console.log("Starting chatGPT edit")
/*
createFolder(folderName, callback) - creates folder in system
saveLinkInFolder(link, folderName, callback) - saves link into the folder, into the system
getLinksFromFolder(folderName, callback) - get all links from folder
getAllFolders(callback) - get all folders that were created before

*/

const style = document.createElement('style');
style.textContent = `
  .new-group-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s; /* Smooth transition for background color */
  }

  .new-group-btn:hover {
    background-color: #555; /* Background color on hover */
  }
`;
document.head.appendChild(style);

function createFolder(folderName, callback) {
    chrome.storage.local.get({folders: {}}, function(data) {
        // Check if the folder already exists
        if (data.folders[folderName]) {
            console.error("Folder already exists");
            return;
        }

        // Add the new folder to the 'folders' object
        data.folders[folderName] = [];

        // Save the updated object back to storage
        chrome.storage.local.set({folders: data.folders}, function() {
            if (chrome.runtime.lastError) {
                console.error("Error creating folder:", chrome.runtime.lastError);
            } else {
                console.log("Folder created successfully");
                if (callback) callback();
            }
        });
    });
}


function saveLinkInFolder(link, folderName, callback) {
    chrome.storage.local.get({folders: {}}, function(data) {
        // Check if the folder exists
        if (!data.folders[folderName]) {
            console.error("Folder does not exist");
            return;
        }

        // Add the link to the folder
        data.folders[folderName].push(link);

        // Save the updated object back to storage
        chrome.storage.local.set({folders: data.folders}, function() {
            if (chrome.runtime.lastError) {
                console.error("Error saving link:", chrome.runtime.lastError);
            } else {
                console.log("Link saved successfully");
                if (callback) callback();
            }
        });
    });
}

function getLinksFromFolder(folderName, callback) {
    chrome.storage.local.get({folders: {}}, function(data) {
        // Check if the folder exists
        if (!data.folders[folderName]) {
            console.error("Folder does not exist");
            callback([]);  // Return an empty array if folder doesn't exist
            return;
        }

        // Return the links in the folder
        callback(data.folders[folderName]);
    });
}

function getAllFolders(callback) {
    chrome.storage.local.get({folders: {}}, function(data) {
        // Get all folder names (keys of the 'folders' object)
        const folderNames = Object.keys(data.folders);

        // Return the folder names through the callback
        callback(folderNames);
    });
}

// This function will create and append the sidebar to the document body
const items = ['item1', 'item2', 'item43']
const sidebar = document.createElement('div');
const buttonDiv = document.createElement('div');
const groupsDiv = document.createElement('div');
sidebar.id = 'mySidebar';
sidebar.style.cssText = 'position: fixed; top: 0; right: -300px; width: 300px; height: 100%; background-color: black; overflow-y: auto; z-index: 1000; border-left: 1px solid #ccc; padding: 10px; transition: right 0.5s;';

// Close button
const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.style.cssText = 'position: absolute; top: 10px; left: 10px;';
closeButton.onclick = function() {
    // sidebar.style.display = 'none';
    // openButton.style.display = 'block';
    // sidebar.style.right = '-300px'; // Hide sidebar

    // Start the transition by changing the position
    sidebar.style.right = '-300px'; // Start hiding the sidebar

    // Wait for the transition to complete before hiding the element
    setTimeout(function() {
        sidebar.style.display = 'none';
        openButton.style.display = 'block';
    }, 500); // 500ms to match your transition duration
};
// New Group button
const newGroupButton = document.createElement('button');
newGroupButton.innerHTML = '+ New Group'; // Using innerHTML to include the plus icon
newGroupButton.className = 'new-group-btn';
newGroupButton.onclick = function() {
    // Implement your function here
    console.log('New Group button clicked');
};
buttonDiv.appendChild(newGroupButton);
buttonDiv.appendChild(closeButton)
sidebar.appendChild(buttonDiv);

const ul = document.createElement('ul');
ul.style.cssText = 'margin-top: 40px;'; // Add margin to avoid overlap with the close button
items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
});
groupsDiv.appendChild(ul)
sidebar.appendChild(groupsDiv);
document.body.appendChild(sidebar);

// Floating button to open the sidebar
const openButton = document.createElement('button');
openButton.textContent = 'Open Sidebar';
openButton.id = 'openSidebar';
openButton.style.cssText = 'display: none; position: fixed; top: 50%; right: 10px; z-index: 1001;';
openButton.style.display = 'block';
openButton.onclick = function() {
    // document.getElementById('mySidebar').style.display = 'block';
    // openButton.style.display = 'none';
    // sidebar.style.right = '0';

    const sidebar = document.getElementById('mySidebar');
    sidebar.style.display = 'block'; // First, make the sidebar visible

    // Wait for the next frame before starting the transition
    requestAnimationFrame(function() {
        // Start the transition by changing the position
        sidebar.style.right = '0';
    });

    openButton.style.display = 'none';
};
document.body.appendChild(openButton);


// createSidebar(['it1', 'it2', 'itiaofidosapkf'])



    // const sidebar = document.createElement("div");
    // sidebar.id = "sidebar";
    
    // const folderList = document.createElement("div");
    // folderList.id = "folder-list";
    
    // const newFolderBtn = document.createElement("button");
    // newFolderBtn.id = "new-folder-btn";
    // newFolderBtn.textContent = "New Folder";
    
    // sidebar.appendChild(folderList);
    // sidebar.appendChild(newFolderBtn);
    
    // // Add the sidebar to the page
    // document.body.appendChild(sidebar);
    
    // // Load and display folders from local storage
    // displayFoldersFromLoclStorage();
    
    // // Handle the "New Folder" button click
    // newFolderBtn.addEventListener("click", createNewFolder);

    // const sidebar = document.createElement('div');
    // sidebar.id = 'myExtensionSidebar';
    // sidebar.style.cssText = 'position: fixed; top: 0; right: 0; width: 300px; height: 100%; background-color: white; border-left: 1px solid #ccc; z-index: 1000; overflow: auto;';
    // document.body.appendChild(sidebar);
  
    // // Load groups and links from storage and display them in the sidebar
    // // Add more logic as needed

    // // Function to create a list of folders
    // function createFoldersList() {
    //     getAllFolders(function(folders) {
    //         const list = document.createElement('ul');
    //         folders.forEach(folder => {
    //             const listItem = document.createElement('li');
    //             listItem.textContent = folder;
    //             listItem.addEventListener('click', function() {
    //                 // Expand or collapse folders
    //                 toggleFolder(this, folder);
    //             });
    //             list.appendChild(listItem);
    //         });
    //         sidebar.appendChild(list);
    //     });
    // }

    // // Function to toggle folders
    // function toggleFolder(listItem, folderName) {
    //     // If the folder is already expanded, collapse it
    //     if (listItem.classList.contains('expanded')) {
    //         listItem.classList.remove('expanded');
    //         listItem.innerHTML = folderName;
    //         return;
    //     }

    //     // Collapse any currently expanded folders
    //     const currentlyExpanded = sidebar.querySelector('.expanded');
    //     if (currentlyExpanded) {
    //         currentlyExpanded.classList.remove('expanded');
    //         currentlyExpanded.innerHTML = currentlyExpanded.textContent;
    //     }

    //     // Expand the new folder
    //     listItem.classList.add('expanded');
    //     getLinksFromFolder(folderName, function(links) {
    //         listItem.innerHTML = `<strong>${folderName}</strong>`;
    //         const linksList = document.createElement('ul');
    //         links.forEach(link => {
    //             const linkItem = document.createElement('li');
    //             linkItem.textContent = link;
    //             linksList.appendChild(linkItem);
    //         });
    //         listItem.appendChild(linksList);
    //     });
    // }

    // // Populate the sidebar with folders
    // createFoldersList();

  
  // Add more functions as needed
  