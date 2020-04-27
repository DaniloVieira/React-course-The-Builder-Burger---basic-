import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{
    // the state is now in the global state
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    //componentDidMount(){
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     let price = 0;
    //     for (let param of query.entries()){
    //         if(param[0] !== 'price'){
    //             ingredients[param[0]] = +param[1];
    //         }else{
    //             price = param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}>                    
                    </CheckoutSummary>               
                    <Route 
                        path={this.props.match.path+'/contact-data'} 
                        component={ContactData}
                        />
                </div>
            );
        }
        return (
            <div>
                {summary}
            </div>
           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuiler.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);