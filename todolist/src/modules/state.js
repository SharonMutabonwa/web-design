let projects = [];
let activeProjectId = null;

export function getProjects() {
  return projects;
}

export function setProjects(data) {
  projects = data;
}

export function getActiveProject() {
  return projects.find(p => p.id === activeProjectId);
}

export function setActiveProject(id) {
  activeProjectId = id;
}