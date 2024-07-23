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



Here's my observer from rq checkin as an example:
let watch = document.getElementsByClassName('c-ticket')[0];
const config = {childList: true, attributes: true};
const observer = new MutationObserver(checkForForm);
if (document.getElementsByClassName('c-ticket')[0]) {
    observer.observe(watch, config);
}

#ticket-items

*/



/*
i got the observer working, now on to the rest

*/

function begin() {
    startObserver();
}

function startObserver() {
    if(document.getElementById('ticket-items') !== undefined) {
        let watch = document.getElementById('ticket-items');
        const config = {subtree: true, attributes: true};
        const observer = new MutationObserver(begin);
        observer.observe(watch, config);
    }
}

startObserver();
