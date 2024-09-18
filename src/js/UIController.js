import { removeTodoById } from './todoController.js';
import { saveToLocalStorage } from './storageController.js';

export function createTodoElement(item) {
    let isEnterPressed = false;

    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const editBtnEl = document.createElement("button");
    editBtnEl.classList.add("material-icons");
    editBtnEl.textContent = "edit";

    const removeBtnEl = document.createElement("button");
    removeBtnEl.classList.add("material-icons", "remove-btn");
    removeBtnEl.textContent = "remove_circle";

    actionsEl.append(editBtnEl, removeBtnEl);
    itemEl.append(checkbox, inputEl, actionsEl);

    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
        // toggle메소드 : 2번째로 전달된 인자의 조건에 따라 class를 추가하거나 삭제한다. 
        itemEl.classList.toggle("complete", item.complete);
        saveToLocalStorage();
    });

    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    });

    inputEl.addEventListener("blur", () => {
        if(!isEnterPressed) {
            inputEl.setAttribute("disabled", "");
        }
        saveToLocalStorage();
    });

    inputEl.addEventListener("keydown", (e) => {
        if(e.key === 'Enter') {
            isEnterPressed = true;
            inputEl.setAttribute("disabled", "");
        }
        isEnterPressed = false;
    })

    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });

    removeBtnEl.addEventListener("click", () => {
        removeTodoById(item.id);
        itemEl.remove();
    });

    return { itemEl, inputEl, editBtnEl, removeBtnEl };
}
