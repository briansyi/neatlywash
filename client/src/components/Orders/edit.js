import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Popup from "reactjs-popup";
import { getOrder, updateOrder, clearOrder, deleteOrder } from '../../actions'
import addDays from "date-fns/add_days";

import '../../../node_modules/react-datepicker/dist/react-datepicker.css'

class EditOrder extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
            orderNo:'',
            ownerId:'',
            shopOwnerId:'',
            pickUpDate:'',
            orderStatus:'',//o:open, c:completed
            notesFromCust:'',
            pickUpDate:moment(),
            proDeliveryDate:moment(),
            alternation: false,
            totalPrice:'',
            firstName:'',
            lastname:'',
            address1:'',
            address2:'',
            city:'',
            state:'',
            zip:'',
            custEmail:'',
            shopEmail:'',
            notesFromShop:''
        }
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


    cancelPickUp = () => {
        this.setState(prevState => ({
            formdata: {
                ...prevState.formdata,
                orderStatus: "i"
            }
        }))
    }


    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateOrder(this.state.formdata))
    }

    componentWillMount(){
        console.log(this.props);
        this.props.dispatch(getOrder(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        let order = nextProps.orders.order;
        console.log("Here is next prop order:\n"+ order);
        this.setState({
            formdata:{
                _id:order._id,
                orderNo:order.orderNo,
                ownerId:order.ownerId,
                shopOwnerId:order.shopOwnerId,
                pickUpDate:order.pickUpDate,
                orderStatus:order.orderStatus,//o:open, c:completed
                notesFromCust:order.notesFromCust,
                pickUpDate:order.pickUpDate,
                proDeliveryDate:order.proDeliveryDate,
                alternation:order.alternation,
                totalPrice:order.totalPrice,
                firstName:order.firstName,
                lastname:order.lastName,
                address1:order.address1,
                address2:order.address2,
                city:order.city,
                state:order.state,
                zip:order.zip,
                custEmail:order.custEmail,
                shopEmail:order.shopEmail,
                notesFromShop:order.notesFromShop
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearOrder())
    }

    render() {
        let orders = this.props.orders;
        console.log("I am in edit??!!\n"+this.props);
        console.log(this.state.formdata);
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Change a pick up</h2>
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
                            //selected={moment(this.state.formdata.pickUpDate).format("L")}
                            selected={moment(this.state.formdata.pickUpDate)}
                            onChange={this.handleChangePickUpDate}
                            minDate={moment(this.state.formdata.pickUpDate)}
                            maxDate={addDays(moment(this.state.formdata.pickUpDate), 14)}
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
                            //selected={moment(this.state.formdata.proDeliveryDate).format("L")}
                            selected={moment(this.state.formdata.proDeliveryDate)}
                            onChange={this.handleChangeDeliveryDate}
                            minDate={moment(this.state.formdata.proDeliveryDate)}
                            maxDate={addDays(moment(this.state.formdata.proDeliveryDate), 30)}
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
                    <Popup trigger={<button type="button">Save the changes</button>} modal>
                    {close =>(
                        <div className="fixWidth">
                        <br/>
                            <div>Confirm your changes</div><br/>
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
                                
                                    <div className="fixWidthModal">
                                    {
                                        this.props.orders.updateOrder ?
                                        <Link to={{
                                            pathname:'/user/user-history'
                                        }}>
                                        <button type="button">Changes Confirmed!</button>
                                        </Link>
                                        :null
                                    }
                                    </div>
                                
                                {console.log(this.props)}
                            </Popup>
                            <button type="button" onClick={() => {close()}}>Cancel</button>
                                <br/>
                                <br/>
                        </div>
                    )}
                    </Popup>
                    </div>
                    <button type="button" onClick={this.props.history.goBack}>Cancel the changes</button>
                        <div className="delete_post">
                            <Popup trigger={
                            <div className="button" onClick={this.cancelPickUp}>Cancel the pick up</div>} modal>
                                {close =>(
                                    <div className="fixWidthModal">
                                    <div className="delete_post" onClick={()=>close()}><h3>Cancel the pick up</h3>
                                        This pick up will not be cancelled until you press "Save the change"</div>
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
    return {
        orders:state.orders
    }
}

export default connect(mapStateToProps)(EditOrder)