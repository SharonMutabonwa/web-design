import "./styles.css";

import { load } from "./modules/storage";
import { rebuild } from "./modules/loadApp";
import { setProjects, setActiveProject, getProjects } from "./modules/state";

import { renderProjects } from "./ui/renderProjects";
import { renderTodos } from "./ui/renderTodos";

import { createProject } from "./factories/project";
import { save } from "./modules/storage";

function init() {
  let data = load();
  let projects = rebuild(data);

  if (projects.length === 0) {
    const defaultProject = createProject("Default");
    projects.push(defaultProject);
  }

  setProjects(projects);
  setActiveProject(projects[0].id);

  save(projects);

  renderProjects(projects);
  renderTodos(projects[0]);
}

init();