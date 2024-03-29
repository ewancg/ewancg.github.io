/* import {} from './node_modules/monaco-editor/min/vs/loader.js';
 */
const Gist = {

}

const languageAliases = new Map;
languageAliases.set("C++", "cpp");
languageAliases.set("C", "cpp");
languageAliases.set("Objective-C++", "objective-c");
languageAliases.set("JavaScript", "javascript");
languageAliases.set("Shell", "shell");

document.addEventListener('DOMContentLoaded', async function () {
  // Gist Data
  const metaXhr = new XMLHttpRequest();
  let url = "https://api.github.com/users/ewancg/gists";
  metaXhr.open("GET", url);
  // Sent after theme resolved

  let theme;
  let determineStatus = () => {
    if (metaXhr.status == 200) {
      let response = JSON.parse(metaXhr.responseText);
      response.forEach((gist) => {

        let dropdown = document.createElement("div");
        dropdown.classList.toggle("dropdown", true);

        let header = document.createElement("div");
        header.classList.toggle("dropdownHeader", true);


        let dropdownTitle = document.createElement("p");
        dropdownTitle.classList.toggle("uiText", true);
        dropdownTitle.classList.toggle("dropdownTitle", true);
        dropdownTitle.innerText = gist.description;
        header.appendChild(dropdownTitle);

        let dropdownIcon = document.createElement("div");
        dropdownIcon.classList.toggle("dropdownIcon", true);
        header.appendChild(dropdownIcon);
        dropdown.appendChild(header);

        const page = document.getElementById("portfolioPage");
        page.appendChild(dropdown);

        dropdown.addEventListener("click", async () => {
          if (dropdown.getAttribute("dataLoaded") != null) {
            dropdown.toggleAttribute("expanded");
          } else {
            dropdownIcon.classList.toggle("spinner", true);
              for (let key in gist.files) {
                const dataXhr = new XMLHttpRequest();
                dataXhr.open("GET", gist.files[key].raw_url);
                dataXhr.send();
               // setTimeout(() => dataXhr.send(), 2500)
                
                dataXhr.onload = () => {
                  const destination = document.createElement("div");
                  destination.classList.toggle("dropdownContents", true)
  
                  // gist dropdown, somewhere
                  let container = document.createElement("div");
                  container.classList.toggle("codeContainer", true);
                  let code = document.createElement("pre");
                  code.classList.toggle("gistCode", true);
  
                  let cleanHTML = html => { return html.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
                  let text = cleanHTML(dataXhr.responseText);
  
                  let footer = document.createElement("div");
                  footer.classList.toggle("codeFooter", true);
  
                  code.innerHTML = text;
                  code.setAttribute("data-lang", languageAliases.get(gist.files[key].language));
                  monaco.editor.colorizeElement(code, theme).then(html => {
                    container.appendChild(code);
                    destination.appendChild(container);
                    container.appendChild(footer);
                  });
  
                  // Footer
                  let filename = document.createElement("p");
                  filename.classList.toggle("footerText", true);
                  filename.innerText = gist.files[key].filename.trim();
  
                  let lang = document.createElement("p");
                  lang.classList.toggle("footerText", true);
                  lang.innerText = gist.files[key].language;
                  lang.style = "flex: 1 0 0;"
  
                  let lines = document.createElement("p");
                  lines.classList.toggle("footerText", true);
                  lines.innerText = `${dataXhr.responseText.split(/\r\n|\r|\n/).length - 1} lines`;
  
                  let size = document.createElement("p");
                  size.classList.toggle("footerText", true);
                  size.innerText = `${gist.files[key].size} bytes`;
  
                  footer.appendChild(filename);
                  footer.appendChild(lang);
                  footer.appendChild(lines);
                  footer.appendChild(size);
  
                  dropdown.toggleAttribute("expanded", true);
                  dropdown.toggleAttribute("dataLoaded", true);
                  dropdown.appendChild(destination);
  
                  dropdownIcon.classList.toggle("spinner", false);
                }
              } 
          }
        })

      });
    } else {
      console.log("Unable to access the GitHub API for Gists.");
    }
  }

  metaXhr.onerror = determineStatus;
  metaXhr.onload = determineStatus;

  // Theme  
  const themeXhr = new XMLHttpRequest();
  themeXhr.open("GET", "./resource/dracula.json");
  themeXhr.send();

  let determineTheme = () => {
    if (themeXhr.status == 200) monaco.editor.defineTheme('dracula', JSON.parse(themeXhr.responseText));
    theme = { theme: themeXhr.status == 200 ? "dracula" : "vs-dark" };
    metaXhr.send();
  }

  themeXhr.onload = determineTheme;
  themeXhr.onerror = determineTheme;

})

export default Gist;