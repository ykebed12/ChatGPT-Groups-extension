console.log("Starting chatGPT edit")
/*
createFolder(folderName, callback) - creates folder in system
saveLinkInFolder(link, folderName, callback) - saves link into the folder, into the system
getLinksFromFolder(folderName, callback) - get all links from folder
getAllFolders(callback) - get all folders that were created before

*/

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

// Close button
const closeButton = document.createElement('button');
closeButton.textContent = 'X';
closeButton.id = 'close-sidebar-btn'
closeButton.onclick = function() {

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
    
    const accordionBtn = document.createElement('button');
    accordionBtn.textContent = item;
    accordionBtn.className = 'group-items'
    ul.appendChild(accordionBtn);
});
groupsDiv.appendChild(ul)
sidebar.appendChild(groupsDiv);
document.body.appendChild(sidebar);

// Floating button to open the sidebar
const openButton = document.createElement('button');
openButton.textContent = 'Open Sidebar';
openButton.id = 'open-sidebar-btn';
openButton.style.display = 'block';
openButton.onclick = function() {

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
  