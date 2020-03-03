import React from 'react';
//import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    //1st transform the igredients obj into an array
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            // [...Array( props.ingredients[igKey] )] |--> CREATES AN ARRAY WITH THE NUMBER OF ELEMENTS THAT CORRESPOND TO THE QUANTITY OF THE INGREDIENT 
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => { // THE ELEMENT IS NOT USED, ONLY IT'S KEY, TO DETERMINE THE TYPE
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        //console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

//export default withRouter(burger);
export default burger;