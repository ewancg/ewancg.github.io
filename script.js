function showPopup(id) 
{
	document.getElementById(id).style.display = "block";
	document.getElementById("divPopupGray").style.display = "block";
	
	var w, h;
	w = document.getElementById(id).offsetWidth.toString();
	h = document.getElementById(id).offsetHeight.toString();
	document.getElementById(id).style.minWidth = w.concat("px");
	document.getElementById(id).style.maxWidth = w.concat("px");
	document.getElementById(id).style.minHeight = h.concat("px");
	document.getElementById(id).style.maxHeight = h.concat("px");
};

function hidePopup(id) 
{
	if(id == "all")
	{
		var els = document.querySelectorAll('.divPopup');
		for (var i=0; i < els.length; i++) {
			els[i].setAttribute("style", "display", "none");
			els[i].setAttribute("style", "left", "50%");
			els[i].setAttribute("style", "top", "50%");
		}
	}
	else
	{
		document.getElementById(id).style.display = "none";
		document.getElementById(id).style.left = "50%";
		document.getElementById(id).style.top = "50%";
	}
	document.getElementById("divPopupGray").style.display = "none";
};

function includeHTML()
{
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++)
	{
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("include-html");
		if (file)
		{
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function()
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404)
					{
						elmnt.innerHTML = "Page not found.";
					}
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("include-html");
					includeHTML();
				}
			}      
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
};

function selectElementText(el, win) {
	win = win || window;
	var doc = win.document, sel, range;
	if (win.getSelection && doc.createRange) {
		sel = win.getSelection();
		range = doc.createRange();
		range.selectNodeContents(el);
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (doc.body.createTextRange) {
		range = doc.body.createTextRange();
		range.moveToElementText(el);
		range.select();
	}
};

// Make the DIV element draggable:

Array.from(document.getElementsByClassName("divPopup")).forEach(dragElement);

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
};

selectElementText(document.getElementById("someElement"));
selectElementText(elementInIframe, iframe.contentWindow);

//shittons of this code was taken and changed from w3schools/stack overflow because i am a javascript noob and intend to keep it that way
