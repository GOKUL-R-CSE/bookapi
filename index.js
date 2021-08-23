require("dotenv").config();

const express = require("express");

// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("connection established")).catch((err) => {
  console.log("connection failed")
})

// database
const Database = require("./database");

// initialization
const OurAPP = express();
OurAPP.use(express.json());

OurAPP.get("/", (request, response) => {
  response.json({ message: "Server is working!!!!!!" });
});

// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/book", (req, res) => {
  return res.json({ books: Database.Book });
});

// Route    - /book/:bookID
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurAPP.get("/book/:bookID", (req, res) => {
  const getBook = Database.Book.filter(
    (book) => book.ISBN === req.params.bookID
  );

  return res.json({ book: getBook });
});

// Route    - /book/c/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
OurAPP.get("/book/c/:category", (req, res) => {
  const getBook = Database.Book.filter((book) =>
    book.category.includes(req.params.category)
  );

  return res.json({ book: getBook });
});


// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/author", (req, res) => {
  return res.json({ author: Database.Author });
});

// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurAPP.get("/publication", (req,res) => {
  const getPub = Database.Publication;
  return res.send(getPub);
});

// Route    - /publication/:books
// Des      - to get all specific publication based on book
// Access   - Public
// Method   - GET
// Params   - yes
// Body     - none
OurAPP.get("/publication/:books", (req,res) => {
  const getPub = Database.Publication.filter((pub) => 
    pub.books.includes(req.params.books));

    return res.json({ publication: getPub });
});

// Route    - /publication/id/:id
// Des      - to get all specific publication based on id
// Access   - Public
// Method   - GET
// Params   - yes
// Body     - none
OurAPP.get("/publication/name/:name", (req,res) => {
  const getPub = Database.Publication.filter((pub) =>
  pub.name.includes(req.params.name));
  
  return res.json({publication: getPub})
})

// Route    - /author/:name
// Des      - to get all specific author based on name
// Access   - Public
// Method   - GET
// Params   - yes
// Body     - none
OurAPP.get("/author/:name", (req,res) => {
  const getAuthor = Database.Author.filter((pub) =>
  pub.name.includes(req.params.name));

  return res.json({publication: getAuthor});
})

// Route    - /author/book/:books
// Des      - to get all specific publication based on books
// Access   - Public
// Method   - GET
// Params   - yes
// Body     - none
OurAPP.get("/author/book/:books", (req,res) => {
  const getAuthor = Database.Author.filter((pub) =>
  pub.books.includes(req.params.books));
  return res.json({publication: getAuthor})
})

// Route    - /book/:authors
// Des      - to get all specific book based on author
// Access   - Public
// Method   - GET
// Params   - yes
// Body     - none
OurAPP.get("/book/author/authorId/:authors", (req,res) => {
  const getBook = Database.Book.filter((book) =>
    book.authors.includes(parseInt(req.params.authors))
  );

  return res.json({ book: getBook });
});

// Route    - /book/addbook
// Des      - to add a new book
// Access   - Public
// Method   - POST
// Params   - none
// Body     - yes
OurAPP.post("/book/addbook", (req,res) => {
  const postBook = req.body;
  Database.Book.push(postBook);
  res.json({book: postBook})
});

// Route    - /author/addauthor
// Des      - to add a new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - yes
OurAPP.post("/author/addauthor", (req,res) => {
  const postAuthor = req.body;
  Database.Author.push(postAuthor);
  res.json({author: postAuthor})
});

// Route    - /publication/addpublication
// Des      - to add a new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - yes
OurAPP.post("/publication/addpublication", (req,res) => {
  const postBook = req.body;
  Database.Publication.push(postBook);
  res.json({publication: Database.Publication});
});

// Route       /book/updateAuthor/:isbn
// Description update/add new author to a book
// Access      Public
// Paramteters isbn
// Method      put

OurAPP.put("/book/updateAuthor/:isbn", (req, res) => {
  const { newAuthor } = req.body;
  const { isbn } = req.params;

  // updating book database object
  Database.Book.forEach((book) => {
      // check if ISBN match
      if (book.ISBN === isbn) {
          // check if author already exist
          if (!book.authors.includes(newAuthor)) {
              // if not, then push new author
              book.authors.push(newAuthor);
              return book;
          }

          // else return
          return book;
      }
      return book;
  });

  // updating author Database object
  Database.Author.forEach((author) => {
      // check if author id match
      if (author.id === newAuthor) {
          // check if book already exist
          if (!author.books.includes(isbn)) {
              // if not, then push new book
              author.books.push(isbn);
              return author;
          }

          // else return
          return author;
      }
      return author;
  });

  return res.json({ book: Database.Book, author: Database.Author });
});

/*
Route               /book/delete/:isbn
Description         delete a book
Access              PUBLIC
Parameters          isbn
Method              DELETE
*/
OurAPP.delete("/book/delete/:isbn", (req, res) => {
  const { isbn } = req.params;

  const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);

  Database.Book = filteredBooks;

  return res.json(Database.Book);
});

/*
Route                   /book/delete/author
Description             delte an author from a book
Access                  PUBLIC
Parameters              id, isdn
Method                  DELETE
*/
OurAPP.delete("/book/delete/author/:isbn/:id", (req, res) => {
  const { isbn, id } = req.params;

  //updating book database object
  Database.Book.forEach((book) => {
      if (book.ISBN === isbn) {
          if (!book.authors.includes(parseInt(id))) {
              return;
          }

          book.authors = book.authors.filter(
              (databaseId) => databaseId !== parseInt(id)
          );
          return book;
      }
      return book;
  });

  Database.Author.forEach((author) => {
      if (author.id === parseInt(id)) {
          if (!author.books.includes(isbn)) {
              return;
          }

          author.books = author.books.filter((book) => book !== isbn);

          return author;
      }
      return author;
  });

  return res.json({ book: Database.Book, author: Database.Author });
});

/*
Route               /author/delete
Description         delete an author
Access              PUBLIC
Parameters          id
Method              DELETE
*/
OurAPP.delete("/author/delete/:id", (req, res) => {
  const { id } = req.params;

  const filteredAuthors = Database.Author.filter(
      (author) => author.id !== parseInt(id)
  );

  Database.Author = filteredAuthors;

  return res.json(Database.Author);
});

/*
Route               /publication/delete
Description         delete an publication
Access              PUBLIC
Parameters          id
Method              DELETE
*/
OurAPP.delete("/publication/delete/:id", (req, res) => {
  const { id } = req.params;

  const filteredPub = Database.Publication.filter(
      (pub) => pub.id !== parseInt(id)
  );

  Database.Publication = filteredPub;

  return res.json(Database.Publication);
});

OurAPP.delete("/publication/delete/book/:isbn/:id", (req, res) => {
  const { isbn, id } = req.params;

  Database.Book.forEach((book) => {
      if (book.ISBN === isbn) {
          book.publication = 0;
          return book;
      }
      return book;
  });

  Database.Publication.forEach((publication) => {
      if (publication.id === parseInt(id)) {
          const filteredBooks = publication.books.filter(
              (book) => book !== isbn
          );
          publication.books = filteredBooks;
          return publication;
      }
      return publication;
  });

  return res.json({ book: Database.Book, publication: Database.Publication });
});

OurAPP.listen(4000, () => console.log("Server is running"));