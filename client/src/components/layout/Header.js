import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
   render() {
      return (
         <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container">
               <Link className="navbar-brand" to="/">
                  <img
                     src="/images/bookshelf.png"
                     width="16"
                     height="100"
                     alt="IT Bookstore Logo"
                  ></img>
                  IT Bookstore
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#mobile-nav"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="mobile-nav">
                  {/* <ul className="navbar-nav mr-auto">
                     <li className="nav-item">
                        <Link className="nav-link" to="/profiles">
                           Developers
                        </Link>
                     </li>
                  </ul> */}

                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item">
                        <Link className="nav-link" to="/register">
                           Sign Up
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/login">
                           Login
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      );
   }
}

export default Header;
