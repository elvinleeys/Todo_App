import { saveToLocalStorage, loadFromLocalStorage } from './storageController.js';
import { createTodoElement } from './UIController.js';

let todos = [];

// 새로운 todo 아이템 생성
export function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    };

    todos.unshift(item);
    const { itemEl, inputEl } = createTodoElement(item);

    document.getElementById("list").prepend(itemEl);
    inputEl.removeAttribute("disabled");
    inputEl.focus();

    saveToLocalStorage(todos);
}

// 저장된 todos를 표시
export function displayTodos() {
    todos = loadFromLocalStorage();  // 로컬 저장소에서 todos를 로드

    const list = document.getElementById("list");
    list.innerHTML = "";  // 기존 리스트를 지우고 새로 표시

    for (const item of todos) {
        const { itemEl } = createTodoElement(item);
        list.append(itemEl);
    }
}

export function getTodos() {
    return todos;
}

export function removeTodoById(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
}
