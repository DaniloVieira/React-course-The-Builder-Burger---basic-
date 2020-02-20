import React, {Component} from 'react';

import Aux from '../../../hoc/_Aux/_Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    
    UNSAFE_componentWillUpdate(){
        console.log('OderSummary will update');
    }
    
    componentDidUpdate(){
        console.log('OderSummary did update');
    }

     render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burguer with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default (OrderSummary);