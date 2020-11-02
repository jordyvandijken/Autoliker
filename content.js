var likeusers = [];

function likevideo() {
    setTimeout(function () {
        var ytbs = document.getElementsByTagName("yt-icon-button");

        var buttonfound = false;

        for (var i = 0; i < ytbs.length; i++) {
            var bttnchild = ytbs[i].firstElementChild;
            // find the right button
            if (bttnchild.getAttribute("aria-label") && bttnchild.getAttribute("aria-label").startsWith("like this video along with")) {
                // check if already liked
                if (ContainsUser() && bttnchild.getAttribute("aria-pressed") === "false") {
                    ytbs[i].click();
                    //console.log(ytbs[i].click());
                }

                buttonfound = true;
            }
        }

        if (!buttonfound) {
            likevideo()
        }
    }, 1000);
}



//chrome.storage.sync.get(['likeuservideos'], function (result) {
//    likeusers = result;
	
//    console.log("Like users", likeusers);
//    likevideo();
//});
chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
    likeusers = result;
	
    console.log("Like users", likeusers.likeuservideos);
    likevideo();
});

//var likebttn = document.getElementsByTagName("yt-icon-button")[7];

//console.log(likebttn);
//if (likebttn.getAttribute("aria-label").includes("like this video along with")) {
//    console.log(likebttn);
//}

// Listen to button calls
chrome.runtime.onMessage.addListener(function (request, sender) {
    switch (request.handling) {
        case "containsUser":
            //sendResponse({ contains: ContainsUser() });
            break;
        case "add":
            AddUser();
            break;
        case "remove":
            RemoveUser();
            break;
        default:
    }
});

// tab change
chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log("123");
});


//chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
//    console.log(sender.tab ?
//        "from a content script:" + sender.tab.url :
//        "from the extension");

//    sendResponse({ response: false });

//    switch (request.handling) {
//        case "containsUser":
//            sendResponse({ response: ContainsUser() });
//            break;
//        case "add":
//            //sendResponse({ contains: ContainsUser() });
//            break;
//        case "remove":
//            //sendResponse({ contains: ContainsUser() });
//            break;
//        default:
//    }
//});

//chrome.runtime.onMessage.addListener(
//    function (request, sender, sendResponse) {
//        console.log(sender.tab ?
//            "from a content script:" + sender.tab.url :
//            "from the extension");
//        if (request.greeting == "hello")
//            sendResponse({ farewell: "goodbye" });
//    });


function ContainsUser() {
    var youtuber = document.getElementById("channel-name").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML;

    return likeusers.likeuservideos.indexOf(youtuber) !== -1;
}

function AddUser() {
    chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
        likeusers = result;

        var youtuber = document.getElementById("channel-name").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML;

        if (!ContainsUser()) {
            likeusers.likeuservideos.push(youtuber);
            SavaData();
            likevideo();
        }
    });
}

function RemoveUser() {
    chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
        likeusers = result;

        var youtuber = document.getElementById("channel-name").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML;

        if (ContainsUser()) {
            likeusers.likeuservideos.remove(youtuber);
            SavaData();
        }
    });
}

function SavaData() {
    chrome.storage.sync.set({ "likeuservideos": likeusers.likeuservideos }, function () {
        console.log('Value is set to ' + value);
    });
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};