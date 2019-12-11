let $addBtn, $myInput;

function main() {
    const $list = document.getElementById("list");
    $addBtn = document.getElementById("addTodo");
    $myInput = document.getElementById("myInput");
    $list.addEventListener("click", listClickHandler);
    $addBtn.addEventListener("click", addBtnClickHandler);
}

function listClickHandler(event) {
    if (event.target.tagName === "BUTTON") {
        const [action, id] = event.target.dataset.id.split("-");
        if(action === "edit") {
            $myInput.value = event.target.parentElement.firstChild.textContent.trim();
            $addBtn.innerText = "Edit " + id;
            $addBtn.dataset.action = "edit";
            $addBtn.dataset.editId = id;
        }
    }
}

function addBtnClickHandler(event) {
    if (event.target.dataset.action === "edit") {
        const editedElement = document.getElementById("todo-" + event.target.dataset.editId);
        editedElement.firstChild.textContent = $myInput.value;
        $addBtn.innerText = "Add";
        $addBtn.dataset.action = "add";
        $addBtn.dataset.editId = undefined;
        $myInput.value = "";
    } else {
        // TODO
    }
}

document.addEventListener("DOMContentLoaded", main);
