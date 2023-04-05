const notes = document.querySelector(".todo-heading");

let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8002/notes";
function add() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("dec").value;
  if (title === "" || content === "") {
    alert("Fill both the content");
  } else {
    fetch("http://localhost:8002/notes/create", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("dec").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        document.getElementById(
          "display"
        ).innerHTML += `<div class=" cards col-3 text-center  ">
          <div class="display_title">${
            document.getElementById("title").value
          }</div>
          <div class="text-start d-flex flex-column ">${
            document.getElementById("dec").value
          }</div>
          <button class="btn btn-light my-3 p-2" >Delete</button>
      </div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
      });
  }
}
