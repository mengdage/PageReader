var Tips = {
	out: false,
	flag: false,
	httpAddress: "",
	lmContent: "",
	loadContent: function(event) {
		Tips.flag=false;
		Tips.out=false;
		Tips.httpAddress = this.href;
		xmlhttp = new XMLHttpRequest();
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange=function(){

			if (!Tips.out && xmlhttp.readyState==4 && xmlhttp.status==200 ){
				parser=new DOMParser();
			    doc=xmlhttp.responseText;
				xmlDoc=parser.parseFromString(doc,"text/html");
				if(Tips.httpAddress.length <60) {
				 Tips.lmContent = "<b>Address:</b> <small>"+Tips.httpAddress+"</small><br>"
				}
				else {
				 Tips.lmContent = "<b>Address:</b> <small>"+Tips.httpAddress.substring(0,60)+"...</small><br>"

				}
				var theTitle = xmlDoc.getElementsByTagName("title");
				if(theTitle.length > 0) {
					Tips.lmContent += "<b>Title:</b> <font size='2pt'>"+ theTitle[0].innerText+"</font>";
				}
				else {
					Tips.lmContent += "<b>Title:</b> NULL";
				}
				var theP= xmlDoc.getElementsByTagName("p");
				if(theP.length > 0) {
				Tips.lmContent += "<br><b>Abstract: </b>";
				var j = 0;
				for(var i = 0, j = 1; i < theP.length && i < 3;i++) {
					if(theP[i].innerText.length > 100) {
						Tips.lmContent +="<br><b>[" + j+ "]</b> <font size='2pt'>"+theP[i].innerText.substring(0,100)+"</font>...";
						j++;
					}
					else if(theP[i].innerText.length > 50 ){
						Tips.lmContent +="<br><b>["+j+"]</b> <font size='2pt'>" + theP[i].innerText+"</font>";
						j++;
					}
				}
				}
				else {
				Tips.lmContent += "<br><b>Abstract: </b>NULL";
				}
				Tips.flag=true;
				Tips.showTips(event);
				if(Tips.out) {
					Tips.closeTips();
				}
			}
			else {
				//alert(xmlhttp.status);
				//Tips.c = Tips.c+ xmlhttp.readyState + " "+xmlhttp.status+"; ";
			}
		}
		xmlhttp.open("GET", Tips.httpAddress, true);
		//xmlhttp.responseType="document";
		xmlhttp.send()
	},


	mousePos : function(e) {
	var x, y;
		var e = e || window.event;
		return {
			x : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
			y : e.clientY + document.body.scrollTop + document.documentElement.scrollTop
		};
	},

	showTips : function(event){
		if(Tips.flag) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		var lmDiv = document.getElementById("lmDiv");
		var lmContent = document.getElementById("lmContent");
		if(typeof lmDiv == undefined || lmDiv == null){
			lmDiv = document.createElement("span");
			lmDiv.id = "lmDiv";
			document.body.appendChild(lmDiv);
		}
		if(typeof lmContent == undefined || lmContent == null) {
			lmContent = document.createElement("p");
			lmContent.id = "lmContent";
			lmDiv.appendChild(lmContent);
		}
		var mouse = Tips.mousePos(event);
		lmDiv.style.position = "absolute";
		lmDiv.style.width = "400px";
		lmDiv.style.height = "200px";
		lmDiv.style.backgroundColor = "#F5F5DC";
		lmDiv.style.color = "black";
		lmDiv.style.top = mouse.y + 10 + 'px';
		lmDiv.style.left = mouse.x + 10 + 'px';
		lmDiv.style.overflow = "hidden";
		//lmDiv.style.opacity = 0.8;

		lmContent.style.width = "400px";
		lmContent.style.padding = "0px";
		lmContent.style.margin = "0px"

		//lmContent.innerHTML = this.href;

		lmContent.innerHTML = Tips.lmContent;
		//lmDiv.innerHTML = target.getAttribute("href");
		lmDiv.style.display = "";
	}
	},
	closeTips: function() {
		var lmDiv = document.getElementById("lmDiv");
		lmDiv.style.display = "none";
		Tips.out = true;
		console.log(Tips.out);

	}
}

var links = document.getElementsByTagName("a");
for(var i = 0 ;i < links.length ; i ++){
	var obj = links[i];
		//obj.onmousemove = Tips.showTips;
		obj.addEventListener("mouseover",Tips.loadContent);
		//obj.addEventListener("mousemove",Tips.loadContent);
		obj.addEventListener("mouseout",Tips.closeTips);
		obj.addEventListener("click",Tips.closeTips);

}
