const books = [
    {
        "isbn": 1001,
        "authors": [1],
        "category": ["non-fiction"],
        "publication": 1,
        "country": "Nigeria",
        "imageLink": "images/things-fall-apart.jpg",
        "language": "English",
        "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "isbn": 1002,
        "authors": [2],
        "category": ["poem"],
        "publication": 1,
        "country": "Italy",
        "imageLink": "images/the-divine-comedy.jpg",
        "language": "Italian",
        "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
    {
        "isbn": 1003,
        "authors": [3],
        "category": ["history"],
        "publication": 1,
        "country": "Sumer and Akkadian Empire",
        "imageLink": "images/the-epic-of-gilgamesh.jpg",
        "language": "Akkadian",
        "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
        "pages": 160,
        "title": "The Epic Of Gilgamesh",
        "year": -1700
    },
    {
        "isbn": 1004,
        "authors": [3],
        "category": ["history"],
        "publication": 1,
        "country": "Achaemenid Empire",
        "imageLink": "images/the-book-of-job.jpg",
        "language": "Hebrew",
        "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
        "pages": 176,
        "title": "The Book Of Job",
        "year": -600
    }
];

const authors = [
    {
        "id": 1,
        "name": "Chinua Achebe",
        "books": [1001]
    },
    {
        "id": 2,
        "name": "Dante Alighieri",
        "books": [1002]
    },
    {
        "id": 3,
        "name": "Unknown",
        "books": [1003, 1004]
    }
];

const publications = [
    {
        "id": 1,
        "name": "penguin",
        "books": [1001, 1002, 1003]
    }
];

module.exports = {books, authors, publications};