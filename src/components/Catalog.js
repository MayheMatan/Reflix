import React from 'react';
import Movie from './Movie'

class Catalog extends React.Component {
    state = {
        userInput: "",
    }

    componentDidMount() {
        const currentUserName = this.props.match.params.user;        
        localStorage.setItem("currentUser", currentUserName);
        this.props.retriveInfoAboutUser(currentUserName)
    }

    inputChangeHandler = event => {
        this.setState({userInput: event.target.value})
    }

    movieClickHandler = movieId => {
        this.props.history.push("/movies/" + movieId);
    }

    render() {
        let rented = null;
        if(this.props.state.rented.length) {
            rented = (
                <React.Fragment>
                    <h5>Rented:</h5>
                    <div className="square-container">
                        {this.props.state.rented
                            .filter(movie => movie.title.toLowerCase().includes(this.state.userInput))
                            .map(movie => <Movie remove={this.props.remove} rent={this.props.rent} clicked={this.movieClickHandler} key={movie.id} movie={movie}/>)}
                    </div>
                    <hr />
                </React.Fragment>
            )
        }
        return (
            <div className="catalog">
                <input value={this.state.userInput} placeholder="Search" onChange={this.inputChangeHandler} />
                <p>Budget: ${this.props.state.budget}</p>
                {rented}
                <h5>Catalog:</h5>
                <div className="square-container">
                    {this.props.state.movies
                        .filter(movie => movie.title.toLowerCase().includes(this.state.userInput))
                        .map(movie => <Movie remove={this.props.remove} rent={this.props.rent} clicked={this.movieClickHandler} key={movie.id} movie={movie}/>)}
                </div>
            </div>
        )
    }
}

export default Catalog