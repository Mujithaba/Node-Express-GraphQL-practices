const { trusted } = require("mongoose");
const Author = require("../models/AuthorSchema");
const Book = require("../models/BookSchema");

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();

    res.status(201).json({
      success: true,
      data: author,
      message: "Author is created",
    });
  } catch (error) {
    console.log(500);
    res.status(400).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      data: book,
      message: "Book is created",
    });
  } catch (error) {
    console.log(500);
    res.status(400).json({
      success: false,
      message: "Some error occured",
    });
  }
};


// console.log(!true);  // false
// console.log(!false); // true
// console.log(!null);  // true
// console.log(!undefined); // true
// console.log(!0); // true
// console.log(!""); // true
// console.log(!"text"); // false (non-empty strings are truthy)
// console.log(!{}); // false (objects are truthy)


const getAuthorBasedPopulate = async (req, res) => {
  try {
    const authorPopulate = await Book.findById(req.params.id).populate(
      "author"
    );
    console.log(authorPopulate, "dd---");
    console.log(!authorPopulate, "dd");

    if (!authorPopulate) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: authorPopulate,
    });
  } catch (error) {
    console.log(500);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = {
  createAuthor,
  createBook,
  getAuthorBasedPopulate,
};
