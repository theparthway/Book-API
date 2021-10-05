require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const database = require("./database/database");

const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

const bookman = express();

bookman.use(bodyParser.urlencoded({extended: true}));
bookman.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connection established");
});

bookman.get("/", (req, res) => {
    return res.json({message: "Welcome to BookMan!"});
});

bookman.get("/books", async (req, res) => {
    const books = await BookModel.find();

    return res.json(books);
});

/*==================================================================================================*/

bookman.get("/book/is=:isbn", async (req, res) => {
    const book = await BookModel.findOne({isbn: parseInt(req.params.isbn)});

    if (!book) return res.json({error: `No book found for isbn ${req.params.isbn}`});

    return res.json({book: book});
});

/*==================================================================================================*/

bookman.get("/book/cat=:category", async (req, res) => {
    const book = await BookModel.find({category: req.params.category});

    if (book.length === 0) return res.json({error: `No book found for category ${req.params.category}`});

    return res.json({book: book});
});

/*==================================================================================================*/

bookman.get("/book/lan=:language", async (req, res) => {
    const book = await BookModel.find({language: req.params.language});

    if (book.length === 0) return res.json({error: `No book found for language ${req.params.language}`});

    return res.json({book: book});
});

/*==================================================================================================*/
/*==================================================================================================*/

bookman.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

/*==================================================================================================*/

bookman.get("/author/id=:id", async (req, res) => {
    const author = await AuthorModel.findOne({id: parseInt(req.params.id)});

    if (!author) return res.json({error: `No author found for id ${req.params.id}`});

    return res.json({author: author});
});

/*==================================================================================================*/

bookman.get("/author/is=:isbn", async (req, res) => {
    const author = await AuthorModel.find({books: parseInt(req.params.isbn)});

    if (author.length === 0) return res.json({eror: `No author found for book isbn ${req.params.isbn}`});

    return res.json({author: author});
});

/*==================================================================================================*/
/*==================================================================================================*/

bookman.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

/*==================================================================================================*/

bookman.get("/publication/id=:id", async (req, res) => {
    const publication = await PublicationModel.findOne({id: parseInt(req.params.id)});

    if (!publication) return res.json({error: `No publication found for id ${req.params.id}`});

    return res.json({publication: publication});
});

/*==================================================================================================*/

bookman.get("/publication/is=:isbn", async (req, res) => {
    const publication = await PublicationModel.find({books: req.params.isbn});

    if (publication.length === 0) return res.json({error: `No publication found for book isbn ${req.params.isbn}`});

    return res.json({publication: publication});
});

/*==================================================================================================*/

bookman.post("/book/new", async (req, res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        bookAdded: addNewBook,
        message: "book added"
    });
});

/*==================================================================================================*/

bookman.post("/author/new", async (req, res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        authorAdded: addNewAuthor,
        message: "author added"
    });
});

/*==================================================================================================*/

bookman.post("/publication/new", async (req, res) => {
    const { newPublication } = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        publicationAdded: addNewPublication,
        message: "publication added"
    });
});

/*==================================================================================================*/

bookman.put("/book/title/update/is=:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            "isbn": parseInt(req.params.isbn)
        },
        {
            "title": req.body.title
        },
        {
            new: true
        }
    );

    return res.json({
        updatedBook: updatedBook
    });
})

/*==================================================================================================*/

bookman.put("/book/author/update/is=:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            "isbn": parseInt(req.params.isbn)
        },
        {
            $addToSet: {
                authors: parseInt(req.body.newAuthor)
            }
        },
        {
            new: true
        }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            "id": parseInt(req.body.newAuthor)
        },
        {
            $addToSet: {
                books: parseInt(req.params.isbn)
            }
        },
        {
            new: true
        }
    );

    return res.json(
        {
            updatedBook: updatedBook,
            updatedAuthor: updatedAuthor
        }
    )
})

/*==================================================================================================*/

bookman.put("/publication/update/book/is=:isbn", async (req, res) => {

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            "id": parseInt(req.body.pubId)
        },
        {
            $addToSet: {
                "books": parseInt(req.params.isbn)
            }
        },
        {
            new: true
        }
    );

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            "isbn": parseInt(req.params.isbn)
        },
        {
            "publication": req.body.pubId
        }
    );

    return res.json(
        {
            book: updatedBook,
            publication: updatedPublication,
            message: "Updated"
        }
    );
});

/*==================================================================================================*/

bookman.delete("/book/delete/is=:isbn", async (req, res) => {
    const updatedBooks = await BookModel.findOneAndDelete(
        {
            "isbn": parseInt(req.params.isbn)
        }
    );

    return res.json(
        {
            deletedBook: updatedBooks
        }
    );
});

/*==================================================================================================*/


bookman.listen(3000, () => {
    console.log("Server running on port 3000");
});