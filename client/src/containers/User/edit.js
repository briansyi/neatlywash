import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser, userInfoUpdate } from '../../actions';

class EditUserInfo extends PureComponent {

    state ={
        _id:'',
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
        error:'',
        priceList:'',
        lastOrderNo:''
    }

    componentWillMount(){
//        this.props.dispatch(getUsers())
        console.log(this.props.user);
        this.props.dispatch(getUser())
        let userInfo = this.props.user.login;
        
        this.setState({
            formdata:{
                _id:userInfo.id,
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
                email:userInfo.email,
                phoneNo:userInfo.phoneNo,
                address1:userInfo.address1,
                address2:userInfo.address2,
                city:userInfo.city,
                state:userInfo.state,
                zip:userInfo.zip,
                role:0,
                password:userInfo.password,
                priceList:'',
                lastOrderNo:''
            }
        })
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
/*     handleInputEmail = (e) => {
        var userEmail = document.getElementById("userEmail").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                email:userEmail
            }
        }))
    } */
    handleInputPhoneNo = (e) => {
        var userPhoneNo = document.getElementById("userPhoneNo").value;
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                phoneNo:userPhoneNo
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

/*     componentWillReceiveProps(nextProps){
        let userInfo = this.props.user.login;
        console.log("User Info.")
        console.log(userInfo);
            this.setState({
                formdata:{
                    firstName:userInfo.firstName,
                    lastName:userInfo.lastName,
                    email:userInfo.email,
                    address1:userInfo.address1,
                    address2:userInfo.address2,
                    city:userInfo.city,
                    state:userInfo.state,
                    zip:userInfo.zip,
                    role:0,
                    password:userInfo.password,
                    priceList:'',
                    lastOrderNo:''
                }
            })
    } */

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(userInfoUpdate(this.state.formdata))
        this.props.history.push('/user');
    }



    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>My Account Info.</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            id="userFirstName"
                            value={this.state.formdata.firstName}
                            onChange={this.handleInputFirstName}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            id="userLastName"
                            value={this.state.formdata.lastName}
                            onChange={this.handleInputLastname}
                         />
                    </div>

                    <div className="form_element">
{/*                         <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.formdata.email}
                            onChange={this.handleInputEmail}
                         /> */}
                         <h1>{this.state.formdata.email}</h1>
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            id="userPassword"
                            value={this.state.formdata.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="tel"
                            placeholder="Phone No. (No. Only)"
                            id="userPhoneNo"
                            value={this.state.phoneNo}
                            onChange={this.handleInputPhoneNo}
                            pattern="[0-9]{10}"
                         />
                         <br/>
                         <span>Format: (408) 111-2222 to <br/>4081112222</span>
                    </div>

                    <div className="form_element">
                        <input
                            type="adress1"
                            placeholder="Enter Address1"
                            id="userAddress1"
                            value={this.state.formdata.address1}
                            onChange={this.handleInputAddress1}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="address2"
                            placeholder="Enter Address2"
                            id="userAddress2"
                            value={this.state.formdata.address2}
                            onChange={this.handleInputAddress2}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="city"
                            placeholder="Enter City"
                            id="userCity"
                            value={this.state.formdata.city}
                            onChange={this.handleInputCity}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="state"
                            placeholder="Enter State"
                            id="userState"
                            value={this.state.formdata.state}
                            onChange={this.handleInputState}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="zip"
                            placeholder="Enter Zip"
                            id="userZip"
                            value={this.state.formdata.zip}
                            onChange={this.handleInputZip}
                         />
                    </div>

                    <button type="submit">Save</button>
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

export default connect(mapStateToProps)(EditUserInfo)