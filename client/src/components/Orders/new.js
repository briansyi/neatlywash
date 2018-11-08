import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { addOrder, getShops } from '../../actions'

const options = ['WashFoundry','Saigon Cleaners & Alterations', 'SUDZ Coin Laundry','Super Quality Cleaners','Laundry Basket & Executive Cln'];
const Modal =  () => (
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      closeOnDocumentClick
    >
      <span> Hello~! </span>
    </Popup>
)

class AddOrder extends Component {
    // constructor(props) {
    //     super(props);
    //     handleChange = this.handleChange.bind(this);
    //   };
    state = {
        startDate:moment(),
        endDate:moment(),
        formdata:{
            ownerId:'',
            shopOwnerId:'',
            pickUpDate:'',
            orderStatus:'',
            notesFromCust:'',
            pickUpDate:moment(),
            proDeliveryDate:moment(),
            totalPrice:''
        },
        shops:[{
            id:1,
            _id:'5be3fd7aa1414c64aeb736df',
            firstName:'WashFoundry',
            email:'121@111.com'
        },{
            id:2,
            _id:'5be3fdf7a1414c64aeb736e1',
            firstName:'Saigon Cleaners & Alterations',
            email:'121@222.com'
        },{
            id:3,
            _id:'5be3fdbda1414c64aeb736e0',
            firstName:'SUDZ Coin Laundry',
            email:'121@333.com'
        },{
            id:4,
            _id:'5be3fe2aa1414c64aeb736e2',
            firstName:'Super Quality Cleaners',
            email:'121@444.com'
        },{
            id:5,
            _id:'5be3fe58a1414c64aeb736e3',
            firstName:'Laundry Basket & Executive Cln',
            email:'121@555.com'
        },
        ]
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
        
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>New Order</h2>
                    <h3>You select(dropdown menu) :</h3>
                    <Dropdown options={options} onChange={this._onSelect} value={'WashFoundry'} placeholder="Select a shop" />  
                    <br/>
                    <h3>Note to the shop</h3>
                    <textarea
                        //value={this.state.formdata.notesFromCust}
                        // onChange={(event)=>this.handleInput(event,'notesFromCust')}
                    />
                    <div>
                        <DatePicker
                            range={[2018,2020]}
                            selected={this.state.formdata.proDeliveryDate}
                          //  onChange={(event)=>this.handleInput(event,'pickUpDate')}
                        /><h3>06:00 ~ 09:00 PM</h3>
                    </div>
                    <div>
                        <DatePicker
                            range={[2018,2020]}
                            selected={this.state.formdata.pickUpDate}
                          //  onChange={(event)=>this.handleInput(event,'pickUpDate')}
                        /><h3>06:00 ~ 09:00 PM</h3>
                    </div>
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