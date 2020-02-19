import React, {Component} from 'react';
import Aux from '../../hoc/_Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawerHandler = () => {
        this.setState((state, props) => {
            console.log(state.showSideDrawer)
            return {showSideDrawer: !state.showSideDrawer}
          });
    }

    render(){
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;