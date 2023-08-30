import {
  createList,
  createTask,
  saveAndRender,
  save,
  renderTaskCount,
} from './script';

export const listsContainer = document.querySelector('[data-lists]');
export const newListForm = document.querySelector('[data-new-list-form]');
export const newListInput = document.querySelector('[data-new-list-input]');
export const deleteListButton = document.querySelector(
  '[data-delete-list-button]'
);
export const listDisplayContainer = document.querySelector(
  '[data-list-display-container]'
);
export const listTitleElement = document.querySelector('[data-list-title]');
export const listCountElement = document.querySelector('[data-list-count]');
export const tasksContainer = document.querySelector('[data-tasks]');
export const taskTemplate = document.getElementById('task-template');
export const newTaskForm = document.querySelector('[data-new-task-form]');
export const newTaskInput = document.querySelector('[data-new-task-input]');
export const clearCompleteTasksButton = document.querySelector(
  '[data-clear-complete-tasks-button]'
);

export const LOCAL_STORAGE_LIST_KEY = 'task.lists';
export const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
export let lists =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
export let selectedListId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_LIST_ID_KEY
);

clearCompleteTasksButton.addEventListener('click', (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

listsContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

deleteListButton.addEventListener('click', (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName == '') return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName == '') return;
  const task = createList(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id == selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});
