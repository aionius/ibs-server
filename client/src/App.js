import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
   return (
      <Router>
         <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
            <div className="container">
               <Route exact path="/login" component={Login} />
               <Route exact path="/register" component={Register} />
            </div>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
