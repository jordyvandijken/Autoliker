var likeusers = [];
var btn;
var currentYoutuber;

function LikeVideo() {
    // check if already liked
    if (ContainsUser() && btn.getAttribute("aria-pressed") === "false") {
        btn.click();
    } 
}


// once loaded get the info
chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
    // get the list
    likeusers = result;

    // load info
    LoadPageInfo();
});


function LoadPageInfo() {
    var primary = document.querySelector("#primary");
                         //document.querySelector("#primary").querySelector("#channel-name").getElementsByTagName("a")[0].innerText
    if (!IsEmpty(primary)) {
        currentYoutuber = primary.querySelector("#channel-name").getElementsByTagName("a")[0].innerText;
        btn = primary.querySelector("#top-level-buttons").getElementsByTagName("button")[0];

        console.log(currentYoutuber);
        console.log(btn);

        if (!IsEmpty(currentYoutuber) & !IsEmpty(btn)) {
            setTimeout(function () {
                LikeVideo();
            }, 60000);
        }
    } 
}

function RetryPageload() {
    setTimeout(function () {
        LoadPageInfo();
    }, 2000);
}


// Listen to button calls
chrome.runtime.onMessage.addListener(function (request, sender) {
    switch (request.handling) {
        case "test":
            console.log("test recieved");
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
    if (!IsEmpty(currentYoutuber)) {
        chrome.storage.local.set({ "currentuser": currentYoutuber }, function () {
            console.log('Currentuser is set to ' + currentYoutuber);
        });

        return likeusers.likeuservideos.indexOf(currentYoutuber) !== -1;
    } else {
        LoadPageInfo();

        setTimeout(function () {
            ContainsUser();    
        }, 100);
	}
    

}

function AddUser() {
    chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
        likeusers = result;

        var youtuber = document.getElementById("channel-name").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML;

        if (!ContainsUser()) {
            likeusers.likeuservideos.push(youtuber);
            SavaData();
            btn.click();
            likevideo();

            console.log("Added Users: ", likeusers.likeuservideos);
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

            console.log("Removed Users: ", likeusers.likeuservideos);
        }
    });
}

function SavaData() {
    chrome.storage.sync.set({ "likeuservideos": likeusers.likeuservideos }, function () {
        console.log('likeuservideos is set to ' + likeusers.likeuservideos);
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

function IsEmpty(dim) {
    if (dim === "" || dim === null || dim === undefined || dim === false || dim.length === 0 || dim.length === 000) {
        return true;
    }

    return false;
}
