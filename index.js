document.addEventListener("DOMContentLoaded", function () {
  // const formPenambahan = document.querySelector(".form-penambahan");
  // formPenambahan.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   addTodo();
  // });
  // const formPencarian = document.querySelector(".form-pencarian");
  // formPencarian.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   search();
  // });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
const formPenambahan = document.querySelector(".form-penambahan");
formPenambahan.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
const formPencarian = document.querySelector(".form-pencarian");
formPencarian.addEventListener("submit", function (e) {
  e.preventDefault();
  search();
});
const todos = [];
const RENDER_EVENT = "render-todo";
let checkBox = document.querySelector("#checkbox");
function addTodo() {
  const title = document.getElementById("judul-buku").value;
  const author = document.getElementById("penulis").value;
  const int = document.getElementById("tahun").value;
  const year = parseInt(int);
  const id = generateId();
  const todoObject = tangkap(id, title, author, year, false);
  if (checkBox.checked) {
    todoObject.isComplete = true;
  }
  todos.push(todoObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
function generateId() {
  return +new Date();
}
function tangkap(id, title, author, year, isComplete) {
  return { id, title, author, year, isComplete };
}
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("belum-dibaca");
  uncompletedTODOList.innerHTML = "";
  const completedTODOList = document.getElementById("selesai-dibaca");
  completedTODOList.innerHTML = "";
  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isComplete) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }
});
function makeTodo(todoObject) {
  const teksJudul = document.createElement("h3");
  teksJudul.innerText = `${todoObject.title}`;
  const namaPenulis = document.createElement("p");
  namaPenulis.innerText = `Author: ${todoObject.author}`;
  const teksTahun = document.createElement("p");
  teksTahun.innerText = `Year: ${todoObject.year}`;
  const teksContainer = document.createElement("div");
  teksContainer.classList.add("teks-container");
  teksContainer.append(teksJudul, namaPenulis, teksTahun);
  const container = document.createElement("div");
  container.append(teksContainer);
  container.classList.add("container");
  container.setAttribute("id", `todo-${todoObject.id}`);
  if (todoObject.isComplete) {
    teksContainer.classList.add("line");
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      const div = document.createElement("div");
      div.classList.add("dialog");
      document.body.append(div);
      const close = document.createElement("button");
      close.classList.add("close");
      close.innerText = "X";
      const hatiga = document.createElement("h3");
      hatiga.innerText = "apa anda yakin ingin menghapus buku ini?";
      const bungkusTombol = document.createElement("div");
      bungkusTombol.classList.add("bungkus-tombol");
      const iya = document.createElement("button");
      iya.classList.add("iya");
      iya.innerText = "IYA";
      const tidak = document.createElement("button");
      tidak.classList.add("tidak");
      tidak.innerText = "TIDAK";
      bungkusTombol.append(iya, tidak);
      div.append(close, hatiga, bungkusTombol);
      close.addEventListener("click", function (e) {
        const div = e.target.parentElement;
        div.style.display = "none";
      });
      iya.addEventListener("click", function (e) {
        const bungkus = e.target.parentElement;
        const div = bungkus.parentElement;
        div.style.display = "none";
        removeTaskFromCompleted(todoObject.id);
        saveData();
      });
      tidak.addEventListener("click", function (e) {
        const bungkus = e.target.parentElement;
        const div = bungkus.parentElement;
        div.style.display = "none";
      });
    });
    const sementara = document.createElement("button");
    sementara.innerText = "Hapus ditampilan saja";
    sementara.classList.add("sementara");
    sementara.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
      alert("anda hanya menghapus di tampilan saja");
    });
    const divTombol = document.createElement("div");
    divTombol.classList.add("div-tombol");
    divTombol.append(undoButton, sementara, trashButton);
    container.append(divTombol);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      const div = document.createElement("div");
      div.classList.add("dialog");
      document.body.append(div);
      const close = document.createElement("button");
      close.classList.add("close");
      close.innerText = "X";
      const hatiga = document.createElement("h3");
      hatiga.innerText = "apa anda yakin ingin menghapus buku ini?";
      const bungkusTombol = document.createElement("div");
      bungkusTombol.classList.add("bungkus-tombol");
      const iya = document.createElement("button");
      iya.classList.add("iya");
      iya.innerText = "IYA";
      const tidak = document.createElement("button");
      tidak.classList.add("tidak");
      tidak.innerText = "TIDAK";
      bungkusTombol.append(iya, tidak);
      div.append(close, hatiga, bungkusTombol);
      close.addEventListener("click", function (e) {
        const div = e.target.parentElement;
        div.style.display = "none";
      });
      iya.addEventListener("click", function (e) {
        const bungkus = e.target.parentElement;
        const div = bungkus.parentElement;
        div.style.display = "none";
        removeTaskFromCompleted(todoObject.id);
        saveData();
      });
      tidak.addEventListener("click", function (e) {
        const bungkus = e.target.parentElement;
        const div = bungkus.parentElement;
        div.style.display = "none";
      });
    });
    const divTombol = document.createElement("div");
    divTombol.classList.add("div-tombol");
    divTombol.append(checkButton, trashButton);
    container.append(divTombol);
  }
  return container;
}
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  todoTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}
function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if (todoTarget === -1) return;
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  todoTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
}
const STORAGE_KEY = "TODO_APPS";
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}
const pencarian = document.querySelector("#search");
function search() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let ubah = JSON.parse(serializedData);
  const pencarianJudul = pencarian.value.toLowerCase();
  for (let data of ubah) {
    if (pencarianJudul == data.title) {
      const completedTODOList = document.getElementById("selesai-dibaca");
      completedTODOList.innerHTML = "";
      const todoElement = makeTodo(data);
      if (data.isComplete) {
        completedTODOList.append(todoElement);
        const undoButton = document.querySelector(".undo-button");
        undoButton.style.display = "none";
        const sementara = document.querySelector(".sementara");
        sementara.style.display = "none";
        const trashButton = document.querySelector(".trash-button");
        trashButton.addEventListener("click", function () {
          const div = document.querySelector(".dialog");
          div.style.display = "none";
          document.dispatchEvent(new Event(RENDER_EVENT));
          saveData();
        });
      }
    }
  }
}
