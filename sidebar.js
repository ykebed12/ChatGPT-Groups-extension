console.log("Starting chatGPT edit")


// This function will create and append the sidebar to the document body
let items = {
    'group1': [('item1', 'http'), ('item2', 'http')],
    'group4': [],
    'group2': [('item1', 'http'), ('item2', 'http')],
    'group3': []
}
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
    // TODO: Implement your function here
    console.log('New Group button clicked');
};
buttonDiv.appendChild(newGroupButton);
buttonDiv.appendChild(closeButton)
sidebar.appendChild(buttonDiv);

const ul = document.createElement('ul');
ul.style.cssText = 'margin-top: 40px;'; // Add margin to avoid overlap with the close button
for (const item in items) {
    const accordionBtn = document.createElement('button');
    // add a delete/edit button for the group (ask "are you sure you want to delete group X")
    accordionBtn.textContent = item;
    accordionBtn.className = 'group-items'
    accordionBtn.addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });

    const linksPanel = document.createElement('div');
    linksPanel.id = 'links-panel';
    // linksPanel.className = 'panel'

    const linksUl = document.createElement('ul');

    // Bookmark is a tuple (bookmarkName, link)
    for (const bookmark in items[item]) {
        const [bookmarkName, bookmarkLink] = bookmark
        const li = document.createElement('li');
        li.className = 'link-list-item'

        const textNode = document.createElement('button');
        textNode.textContent = bookmarkName;

        li.appendChild(textNode)
        linksUl.append(li)

        
    }
    linksPanel.append(linksUl)

    ul.appendChild(accordionBtn);
    ul.appendChild(linksPanel)
};
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
  