const Book = require("../models/booksSchema");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in the colllection DB",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try again",
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsbyID = await Book.findById(getCurrentBookId);
    if (!bookDetailsbyID) {
      res.status(404).json({
        success: false,
        message: "Book with the current Id not found,Please try with valid ID",
      });
    }
    res.status(200).json({
      success: true,
      data: bookDetailsbyID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookForm = req.body;
    const newlyCreatedBook = await Book.create(newBookForm);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try again",
    });
  }
};

// update book
const updateBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const updatedBookFormData = req.body;
    const updatedBookData = await Book.findByIdAndUpdate(
      getCurrentBookID,
      updatedBookFormData,
      {
        new: true,
      }
    );
    if (!updatedBookData) { 
      res.status(404).json({
        success: false,
        message: "Book with the current Id not found,Please try with valid ID",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedBookData,
      message: "The book has been updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try again",
    });
  }
};

// delete book
const deleteBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);
    console.log(deletedBook, "deleted");
    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message:
          "Book with the current Id not found for delete,Please try with valid ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "The book has been deleted.",
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook,
};
