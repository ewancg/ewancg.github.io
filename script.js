import Navigation, { } from './navigation.js';
import Popup, { } from './popup.js';
import Gist, { } from './gist.js';

let width = window.innerWidth;
let mobileTolerance = 680;

let animationTimeDetermined = false;
function determineAnimationTime() {
  if (!animationTimeDetermined) {
    animationTimeDetermined = true;
    let r = document.querySelector(':root');
    let time = getComputedStyle(r).getPropertyValue("--dock-animation-time");
    r.style.setProperty('--real-dock-animation-time', time);
  }
}

let contactInfo = new Map();
function getContactData(requestName) {
  Popup.showPopup(requestName);

  if (!contactInfo.get(requestName)) {

    const xhr = new XMLHttpRequest();
    let url = `http://connect.starbo.lt:6621/get/${requestName.toLowerCase()}`; // I hate this, but it will have to do for now
    xhr.open("GET", url);
    xhr.send();

    let popup = Popup.current();
    let determineStatus = () => {
      Array.from(popup.getElementsByClassName("spinner")).forEach((i) => i.toggleAttribute("hidden", true));
      if (xhr.status == 200) {
        contactInfo.set(requestName, xhr.responseText.trim());
        Array.from(popup.getElementsByClassName("fetchDependent")).forEach((i) => i.toggleAttribute("shown", true));
        Array.from(popup.getElementsByClassName("fetchError")).forEach((i) => i.toggleAttribute("shown", false));
        Array.from(popup.getElementsByClassName("contactDestination")).forEach((i) => i.innerText = contactInfo.get(requestName));
      } else {
        console.log(`Request to ${url} has failed with code ${xhr.status}`);
        Array.from(popup.getElementsByClassName("fetchDependent")).forEach((i) => i.toggleAttribute("shown", false));
        Array.from(popup.getElementsByClassName("fetchError")).forEach((i) => {
          i.toggleAttribute("shown", true);
          i.innerText = `Failed to get ${requestName} information with error ${xhr.status}`;
        }
        );
      }
    }

    xhr.onerror = determineStatus;
    xhr.onload = determineStatus;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all(document.getElementsByClassName("dynamicHeader")[0].getAnimations().map((anim) => anim.finished)).then(
    determineAnimationTime()
  );

  function selectElementText(element) {
    var doc = window.document, sel, range;
    if (window.getSelection && doc.createRange) {
      sel = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(element);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    }
  };

  Array.from(document.getElementsByClassName("contactDestination")).forEach((i) => i.addEventListener("click", () => selectElementText(i)));

  Popup.popups.set("Discord", document.getElementById("popupDiscord"))
  Popup.popups.set("Slack", document.getElementById("popupSlack"))
  Popup.popups.set("Email", document.getElementById("popupEmail"));
  Array.from(document.getElementsByClassName("contactButton")).forEach(element => {
    element.addEventListener("mousedown", () => eval(element.getAttribute("callback")));
  });
})

/*   Array.from(document.getAnimations()).forEach((item) => { item.addEventListener("remove", determineAnimationTime(item))})
 *///  



/*
function mobileStateChanged() {
  return ((window.innerWidth > mobileTolerance && width <= mobileTolerance) || (window.innerWidth <= mobileTolerance && width > mobileTolerance));
}

let resizeObserver = new ResizeObserver(() => {
  if (width == window.innerWidth) return;
  if (mobileStateChanged()) {
    hidePopup("all");
    Array.from(document.getElementsByClassName("popup")).forEach(dragElement);
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
  document.getElementById("popupGray").style.display = "block";

};

function hidePopup(id) {
  if (id == "all") {
    var els = document.querySelectorAll('.popup');
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
  document.getElementById("popupGray").style.display = "none";
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

    if (e.button == 0) {
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    if (width <= mobileTolerance) return;
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

resizeObserver.observe(document.body);
Array.from(document.getElementsByClassName("popup")).forEach(dragElement);
 */