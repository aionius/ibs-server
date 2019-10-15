import React from "react";
import axios from "axios";

class Register extends React.Component {
   constructor() {
      super();

      this.state = {
         name: "",
         email: "",
         password: "",
         password2: "",
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
      const newUser = {
         name: this.state.name,
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2
      };

      axios
         .post("/api/users/register", newUser)
         .then(result => {
            console.log(result);
         })
         .catch(err => this.setState({ errors: err.response.data }));

      event.preventDefault();
   }

   render() {
      const { errors } = this.state;
      console.log(errors);

      return (
         <div className="register">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Sign Up</h1>
                     <p className="lead text-center">
                        Create your IT Bookstore account
                     </p>
                     <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                           <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                           />
                           {errors.name && (
                              <div className="invalid-feedback">
                                 {errors.name}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                           />
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
                           {errors.email && (
                              <div className="invalid - feedback">
                                 {errors.email}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Confirm Password"
                              name="password2"
                              value={this.state.password2}
                              onChange={this.onChange}
                           />
                           {errors.password && (
                              <div className="invalid-feedback">
                                 {errors.password}
                              </div>
                           )}
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

export default Register;
