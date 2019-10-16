import React from "react";
import BookCarousel from "../component/bookCarousel";

class Home extends React.Component {
   render() {
      return (
         <div className="landing">
            <div className="dark-overlay landing-inner text-light">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 text-center">
                        <BookCarousel />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Home;
