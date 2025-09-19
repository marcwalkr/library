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

function addBookToLibrary(title, author, category, genre, pages, yearPublished, read) {
  const uuid = crypto.randomUUID();
  const book = new Book(uuid, title, author, category, genre, pages, yearPublished, read);
  myLibrary.push(book);
}

function appendDescriptionPair(label, value, parent) {
  const labelElement = document.createElement("dt");
  labelElement.textContent = label;
  parent.appendChild(labelElement);

  const valueElement = document.createElement("dd");
  valueElement.textContent = value;
  parent.appendChild(valueElement);
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

    const detailGrid = document.createElement("dl");
    detailGrid.classList.add("detail-grid");
    card.appendChild(detailGrid);

    appendDescriptionPair("Category", book.category, detailGrid);
    appendDescriptionPair("Genre", book.genre, detailGrid);
    appendDescriptionPair("Pages", book.pages, detailGrid);
    appendDescriptionPair("Year Published", book.yearPublished, detailGrid);

    const statusBadge = document.createElement("div");
    statusBadge.classList.add("status-badge");
    statusBadge.textContent = book.read ? "Read" : "Unread";
    card.appendChild(statusBadge);

    const buttons = document.createElement("div");
    buttons.classList.add("button-container");
    card.appendChild(buttons);

    const markButtonText = book.read ? "Mark Unread" : "Mark Read";
    appendButton(markButtonText, ["mark-status-button"], toggleStatus, buttons);

    appendButton("Remove", ["remove-button"], removeBook, buttons);

    return card;
}

function toggleStatus(e) {
  const card = e.currentTarget.closest(".book-card");

  const book = myLibrary.find((element) => element.id === card.dataset.id);
  book.read = !book.read;

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