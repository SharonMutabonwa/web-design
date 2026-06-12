import { getProjects } from "./state";
import { save } from "./storage";

export function addTodo(projectId, todo) {
  const project = getProjects().find(p => p.id === projectId);
  project.todos.push(todo);
  save(getProjects());
}

export function deleteTodo(projectId, todoId) {
  const project = getProjects().find(p => p.id === projectId);
  project.todos = project.todos.filter(t => t.id !== todoId);
  save(getProjects());
}

export function addProject(project) {
  getProjects().push(project);
  save(getProjects());
}