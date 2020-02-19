import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly}>
            <button onClick={props.toggleSideDrawer}>MENU</button>
        </div>
        
            <div className={classes.Logo}>
                <Logo />                
            </div>
            {/* <Logo height="80%"/> */}
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;