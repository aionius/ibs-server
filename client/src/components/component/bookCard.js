import React from "react";

const BookCard = props => {
   const bookCard = (
      <div className="carousel-item active">
         <div className="card">
            <img src={props.book.image} className="card-img-top" alt="..." />
            <div className="card-body">
               <h5 className="card-title">{props.book.title}</h5>
               <p className="card-text">{props.book.subtitle}</p>
               <p className="card-text">
                  <small className="text-muted">{props.book.price}</small>
               </p>
            </div>
         </div>
      </div>
   );

   return bookCard;
};

export default BookCard;
