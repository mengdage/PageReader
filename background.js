var Tips = {
	out: false,
	flag: false,
	httpAddress: "",
	lmContent: "",
	loadContent: function(event) {
		Tips.flag=false;
		Tips.out=false;
		Tips.httpAddress = this.href;
		var xmlhttp = new XMLHttpRequest();
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
				var parser=new DOMParser();
			  var doc=xmlhttp.responseText;
				var xmlDoc=$(parser.parseFromString(doc,"text/html"));
				Tips.lmContent = "<b>Address:</b> <small>"+Tips.httpAddress.substring(0,60);
				Tips.lmContent += Tips.httpAddress.length >= 60 ? "..." : "";
				Tips.lmContent += "</small><br>";
				if(Tips.httpAddress.length <60) {
				 Tips.lmContent = "<b>Address:</b> <small>"+Tips.httpAddress+"</small><br>"
				}
				else {
				 Tips.lmContent = "<b>Address:</b> <small>"+Tips.httpAddress.substring(0,60)+"...</small><br>"

				}
				var theTitle = xmlDoc.find('title');
				if(theTitle.length > 0) {
					Tips.lmContent += "<b>Title:</b> <font size='2pt'>"+ theTitle[0].innerText+"</font>";
				}
				else {
					Tips.lmContent += "<b>Title:</b> NULL";
				}
				var theP= xmlDoc.find('p:lt(3)');
				// console.log(theP);
				Tips.lmContent += "<br><b>Abstract: </b>";

				if(theP.length > 0) {
					theP.each(function(index, elem){
						var content = $(elem).text();
						Tips.lmContent += "<br><b>[" + (index+1) + "]</b>" + content.substring(0,100);
						Tips.lmContent += content.length > 100 ? "..." : "";
					});
				}
				else{
					Tips.lmContent += "<br>NULL";
				}

				Tips.flag=true;
				Tips.showTips(event);
				if(Tips.out) {
					Tips.closeTips();
				}
			}

		}

		var addr = "";
		if(Tips.httpAddress.split(':')[0] === 'http'){
			addr = 'https' + Tips.httpAddress.substring(4);
		}
		else{
			addr = Tips.httpAddress;
		}
		console.log("address: " + addr);
		xmlhttp.open("GET", addr, true);
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
		var $lmDiv = $('#lmDiv');
		if($lmDiv.length === 0){
			$lmDiv = $('<div></div>').attr('id', 'lmDiv');
			var $lmContent = $('<p></p>').attr('id', 'lmContent');
			$lmDiv.append($lmContent);
			$('body').append($lmDiv);
		}
		else {
			var $lmContent = $lmDiv.find('#lmContent');

		}
		$lmContent.html(Tips.lmContent);

		var mouse = Tips.mousePos(event);
		$lmDiv.css('top', mouse.y+10+'px');
		$lmDiv.css('left', mouse.x+10+'px');
		$lmDiv.css('display', 'block');
	}
	},
	closeTips: function() {
		if(!Tips.out){
			Tips.out = true;
			$('#lmDiv').css("display", "none");
		}
	},

	// getCurrentTabUrl: function(){
	// 	var queryInfo = {
	// 		active: true,
	// 		currentWindow: true
	// 	};
	// }

}

$('a').on('mouseover', Tips.loadContent);
$('a').on('mouseout', Tips.closeTips);
$('a').on('click', Tips.closeTips);
