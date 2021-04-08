let ajax = new XMLHttpRequest();
let postContainer = document.getElementById('postContainer');
let successMessage = document.getElementById('successMessage');

function postBlog(eventDetails) {
    ajax.onreadystatechange = function() {
        if(this.readyState !== 4) {
            successMessage.innerText = "Loading";
        } else if (this.readyState === 4 && this.status === 201) {
            console.log(this.responseText);
            let postString = JSON.parse(this.responseText);
            postContainer.innerHTML += `<h4>${postObject.title} - Id: ${postString.id}</h4>`;
            postContainer.innerHTML += `<p>${postObject.body}</p>`;
            successMessage.innerText = "Success! Your Post was Added";
        } else if (this.readyState === 4 && this.status !== 201) {
            successMessage.innerText = "Task Failed. There was an Error";
        }
    }
    ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;
    let postObject = {
        title: postTitle,
        body: postBody,
    };
    let postJSON = JSON.stringify(postObject);
    ajax.send(postJSON);
}

function updatePost(eventDetails) {
    let postId = document.getElementById("postId");
    let updateTitle = document.getElementById("updateTitle").value;
    let updateBody = document.getElementById("updateBody").value;
    ajax.onreadystatechange = function() {
        if(this.readyState !== 4) {
            successMessage.innerText = "Loading";
        } else if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let postString = JSON.parse(this.responseText);
            postContainer.innerHTML += `<h4>${postObject.title} - Id: ${postId.value}</h4>`;
            postContainer.innerHTML += `<p>${postObject.body}</p>`;
            successMessage.innerText = "Success! Post was Updated";
        } else if (this.readyState === 4 && this.status !== 200) {
            successMessage.innerText = "Task Failed. There was an Error";
        }
    }
    ajax.open("PATCH", `https://jsonplaceholder.typicode.com/posts/${postId.value}`, true);
    ajax.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    let postObject = {
        title: updateTitle,
        body: updateBody,
    };
    let updateJSON = JSON.stringify(postObject);
    ajax.send(updateJSON);
}

function getAllPosts(eventDetails) {
    ajax.onreadystatechange = function() {
        if(this.readyState !== 4) {
            successMessage.innerText = "Loading";
        } else if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let allPosts = JSON.parse(this.responseText);
            for (var i=0; i < allPosts.length; i++) {
                postContainer.innerHTML += `<h4>${allPosts[i].title} - Id: ${allPosts[i].id}</h4>`;
                postContainer.innerHTML += `<p>${allPosts[i].body}</p>`;
            }
            successMessage.innerText = "I HAVE ALL THE POSTS!";
        } else if (this.readyState === 4 && this.status !== 200) {
            successMessage.innerText = "Task Failed. There was an Error";
        }
    } 
    ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.send();
}

let postButton = document.getElementById("postButton");
postButton.addEventListener("click", postBlog);

let updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updatePost);

let getPostButton = document.getElementById("getPostButton");
getPostButton.addEventListener("click", getAllPosts);