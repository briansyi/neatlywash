import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { addOrder, clearNewOrder } from '../../actions'
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
            totalPrice:0.00,
            firstName:this.props.user.login.firstName,
            lastname:this.props.user.login.lastName,
            address1:this.props.user.login.address1,
            address2:this.props.user.login.address2,
            city:this.props.user.login.city,
            state:this.props.user.login.state,
            zip:this.props.user.login.zip,
            custEmail:this.props.user.login.email,
            shopEmail:''
        },
        shopInfo:[]
    }

    componentDidMount() {
        axios.post(`/api/getShopEmailByZip?zip=${this.props.user.login.zip}`)
        .then(res => {
            const shopEmailFromDB = res.data;
            console.log(shopEmailFromDB); 
            this.setState({shopInfo:shopEmailFromDB})
            let tmpShopEmail = this.state.shopInfo[0].email
            this.setState(prevState => ({
                formdata: {
                    ...prevState.formdata,
                    shopEmail: tmpShopEmail
                }
            }))
        })
        .catch(error =>{
            console.log(error);
        })
    }
    componentWillMount() {
        setTimeout(() => {
            window.history.forward()
          }, 0);
          window.onunload=function(){};
    }
    componentWillUnmount() {
        this.props.dispatch(clearNewOrder())
    }

    handleChangePickUpDate = (date) => {
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                pickUpDate: date
            }
        }))
        this.setState(prevState => ({ 
            formdata: {
                ...prevState.formdata,
                proDeliveryDate: moment(date).add(3, 'day')
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
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.user.lastOrderNo = this.state.formdata.orderNo
        this.props.user.lastPickUpDate = this.state.formdata.pickUpDate
        this.props.dispatch(addOrder({
            ...this.state.formdata
        }))
        console.log(this.state.formdata)
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
                            minDate={addDays(this.state.formdata.pickUpDate, 3)}
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
                    <Popup trigger={<button type="button">Place a Pick Up!</button>} modal>
                    {close =>(
                        <div className="fixWidth">
                        <br/>
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
                                <br/>
                            </div>
                            <Popup trigger={<button type="submit">Confirm</button>} position="top center" modal>
                                {close =>(
                                    <div className="fixWidthModal">
                                    {
                                        this.props.orders.newOrder ?
                                        <Link to={{
                                            pathname:'/orders/confirm'
                                        }}>
                                        <button type="button">Pick Up Confirmed!</button>
                                        </Link>
                                        :null
                                    }
                                    </div>
                                )}
                            </Popup>
                            <button type="button" onClick={() => {close()}}>Cancel</button>
                                <br/>
                                <br/>
                        </div>
                    )}
                    </Popup>
                    </div>
                </form>
            </div>
        );
    }
}


function mapStateToProps(state){
    console.log(state)
    return {
        orders:state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(AddOrder)