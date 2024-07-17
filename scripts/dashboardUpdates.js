// Notify users of updates on the homepage dashboard

// Add the update text to the page
function injectUpdates(update) {
    let dashboard = document.getElementById('dashboard'); // Find the dashboard element
    if (dashboard !== null) {

    }
}

// Turn the bullet points of the update into HTML elements
function createUpdate(updateText) {
    
}

// The contents of the update text
const updateText = {
    date: '7/17/24',
    version: '1.2.1',
    bullets: [
        'Added this update module here'
    ]
};


createUpdate(updateText);

/* TODO
Add this back to the manifest (see below)
Add the rest of the bullet points
Create the module and inject it in the page
Make a button to dismiss the module




{
            "js": [
                "scripts/dashboardUpdates.js"
            ],
            "matches" : [
                "https://cpr.repairq.io/",
                "https://cpr.repairq.io/#"
            ],
            "run_at": "document_end"
        }

*/