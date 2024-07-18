/*
    Necessary code for saving user-selected options
*/

// Allows for checkboxes to toggle their stored values and appearance when clicked
function toggleBox() {
    if (this.getAttribute('data-checked') == 'checked') {
        this.setAttribute('data-checked', 'unchecked');
        this.className = 'checkmark unchecked';
    } else {
        this.setAttribute('data-checked', 'checked');
        this.className = 'checkmark checked';
    }
}

// Save all options on the page when the 'save' button is clicked
function saveOptions() {
    // Find all the checkboxes and record whether they are checked (1) 
    // or unchecked (2)
    let checkedBoxes = [];
    let checkboxes = document.getElementsByClassName('checkmark');
    for (let b = 0; b < checkboxes.length; b++) {
        if (checkboxes[b].getAttribute('data-checked') == 'checked') {
            checkedBoxes[b] = 1;
        } else {
            checkedBoxes[b] = 0;
        }
    }

    // Get the user's chosen name and URL for their customer quick link
    const customQuickLinkName1 = document.getElementById('customQuickLinkName1').value;
    const customQuickLinkUrl1 = document.getElementById('customQuickLinkUrl1').value;
    const customQuickLinkName2 = document.getElementById('customQuickLinkName2').value;
    const customQuickLinkUrl2 = document.getElementById('customQuickLinkUrl2').value;
    const customQuickLinkName3 = document.getElementById('customQuickLinkName3').value;
    const customQuickLinkUrl3 = document.getElementById('customQuickLinkUrl3').value;
    const cbtText = document.getElementById('binLabelName').value;
    // const customFrameUrl = document.getElementById('customFrameUrl').value;

    // Apply changes to sync storage
    chrome.storage.sync.set(
        {
            customQuickLinkName1: customQuickLinkName1,
            customQuickLinkUrl1: customQuickLinkUrl1,
            customQuickLinkName2: customQuickLinkName2,
            customQuickLinkUrl2: customQuickLinkUrl2,
            customQuickLinkName3: customQuickLinkName3,
            customQuickLinkUrl3: customQuickLinkUrl3,
            // customFrameUrl: customFrameUrl,
            enabled: checkedBoxes,
            cbt: {enabled: true, text: cbtText}
        }, () => {
            alert('Options saved!');
        }
    );
}

// When the page is loaded, restore all saved options from the user's sync storage
function restoreOptions() {
    chrome.storage.sync.get(['customQuickLinkName', 'customQuickLinkUrl', 'enabled', 'cbt'])
    .then((result => {
        // Fill in the text fields with the custom link's name and URL
        document.getElementById('customQuickLinkName1').value = result.customQuickLinkName1;
        document.getElementById('customQuickLinkUrl1').value = result.customQuickLinkUrl1;
        document.getElementById('customQuickLinkName2').value = result.customQuickLinkName2;
        document.getElementById('customQuickLinkUrl2').value = result.customQuickLinkUrl2;
        document.getElementById('customQuickLinkName3').value = result.customQuickLinkName3;
        document.getElementById('customQuickLinkUrl3').value = result.customQuickLinkUrl3;
        document.getElementById('binLabelName').value = result.cbt.text;
        // document.getElementById('customFrameUrl').value = result.customFrameUrl;
        // Mark each checkbox are 'checked' or 'unchecked' depending on its saved value
        let checkboxes = document.getElementsByClassName('checkmark');
        for (let c = 0; c < checkboxes.length; c ++) {
            // Catch 'undefined' in case this is a user's first time loading up the settings
            if (result.enabled == undefined) {
                checkboxes[c].setAttribute('data-checked', 'checked');
                checkboxes[c].className = 'checkmark checked';
            } else if (result.enabled[c] == 0) {
                checkboxes[c].setAttribute('data-checked', 'unchecked');
                checkboxes[c].className = 'checkmark unchecked';
            } else if (result.enabled[c] == 1) {
                checkboxes[c].setAttribute('data-checked', 'checked');
                checkboxes[c].className = 'checkmark checked';
            }
        }

    }));

}

// Add click listeners for each checkbox
function addButtonListeners() {
    let checkboxes = document.getElementsByClassName('checkmark');
    for (let n = 0; n < checkboxes.length; n++) {
        checkboxes[n].addEventListener('click', toggleBox);
    }
}

restoreOptions();
addButtonListeners();

const saveButton = document.getElementById('saveOptions');
saveButton.addEventListener('click', () => {saveOptions()});


/* 
'Enabled' storage values (for keeping track of which settings are enabled or disabled):

    Looks like this:
    [0, 1, 1, 0]

    Position reference:
    0 - Custom Quick Link
    1 - Serial Number Reminders
    2 - Quote Reminders
    3 - Inventory Click Targets
    4 - Ticket Click Targets
    5 - Pattern Recorder
    6 - Pattern Printer
    7 - Quick Search Mouse Focus

*/