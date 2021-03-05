import { Component } from 'react';

class FoodBox extends Component {

    state = {
        quantity: this.props.food.quantity
    }

    addToList = () => {
        const {quantity} = this.state;
        this.props.addToList({...this.props.food, quantity});
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ quantity: value});
    }

    render() {
        const { food } = this.props;
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={food.image} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{food.name}</strong> <br />
                                <small>{food.calories} cal</small>
                            </p>
                        </div>
                    </div>
                    <div className="media-right">
                        <div className="field has-addons">
                            <div className="control">
                                <input onChange={this.handleChange} className="input" type="number" value={this.state.quantity} />
                            </div>
                            <div className="control">
                                <button onClick={this.addToList} className="button is-info">+</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

export default FoodBox;