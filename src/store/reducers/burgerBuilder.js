import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from  '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const ADD = 1;
const REMOVE = -1;

const toggleIngredient = (state, action, qtd) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + qtd };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    } )
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return toggleIngredient(state, action, ADD);
        case actionTypes.REMOVE_INGREDIENT:
            return toggleIngredient(state, action, REMOVE);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});            
        default:
            return state;
    }
};

export default reducer;  