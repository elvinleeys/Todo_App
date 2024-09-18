import { createNewTodo, displayTodos } from './todoController.js';

document.getElementById("create-btn").addEventListener('click', createNewTodo);

// 페이지 로드 시 기존 todos를 표시
displayTodos();
