/*
whenever a part is added, a new tr appears
has attribute itemid="0"
0 is the index of the item
another element is created, div with class item-detail-0
this div contains the sku AND the 0 in item-detail-0 is unique
need to grab div(class[item-detail-0]).child[1].child[0].child[7].innertext, that's the SKU
it's the only place that SKU exists


create mutation observer to listen for parts getting added
on add, loop through the same script for each catalog TR, every time (that's tr with class 'ticket-item-row')
grab their attribute itemid's value, it'll be a string/char with the index number
grab the content of the item-detail-x's great-grandchild element
    BUT FIRST grab child[1], which will tell you the item type. Make sure it doesn't match /Repair/
*figure out whether this is an item or not*
    best way to do that, two children down the list, or child[9] contains the suppliers. Could use this to either link to ZAGG or to cpr.parts
render the link in the row 



WHERE I'M LEAVING OFF
passing sku info to generateLink
need to check if it's not a repair, then generate a link element
pass that element back then append it


possible skuType
Repair - Phone
Part - Phone
Accessory - Screen Protector




*/

function generateLink(skuType, sku) {
    console.log(skuType);
    console.log(sku);
    console.log(supplier);
}

function begin() {
    observer.disconnect(); // Stop the observer for now so it doesn't repeatedly trigger

    let rows = document.getElementsByClassName('ticket-item-row'); // The rows in the items table
    if (rows.length > 0) {
        for (let r = 0; r < rows.length; r++) {
            let rowId = rows[r].getAttribute('itemid'); // Get the index of this item, according to what RepairQ has given it
            let details = document.getElementsByClassName(`item-detail-${rowId}`); // Identify the  div containing all the details of the SKU
            if (details.length === 1) {
                let skuType = details[0].children[1].children[0].children[1].innerText;
                let sku = details[0].children[1].children[0].children[7].innerText;
                let link = generateLink(skuType, sku);
            }
        }
    }

    setTimeout(() => {startObserver()}, '500'); // Delay starting the observer to prevent rapid repeated triggers
}

const config = {subtree: true, childList: true};
let observer = new MutationObserver(begin);

function startObserver() {
    if(document.getElementById('ticket-items') !== undefined) {
        let watch = document.getElementById('ticket-items');
        observer.observe(watch, config);
    }
}

startObserver();
