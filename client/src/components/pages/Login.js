import React from "react";
import axios from "axios";

class Login extends React.Component {
   constructor() {
      super();

      this.state = {
         email: "",
         password: "",
         errors: {}
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   onChange(event) {
      this.setState({
         [event.target.name]: event.target.value
      });
   }

   onSubmit(event) {
      event.preventDefault();

      const userLogin = {
         email: this.state.email,
         password: this.state.password
      };

      axios
         .post("/api/users/login", userLogin)
         .then(result => {
            // console.log(result.data);
         })
         .catch(err => this.setState({ errors: err.response.data }));
   }

   render() {
      const { errors } = this.state;
      console.log("errors: " + errors.email);

      return (
         <div className="login">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Log In</h1>
                     <p className="lead text-center">
                        Sign in to your IT Bookstore account
                     </p>
                     <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                           <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                           />
                           {errors.email}
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                           />
                           {errors.password}
                        </div>
                        <input
                           type="submit"
                           className="btn btn-success btn-block mt-4"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Login;
