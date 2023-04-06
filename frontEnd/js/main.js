const notes = document.querySelector(".todo-heading");

let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8002/notes";
const getAllNotes = () => {
  fetch("http://localhost:8002/notes/get")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      document.getElementById("display").innerHTML = "";
      for (let i = 0; i < json.data.length; i++) {
        const apiId = json.data[i]._id;
        // console.log(apiId);
        document.getElementById(
          "display"
        ).innerHTML += `<div class="cards col-5  text-center  ">
           <div class="display_title ">${json.data[i].title}</div>
          <div class="text-start d-flex  justify-content-between align-items-center  text-wrap"><div>${json.data[i].content}</div>
          <button class="btn btn-light my-3 col-2 p-2" id="deleteNote " onclick="del('${apiId}')"><img src="../trash.svg" alt=""></button>
          </div></div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
      }
    });
};

getAllNotes();

function del(i) {
  fetch(`http://localhost:8002/notes/delete/${i}`, {
    method: "DELETE",
  });
  getAllNotes();
}

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
        ).innerHTML += `<div class=" cards col-4  text-center  ">
          <div class="display_title" id="final_title">${
            document.getElementById("title").value
          }</div>
          <div class="text-start d-flex flex-column " id="final_desc">${
            document.getElementById("dec").value
          }</div>
          <button class="btn btn-light my-3 p-2" ><img src="../trash.svg" alt=""></button>
      </div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
        getAllNotes();
      });
  }
}
