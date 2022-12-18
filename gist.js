import {} from './prism.js';

const Gist = {

}

const languageAliases = new Map;
languageAliases.set("C++", "cpp");
languageAliases.set("C", "c");
languageAliases.set("Objective-C++", "objectivec");
languageAliases.set("JavaScript", "js");
languageAliases.set("Shell", "shell");

document.addEventListener('DOMContentLoaded', function () {
    const metaXhr = new XMLHttpRequest();
    let url = "https://api.github.com/users/EwanGreen4/gists";
    metaXhr.open("GET", url);
    metaXhr.send();

    let determineStatus = () => {
        if (metaXhr.status == 200) {
            let response = JSON.parse(metaXhr.responseText);
            response.forEach((gist) => {
                for(let key in gist.files) {
                    const dataXhr = new XMLHttpRequest();
                    dataXhr.open("GET", gist.files[key].raw_url);
                    dataXhr.send();
                    dataXhr.onload = () => {
                        let container = document.getElementsByClassName("codeContainer")[0];
                        let dest = container.getElementsByTagName("code")[0];
                        // dest.innerText = dataXhr.responseText;

                        /*
                        dest.getElementsByClassName("locCounter")[0].innerText = dataXhr.responseText.split(/\r\n|\r|\n/).length - 1;
                        dest.getElementsByClassName("sizeCounter")[0].innerText = `${gist.files[key].size} bytes`;
                        dest.getElementsByClassName("filename")[0].innerText = gist.files[key].filename;
                        dest.getElementsByClassName("description")[0].innerText = gist.description;
                        */                        
                        
                       /*  container.classList.add(`language-${languageAliases.get(gist.files[key].language)}`);
                        dest.classList.add(`language-${languageAliases.get(gist.files[key].language)}`);
                        */
                        /*
                        alert(
                        `
                        ${gist.description.trim()};
                        ${gist.files[key].filename}; ${gist.files[key].language} (${languageAliases.get(gist.files[key].language)});
                        ${dataXhr.responseText.split(/\r\n|\r|\n/).length - 1} lines, ${gist.files[key].size} bytes
                        `) 
                        */

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
})

export default Gist;