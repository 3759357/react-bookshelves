import { useEffect, useState } from "react";
import books from "./mock/book.js";
import "./App.css";

function Title({ title }) {
  return (
    <>
      <div className="title">{title}</div>
    </>
  );
}

function Button({ bookTitle, setCurrentBook }) {
  return (
    <>
      <button onClick={() => setCurrentBook(bookTitle)}>읽기</button>
    </>
  );
}

function Book({ bookTitle, bookAuthor, setCurrentBook }) {
  return (
    <>
      <div>
        {bookTitle} - {bookAuthor}
        <Button bookTitle={bookTitle} setCurrentBook={setCurrentBook} />
      </div>
    </>
  );
}

function Container({ title, books = [], setCurrentBook, children, search }) {
  if (search) {
    //console.log("검색어있음")
    books = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    //console.log("검색어 없음")
  }
  return (
    <>
      <div>
        <Title title={title} />
        {children}
      </div>
      {Object.keys(books).length > 0 ? (
        books.map((item, index) => (
          <Book
            key={index}
            bookTitle={item.title}
            bookAuthor={item.author}
            setCurrentBook={setCurrentBook}
          />
        ))
      ) : (
        <>
          <div>승혁</div>
          <div>sh@gmail.com</div>
        </>
      )}
    </>
  );
}

function App() {
  const [currentBook, setCurrentBook] = useState(
    localStorage.getItem("storageBook")
  );

  useEffect(() => {
    if (currentBook) {
      localStorage.setItem("storageBook", currentBook);
    }
  }, [currentBook]);

  const [search, setSearch] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };
  //console.log(search);

  return (
    <>
      <Container
        title="나만의 책장"
        books={books}
        setCurrentBook={setCurrentBook}
        search={search}
      >
        <div>현재 읽고있는 책 : {currentBook}</div>
        <input onKeyDown={handleKeyDown} />
      </Container>
      <Container title="만든이"></Container>
    </>
  );
}

export default App;
