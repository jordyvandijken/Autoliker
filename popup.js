document.addEventListener('DOMContentLoaded', function () {

	var addbtn = document.getElementById("al_btn_add");
	var removebtn = document.getElementById("al_btn_remove");

	addbtn.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "add" });
		});
	})

	removebtn.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { handling: "remove" });
		});
	})

	//chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	//	chrome.tabs.sendMessage(tabs[0].id, { handling: "contains" }, function (res) {
	//		CreateButton(res.response);
	//	});
	//});

	//chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	//	chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
	//		console.log(response);
	//		//console.log(response.farewell);
	//	});
	//});

	//function CreateButton(res) {
	//	console.log(123);
	//	var container = document.getElementById("al_btn_container");

	//	var bttn = document.createElement("button");

	//	// Remove
	//	if (container && res.contains) {
	//		bttn.onclick = function () {
	//			// remove
	//			//chrome.tabs.sendMessage(tabs[0].id, 'remove', SetButton);
	//		}
	//		bttn.style.backgroundColor = "red";
	//		bttn.innerHTML = "Auto like youtuber"

	//	// Add
	//	} else if (container && !res.contains) {
	//		bttn.onclick = function () {
	//			// add to list
	//			//chrome.tabs.sendMessage(tabs[0].id, 'add', SetButton);
	//		}
	//		bttn.style.backgroundColor = "green";
	//		bttn.innerHTML = "Dont auto like youtuber"

	//	}

	//	document.body.appendChild(bttn);
	//}

	chrome.storage.sync.get({ "likeuservideos": [] }, function (result) {
		console.log(result.likeuservideos);
	});
}, false);