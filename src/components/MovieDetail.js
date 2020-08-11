import React from 'react';
import Movie from './Movie'

const movieDetail = props => {
    return (
        <div className="movie-detail">
            <h1>{props.movie.title} ({props.movie.year})</h1>
            <Movie movie={props.movie}/>
            <p>{props.movie.descrShort}</p>
        </div>
    )
}

export default movieDetail;