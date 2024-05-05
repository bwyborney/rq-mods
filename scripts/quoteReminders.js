/*
    Quote Reminders:
    While on a customer page, if they have an active quote, block the "+ repair"
    button and highlight the Quotes tab
*/

// Identify if there are any active quotes
function checkForQuote() {
    let quoteFound = false;
    // If there is an active quote, this query selector should find something
    const quoteElements = document.querySelectorAll("a[data-original-title='convert']");
    if (quoteElements.length > 0) {
        quoteFound = true;
    }   
    return(quoteFound);
}

// If a quote was found, draw a red box around the 'quotes' link
function remind() {
    const quoteLink = document.querySelectorAll("a[href='#quotes']")[0];
    quoteLink.style.borderColor = '#FF3100';
    quoteLink.style.borderStyle = 'solid';
    quoteLink.style.borderWidth = '8px';
    quoteLink.style.borderRadius = '4px';
}

function askForOverride() {

}

// Prevent the "add ticket" button from being clicked
function blockClick() {
    const injectPoint = document
        .getElementsByClassName('btn-group pull-right dropdown-with-backdrop')[0]
        .getElementsByTagName('ul')[0]
        .getElementsByTagName('li')[1]
        .getElementsByTagName('a')[0];
    injectPoint.href='#';
    injectPoint.addEventListener('click', askForOverride);
}

// Check the user's sync storage to see if they've disabled this
// whole feature. If they have, don't run any other code in this file.
function checkIfEnabled() {
    chrome.storage.sync.get(['enabled'])
    .then((result => {
        if (result.enabled == undefined) {
            let quoteFound = checkForQuote();
            if (quoteFound == true) {
                remind();
            }
        } else if (result.enabled[2] == 1) {
            let quoteFound = checkForQuote();
            if (quoteFound == true) {
                remind();
            }
        } else {
            return;
        }
    }));

}

checkIfEnabled();