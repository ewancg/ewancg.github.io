
function showContact() {
  dockNav(true);
  window.location.hash = "contact"
  document.getElementById("contactPage").setAttribute("shown", true);
}

function showPortfolio() {
  window.location.hash = "portfolio"
  dockNav(true);
}

function showSummary() {
  dockNav(false);
  history.pushState("", document.title, window.location.pathname + window.location.search);
  document.getElementById("contactPage").setAttribute("shown", false);
}

function dockNav(docked) {
  let content = document.getElementsByClassName("dynamicHeader")[0];
  /*   let fn = docked ? content.setAttribute : content.removeAttribute;
    fn.call(content, "docked", "true") */

  content.setAttribute("docked", docked);
}

function animateNavButton(parent, object) {
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
      child.setAttribute("selected", false);
    })
    object.setAttribute("selected", true);
  }
  
  function createNavButton(obj) {
    obj.oncontextmenu = () => { return false; }
    let children = obj.children;
    for (let i = 0; i < children.length; i++) {
      if(children[i].getAttribute("isNavButton") != true) {
        children[i].onmousedown = function (evt) {
          switch (evt.button) {
            case 0: //Left
            let callback = this.getAttribute("callback");
            eval(callback);
            animateNavButton(obj, this)
            break;
          case 1:
            alert("open in new tab requested")
            // open / in new tab
            break;
            case 2:
              alert("custom context menu requested")
              // Show custom context menu
              break;
            }
          }
          children[i].setAttribute("isNavButton", true);
        }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    let evalUrlHash = () => {
      const navButtonContainer = document.getElementById("mainNavButton");
      let navButton;
  
      let summary = () => {
        navButton = document.getElementById("summaryNavButton");
        showSummary();
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
        if(item.getAttribute("isNavButton") != true) createNavButton(item);
      });
  
      /*     if(navButton.getAttribute("isNavButton") != true) createNavButton(navButtonContainer)
      */
      eval(navButton.getAttribute("callback"));
      animateNavButton(navButtonContainer, navButton);
  
    }
    evalUrlHash();
    window.addEventListener("hashchange", evalUrlHash);
  }
  )
  
export {animateNavButton, createNavButton, showContact, showPortfolio, showSummary};