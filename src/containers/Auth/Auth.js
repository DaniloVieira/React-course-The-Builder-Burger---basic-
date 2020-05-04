import React, { Component } from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    inputChangeHandler = (event, controlName) =>{
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updateControls})
    };

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;

    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formEl => (
            <Input
                key={formEl.id}
                elementType={formEl.config.elementType} 
                elementConfig={formEl.config.elementConfig} 
                value={formEl.config.value} 
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation} 
                touched={formEl.config.touched}
                change={(event) => this.inputChangeHandler(event, formEl.id)}/>
        ));
        
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

// const mapStateToProps = (state) => {
//     return {
        
//     }
// }



export default connect(null, mapDispatchToProps)(Auth) ;