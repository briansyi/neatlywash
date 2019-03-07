import React, { Component } from 'react';
//import HomeContainer from '../../containers/home_container'

const imagesPath = {
    dryCleanImg:"/images/Services_DryClean.png",
    dryCleanTxt:"/images/Services_DryClean_Text.png",
    householdImg:"/images/Services_Household.png",
    householdTxt:"/images/Services_Household_Text.png",
    laundryImg:"/images/Services_Laundry.png",
    laundryTxt:"/images/Services_Laundry_Text.png",
    specialImg:"/images/Services_Special.png",
    specialTxt:"/images/Services_Special_Text.png",
    washFoldImg:"/images/Services_WashFold.png",
    alterationImg:"/images/Services_Alteration.png"
}



class Services extends Component {

    state = {
        open01: true,
        open02: true,
        open03: true,
        open04: true

    }
    toggleImage01 = () => {
        this.setState(state => ({ open01: !state.open01}))
    }
    toggleImage02 = () => {
        this.setState(state => ({ open02: !state.open02}))
    }
    toggleImage03 = () => {
        this.setState(state => ({ open03: !state.open03}))
    }
    toggleImage04 = () => {
        this.setState(state => ({ open04: !state.open04}))
    }

    getDryCleanImgName = () => this.state.open01 ? 'dryCleanImg' : 'dryCleanTxt'
    getLaundryImgName = () => this.state.open02 ? 'laundryImg' : 'laundryTxt'
    getHouseholdImgName = () => this.state.open03 ? 'householdImg' : 'householdTxt'
    getSpecialImgName = () => this.state.open04 ? 'specialImg' : 'specialTxt'
    

    render () {
        const imgDryCleanName = this.getDryCleanImgName();
        const imgLaundryName = this.getLaundryImgName();
        const imgHouseholdName = this.getHouseholdImgName();
        const imgSpecialName = this.getSpecialImgName();

        return (
            <div>
            <div className="rl_container"><h1>Services</h1></div>
                <img className="imgServicesLogo" src={imagesPath[imgDryCleanName]} onClick={this.toggleImage01} />
                <img className="imgServicesLogo" src={imagesPath[imgLaundryName]} onClick={this.toggleImage02} />
                <img className="imgServicesLogo" src={imagesPath[imgHouseholdName]} onClick={this.toggleImage03} />
                <img className="imgServicesLogo" src="/images/Services_Alteration.png" />
                <img className="imgServicesLogo" src="/images/Services_WashFold.png" />
                <img className="imgServicesLogo" src={imagesPath[imgSpecialName]} onClick={this.toggleImage04} />
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        orders:state.orders
    }
}

export default Services;