


let $approveBtn, $editInput, $modal, $list;
const BASE_URL = "http://195.181.210.249:3000/todo/";
function main() {
    prepareDOMElements();
    prepareDOMEvents();
    getTodos();
}

function prepareDOMElements() {
    $approveBtn = document.getElementById("editTodo");
    $editInput = document.getElementById("popupInput");
    $modal = document.getElementById("modal");
    $approveBtn.addEventListener("click", approveBtnClickHandler);
    $list = document.getElementById("list");
}

function prepareDOMEvents() {
    $list.addEventListener("click", listClickHandler);

    const $cancelButton = document.getElementById("cancelChanges");
    const $closeButton = document.getElementById("closePopup");
    $cancelButton.addEventListener("click", closePopup);
    $closeButton.addEventListener("click", closePopup);
}

function addElementToList(item) {
    const newLi = document.createElement("li");
    newLi.classList.add("todo");
    newLi.id = "todo-" + item.id;
    newLi.innerText = item.title;

    const editBtn = document.createElement("button");
    editBtn.dataset.id= "edit-" + item.id;
    editBtn.style.float= "right";
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.id= "delete-" + item.id;
    deleteBtn.style.float= "right";
    deleteBtn.innerText = "Delete";

    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);

    $list.appendChild(newLi);
}

async function getTodos() {
    try {
        const response = await axios.get(BASE_URL);
        response.data.forEach(addElementToList)
    } catch(err) {
        console.log("Blad z serwera");
    }



    // axios.get("http://195.181.210.249:3000/todos/")
    //     .then(res => { console.log(res.data) })
    //     .catch(err => { console.error("jest blad") });

    // fetch("http://195.181.210.249:3000/todo/", {method: "POST"})
    //     .then(res => res.json())
    //     .then(data => {console.log(data)})
    //     .catch(err => { console.error(err) });
    //
    // axios.get("http://195.181.210.249:3000/todo/")
    //     .then(res => res.data)
    //     .then(data => {
    //         data.forEach(
    //             el => { axios.delete("http://195.181.210.249:3000/todo/" + el.id)}
    //         )
    //     })
}

function listClickHandler(event) {
    if (event.target.tagName === "BUTTON") {
        const [action, id] = event.target.dataset.id.split("-");
        if(action === "edit") {
            $editInput.value = event.target.parentElement.firstChild.textContent.trim();
            $approveBtn.dataset.editId = id;
            openPopup();
        }
    }
}

async function approveBtnClickHandler(event) {
    try {
        await axios.put(BASE_URL + event.target.dataset.editId, { title: $editInput.value });
        $list.innerHTML = "";
        await getTodos();
    } catch(err) {
        console.log(err)
    }

    $approveBtn.dataset.editId = undefined;
    $editInput.value = "";
    closePopup();
}

function openPopup() {
    $modal.style.display = "block";
}

function closePopup() {
    $modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", main);
