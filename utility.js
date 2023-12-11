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

// Function to make an element editable
function makeEditable(element, saveButton) {
    element.contentEditable = 'true';
    element.focus();
    saveButton.style.display = 'inline';
}

// Function to save the changes
function saveChanges(element, saveButton) {
    element.contentEditable = 'false';
    saveButton.style.display = 'none';
}