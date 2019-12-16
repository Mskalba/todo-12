


let $approveBtn, $editInput, $modal, $list;

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

function getTodos() {
    axios.get("http://195.181.210.249:3000/todo/")
        .then(res => { console.log(res.data) })
        .catch(err => { console.error(err) });
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

function approveBtnClickHandler(event) {
    const editedElement = document.getElementById("todo-" + event.target.dataset.editId);
    editedElement.firstChild.textContent = $editInput.value;
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
