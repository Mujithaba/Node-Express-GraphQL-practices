const express = require("express");
const { createAuthor, createBook, getAuthorBasedPopulate } = require("../Controllers/book-Controller");

const router = express.Router()


router.post('/author',createAuthor);
router.post('/book',createBook);
router.get('/ref/:id',getAuthorBasedPopulate)

module.exports = router;