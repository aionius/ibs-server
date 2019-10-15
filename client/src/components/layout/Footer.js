import React from "react";

class Footer extends React.Component {
   render() {
      return (
         <nav className="navbar fixed-bottom navbar-light bg-light">
            Copyright &copy; {new Date().getFullYear()} IT Bookstore
         </nav>
      );
   }
}

export default Footer;
