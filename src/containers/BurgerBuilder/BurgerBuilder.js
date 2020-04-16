import React, { Component } from 'react';

import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

//import * as actionTypes from '../../store/actions/actionsTypes';
import * as burgerBuilderActions from '../../store/actions/index'; // index can be omited

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // ingredients: null, //global sate
        // totalPrice: 4, //global state
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // TODO commented until learn how to deal with asyncronous code with redux
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    // addIngredientHandler = (type) => {
    //     this.changeIngredient(type, +1);
        
    // }
    
    // removeIngredientHandler = (type) => {
    //     this.changeIngredient(type, -1);        
    // }

    // changeIngredient = (type, sum) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + sum;
    //     if(updatedCounted > -1){
    //         const updatedIngredients = {
    //             ...this.state.ingredients
    //         }
    //         updatedIngredients[type] = updatedCounted;
    //         const priceAddiction = INGREDIENTS_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newTotalPrice = oldPrice + (priceAddiction * sum);
    //         this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }

    updatePurchaseState (ingredients){
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
            return sum > 0;
            //this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    // the ingrediente are now in the global store and dont need be passar via queryparam
    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients ){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.history.push({
                pathname:'/checkout',
                //search: '?'+queryString
            });
    }

    render () {
        const disabledInfo = {
            //...this.state.ingredients
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger =  this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        // if(this.state.ingredients){
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price.toFixed(2)}
                purchaseCanceled={this.purchaseCanceledHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}                    
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngrediente(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngrediente(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));