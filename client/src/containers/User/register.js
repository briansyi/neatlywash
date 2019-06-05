import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../actions';

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
    componentWillMount(){
        console.log("Hello??" + this.props);
    }

    handleInputFirstName = (e) => {
        var userFirstName = document.getElementById("userFirstName");
        // this.setState(prevState => ({
        //     formdata: {
        //         ...prevState.formdata,
        //         firstName:userFirstName
        //     }
        // }))
/*         formdata[firstName] = userFirstName;
        this.setState({
            formdata:newFormdata
        }) */
        
        // this.setState({email:event.target.value})
        console.log(this.props.formdata);
    } 
    handleInputLastName = (event) => {
        this.setState({lastName:event.target.value})
    } 
    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputPhoneNo = (event) => {
        this.setState({phoneNo:event.target.value})
    } 
    handleInputAddress1 = (event) => {
        this.setState({address1:event.target.value})
    } 
    handleInputAddress2 = (event) => {
        this.setState({address2:event.target.value})
    } 
    handleInputCity= (event) => {
        this.setState({city:event.target.value})
    } 
    handleInputState = (event) => {
        this.setState({state:event.target.value})
    } 
    handleInputZip = (event) => {
        this.setState({city:event.target.value})
        console.log(this.props);
    } 
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    } 

/*     handleInput = (event,name) => {
        console.log(event +" "+ name);
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;

        this.setState({
            formdata:newFormdata
        })
        console.log(this.state.props);
    } */

/*     componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                firstName:'',
                lastName:'',
                email:'',
                address1:'',
                address2:'',
                city:'',
                state:'',
                zip:'',
                role:0,
                password:'',
                priceList:'',
                lastOrderNo:''
            })
        }
    } */

    submitForm = (e) => {
        console.log("I am looking for you!");
        console.log(this.props.formdata);
        e.preventDefault();
        this.props.dispatch(userRegister(this.state.formdata));
        
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
                            value={this.state.firstName}
                            onChange={this.handleInputFirstName()}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={this.state.lastName}
                            onChange={(event)=>this.handleInput(event,'lastName')}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={(event)=>this.handleInput(event,'email')}
                         />
                    </div>
                    <span>Your email will be your ID<br/> and you cannot change your email <br/>after the registration.</span>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={(event)=>this.handleInput(event,'password')}
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
                            type="text"
                            placeholder="Enter Address1"
                            value={this.state.address1}
                            onChange={(event)=>this.handleInput(event,'address1')}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Address2"
                            value={this.state.address2}
                            onChange={(event)=>this.handleInput(event,'address2')}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter City"
                            value={this.state.city}
                            onChange={(event)=>this.handleInput(event,'city')}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter State"
                            value={this.state.state}
                            onChange={(event)=>this.handleInput(event,'state')}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Zip"
                            value={this.state.zip}
                            onChange={(event)=>this.handleInput(event,'zip')}
                         />
                    </div>

                    <button type="submit">Register</button>
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