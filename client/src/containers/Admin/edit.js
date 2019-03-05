import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrder, updateOrder, clearOrder, deleteOrder } from '../../actions'

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
            pickUpDate:'',
            proDeliveryDate:'',
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


    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateOrder(this.state.formdata))
    }

    deletePost = () => {
        this.props.dispatch(deleteOrder(this.props.match.params.id))
    }
    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },1000)
    }


    componentWillMount(){
        this.props.dispatch(getOrder(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        let order = nextProps.orders.order;
        console.log("Here is order:\n"+ order);
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
                lastname:order.lastname,
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
        return (
            <div className="rl_container article">
                {
                    orders.updateOrder ? 
                        <div className="edit_confirm">
                            post updated , <Link to={`/orders/${orders.order._id}`}>
                                Click here to see your post
                            </Link>
                        </div>
                    :null
                }
                {
                    orders.postDeleted ? 
                        <div className="red_tag">
                            Post Deleted
                            {this.redirectUser()}
                        </div>
                    :null
                }

                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter orderNo"
                            value={this.state.formdata.orderNo}
                            onChange={(event)=>this.handleInput(event,'orderNo')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter Delivered Date"
                            value={this.state.formdata.deliveredDate}
                            onChange={(event)=>this.handleInput(event,'deliveredDate')}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter totalPrice"
                            value={this.state.formdata.totalPrice}
                            onChange={(event)=>this.handleInput(event,'totalPrice')}
                        />
                    </div>

                    <button type="submit">Edit review</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}
                        >
                            Delete review
                        </div>
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