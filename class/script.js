class Book {
  constructor(title, author, year, status = "available") {
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
  }

  // Afficher les détails d'un livre
  describe() {
    console.log(`${this.title} is edited by ${this.author} in ${this.year}`);
  }
}

class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(title) {
    this.books = this.books.filter((book) => {
      return book.title !== title;
    });
  }

  listAllBooks() {
    this.books.forEach((book) => {
      book.describe();
    });
  }

  findABook(title) {
    const book = this.books.find((book) => {
      return book.title === title;
    });

    return book ? book : "Not found";
  }
}

const animalBook = new Book("Le roi lion", "Dexter", 1919);

const ecoleItLibrary = new Library([animalBook]);
ecoleItLibrary.addBook(new Book("Ascaëlle au bois dormant", "Ascaëlle", 2022));
ecoleItLibrary.listAllBooks();
ecoleItLibrary.deleteBook("Le roi lion");

console.log("après la suppression:");
ecoleItLibrary.listAllBooks();

const myBook = ecoleItLibrary.findABook("Ascaëlle au bois dormant");
if (myBook instanceof Book) {
  myBook.describe();
} else {
  console.log(myBook);
}
