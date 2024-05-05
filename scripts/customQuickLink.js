/*
    Custom Quick Link:
    Users can save a custom URL and a name for that URL in the settings for this extension.
    This script renders that link alongside the usual RQ nav links on every page.
*/

function renderLink(name, link) {
    // Identify the navbar, and specifically choose the last item in the navbar. 
    // This is where our link will be placed.
    let navBarItems = document.getElementsByClassName('hover-menu');
    let insertPoint = navBarItems[6];

    // Catch undefined in case the user hasn't set up a link yet
    if (name === undefined) {
        name = 'custom quick link';
    }
    if (link === undefined) {
        link = 'https://cpr.repairq.io';
    }

    // Create the new link element and insert it
    let html = `
        <li class='hover-menu'>
        <a href='${link}' alt=${name} title='user-custom-link'>${name}</a>
        `;
    try {
        insertPoint.insertAdjacentHTML('afterend', html);
    } catch {
        return;
    }
    
}

// Get the user's custom link name and URL from their sync storage
function getLink() {
    let name = '';
    let link = '';
    chrome.storage.sync.get(['customQuickLinkName', 'customQuickLinkUrl'])
    .then((result => {
        name = result.customQuickLinkName;
        link = result.customQuickLinkUrl;
        renderLink(name, link);
    }));

    
}

// Check the user's sync storage to see if they've disabled this
// whole feature. If they have, don't run any other code in this file.
function checkIfEnabled() {
    chrome.storage.sync.get(['enabled'])
    .then((result => {
        if (result.enabled == undefined) {
            getLink();
        } else if (result.enabled[0] == 1) {
            getLink();
        } else {
            return;
        }
    }));

}

checkIfEnabled();