import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('OrderSummary will update');
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (
                    <li key={igkey}>
                        <span style={{ textTransform: 'capitalize' }}>{igkey}</span> : {this.props.ingredients[igkey]}
                    </li>)
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.cancel} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.proceed} btnType='Success'>CONTINUE</Button>
            </Aux>
        );
    };
}

export default OrderSummary;