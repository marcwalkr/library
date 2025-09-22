const myLibrary = [];

function Book(id, title, author, category, genre, pages, yearPublished, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.genre = genre;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, category, genre, pages, yearPublished, read) {
  const uuid = crypto.randomUUID();
  const book = new Book(uuid, title, author, category, genre, pages, yearPublished, read);
  myLibrary.push(book);
}

function appendTableRow(label, value, parent) {
  const row = document.createElement("tr");

  const labelElement = document.createElement("th");
  labelElement.textContent = label;
  row.appendChild(labelElement);

  const valueElement = document.createElement("td");
  valueElement.textContent = value;
  row.appendChild(valueElement);
  
  parent.appendChild(row);
}

function appendButton(text, classes, clickFunction, parent) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...[].concat(classes));
  button.addEventListener("click", clickFunction);
  parent.appendChild(button);
}

function createCard(book) {
    const card = document.createElement("article");
    card.classList.add("book-card");
    card.dataset.id = book.id;
    card.dataset.status = book.read ? "read" : "unread";

    const title = document.createElement("h2");
    title.classList.add("book-title");
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("book-author");
    author.textContent = book.author;
    card.appendChild(author);

    const detailTable = document.createElement("table");
    detailTable.classList.add("detail-table");
    card.appendChild(detailTable);

    appendTableRow("Category", book.category, detailTable);
    appendTableRow("Genre", book.genre, detailTable);
    appendTableRow("Pages", book.pages, detailTable);
    appendTableRow("Year Published", book.yearPublished, detailTable);

    const statusBadge = document.createElement("div");
    statusBadge.classList.add("status-badge");
    statusBadge.textContent = book.read ? "Read" : "Unread";
    card.appendChild(statusBadge);

    const buttons = document.createElement("div");
    buttons.classList.add("card-buttons");
    card.appendChild(buttons);

    const markButtonText = book.read ? "Mark Unread" : "Mark Read";
    appendButton(markButtonText, ["mark-status-button"], toggleStatus, buttons);

    appendButton("Remove", ["remove-button"], removeBook, buttons);

    return card;
}

function toggleStatus(e) {
  const card = e.currentTarget.closest(".book-card");

  const book = myLibrary.find((element) => element.id === card.dataset.id);
  book.toggleRead();

  card.dataset.status = book.read ? "read" : "unread";

  const statusBadge = card.querySelector(".status-badge");
  statusBadge.textContent = book.read ? "Read" : "Unread";

  e.currentTarget.textContent = book.read ? "Mark Unread" : "Mark Read";
}

function removeBook(e) {
  const card = e.currentTarget.closest(".book-card");

  const index = myLibrary.findIndex((element) => element.id === card.dataset.id);
  myLibrary.splice(index, 1);

  card.remove();
}

function renderLibrary() {
  const container = document.querySelector("#book-container");
  container.innerHTML = "";

  for (const book of myLibrary) {
    const card = createCard(book);
    container.appendChild(card);
  }
}

function renderLastBook() {
  const container = document.querySelector("#book-container");

  const card = createCard(myLibrary.at(-1));
  container.appendChild(card);
}

const newBookButton = document.querySelector("#new-book-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const newBookForm = document.querySelector("#new-book-form");

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

newBookDialog.addEventListener("close", () => {
  if (newBookDialog.returnValue === "confirm") {
    const data = new FormData(newBookForm);
    const entries = Object.fromEntries(data.entries());

    addBookToLibrary(
      entries.title, 
      entries.author, 
      entries.category, 
      entries.genre, 
      Number(entries.pages), 
      Number(entries.yearPublished), 
      data.has("read")
    );

    renderLastBook();
  }

  newBookForm.reset();
});