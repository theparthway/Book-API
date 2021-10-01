const express = require("express");
const bodyParser = require("body-parser");

const database = require("./database");

const bookman = express();

bookman.use(bodyParser.urlencoded({extended: true}));
bookman.use(bodyParser.json());

bookman.get("/", (req, res) => {
    return res.json({message: "Welcome to BookMan!"});
});

bookman.get("/books", (req, res) => {
    return res.json({books: database.books});
});

/*==================================================================================================*/

bookman.get("/book/is=:isbn", (req, res) => {
    const book = database.books.filter(book => book.isbn === parseInt(req.params.isbn));

    if (book.length === 0) {
        return res.json({error: `No book found for isbn ${req.params.isbn}`});
    }

    return res.json({book: book});
});

/*==================================================================================================*/

bookman.get("/book/cat=:category", (req, res) => {
    const book = database.books.filter(book => book.category.includes(req.params.category));

    if (book.length === 0) return res.json({error: `No book found for category ${req.params.category}`});

    return res.json({book: book});
});

/*==================================================================================================*/

bookman.get("/book/lan=:language", (req, res) => {
    const book = database.books.filter(book => book.language === req.params.language);

    if (book.length === 0) return res.json({error: `No book found for language ${req.params.language}`});

    return res.json({book: book});
});

/*==================================================================================================*/
/*==================================================================================================*/

bookman.get("/authors", (req, res) => {
    return res.json({authors: database.authors});
});

/*==================================================================================================*/

bookman.get("/author/id=:id", (req, res) => {
    const author = database.authors.filter(author => author.id === parseInt(req.params.id));

    if (author.length === 0) return res.json({error: `No author found for id ${req.params.id}`});

    return res.json({author: author});
});

/*==================================================================================================*/

bookman.get("/author/is=:isbn", (req, res) => {
    const author = database.authors.filter(author => author.books.includes(parseInt(req.params.isbn)));

    if (author.length === 0) return res.json({eror: `No author found for book isbn ${req.params.isbn}`});

    return res.json({author: author});
});

/*==================================================================================================*/
/*==================================================================================================*/

bookman.get("/publications", (req, res) => {
    return res.json({publications: database.publications});
});

/*==================================================================================================*/

bookman.get("/publication/id=:id", (req, res) => {
    const publication = database.publications.filter(publication => publication.id === parseInt(req.params.id));

    if (publication.length === 0) return res.json({error: `No publication found for id ${req.params.id}`});

    return res.json({publication: publication});
});

/*==================================================================================================*/

bookman.get("/publication/is=:isbn", (req, res) => {
    const publication = database.publications.filter(publication => publication.books.includes(parseInt(req.params.isbn)));

    if (publication.length === 0) return res.json({error: `No publication found for book isbn ${req.params.isbn}`});

    return res.json({publication: publication});
});

/*==================================================================================================*/

bookman.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});

/*==================================================================================================*/

bookman.post("/author/new", (req, res) => {
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({updatedAuthors: database.authors});
});

/*==================================================================================================*/

bookman.post("/publication/new", (req, res) => {
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json({updatedPublications: database.publications});
});

/*==================================================================================================*/

bookman.put("/publication/update/book/is=:isbn", (req, res) => {
    database.publications.forEach(publication => {
        if (req.body.pubId === publication.id) {
            return publication.books.push(parseInt(req.params.isbn));
        }
    });

    database.books.forEach(book => {
        if (parseInt(req.params.isbn) === book.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publications,
            message: "Successfully updated publications and books"
        }
    );
});

/*==================================================================================================*/

bookman.delete("/book/delete/is=:isbn", (req, res) => {
    const updatedBooks = database.books.filter(book => book.isbn !== parseInt(req.params.isbn));

    database.books = updatedBooks;

    return res.json({books: database.books});
});

/*==================================================================================================*/

bookman.delete("/book/delete/author/is=:isbn/id=:authorId", (req, res) => {
    database.books.forEach(book => {
        if (book.isbn === parseInt(req.params.isbn)) {
            const newAuthorList = book.authors.filter(
                eachAuthor => eachAuthor !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    })

    database.authors.forEach(eachAuthor => {
        if (eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                book => book !== parseInt(req.params.isbn)
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "Author was deleted"
    })
});

bookman.listen(3000, () => {
    console.log("Server running on port 3000");
});