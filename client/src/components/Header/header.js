import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './Sidenav/sidenav';

class Header extends Component {

    state = {
        showNav:false
    }

    onHideNav = () => {
        this.setState({showNav:false})
        console.log("123Clicked!!!!");
    }

    onClicked = () => {
        console.log("Clicked!!!!");
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome name="bars"
                        onClick={()=> this.setState({showNav:true})}
                        style={{
                            color:'#ffffff',
                            padding:'10px',
                            cursor:'pointer'
                        }}
                    />
                <p onClick = {()=> this.setState({showNav:false})}>
                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                    onClick={()=> (
                        this.setState({showNav:false}),
                        this.onClicked
                    )}
                />
                </p>
                </div>
                <Link to="/" className="logo">
                        Neatly Wash
                </Link>
       
            </header>
        );
    }
}

export default Header;