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