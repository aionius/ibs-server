import React from "react";
import axios from "axios";

import BookCard from "./bookCard";

class BookCarousel extends React.Component {
   constructor() {
      super();
      this.state = {
         books: []
      };
   }

   componentDidMount() {
      axios
         .get("/api/books/new")
         .then(response => {
            const { books } = response.data;

            this.setState({ books });
         })
         .catch(err => console.log(err));
   }

   render() {
      const bookList = this.state.books.map(book => (
         <BookCard key={book.isbn13} book={book} />
      ));
      return (
         <div className="carousel slide" data-ride="carousel">
            <div id="carousel-inner">{bookList}</div>
         </div>
      );
   }
}

export default BookCarousel;
