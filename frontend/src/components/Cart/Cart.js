import React, {Component} from "react";
import Review from "./Review";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Checkout from "./Checkout";
import emptyCart from '../pictures/empty_cart.png'
import {withRouter} from "react-router-dom";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            nombre: '',
            apellidos: '',
            email: '',
            direccion: '',
            ciudad: '',
            pais: '',
            codigoPostal: 0,
            nombreTarjeta: '',
            numeroTarjeta: 0,
            expMonth: 0,
            expYear: 0,
            CVV: 0,
            items_to_cart: [],
        };
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    prev2Steps = () => {
        const { step } = this.state;
        this.setState({
            step: step - 2
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    componentDidMount() {
        this.setItems = this.setItems.bind(this);
        this.setItems()
        console.log("estoy en cart")
    }

    setItems() {
        console.log(this.props)
        if (this.props.location.state) {
            this.state.items_to_cart = JSON.parse(localStorage.getItem("items_to_cart"));
            this.state.items_to_cart.push(this.props.location.state.items_to_cart)
            console.log(this.state.items_to_cart)
        }
    }

    render() {
        const { step } = this.state;
        const { nombre, apellidos, email, direccion, ciudad, pais, codigoPostal, nombreTarjeta, numerotarjeta, expMonth, expYear, CVV, items_to_cart } = this.state;
        const values = { nombre, apellidos, email, direccion, ciudad, pais, codigoPostal, nombreTarjeta, numerotarjeta, expMonth, expYear, CVV , items_to_cart};

        switch (step) {
            case 1:
                console.log(this.props.items)
                if (this.state.items_to_cart === null){
                    return (
                        <Checkout
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    );
                } else {
                    return (
                        <div>
                            <center>
                                <img className="align-content-center" style={{width:'450px', height:'375px'}} src={emptyCart} alt="emptyCart" /><br/>
                                <br/>
                                <a href='/home_page'><b>Shop for items now!</b></a>
                            </center>
                        </div>
                    );
                }
            case 2:
                return (
                    <Shipping
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <Payment
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 4:
                return (
                    <Review
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        prev2Steps={this.prev2Steps}
                        values={values}
                    />
                );
            case 5:
                return <Confirmation />;
            default:
                (console.log('This is a multi-step form built with React.'))
        }
    }
}

export default withRouter(Cart);
