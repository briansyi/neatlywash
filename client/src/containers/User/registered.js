import React from 'react';
import axios from 'axios';

const Registered = (props) => {

    let request = axios.get(`/api/logout`)
                .then(request =>{
                    setTimeout(()=>{
                        props.history.push('/')
                    },2000)
                })

    return (
        <div className="logout_container">
            <h1>
                You are successfully registered!
            </h1>
            <h2>
                Please log in into your account.  
            </h2>
        </div>
    );
};

export default Registered;