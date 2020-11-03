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


chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
    likeusers = result;
	
    console.log("Like users", likeusers.likeuservideos);
    likevideo();
});

// Listen to button calls
chrome.runtime.onMessage.addListener(function (request, sender) {
    switch (request.handling) {
        case "test":
            //console.log("test recieved");
            break;
        case "active":
            ContainsUser();
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

function ContainsUser() {
    var youtuber = document.getElementById("channel-name").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML;

    chrome.storage.sync.set({ "currentuser": youtuber }, function () {
        //console.log('Currentuser is set to ' + youtuber);
    });

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

            //console.log("Added Users: ", likeusers.likeuservideos);
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

            //console.log("Removed Users: ", likeusers.likeuservideos);
        }
    });
}

function SavaData() {
    chrome.storage.sync.set({ "likeuservideos": likeusers.likeuservideos }, function () {
        //console.log('likeuservideos is set to ' + likeusers.likeuservideos);
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