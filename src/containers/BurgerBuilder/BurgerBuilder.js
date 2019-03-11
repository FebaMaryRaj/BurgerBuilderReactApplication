import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.5,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey];// we get array of values of the ingredient keys
        }).reduce((sum, element) => {
            return sum + element;
        } , 0);

        this.setState({
            purchaseable: sum > 0
        });
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceReduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceReduction;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    cancel = {this.purchaseCancelHandler}
                    proceed = {this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded = {this.addIngredienthandler}
                ingredientsRemoved = {this.removeIngredientHandler}
                purchaseable = {this.state.purchaseable}
                disabled = {disabledInfo}
                ordered = {this.purchaseHandler}
                price = {this.state.totalPrice} />
            </Aux>
        );
    }

}

export default BurgerBuilder;