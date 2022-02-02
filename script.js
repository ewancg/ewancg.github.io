let width = window.innerWidth;
let mobileTolerance = 680;

function mobileStateChanged() {
  return ((window.innerWidth > mobileTolerance && width <= mobileTolerance) || (window.innerWidth <= mobileTolerance && width > mobileTolerance));
}

let resizeObserver = new ResizeObserver(() => {
	if(width == window.innerWidth) return;
  if (mobileStateChanged()) {
    hidePopup("all");
    Array.from(document.getElementsByClassName("divPopup")).forEach(dragElement);
  }
  width = window.innerWidth;
});

function showPopup(id) {
  if (width > mobileTolerance) {
    document.getElementById(id).style.display = "block";
    var w, h;
    w = document.getElementById(id).offsetWidth.toString();
    h = document.getElementById(id).offsetHeight.toString();
    document.getElementById(id).style.minWidth = w.concat("px");
    document.getElementById(id).style.maxWidth = w.concat("px");
    document.getElementById(id).style.minHeight = h.concat("px");
    document.getElementById(id).style.maxHeight = h.concat("px");
  } else {
    document.getElementById(id).style.display = "flex";
  }
  document.getElementById("divPopupGray").style.display = "block";

};

function hidePopup(id) {
  if (id == "all") {
    var els = document.querySelectorAll('.divPopup');
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute("style", "display", "none");
      els[i].setAttribute("style", "left", "50%");
      els[i].setAttribute("style", "top", "50%");
    }
  } else {
    document.getElementById(id).style.display = "none";
    document.getElementById(id).style.left = "50%";
    document.getElementById(id).style.top = "50%";
  }
  document.getElementById("divPopupGray").style.display = "none";
};

function selectElementText(el, win) {
  win = win || window;
  var doc = win.document,
    sel, range;
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

function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
	if (width <= mobileTolerance) return;
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
	if (width <= mobileTolerance) return;
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

resizeObserver.observe(document.body);
Array.from(document.getElementsByClassName("divPopup")).forEach(dragElement);

//shittons of this code was taken and changed from w3schools/stack overflow because i am a javascript noob and intend to keep it that way
