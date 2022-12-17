const Gist = {

}

document.addEventListener('DOMContentLoaded', function () {
    const xhr = new XMLHttpRequest();
    let url = "https://api.github.com/users/EwanGreen4/gists";
    xhr.open("GET", url);
    xhr.send();

    let determineStatus = () => {
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            response.forEach((gist) => {
                for(let key in gist.files) {
                    console.log(key)

                }                
            });
        } else {
            console.log("Unable to access the GitHub API for Gists.");
        }
    }

    xhr.onerror = determineStatus;
    xhr.onload = determineStatus;
})

export default Gist;