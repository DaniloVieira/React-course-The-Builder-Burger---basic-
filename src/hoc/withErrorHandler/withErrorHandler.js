import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        //componentDidMount(){
        componentWillMount(){ // TODO use constructor instead!!!!
            // this is not causing a side effect
            this.inteceptorReq = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            // this is not causing a side effect
            this.inteceptorResp = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            console.log('interceptors will unmount!!', this.inteceptorReq, this.inteceptorResp)
            axios.interceptors.request.eject(this.inteceptorReq);
            axios.interceptors.response.eject(this.inteceptorResp);

        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }
        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                            {this.state.error !== null ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }     
};

export default withErrorHandler;