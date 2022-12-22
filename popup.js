// Todo: Make system more modular

let currentPopup;
const Popup = {
    popups: new Map,
    shade: null,
    current() { return currentPopup; },
    showPopup(name, state = true) {
        if(state) Popup.hideAllPopups();
        document.body.setAttribute("obscured", state);
        let popup = Popup.popups.get(name);
        popup.setAttribute("shown", state);
        currentPopup = popup;
        Popup.shade.setAttribute("shown", state);
    },
    hidePopup(name) {
        Popup.showPopup(name, false)
        currentPopup = null;
    },
    hideAllPopups() {
        Popup.popups.forEach((key, value) => Popup.hidePopup(value));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    Popup.shade = document.createElement("div");
    Popup.shade.classList.add("shadeBehindPopup");
    Popup.shade.setAttribute("shown", false);
    Popup.shade.addEventListener("click", Popup.hideAllPopups);
    document.body.appendChild(Popup.shade);
})


export default Popup;