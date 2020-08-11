import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const movie = props => {
    
    const clickedHandler = () => {
        if(props.clicked) {
            props.clicked(props.movie.id)
        }
    }

    const addToRented = event => {
        event.stopPropagation();
        props.rent(props.movie);
    }

    const removeFromRented = event => {
        event.stopPropagation();
        props.remove(props.movie.id);
    }
    
    return (
        <div className="movie-container" onClick={clickedHandler} style={{ backgroundImage: `url(${props.movie.img})`, backgroundSize: '100% 100%' }}>
            {props.movie.isRented ? <FontAwesomeIcon onClick={removeFromRented} icon={faMinusCircle} /> : <FontAwesomeIcon onClick={addToRented} icon={faPlusCircle} />}
        </div>
    )
}

export default movie;