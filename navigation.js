import Popup, {} from './popup.js';

// Todo: Make system more modular? Show/hide pages by attribute, provide "default" nav entry for no page (summary)

const Navigation = {
  dockNav(docked) {
    let content = document.getElementsByClassName("dynamicHeader")[0];
    content.toggleAttribute("docked", docked);
  },

  pages: [],
  navigate(docked, hash, page) {
    this.dockNav(docked);
    
    if(hash) window.location.hash = hash;
    else history.pushState("", document.title, window.location.pathname + window.location.search);
    
    this.pages.forEach((elem) => {
      elem.toggleAttribute("shown", false);
    })
    if(page) page.toggleAttribute("shown", true);
  },

  showContact() {
    Navigation.navigate(true, "contact", document.getElementById("contactPage"));
  },

  showPortfolio() {
    Navigation.navigate(true, "portfolio", document.getElementById("portfolioPage"));
  },

  showSummary() {
    Navigation.navigate(false, "", null);
  },

  animateNavButton(parent, object) {
    let index;
    for (let e = 0; e < parent.children.length; e++) { if (parent.children[e] == object) index = e; }
    const count = parent.children.length;

    let step = 100 / count;
    const style = document.createElement('style');
    style.textContent = `
      #${parent.id} {
          background-size: ${(step)}% 100%;
          background-position-x: ${(50 * index)}%;
        }
        `;
    document.head.appendChild(style);
    Array.from(parent.children).forEach(function (child) {
      child.toggleAttribute("selected", false);
    })
    object.toggleAttribute("selected", true);
  },

  createNavButton(obj) {
    obj.oncontextmenu = () => { return false; }
    let children = obj.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].getAttribute("isNavButton") != true) {
        children[i].onmousedown = function (evt) {
          switch (evt.button) {
            case 0: //Left
              let callback = this.getAttribute("callback");
              eval(callback);
              Navigation.animateNavButton(obj, this)
              break;
            case 1:
              //alert("open in new tab requested")
              // open / in new tab
              break;
            case 2:
              //alert("custom context menu requested")
              // Show custom context menu
              break;
          }
        }
        children[i].toggleAttribute("isNavButton", true);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Navigation.pages.push(document.getElementById("contactPage"), document.getElementById("portfolioPage"));

  let evalUrlHash = () => {
    Popup.hideAllPopups();
    const navButtonContainer = document.getElementById("mainNavButton");
    let navButton;

    let summary = () => {
      navButton = document.getElementById("summaryNavButton");
      Navigation.showSummary();
    }

    if (window.location.hash) {
      switch (window.location.hash) {
        case "#contact":
          navButton = document.getElementById("contactNavButton");
          break;
        case "#portfolio":
          navButton = document.getElementById("portfolioNavButton");
          break;
        default:
          console.log("Invalid URL hash provided. Showing summary.")
          summary();
          break;
      }
    } else summary();

    let navButtonContainers = document.getElementsByClassName("navButtonContainer");
    Array.from(navButtonContainers).forEach((item) => {
      if (item.getAttribute("isNavButton") != true) Navigation.createNavButton(item);
    });

    eval(navButton.getAttribute("callback"));
    Navigation.animateNavButton(navButtonContainer, navButton);

  }
  evalUrlHash();
  window.addEventListener("hashchange", evalUrlHash);
}
)

export default Navigation;