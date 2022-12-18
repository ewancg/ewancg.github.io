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
  let url = "https://api.github.com/users/EwanGreen4/gists";
  metaXhr.open("GET", url);
  // Sent after theme resolved
    
  let theme;
  let determineStatus = () => {
    if (metaXhr.status == 200) {
      let response = JSON.parse(metaXhr.responseText);
      response.forEach((gist) => {
        for (let key in gist.files) {
          const dataXhr = new XMLHttpRequest();
          dataXhr.open("GET", gist.files[key].raw_url);
          dataXhr.send();
          dataXhr.onload = () => {
            const container = document.getElementById("portfolioPage");


            // gist dropdown, somewhere
            let code = document.createElement("pre");
            code.classList.toggle("codeContainer", 1);

            let cleanHTML = html => { return html.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
            let text = cleanHTML(dataXhr.responseText);

            code.innerHTML = text;
            code.setAttribute("data-lang", languageAliases.get(gist.files[key].language));
            monaco.editor.colorizeElement(code, theme).then(html => {
              container.appendChild(code);
            });

            /*
            dest.getElementsByClassName("locCounter")[0].innerText = dataXhr.responseText.split(/\r\n|\r|\n/).length - 1;
            dest.getElementsByClassName("sizeCounter")[0].innerText = `${gist.files[key].size} bytes`;
            dest.getElementsByClassName("filename")[0].innerText = gist.files[key].filename;
            dest.getElementsByClassName("description")[0].innerText = gist.description;
            */

            console.log(
              `
                        ${gist.description.trim()};
                        ${gist.files[key].filename}; ${gist.files[key].language} (${languageAliases.get(gist.files[key].language)});
                        ${dataXhr.responseText.split(/\r\n|\r|\n/).length - 1} lines, ${gist.files[key].size} bytes
                        `)

            // placeholder
            // also set document description, filename, filesize, and language, set up prismjs
          }
        }
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
    if(themeXhr.status == 200) monaco.editor.defineTheme('dracula', JSON.parse(themeXhr.responseText));
    theme = { theme: themeXhr.status == 200 ? "dracula" : "vs-dark" };
    metaXhr.send();
  }

  themeXhr.onload = determineTheme;
  themeXhr.onerror = determineTheme;
  
})

export default Gist;