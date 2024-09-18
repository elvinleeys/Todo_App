import { getTodos } from './todoController.js';

const storageKey = "my_todos";

export function saveToLocalStorage() {
    const todos = getTodos(); 
    const data = JSON.stringify(todos);
    localStorage.setItem(storageKey, data);
}

export function loadFromLocalStorage() {
    const data = localStorage.getItem(storageKey);
    if (data) {
        return JSON.parse(data);
    }
    // 로컬 데이터가 없는 경우 or todo data가 없을 경우를 명시하기 위해 
    // 빈 배열 반환
    return [];
}

