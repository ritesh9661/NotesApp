function add() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('dec').value;
if (title===""){
    alert("enter the title")
}
else if (description===""){
    alert("enter the Description")
}
else{


    document.getElementById('display').innerHTML += 
    `<div class=" cards col-3 text-center  ">
        <div class="display_title">${title}</div>
        <div class="text-start d-flex flex-column ">${description}</div>
        <button class="btn btn-light my-3 p-2">Delete</button>
    </div>`
    document.getElementById('title').value="";
    document.getElementById('dec').value="";
}}
