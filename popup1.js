document.addEventlistener('DOMContentLoaded', function(){
	var btn = document.getElementById("id");
	btn.addEventListener('click', click);
});
function click(e) {
	chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor= 'red'"});
	window.close();
}

