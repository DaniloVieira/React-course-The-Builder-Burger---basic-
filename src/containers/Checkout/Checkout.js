import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: null,
        price: 0
    }

    //componentDidMount(){
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()){
            if(param[0] !== 'price'){
                ingredients[param[0]] = +param[1];
            }else{
                price = param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}>                    
                </CheckoutSummary>
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                    />
            </div>
        );
    }
}

export default Checkout;