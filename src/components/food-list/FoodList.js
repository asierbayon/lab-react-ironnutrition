import { Component } from 'react';
import foods from '../../foods.json';
import FoodBox from '../food-box/FoodBox';
import Search from '../search/Search';
import TodaysFood from '../todays-foods/TodaysFoods';

class FoodList extends Component {

    state = {
        totalCalories: 0,
        searchValue: '',
        foods,
        displayedFoods: foods,
        selectedFood: [],
        data: {
            name: '',
            calories: 0,
            image: '',
            quantity: 0
        }
    }

    showAddForm = () => {
        const addFormDisplayed = !this.state.addFormDisplayed;
        this.setState({
            addFormDisplayed
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [name]: value
            }
        }
        );
    }

    handleSubmitNewFood = (event) => {
        event.preventDefault();
        this.setState({
            foods: [this.state.data, ...this.state.foods],
            displayedFoods: [this.state.data, ...this.state.foods],
            data: {
                name: '',
                name: '',
                calories: 0,
                image: '',
                quantity: 0
            }
        })
    }

    handleSearch = (event) => {
        const { value } = event.target;
        this.setState({
            searchValue: value,
            displayedFoods: this.state.foods.filter(food => food.name.toLowerCase().includes(value.toLowerCase()))
        })
        console.log(value)
    }

    addToList = (food) => {
        this.setState({
            selectedFood: [food, ...this.state.selectedFood]
        })
        this.handleCalories(food.calories * food.quantity);
    }

    handleCalories = (newCalories) => {
        this.setState({
            totalCalories: this.state.totalCalories + newCalories
        })
    }

    render() {
        const { addFormDisplayed, data, displayedFoods, searchValue, totalCalories } = this.state;
        return (
            <div>
                <div className="is-full is-flex is-justify-content-space-between is-align-items-center">
                    <h1 className="my-6 is-size-1 has-text-weight-semibold">IronNutrition</h1>
                    <button onClick={this.showAddForm} className="button is-dark">{addFormDisplayed ? 'Hide form' : 'Add food'}</button>
                </div>
                { addFormDisplayed ?
                    <form onSubmit={this.handleSubmitNewFood}>
                        <div className="columns is-flex is-align-items-flex-end mb-5">
                            <div className="column">
                                <div className="field">
                                    <label className="label has-text-left">Name</label>
                                    <div className="control">
                                        <input value={data.name} name="name" onChange={this.handleChange} class="input" type="text" placeholder="Tomato" />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label has-text-left">Calories</label>
                                    <div className="control">
                                        <input value={data.calories} name="calories" onChange={this.handleChange} className="input" type="number" placeholder="150" />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label has-text-left">Image URL</label>
                                    <div className="control">
                                        <input value={data.image} name="image" onChange={this.handleChange} className="input" type="text" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label has-text-left">Quantity</label>
                                    <div className="control">
                                        <input value={data.quantity} name="quantity" onChange={this.handleChange} className="input" type="number" placeholder="50" />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <button className="button is-dark is-fullwidth">Add Food</button>
                            </div>
                        </div>
                    </form>
                    : null
                }
                <Search className="mb-5" handleSearch={this.handleSearch} value={searchValue} />
                <div className="columns">
                    <div className="column">
                        {displayedFoods.map((food, i) => {
                            return <FoodBox key={i} food={food} addToList={this.addToList}/>
                        })}
                    </div>
                    <div className="column">
                        <TodaysFood selectedFood={this.state.selectedFood}/>
                        <p className="mt-3">Total calories: {totalCalories}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FoodList;