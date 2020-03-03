import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'


class Checkout extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    
    componentDidMount(){
        console.log('[ROUTING TO CHECKOUT]', this.props.location.state);
        this.setState({ingredients: this.props.location.state.ingredients});
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}></CheckoutSummary>
            </div>
        );
    }
}

export default Checkout;