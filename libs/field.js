
var Field = {
	"xPos"	: -1,
	"yPos"	: -1,
	"placeId" : "",
	"count"	  :0,
	"_init": function (event) {
		var place = "";
		if (Field.placeId != "")
			place = document.getElementById(Field.placeId);
		else
			place = document.getElementsByTagName("body")[0];
		Field.xPos = event.offsetX ? (event.offsetX) : event.pageX - place.offsetLeft;
		Field.yPos = event.offsetY ? (event.offsetY) : event.pageY - place.offsetTop;
	},
	"add":function(event) {
		Field._init(event);
		var pos_x = Field.xPos-25;
		var pos_y = Field.yPos-15;
		document.getElementById("info").setAttribute("value", pos_x);
		var element = document.createElement("input");
		element.setAttribute("name","input_click");
		element.setAttribute("id","input_click_"+ Field.count++);
		element.setAttribute("class","dragable");
		//element.setAttribute("oncontextmenu","Field.remove(event, this);return false;");
		element.setAttribute("style", "background-color:#fff;-moz-opacity:0.5;width:50px;height:30px;border:2px solid #000;position:absolute;opacity: 0.5;left:"+pos_x+"px;top:"+pos_y+"px;");
		document.body.appendChild(element);
	},
	"remove":function (event) {
		//$(obj).remove();
		//document.getElementById(obj).value="ABC";
		alert("Thank for removing me!");
	}
};
