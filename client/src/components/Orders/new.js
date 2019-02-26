import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { addOrder, getShops } from '../../actions'
import addDays from "date-fns/add_days";

import '../../../node_modules/react-datepicker/dist/react-datepicker.css'

class AddOrder extends Component {
    // constructor(props) {
    //     super(props);
    //     handleChange = this.handleChange.bind(this);
    //   };
    state = {
        formdata:{
            ownerId:'',
            shopOwnerId:'',
            pickUpDate:'',
            orderStatus:'',
            notesFromCust:'',
            pickUpDate:moment().add(1, 'day'),
            proDeliveryDate:moment().add(3, 'day'),
            alternation: false,
            totalPrice:''
        }
    }
    handleChangePickUpDate = (date) => {
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                pickUpDate: date
            }
        }))
    }
    handleChangeDeliveryDate = (date) => {
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                proDeliveryDate: date
            }
        }))
    }
    handleCheckBox = (e) => {
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                alternation: e.target.checked
            }
        }))
    }
    // Getting Shop list
    componentWillMount(){
        console.log(this.props);
        // this.props.dispatch(getShops("94086",
        // ...this.state.formdata,

        // ))
        console.log("! "+this.props);
    }

    handleClickOutside(){
        this.setState({
            listOpen: false
        })
    }

    onLogout() {
        //<Route path="/" exact component={Auth(Home,null)}/>
    }

    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        //newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        //this.state.formdata.
        this.props.dispatch(addOrder({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }




    render() {
        console.log(this.state);

        const style= {
                'width': 'initial',
                'padding': '0px',
                'border': 'none',
                'marginTop': '0px',
                'background': 'none'
            }

  
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Schedule a pick up</h2>
                    <h3>Your pick up address :</h3>
                     {/* {this.state.user.login.address1} */}
                    <br/>
                    <div className="forDatePicker">
                        <h3>Pick Up Date:</h3>
                        <DatePicker
                            //placeholderText="Click to select a pick-up date"
                            selected={this.state.formdata.pickUpDate}
                            onChange={this.handleChangePickUpDate}
                            minDate={addDays(new Date(), 1)}
                            maxDate={addDays(new Date(), 14)}
                            placeholderText="Pick Up Date"
                            //showDisabledMonthNavigation
                            withPortal
                            //inline
                        /><h3>06:00 ~ 09:00 PM</h3>
                    </div>
                    <hr/>
                    <div className="forDatePicker">
                        <h3>Delivery Date:</h3>
                        <DatePicker
                            selected={this.state.formdata.proDeliveryDate}
                            onChange={this.handleChangeDeliveryDate}
                            minDate={addDays(this.state.formdata.pickUpDate, 2)}
                            maxDate={addDays(this.state.formdata.pickUpDate, 30)}
                            placeholderText="Delivery Date"
                            //showDisabledMonthNavigation
                            withPortal
                        /><h3>06:00 ~ 09:00 PM</h3>
                    </div>
                    <div>
                        <h4><input type="checkbox" onChange={this.handleCheckBox} checked={this.state.formdata.alternation} id="alt"/> Alternation? </h4>
                    </div>
                    <h3>Pick up instruction</h3>
                    <textarea
                        //value={this.state.formdata.notesFromCust}
                        // onChange={(event)=>this.handleInput(event,'notesFromCust')}
                    />
                    <NavLink to={{
                        pathname:'/'
                    }}>
                    <button onClick={this.onLogout}>Place an pickup</button></NavLink>
                    {/* <button type="submit">New Order</button>
                    {
                        this.props.history.push("/")
                        // this.props.orders.neworder ? 
                        //     this.showNewBook(this.props.orders.neworder)
                        // :null
                    } */}
                </form>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        orders:state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(AddOrder)