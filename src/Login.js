import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
var apiBaseUrl = "http://localhost:8080/";


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        var self = this;
        var payload={
            "username":this.state.username,
            "password":this.state.password
        };
        axios.post(apiBaseUrl+'signin', payload)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    console.log("Login successful");
                    console.log("Token: ", response.data.token)
                } else if (response.status === 201) {
                    console.log("Incorrect username or password")
                }
                else{
                    console.log("Could not log in.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
const style = {
    margin: 15,
};
export default Login;