import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../actions';
import { AsYouType } from 'libphonenumber-js';
import Popup from "reactjs-popup";

class Register extends PureComponent {

    state ={
        formdata:{
            firstName:'',
            lastName:'',
            email:'',
            phoneNo:'',
            address1:'',
            address2:'',
            city:'',
            state:'',
            zip:'',
            role:0,
            password:'',
            priceList:'',
            lastOrderNo:''
        }
    }
    componentWillMount() {
        setTimeout(() => {
            window.history.forward()
          }, 0);
          window.onunload=function(){};
    }

    handleInputFirstName = (e) => {
        var userFirstName = document.getElementById("userFirstName").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                firstName:userFirstName
            }
        }))
    } 
    handleInputLastName = (e) => {
        var userLastName = document.getElementById("userLastName").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                lastName:userLastName
            }
        }))
    } 
    handleInputEmail = (e) => {
        var userEmail = document.getElementById("userEmail").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                email:userEmail
            }
        }))
    }
    handleInputPhoneNo = (e) => {
        var userPhoneNo = document.getElementById("userPhoneNo").value;
        var phoneTest = new AsYouType('US').input(userPhoneNo);
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                phoneNo:phoneTest
            }
        }))
    } 
    handleInputAddress1 = (e) => {
        var userAddress1 = document.getElementById("userAddress1").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                address1:userAddress1
            }
        }))
    } 
    handleInputAddress2 = () => {
        var userAddress2 = document.getElementById("userAddress2").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                address2:userAddress2
            }
        }))
    } 
    handleInputCity= (e) => {
        var userCity = document.getElementById("userCity").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                city:userCity
            }
        }))
    } 
    handleInputState = (e) => {
        var userState = document.getElementById("userState").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                state:userState
            }
        }))
    } 
    handleInputZip = (e) => {
        var userZip = document.getElementById("userZip").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                zip:userZip
            }
        }))
    } 
    handleInputPassword = (e) => {
        var userPassword = document.getElementById("userPassword").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                password:userPassword
            }
        }))
    } 

    submitForm = (e) => {
        console.log("I am looking for you!");
        console.log(this.state.formdata);
        e.preventDefault();
        this.props.dispatch(userRegister(this.state.formdata));
        this.props.history.push('/');
    }
    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>New User Register</h2>
                    
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            id="userFirstName"
                            value={this.state.formdata.firstName}
                            onChange={this.handleInputFirstName}
                            required
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            id="userLastName"
                            value={this.state.formdata.lastName}
                            onChange={this.handleInputLastName}
                            required
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Email"
                            id="userEmail"
                            value={this.state.formdata.email}
                            onChange={this.handleInputEmail}
                            required
                         />
                    </div>
                    <span>Your email will be your ID<br/> and you cannot change your email <br/>after the registration.</span>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            id="userPassword"
                            value={this.state.formdata.password}
                            onChange={this.handleInputPassword}
                            required
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            id="userPhoneNo"
                            value={this.state.formdata.phoneNo}
                            onChange={this.handleInputPhoneNo}
                            required
                         />
                         <br/>
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Address1"
                            id="userAddress1"
                            value={this.state.formdata.address1}
                            onChange={this.handleInputAddress1}
                            required
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Address2"
                            id="userAddress2"
                            value={this.state.formdata.address2}
                            onChange={this.handleInputAddress2}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter City"
                            id="userCity"
                            value={this.state.formdata.city}
                            onChange={this.handleInputCity}
                            required
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter State"
                            id="userState"
                            value={this.state.formdata.state}
                            onChange={this.handleInputState}
                            required
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Zip"
                            id="userZip"
                            value={this.state.formdata.zip}
                            onChange={this.handleInputZip}
                            required
                         />
                    </div>
                        <Popup trigger={<button type="button">Register</button>} position="top center" modal>
                                {close =>(
                                    <div className="fixWidthModal">
                                        <button type="submit">Proceed to Login</button>
                                    </div>
                                )}
                        </Popup>
                        {/* <button type="submit">Register</button> */}
                  
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Register)