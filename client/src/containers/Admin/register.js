import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {

    state ={
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
        error:''
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
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

    componentWillReceiveProps(nextProps){
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
                password:''
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});

        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address1:this.state.address1,
            address2:this.state.address2,
            city:this.state.city,
            state:this.state.state,
            zip:this.state.zip
        },this.props.user.users))
        
    }

    showUsers = (user) =>(
        user.users ? 
            user.users.map(item => (
                <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
    )


    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add user</h2>
                    
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            value={this.state.firstName}
                            onChange={this.handleInputFirstName}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={this.state.lastName}
                            onChange={this.handleInputLastname}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="adress1"
                            placeholder="Enter Address1"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="address2"
                            placeholder="Enter Address2"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="city"
                            placeholder="Enter City"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="state"
                            placeholder="Enter State"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="zip"
                            placeholder="Enter Zip"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>

                    <button type="submit">Add user</button>
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
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