import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { addOrder } from '../../actions'
import addDays from "date-fns/add_days";

import '../../../node_modules/react-datepicker/dist/react-datepicker.css'

class AddOrder extends Component {
    // constructor(props) {
    //     super(props);
    //     handleChange = this.handleChange.bind(this);
    //   };
    state = {
        formdata:{
            orderNo:this.props.user.login.zip+'-'+Math.floor(Date.now() / 1000),
            ownerId:this.props.user.login.id,
            shopOwnerId:'',
            pickUpDate:'',
            orderStatus:'o',//o:open, c:completed
            notesFromCust:'',
            pickUpDate:moment().add(1, 'day'),
            proDeliveryDate:moment().add(3, 'day'),
            alternation: false,
            totalPrice:'',
            firstName:this.props.user.login.firstName,
            lastname:this.props.user.login.lastName,
            address1:this.props.user.login.address1,
            address2:this.props.user.login.address2,
            city:this.props.user.login.city,
            state:this.props.user.login.state,
            zip:this.props.user.login.zip,
            custEmail:this.props.user.login.email
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
                alternation: !this.state.formdata.alternation
            }
        }))
        this.props.user.lastOrderNo = this.state.formdata.orderNo
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
        console.log("Submit Form!")
        console.log(this.state.formdata)
        console.log(this.props)
        this.props.user.lastOrderNo = this.state.formdata.orderNo;
         this.props.dispatch(addOrder({
            ...this.state.formdata
        }))

        //this.state.formdata.
/*         this.props.dispatch(addOrder({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        })) */
    }
     
    sendEmailToShop = () => {
        this.props.dispatch(getOrderWithUser(this.props.user.login.id,1,count,'desc',this.props.orders.list))
    }

    render() {
        console.log(this.state);
  
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Schedule a pick up</h2>
                    <h3>Your pick up address :</h3>
                    {this.state.formdata.firstName} {this.state.formdata.lastname}
                    <br/>
                    {this.state.formdata.address1}
                    <br/>
                    {this.state.formdata.address2}
                    <br/>
                    {this.state.formdata.city}, {this.state.formdata.state} {this.state.formdata.zip}
                    <br/>
                    <hr/>
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
                    <hr/>
                    <div className="fixWidth">
                        <h4>
                            <label>
                                <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.formdata.alternation} id="alt" name="alt"/> Alternation? 
                            </label>
                        </h4>
                    </div>
                    <div>
                    <Popup trigger={<button type="button">Place a Pick Up!</button>} position="top center">
                    {close =>(
                        <div className="fixWidth">
                            <div>Confirm your pick up</div><br/>
                            <div>
                                
                                Pick Up Address:
                                <br/>
                                {this.state.formdata.firstName} {this.state.formdata.lastname}
                                <br/>
                                {this.state.formdata.address1}
                                <br/>
                                {this.state.formdata.city}, {this.state.formdata.state} {this.state.formdata.zip}
                                <br/>
                            </div>
                            <button type="submit">Confirm</button>
{/*                             <NavLink to={{ pathname:'/orders/confirm'}}>
                                <button type="submit">Confirm</button>
                            </NavLink> */}
                            <button type="button" onClick={() => {close()}}>Cancel</button>
                        </div>
                    )}
                    </Popup>
                    </div>
                    {/* <h3>Pick up instruction</h3>
                    <textarea
                        //value={this.state.formdata.notesFromCust}
                        // onChange={(event)=>this.handleInput(event,'notesFromCust')}
                    /> */}
                    <NavLink to={{
                        pathname:'/orders/confirm'
                    }}>

                    <button onClick={this.onLogout}>Place a Pick Up!</button></NavLink>
                    {
                        
                        /* <button type="submit">New Order</button>
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