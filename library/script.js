const myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Display books
function displayBooks() {
  const container = document.getElementById("library-container");

  container.textContent = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.dataset.id = book.id;

    // 
    
    card.innerHTML = `
  <h3>${book.title}</h3>

  <p><strong>Author:</strong> ${book.author}</p>
  <p><strong>Pages:</strong> ${book.pages}</p>

  <span class="status ${
    book.read ? "read" : "unread"
  }">
    ${book.read ? "Read" : "Not Read"}
  </span>

  <div class="card-actions">
    <button class="toggle-btn">
      Toggle Status
    </button>

    <button class="remove-btn">
      Remove
    </button>
  </div>
`;

    // Remove button
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeBook(book.id);
    });

    // Toggle button
    card.querySelector(".toggle-btn").addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    container.appendChild(card);
  });
}

// Remove book
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);

  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  displayBooks();
}

const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();

  displayBooks();
});


addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  true
);

addBookToLibrary(
  "1984",
  "George Orwell",
  328,
  false
);

displayBooks();