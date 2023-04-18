const notes = document.querySelector(".todo-heading");
let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8002/notes";
let ids;
let deleteId = null;
const delConform = document.querySelector(".delConform");

const getAllNotes = () => {
  fetch("http://localhost:8002/notes/get")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      document.getElementById("display").innerHTML = "";
      for (let i = 0; i < json.data.length; i++) {
        const apiId = json.data[i]._id;
        document.getElementById(
          "display"
        ).innerHTML += `<div class="cards col-10  col-md-3  text-center" id="${apiId}">
           <div class="display_title ">${json.data[i].title}</div>
          <div class="text-start d-flex   justify-content-between align-items-center overflow-scroll text-wrap"><div>${json.data[i].content}</div>
         <div class="d-flex flex-column  col-3 gap-2">
         <button class="btn del_btn btn-light" id="deleteNote" onclick="del('${apiId}')"><i class="fa-solid fa-trash"></i></button>
          <button class="btn del_btn btn-light  " id="editNote" onclick="getNoteById('${apiId}')"><i class="fa-regular fa-pen-to-square"></i></i></button></div>
          </div></div>`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
      }
    });
};
getAllNotes();

function del(i) {
  deleteId = i;
  delConform.classList.add("visible");
}

function cancelDelete() {
  delConform.classList.remove("visible");
}

function confirmDelete() {
  fetch(`http://localhost:8002/notes/delete/${deleteId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      document.getElementById("message").innerHTML = `${json.message}`;
    });
  delConform.classList.remove("visible");
  getAllNotes();
}

function add() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("dec").value;
  if (title.trim() === "" || content.trim() === "") {
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
          <button class="btn btn-light my-3 p-2" ><i class="fa-solid fa-trash"></i></button>
      </div>`;
        document.getElementById("message").innerHTML = `${json.message}`;
        document.getElementById("title").value = "";
        document.getElementById("dec").value = "";
        getAllNotes();
      });
  }
}

async function getNoteById(i) {
  await fetch(`http://localhost:8002/notes/${i}`)
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("title").value = json.data.title;
      document.getElementById("dec").value = json.data.content;
    });
  document.getElementById("update").setAttribute("onclick", `update('${i}')`);
  document.getElementById("update").classList.remove("hide");
  document.getElementById("enter").classList.add("hide");
  document.getElementById(`${i}`).classList.add("update_card");
  document.getElementById(`${i}`).classList.remove("cards");
}

async function update(id) {
  await fetch(`http://localhost:8002/notes/update/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      content: document.getElementById("dec").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      getAllNotes();
      document.getElementById("message").innerHTML = `${res.message}`;
    })
    .catch((err) => console.log(err));

  document.getElementById("title").value = "";
  document.getElementById("dec").value = "";
  document.getElementById("update").classList.add("hide");
  document.getElementById("enter").classList.remove("hide");
  document.getElementById(`${id}`).classList.remove("update_card");
  document.getElementById(`${id}`).classList.add("cards");
}
