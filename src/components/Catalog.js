import React, { useState, useEffect } from 'react';
import Movie from './Movie'

const Catalog = props => {
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        const currentUserName = props.match.params.user;        
        localStorage.setItem("currentUser", currentUserName);
        props.retriveInfoAboutUser(currentUserName)
    }, [])

    const inputChangeHandler = ({target}) => {
        setUserInput(target.value)
    }

    const movieClickHandler = movieId => {
        props.history.push("/movies/" + movieId);
    }

    let rented = null;
    if(props.state.rented.length) {
        rented = (
            <React.Fragment>
                <h5>Rented:</h5>
                <div className="square-container">
                    {props.state.rented
                        .filter(movie => movie.title.toLowerCase().includes(userInput))
                        .map(movie => <Movie remove={props.remove} rent={props.rent} clicked={movieClickHandler} key={movie.id} movie={movie}/>)}
                </div>
                <hr />
            </React.Fragment>
        )
    }

    return (
        <div className="catalog">
            <input value={userInput} placeholder="Search" onChange={inputChangeHandler} />
            <p>Budget: ${props.state.budget}</p>
            {rented}
            <h5>Catalog:</h5>
            <div className="square-container">
                {props.state.movies
                    .filter(movie => movie.title.toLowerCase().includes(userInput))
                    .map(movie => <Movie remove={props.remove} rent={props.rent} clicked={movieClickHandler} key={movie.id} movie={movie}/>)}
            </div>
        </div>
    )
}

export default Catalog