import { deleteTodo } from "../modules/logic";

export function renderTodos(project) {
  const container = document.querySelector("#todos");
  container.innerHTML = "";

  if (!project) return;

  project.todos.forEach(todo => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.dueDate}</p>
      <p>${todo.priority}</p>
      <button class="delete">Delete</button>
    `;

    div.querySelector(".delete").addEventListener("click", () => {
      deleteTodo(project.id, todo.id);
      renderTodos(project);
    });

    container.appendChild(div);
  });
}