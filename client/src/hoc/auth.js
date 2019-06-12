import React,{ Component } from 'react';
import { auth } from '../actions'
import {connect} from 'react-redux';

export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component {

        state = {
            loading:true
        }

        componentWillMount(){
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps){
            this.setState({loading:false})
            console.log("Here~3");
            console.log(nextProps);
            //if(!nextProps){
            if(!nextProps.user.login.isAuth && (nextProps.location.pathname !='/user/register')){
                if(reload){
                    this.props.history.push('/login')
                } 
                // else {
                //     this.props.history.push('/user/register')
                // }
                console.log("Here~2");
            } else {
                if(reload === false) {
                    this.props.history.push('/user')
                }
            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}