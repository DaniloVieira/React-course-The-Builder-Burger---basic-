import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredientes: </p>
        <p>Price: <strong>USD 5.00</strong></p>
    </div>

);

export default order;
