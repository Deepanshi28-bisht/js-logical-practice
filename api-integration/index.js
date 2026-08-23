const Api_url = "https://jsonplaceholder.typicode.com";
const postContainer = document.getElementById("postContainer");
const postCommentMain = document.querySelector(".postCommentMain");
const urlParams = new URLSearchParams(window.location.search);
const editPostContainer = document.getElementById("editPost");
let createPostMain = document.getElementById("createPostMain");
function checkURLParams() {
    const postId = urlParams.get("postid");
    const create = urlParams.get("create");
    const edit = urlParams.get("edit")
    if (create === "true") {
        showCreatePost();
    } else if (Number(postId) && edit === "true") {
        showEditPost(postId)
    }
    else if (postId && Number(postId) > 0) {
        fetchPostDetails(postId);
    }
    else {
        fetchPosts();
    }
}

checkURLParams();

async function showEditPost(postId) {
    editPostContainer.classList.add("flex");
    editPostContainer.classList.remove("hidden");
    postContainer.classList.add("hidden");
    postCommentMain.classList.add("hidden");
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${Api_url}/posts/${postId}`);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const post = await response.json();
        showEditData(post);
    } catch (err) {
        console.log("failed to fetch posts", err);
    } finally {
        loader.classList.add("hidden");
    }
}
const showEditData = (data) => {
    const editPost = document.getElementById("editPost");
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "items-start", "gap-2")
    console.log(data.title);
    div.innerHTML = `
    <span class="text-base font-bold">${data.title}</span>
    <textarea rows="8" cols="50" class="border border-[#ccc] p-2 rounded-md outline-none text-gray-500 text-sm" id="textarea" >
    ${data.body}
    </textarea>
    <button class="mt-5 py-3 px-3 bg-[#3cc48f] rounded-lg text-white text-sm font-bold" id="saveBtn">Save</button>
    `
    editPost.appendChild(div);
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", () => updateData(data.id))

}
async function updateData(id) {
    const desc = document.getElementById("textarea").value;
    try {
        const response = await fetch(`${Api_url}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body: desc,
            })
        })
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
function showCreatePost() {
    postContainer.classList.add("hidden");
    postCommentMain.classList.add("hidden");

    createPostMain.classList.remove("hidden");
    createPostMain.classList.add("flex");
}
const createPost = document.getElementById("createPost");
createPost.addEventListener("click", () => {
    urlParams.set("create", "true");
    urlParams.delete("postid");
    window.location.search = urlParams.toString();
});

const createPostForm = document.getElementById("createPostForm");

createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPostRequest();
});

async function createPostRequest() {
    let title = document.getElementById("postTitle");
    let body = document.getElementById("postBody");
    const message = document.getElementById("createPostMessage");
    const postData = {
        title: title.value,
        body: body.value,
        userId: Math.floor(Math.random() * 100) + 1,
    };
    console.log(postData);

    try {
        const response = await fetch(`${Api_url}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const newPost = await response.json();
        console.log("Created post:", newPost);
        title.value = "";
        body.value = "";
        message.textContent = "Post created successfully!";
        message.className = "text-green-600 font-semibold";
        setTimeout(() => {
            postContainer.classList.remove("hidden");
            postCommentMain.classList.remove("hidden");
            createPostMain.classList.add("hidden");
            createPostMain.classList.remove("flex");
            fetchPosts();
        }, 1000);
    } catch (err) {
        console.log("Failed to create post", err);
        message.textContent = "Failed to create post.";
        message.className = "text-red-600 font-semibold";
    }
}

async function fetchPosts() {
     postCommentMain.classList.add("hidden");
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${Api_url}/posts`);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const posts = await response.json();
        showPosts(posts);
        console.log(posts);
    } catch (err) {
        console.log("failed to fetch posts", err);
    } finally {
        loader.classList.add("hidden");
    }
}

function showPosts(posts) {
    posts.forEach((item) => showCardData(item));
}

function showCardData(item) {
    const div = document.createElement("div");
    div.classList.add(
        "flex",
        "flex-col",
        "justify-start",
        "items-start",
        "bg-sky-100",
        "p-5",
        "rounded-lg",
        "shadow-md",
        "gap-3",
    );
    div.innerHTML = `
      <h4 class="text-sky-400 text-lg font-medium">${item.title}</h4>
      <p class="text-lg font-normal text-base text-gray-500 line-clamp-3">${item.body}</p>
    `;
    div.addEventListener("click", () => {
        urlParams.set("postid", item.id);
        urlParams.delete("create");
        window.location.search = urlParams.toString();
    });
    postContainer.appendChild(div);
}

async function fetchPostDetails(id) {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${Api_url}/posts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const posts = await response.json();
        showPostDetails(posts);
        console.log(posts);
    } catch (err) {
        console.log("failed to fetch posts", err);
    } finally {
        loader.classList.add("hidden");
    }
}
function showPostDetails(post) {
    postCommentMain.classList.remove("hidden");
    const postDetails = document.getElementById("postDetails");
    if (post) {
        postDetails.innerHTML = `
 <h4 class="text-sky-400 text-xl font-medium">${post.title}</h4>
      <p class="text-lg font-normal text-lg text-gray-500 line-clamp-3">${post.body}</p>
      <div class="flex items-center gap-5">
      <button id="showBtn" class="mt-5 py-3 px-3 bg-sky-500 rounded-lg text-white text-sm font-bold">Show Comments</button>
      <button id="editBtn" class="mt-5 py-3 px-3 bg-gray-700 rounded-lg text-white text-sm font-bold">Edit Post</button>
       <button id="deleteBtn" class="mt-5 py-3 px-3 bg-red-500 rounded-lg text-white text-sm font-bold">Delete Post</button>
      </div>
`
        const showBtn = document.getElementById("showBtn");
        showBtn.addEventListener("click", () => showComments(post.id, showBtn));
        const editBtn = document.getElementById("editBtn");
        editBtn.addEventListener("click", () => editPost())
        const deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.addEventListener("click", () => deletePost(post.id))
    } else {
        postDetails.innerHTML = `
    <h2 class="text-2xl font-bold">Post Deleted Successfully</h2>
`
    }

}

async function deletePost(id) {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${Api_url}/posts/${id}`, {
            "method": "DELETE",
        })
        showPostDetails(null);
        const updateddata = await response.json();
        console.log(updateddata);
    } catch (err) {
        console.log(err);

    } finally {
        loader.classList.add("hidden");
    }
}
async function editPost() {
    urlParams.set("edit", "true");
    window.location.search = urlParams.toString();
    console.log("hello");
}
async function showComments(id, showBtn) {
    const commentContainer = document.getElementById("commentContainer");
    if (!commentContainer.classList.contains("hidden")) {
        commentContainer.classList.add("hidden");
        showBtn.textContent = "Show Comments";
        return;
    }
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    try {
        const response = await fetch(`${Api_url}/posts/${id}/comments`);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const comments = await response.json();
        showCommentsData(comments);
        commentContainer.classList.remove("hidden");
        showBtn.textContent = "Hide Comments";
        console.log("heyaaa", comments);
    } catch (err) {
        console.log("failed to fetch posts", err);
    } finally {
        loader.classList.add("hidden");
    }
}

function showCommentsData(comments) {
    const commentContainer = document.getElementById("commentContainer");
    comments.forEach((item) => {
        const main = document.createElement("div");
        main.classList.add(
            "flex",
            "flex-col",
            "gap-2",
            "bg-[#fff]",
            "shadow-md",
            "p-5",
            "rounded-lg",
        );
        main.innerHTML = `
  <h6 class="text-lg text-cyan-800 font-semibold">${item.name}</h6>
  <p class="text-sm font-semibold">${item.body}</p>
 `;
        commentContainer.appendChild(main);
    });
}
