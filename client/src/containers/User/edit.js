import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser, userInfoUpdate } from '../../actions';

class EditUserInfo extends PureComponent {

    state ={
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
        this.props.dispatch(getUser())
        console.log("Hello?!?")
        console.log(this.props)
        let userInfo = this.props.user.login;
        
        this.setState({
            formdata:{
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


    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    } 
    handleInputPassword= (event) => {
        this.setState({password:event.target.value})
    } 
    handleInputFirstName = (event) => {
        this.setState({firstName:event.target.value})
    } 
    handleInputLastname = (event) => {
        this.setState({lastName:event.target.value})
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
        
    }



    render() {
        let user = this.props.user;
        console.log("We are in the lender!!");
        console.log(this.state.formdata);
        console.log(this.state);
        console.log("Really??");
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>My Account Info.</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            value={this.state.formdata.firstName}
                            onChange={this.handleInputFirstName}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={this.state.formdata.lastName}
                            onChange={this.handleInputLastname}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.formdata.email}
                            onChange={this.handleInputEmail}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.formdata.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="tel"
                            placeholder="Phone No. (No. Only)"
                            value={this.state.phoneNo}
                            onChange={(event)=>this.handleInput(event,'phoneNo')}
                            pattern="[0-9]{10}"
                         />
                         <br/>
                         <span>Format: (408) 111-2222 to <br/>4081112222</span>
                    </div>

                    <div className="form_element">
                        <input
                            type="adress1"
                            placeholder="Enter Address1"
                            value={this.state.formdata.address1}
                            onChange={this.handleInputAddress1}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="address2"
                            placeholder="Enter Address2"
                            value={this.state.formdata.address2}
                            onChange={this.handleInputAddress2}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="city"
                            placeholder="Enter City"
                            value={this.state.formdata.city}
                            onChange={this.handleInputCity}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="state"
                            placeholder="Enter State"
                            value={this.state.formdata.state}
                            onChange={this.handleInputState}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="zip"
                            placeholder="Enter Zip"
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