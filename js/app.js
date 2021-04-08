// There was a lot of these, so I made these variables on the Global Scope
// Okay fine, it was cause I was lazy, so I put these here so I could just Ctrl C Ctrl V these. CAN YOU BLAME ME!?!?!
let ajax = new XMLHttpRequest();
let postContainer = document.getElementById('postContainer');
let successMessage = document.getElementById('successMessage');

// This function creates a [fake] post
function postBlog(eventDetails) {
    ajax.onreadystatechange = function() {
        if(this.readyState !== 4) {
            successMessage.innerText = "Loading";
        } else if (this.readyState === 4 && this.status === 201) {
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

// this function targets the id of a posts, and changes it to whatever the user wants
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

// This function deletes a post [doesn't really do that, but it works the same way]
function deletePost(eventDetails) {
    let enemyId = document.getElementById("enemyId").value;
    ajax.onreadystatechange = function() {
        if(this.readyState !== 4) {
            successMessage.innerText = "Deleting";
        } else if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            successMessage.innerText = "Post Deleted";
        } else if (this.readyState === 4 && this.status !== 200) {
            successMessage.innerText = "Nope, sorry mate";
        }
    } 
    ajax.open("DELETE", `https://jsonplaceholder.typicode.com/posts/${enemyId}`, true);
    ajax.send();
}

// This lag inducing function showcases ALL THE POSTS from the site
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

// all these variables are linked to their respective button on the HTML page, which are linked to their respective functions
let postButton = document.getElementById("postButton");
postButton.addEventListener("click", postBlog);

let updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updatePost);

let getPostButton = document.getElementById("getPostButton");
getPostButton.addEventListener("click", getAllPosts);

let destoryButton = document.getElementById("destoryButton");
destoryButton.addEventListener("click", deletePost);
// Note: Still suck at naming