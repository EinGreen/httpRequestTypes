let ajax = new XMLHttpRequest();

function postBlog(eventDetails) {
    ajax.onreadystatechange = function() {
        // when you send a post request, you normally get a 201 response
        if(this.readyState === 4 && this.status === 201) {
            console.log(this.responseText);
        }
    }
    ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;
    let postObject = {
        title: postTitle,
        body: postBody,
        userId: 1,
    };
    let postJSON = JSON.stringify(postObject);
    ajax.send(postJSON);
}

let postButton = document.getElementById("postButton");
postButton.addEventListener("click", postBlog)