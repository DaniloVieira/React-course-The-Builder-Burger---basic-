import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.Input];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ('select'):
            inputElement = ( 
                <select onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}>
                    {props.elementConfig.options.map(opt =>( 
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.change} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
    }
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;