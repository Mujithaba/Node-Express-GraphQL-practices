const express = require("express");
const app = express();

app.use(express.json());

const books = [
  { id: 1, name: "Book 1" },
  { id: 2, name: "Book 2" },
  { id: 3, name: "Book 3" },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello Home page ,Welcome to books world" });
});

// get books datas
app.get("/get", (req, res) => {
  res.json(books);
});

// single book taking using id
app.get("/get/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res
      .status(400)
      .json({ message: "The book is not found, please try a valid id" });
  }
});

// add new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    name: `Book ${books.length + 1}`,
  };

  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "Added new book to the books collection",
  });
});

// updating a book
app.put("/update/:id", (req, res) => {
  const findBook = books.find((book) => book.id === Number(req.params.id));

  if (findBook) {
    findBook.name = req.body.name || findBook.name;
    res.status(200).json({
      data: findBook,
      message: `The Id:${req.params.id} book is successfully updated`,
    });
  } else {
    res.status(400).json({ message: "The book is not found" });
  }
});

// delete a book
app.delete("/delete/:id", (req, res) => {
  const findIndexOfItem = books.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (findIndexOfItem !== -1) {
    const deleteBook = books.splice(findIndexOfItem, 1);
    res.status(200).json({
      data: deleteBook,
      message: `The ID:${req.params.id}  book is successfully deleted`,
    });
  } else {
    res.status(400).json({ message: "The book is not found" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
