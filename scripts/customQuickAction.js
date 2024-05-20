
function getFrameSource() {
    chrome.storage.sync.get(['customFrameUrl'])
    .then((result => {
        link = result.customFrameUrl;
        renderFrame(link);
    }));
}

// Check the user's sync storage to see if they've disabled this
// whole feature. If they have, don't run any other code in this file.
function checkIfCQAEnabled() {
    chrome.storage.sync.get(['enabled'])
    .then((result => {
        if (result.enabled == undefined) {
            getFrameSource();
        } else if (result.enabled[0] == 1) {
            getFrameSource();
        } else {
            return;
        }
    }));

}

checkIfCQAEnabled();