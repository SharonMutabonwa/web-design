import { createProject } from "../factories/project";
import { createTodo } from "../factories/todo";

export function rebuild(data) {
  if (!data) return [];

  return data.map(p => {
    const project = createProject(p.name);
    project.id = p.id;

    project.todos = p.todos.map(t => {
      const todo = createTodo(
        t.title,
        t.description,
        t.dueDate,
        t.priority
      );

      todo.id = t.id;
      todo.completed = t.completed;

      return todo;
    });

    return project;
  });
}