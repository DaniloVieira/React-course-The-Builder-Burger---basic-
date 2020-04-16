import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENTS_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
