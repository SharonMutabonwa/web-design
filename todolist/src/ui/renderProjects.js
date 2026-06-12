import { setActiveProject } from "../modules/state";
import { renderTodos } from "./renderTodos";

export function renderProjects(projects) {
  const container = document.querySelector("#projects");
  container.innerHTML = "";

  projects.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.name;

    btn.addEventListener("click", () => {
      setActiveProject(p.id);
      renderTodos(p);
    });

    container.appendChild(btn);
  });
}