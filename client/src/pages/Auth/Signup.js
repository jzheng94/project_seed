import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

class Signup extends Component {
    state ={
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(data => {
            console.log(data);
        });
    };
    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        
        return (
            <div>
               <h2>Signup</h2>
               <Mutation mutation={SIGNUP_USER} variables= {{ username, email, password }}>
                   {(signupUser, { data, loading, error}) => {

                       return(
                <form onSubmit={event => this.handleSubmit(event, signupUser)}>
                   
                   <input 
                   type="text" 
                   name="username" 
                   placeholder="Username" 
                   value={username}
                   onChange={this.handleChange}/>

                   <input 
                   type="email" 
                   name="email" 
                   placeholder="Email" 
                   value={email}
                   onChange={this.handleChange}/>

                   <input 
                   type="password" 
                   name="password" 
                   placeholder="Password" 
                   value={password}
                   onChange={this.handleChange}/>
                   
                   <input 
                   type="password" 
                   name="passwordConfirmation" 
                   placeholder="Confirm Password" 
                   value={passwordConfirmation}
                   onChange={this.handleChange}/>

                   <button type="submit">Submit</button>
                
                
                </form> 
                       )
                   }}
               
                </Mutation>
            </div>
        );
    }
}

export default Signup;