import React, { Component } from 'react';
import axios from 'axios';
import "../App.css"


const Fruit = props => (
    <tr>
        <td className="text-center">{props.fruit.name}</td>
        <td className="text-center">{props.fruit.weight}</td>
        <td>
            <img src={`http://localhost:3000/images/${props.fruit.image}`} 
                alt={props.fruit.image}
                className="img-thumbnail image-size"/>
        </td>
    </tr>
)

class FruitsList extends Component {
    // Constructor
    constructor(props) {
        super(props);

        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRestart = this.onRestart.bind(this);

        this.state = {
            query: "",
            error: false,
            message: "",
            fruits: []
        };
    }

    // React lifecycle method
    componentDidMount() {
        axios.get('http://localhost:3000/fruits')
            .then(res => {
                this.setState({
                    fruits: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    // State methods
    // get all fruits
    fruitList() {
        return this.state.fruits.map( currFruit => {
            return <Fruit
                fruit={currFruit}
                key={currFruit._id}/>
        })
    }

    // query change
    onChangeQuery(e) {
        this.setState({
            query: e.target.value
        });
    }

    // submit query
    onSubmit(e) {
        e.preventDefault();
        if(this.state.query.trim().length !== 0){
            axios.get('http://localhost:3000/fruits/' + this.state.query)
                .then(res => {
                    if(res.data['error']){
                        this.setState({
                            query: "",
                            error: this.state.error ? this.state.error: !this.state.error,
                            message: res.data.error
                        });
                    }else{
                        this.setState({
                            fruits: res.data,
                            error: false,
                            message: `Found ${res.data.length} fruits.`
                        });
                    }
                })
                .catch(err => {
                    window.location = "/";
                });
        }
    }

    // restart query
    onRestart(e) {
        e.preventDefault();
        axios.get('http://localhost:3000/fruits')
            .then(res => {
                this.setState({
                    query: "",
                    error: false,
                    message: "",
                    fruits: res.data
                });
            })
            .catch(err => {
                window.location = "/";
            })
    }

    // Render
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h3>Fruits</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mx-auto">
                        <form className="pb-2" onSubmit={this.onSubmit}>
                            <div className="input-group">
                                <label className="d-none">Name: </label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Fruit Name"
                                    value={this.state.query}
                                    onChange={this.onChangeQuery}/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" 
                                        type="submit">Search
                                    </button>
                                    <button className="btn btn-secondary"
                                        onClick={this.onRestart}
                                        type="submit">Restart
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={this.state.message === "" ? "row d-none" : "row"}>
                    <div className="col-5 mx-auto">
                        <div className={this.state.error ? "alert alert-warning text-center" : "alert alert-primary text-center"} 
                            role="alert">
                            {this.state.message}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 mx-auto">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Weight (lbs)</th>
                                    <th className="text-center">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.fruitList() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default FruitsList;
