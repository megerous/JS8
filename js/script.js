let posts = document.getElementById("post");
let detail = document.getElementById("detail");
let content = document.getElementById("content");
let closeBtn = document.getElementById("closeBtn");
let addBtn = document.getElementById("add");
let addPost = document.getElementById("add-post");
let addPostForm = document.getElementById("add-post-form");

function ajax(url, funcToDo) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => funcToDo(data))
    .catch((err) => console.error("Error:", err));
}

ajax("https://jsonplaceholder.typicode.com/posts", function (datatoDo) {
  datatoDo.forEach((element) => {
    createPost(element);
  });
});

function createPost(item) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  let id = document.createElement("p");
  id.textContent = item.id;
  let title = document.createElement("h3");
  title.textContent = item.title;
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Post";
  wrapper.append(id, title, deleteBtn);
  deleteBtn.setAttribute("data-delete", item.id);
  wrapper.setAttribute("data-id", item.id);
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    let deleteID = event.target.getAttribute("data-delete");
    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteID}`;
    fetch(deleteUrl, {
      method: "DELETE",
    }).then(() => wrapper.remove());
  });
  wrapper.addEventListener("click", function () {
    let detailId = this.getAttribute("data-id");
    detail.classList.add("unhide");

    let detailUrl = `https://jsonplaceholder.typicode.com/posts/${detailId}`;
    ajax(detailUrl, function (detailData) {
      let cont = document.createElement("p");
      cont.textContent = detailData.body;
      let contId = document.createElement("h3");
      contId.textContent = detailId;
      content.append(contId, cont);
    });
  });
  posts.appendChild(wrapper);
}

closeBtn.addEventListener("click", function () {
  detail.classList.remove("unhide");
  content.innerHTML = "";
});
addBtn.addEventListener("click", function () {
  addPost.classList.add("unhide");
  addPostForm[0].focus();
});

addPostForm.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: this[0].value,
      userId: 11,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((newObj) => {
      console.log(newObj);
      createPost(newObj);
      addPost.classList.remove("unhide");
      this[0].value = "";
    });
});

/*
function ajax() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.addEventListener("load", function () {
    let data = JSON.parse(request.responseText);
    data.forEach((element) => {
      createPost(element);
    });
  });
  request.send();
}
*/

/*
function ajax(url, funcToDo) {
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function () {
    let data = JSON.parse(request.responseText);
    funcToDo(data);
  });
  request.send();
}
*/
