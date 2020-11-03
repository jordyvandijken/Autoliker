var addbtn = null;
var removebtn = null;
var refeshbtn = null;


document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { handling: "active" });
	});

	// get the buttons
	addbtn = document.getElementById("al_btn_add");
	removebtn = document.getElementById("al_btn_remove");
	refeshbtn = document.getElementById("al_btn_refresh");

	// add functions
	addbtn.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "add" });
			removebtn.style.display = "";
			addbtn.style.display = "none";
		});
	})
	removebtn.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "remove" });
			addbtn.style.display = "";
			removebtn.style.display = "none";
		});
	})
	refeshbtn.addEventListener("click", function () {
		//console.log("click");
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "active" });
		});
		addbtn.style.display = "none";
		removebtn.style.display = "none";


		setTimeout(function () {
			containsInList();
		}, 100);
	})

	// check if list contians
	containsInList();
});

function containsInList() {
	chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
		var likeusers = result;
		//console.log("Like users", likeusers.likeuservideos);

		// get current user
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "active" });

			chrome.storage.sync.get({ "currentuser": "" }, function (active) {
				var containsuser = false;
				for (var i = 0; i < likeusers.likeuservideos.length; i++) {
					if (likeusers.likeuservideos[i] == active.currentuser) {
						containsuser = true;
					}
				}

				//console.log(active.currentuser);

				if (containsuser) {
					addbtn.style.display = "none";
					removebtn.style.display = "";
					removebtn.innerHTML = "Stop auto like " + active.currentuser;
				} else {
					addbtn.style.display = "";
					removebtn.style.display = "none";
					addbtn.innerHTML = "Auto like " +  active.currentuser;
				}
			});
		});
	});	
}

// get active
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { handling: "active" });
});