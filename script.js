function showPopup(id) 
{
    document.getElementById(id).style.display = "block";
    document.getElementById("divPopupGray").style.display = "block";
};
function hidePopup(id) 
{
    if(id == "all")
    {
        var els = document.querySelectorAll('.divPopup');
        for (var i=0; i < els.length; i++) {
            els[i].setAttribute("style", "display", "none");
        }
    }
    else
    {
        document.getElementById(id).style.display = "none";
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
}

selectElementText(document.getElementById("someElement"));
selectElementText(elementInIframe, iframe.contentWindow);
