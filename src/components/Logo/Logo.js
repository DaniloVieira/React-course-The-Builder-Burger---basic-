import React from 'react';

import burguerLogo from '../../assets/images/burguer-logo.png'
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burguerLogo} alt="MyBurger" />
    </div>

);

export default logo;