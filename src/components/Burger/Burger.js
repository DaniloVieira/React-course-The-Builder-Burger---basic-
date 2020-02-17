import React from 'react';
import classes from './Burger.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    return (
        <div className={classes.burger}>
            <BurgerIngridient type="bread-top" />
            <BurgerIngridient type="cheese" />
            <BurgerIngridient type="meat" />
            <BurgerIngridient type="bread-botton" />
        </div>

    )
}

export default burger;