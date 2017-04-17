function click(e) {
  	//window.document.getElementsByTag("body")[0].setAttribute("id", "11123");
	try{
  chrome.tabs.executeScript(null,
      //{code:"document.getElementsByTag('body')[0].setAttribute('id', '11123');document.body.style.backgroundColor='red'"});
     {code:"document.body.style.color='green';document.body.id1='ch';document.body.style.backgroundColor='red'"});
  //{code : "var c = document.getElementsByTagName('id'); c[0].setAttribute('id1', 'abc');"});
      //{code:"document.body.style.backgroundColor='red'"});
  
	}
	catch(ex) {
	document.getElementById("out").innerHTML = ex.message;	
	}
	//alert("; p");

  //window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var span = document.getElementById("pbtn")
  span.addEventListener('click', click);
});
