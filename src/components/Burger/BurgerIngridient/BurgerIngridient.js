import React, { Component } from 'react';
import PropType from 'prop-types';
import { render } from 'react-dom';
import classes from './BurgerIngridient.css'

class BurgerIngridient extends Component {
    
    render(){
        let ingridient = null;
        
        switch (this.props.type) {
            case ('bread-bottom'):
                ingridient = <div className={classes.BreadBottom}></div>
                break;
            case ('bread-top'):
                ingridient = (
                    <div className={classes.BreadBTop}>
                        <div className={classes.seed1}></div>
                        <div className={classes.seed2}></div>
                    </div>
                )
                break;
            case ('meat'):
                ingridient = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingridient = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingridient = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingridient = <div className={classes.Bacon}></div>
                break;
    
            default:
                break;
        }

        return ingridient;
    }
}

BurgerIngridient.prototype = {
    type: PropType.string.isRequired
}

export default BurgerIngridient;