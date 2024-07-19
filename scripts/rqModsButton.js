// rqModsButton: add a button to the top of the RepairQ screen which opens the RQ Mods menu

function injectButton(button) { // Add the button to the page
    let sibling = document.getElementById('globalSearches'); // Find the injection point
    sibling.parentNode.insertBefore(button, sibling);
}
/*
function createButton() { // Create the button element
    let rqButton = document.createElement('div');
    rqButton.id = 'rqButton';
    rqButton.style.display = 'block';
    rqButton.style.width = '40px';

    let logo = document.createElement('img');
    logo.alt = 'RQ Mods logo';
    let imgSrc = chrome.runtime.getURL('images/fullLogo.png');
    logo.src = imgSrc;
    logo.style.height = '40px';

    rqButton.appendChild(logo);

    injectButton(rqButton);
}
*/
function createButton() { // Add the button to the page
    let navBarItems = document.getElementsByClassName('hover-menu');
    let insertPoint = navBarItems[6];

    let imgSrc = chrome.runtime.getURL('images/fullLogo.png');

    let html = `
        <li class='hover-menu'>
        <a href='#' title='user-custom-link'>
            <img alt='RQ Mods logo' src=${imgSrc} style='width:auto; height: 18px;'>
        </a>
    `;

    try {
        insertPoint.insertAdjacentHTML('afterend', html);
    } catch {
        return;
    }
}

createButton();