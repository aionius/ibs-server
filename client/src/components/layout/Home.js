import React from "react";

class Home extends React.Component {
   render() {
      return (
         <div className="landing">
            <div className="dark-overlay landing-inner text-light">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">IT Bookstore</h1>
                        <p className="lead">Buy your IT books here!</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Home;
