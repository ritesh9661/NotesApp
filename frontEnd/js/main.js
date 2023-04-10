const notes = document.querySelector(".todo-heading");
let deleteNote = document.getElementById("deleteNote");
const api = "http://localhost:8002/notes";
let ids;
let deleteId = null;
const delConform = document.querySelector('.delConform');

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
        ).innerHTML += `<div class="cards col-10  col-md-3  text-center  ">
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
 
function del(i){
  deleteId = i;
  delConform.classList.add('visible');
}

function cancelDelete() {
  delConform.classList.remove('visible');
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
      delConform.classList.remove('visible');
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

function getNoteById(i) {
  fetch(`http://localhost:8002/notes/${i}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const notesID = json.data._id;
      const title = json.data.title;
      const desc = json.data.content;
      console.log(title);
      update(notesID,title,desc);
    });
}
function update(id,title,desc) {
  document.getElementById("enter").classList.add("hide");
  document.getElementById("update").classList.remove("hide");
  document.getElementById("title").value=title;
  document.getElementById("dec").value=desc;
  document
    .getElementById("update")
    .addEventListener("click", async function () {
      await fetch(`http://localhost:8002/notes/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: document.getElementById("title").value,
          content: document.getElementById("dec").value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }) .then((response) => response.json())
      .then((json) => {
        document.getElementById("message").innerHTML = `${json.message}`;
      });
      document.getElementById("title").value = "";
      document.getElementById("dec").value = "";
      getAllNotes();
      document.getElementById("enter").classList.remove("hide");
      document.getElementById("update").classList.add("hide");
    });
}

getAllNotes();

let togbtn = true;
document.getElementById("dark").addEventListener('click',()=>{
  if(togbtn){
    document.querySelector('body').style.backgroundColor = "#d7b4b4cd";
    document.querySelector('body').style.color = "black";
    document.querySelectorAll('.cards').forEach((item)=>{
      item.style.backgroundColor = "#eadfdfcd";
      item.style.color = "black";
    });
    document.querySelector("#dark").innerHTML = `<i class="dark fa-solid fa-sun" style="color:white"></i>`;
    togbtn = false;
  } else {
    document.querySelector('.body').style.backgroundColor = "black";
    document.querySelector('body').style.color = "white";
    document.querySelectorAll('.cards').forEach((item)=>{
      item.style.backgroundColor = "#e29578";
    }); 
   
    document.querySelector("#dark").innerHTML = `<i class="dark fa-solid fa-moon" style="color:white"></i>`;
    togbtn = true;
  }
  
})