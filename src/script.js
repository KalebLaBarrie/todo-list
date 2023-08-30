import './styles/main.css';

import {
  listsContainer,
  lists,
  selectedListId,
  listDisplayContainer,
  listTitleElement,
  listCountElement,
  tasksContainer,
  taskTemplate,
  LOCAL_STORAGE_LIST_KEY,
  LOCAL_STORAGE_SELECTED_LIST_ID_KEY,
} from './domElements';

export function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

export function createTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false,
  };
}

export function saveAndRender() {
  save();
  render();
}

export function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();
  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

export function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

export function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
