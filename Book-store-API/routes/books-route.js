const express = require("express");
const { getAllBooks, getSingleBook, addNewBook, updateBook, deleteBook } = require("../controllers/books-controller");

//create express router
const router = express.Router();

//all router that are only for books
router.get('/get',getAllBooks);
router.get('/get/:id',getSingleBook);
router.post('/add',addNewBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);


module.exports = router;
