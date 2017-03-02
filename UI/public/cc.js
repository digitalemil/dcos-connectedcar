var model = new EagleModel();
var pos = 0;

function Pointer(text) {
	this.thinginit(2);

	var white = 0xfff6f6f6;

	this.name = "Pointer";
	var body = new Bone(0, -128, 0, 0, 2);
	body.setName("Body");

	body.add(new Triangle(0, 0, 0, 0, 0, 8, 128, -8, 128, 0, white));
	body.add(new Ellipse(8, 8, 0, 128, 0, 0, 24, white));
	body.setupDone();

	this.add(body);
	this.setupDone();
}

Pointer.prototype = new Thing(2);

function Pedal() {
	this.thinginit(2);

	var c = 0xff575050;

	this.name = "Pedal";
	var body = new Bone(0, -128, 0, 0, 2);
	body.setName("Body");

	this.q = new Quadrangle();
	this.q.coordtap = new CoordinateTap("Pedal");
	this.q.init(-24, 0, -32, 64, 32, 64, 24, 0, 0, 0, 0, 0, c);
	body.add(this.q);

	body.setupDone();

	this.add(body);
	this.setupDone();
}

Pedal.prototype = new Thing(2);

function Warning() {
	this.thinginit(2);

	var c = 0x80FF0000;

	this.name = "Warning";
	var body = new Bone(0, -128, 0, 0, 2);
	body.setName("Body");

	this.q = new Quadrangle();
	this.q.coordtap = new CoordinateTap("Pedal");
	this.q.init(-96, 0, 96, 0, 90, -64, -90, -64, 0, 0, 0, 0, c);

	var t = new Text();
	t.init("Slow!", 0, -32, 0x80FFFFFF);
	t.setSize(56);
	body.add(this.q);
	body.add(t);
	console.log(t);
	body.setupDone();

	this.add(body);
	this.setupDone();
}

Warning.prototype = new Thing(2);

Pedal.prototype.isIn = function(x, y) {
//	alert(this.q.coordtap.a11+" "+this.q.coordtap.a21+" "+this.q.coordtap.a12+" "+this.q.coordtap.a22);
	if (x >= this.q.coordtap.a11 && x <= this.q.coordtap.a21
			&& y >= this.q.coordtap.a12 && y <= this.q.coordtap.a22)
		return true;
	return false;
};

function PedalPressed() {
	this.thinginit(2);

	var c = 0xff554d4d;

	this.name = "Pedal";
	var body = new Bone(0, -128, 0, 0, 2);
	body.setName("Body");

	this.q = new Quadrangle();
	this.q.coordtap = new CoordinateTap("Pedal");
	this.q.init(-20, 16, -32, 64, 32, 64, 20, 16, 0, 0, 0, 0, c);
	body.add(this.q);

	body.setupDone();

	this.add(body);
	this.setupDone();
}

PedalPressed.prototype = new Thing(2);

function Strip() {
	this.thinginit(2);

	var c = 0xffedd357;

	this.name = "Pedal";
	var body = new Bone(0, -128, 0, 0, 2);
	body.setName("Body");

	this.q = new Quadrangle();
	this.q.coordtap = new CoordinateTap("Pedal");
	this.q.init(-6, 0, 6, 0, 18, 64, -18, 64, 0, 0, 0, 0, c);
	body.add(this.q);

	body.setupDone();

	this.add(body);
	this.setupDone();
}

Strip.prototype = new Thing(2);

var speed = 0;

setSpeed = function(s) {
	if (s < 0)
		s = 0;
	if (s > 160)
		s = 160;
	speed = s;
	pointer.rotate(-pointer.rot - 2 * speed);
};

var img0 = new ImageThing("cc00.png",
		640 * scale, 960 * scale);
var img1 = new ImageThing("cc01.png",
		640 * scale, 960 * scale);

var strips = new Array();
for (var i = 0; i < 6; i++) {
	strips[i] = new Strip();
	strips[i].scale(scale, scale);
	strips[i].scaleRoot(0.1, 0.1);

	strips[i].translateRoot(-88 * scale, -252 * scale, 0);
	strips[i].translate(0, 10 * scale + 10 * scale * i * i, 0);
	strips[i].scale(1 + strips[i].y / 40, 1 + strips[i].y / 40);

}

var n = 0;
var pointer = new Pointer();
var ongas = false;
var onbreak = false;

pointer.scale(scale, scale);
pointer.translate(0, 192 * scale);
pointer.rrot = 180;
setSpeed(0);

var pl = new Pedal();
pl.translate(-220 * scale, 480 * scale);
var pr = new Pedal();
pr.translate(220 * scale, 480 * scale);

var pl_pressed = new PedalPressed();
pl_pressed.translate(-220 * scale, 480 * scale);
pl_pressed.setVisibility(false);

var pr_pressed = new PedalPressed();
pr_pressed.translate(220 * scale, 480 * scale);
pr_pressed.setVisibility(false);

var warning = new Warning();
warning.scale(scale, scale);
warning.translate(0, -128 * scale, 0);
warning.setVisibility(false);

allThings[pos++] = img0;
for (var i = 0; i < strips.length; i++) {
	allThings[pos++] = strips[i];
}

allThings[pos++] = warning;
allThings[pos++] = img1;
allThings[pos++] = pointer;
allThings[pos++] = pl;
allThings[pos++] = pr;
allThings[pos++] = pl_pressed;
allThings[pos++] = pr_pressed;

model.setNumberOfThings(pos);
document.body.style.background = "#0e0c0c";

view = new View(canvas, model, 40);

view.touchdown = function(e) {
	e.preventDefault();
	var event;
	if (e.touches != undefined) {
		event = e.touches[0];
	} else {
		event = e;
	}
	var x = event.clientX - w / 2;
	var y = event.clientY - h / 2;
	if (pl.isIn(x, y)) {
		onbreak = true;
		pl.setVisibility(false);
		pl_pressed.setVisibility(true);
	}
	if (pr.isIn(x, y)) {
		ongas = true;
		pr.setVisibility(false);
		pr_pressed.setVisibility(true);
	}

};

view.touchup = function(e) {
	var event;
	var x;
	var y;

	if (e.changedTouches != undefined) {
		event = e.changedTouches[0];
		x = event.pageX - w / 2;
		y = event.pageY - h / 2;
	} else {
		x = e.clientX - w / 2;
		y = e.clientY - h / 2;
	}
	if (pl.isIn(x, y)) {
		onbreak = false;
		pl.setVisibility(true);
		pl_pressed.setVisibility(false);
	}
	if (pr.isIn(x, y)) {	
		ongas = false;
		pr.setVisibility(true);
		pr_pressed.setVisibility(false);
	}
};

view.update = function(timer) {
	n++;

	if (n % 10 == 9) {

		if (ongas) {
			speed += 2;
		} else {
			speed -= 1;
		}
		if (onbreak) {
			speed -= 4;
		}
		setSpeed(speed);
		postData();
		fetchData();
	}
	for (var i = 0; i < strips.length; i++) {
		strips[i].translate(0, 0.08 * speed * scale * strips[i].y / 60.0, 0);
		if (strips[i].y > 480 * scale)
			strips[i].translate(0, -strips[i].y + 10 * scale, 0);
		strips[i].scale(1 / strips[i].sx, 1 / strips[i].sy);
		strips[i].scale(1 + strips[i].y / 40, 1 + strips[i].y / 40);
	}

	this.paint();
};

function postData() {
	req = false;
	var url = "data";
	if (server != undefined && server != null && server.length > 8)
		url = servertotry + "/" + url;
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch (e) {
			req = false;
		}
	} else {
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					req = false;
				}
			}
		}
	}
	if (req) {
		req.onreadystatechange = processData;
		req.open("POST", url, true);
		let d = new Date();
		let utc_timestamp= getUTCString(d)


		let json = '{"id":"'+d.getTime()
		+ '", "location":"0,0", "event_timestamp":"' + utc_timestamp
		+ '", "deviceid":"' + user + '", "user":"' + user
		+ '", "heartrate":"' + speed + '"}';
		req.send(json);
	} else {
		alert("req== false");
	}

}

function getUTCString(d) {
        let day= d.getUTCDate();
    	daystring= ""+day;
			
  			if(day< 10)
    				daystring="0"+daystring;
  			 month= d.getUTCMonth()+1;
  			 monthstring= ""+month;
  			if(month< 10)
    				monthstring="0"+monthstring;
            		
		     hour= d.getUTCHours();
			 hourstring= ""+hour;
  			if(hour< 10)
    				hourstring="0"+hourstring;
            		
			 minute= d.getUTCMinutes();
			 minutestring= ""+minute;
  			if(minute< 10)
    				minutestring="0"+minutestring;
            		    
			let second= d.getUTCMilliseconds()/1000.0;
			let secondstring= ""+second;
  			if(second< 10)
    				secondstring="0"+secondstring
        return d.getFullYear()+"-"+monthstring+"-"+daystring+" "+hourstring+":"+minutestring+":"+secondstring+"";
};

function fetchData() {
	req = false;
	var url = "menu/sessions";
	if (server != undefined && server != null && server.length > 8)
		url = servertotry + "/" + url;
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch (e) {
			req = false;
		}
	} else {
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					req = false;
				}
			}
		}
	}
	if (req) {
		req.onreadystatechange = processData;
		req.open("GET", url, true);
		req.send("");
	} else {
		alert("req== false");
	}

}

function processData() {

	if (req.readyState != 4)
		return;
	if (req.status != 200) {
		setTimeout("fetchData()", 500);

		if (servertotry == server && servertried == "" && servertwo != "") {
			servertried = "";
			servertotry = servertwo;
			return;
		}
		if (servertotry == servertwo && servertried == "" && server != "") {
			servertried = "";
			servertotry = server;
		}
		return;
	}
	var response = req.responseText;
	var session;
	try {
		session = JSON.parse(response);
	} catch (ex) {
		setTimeout("fetchData()", 500);
		return;
	}

	for (var i = 0; i < session.users.length; i++) {
		if (user != session.users[i].name)
			continue;
		console.log("Found user: " + session.users[i].color);
		if (session.users[i].color == "0x80FF0000") {
			warning.setVisibility(true);
		} else {
			warning.setVisibility(false);
		}
	}
	setTimeout("fetchData()", 400);
}
