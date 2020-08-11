import React from 'react';
import { Link } from 'react-router-dom'

const navBar = () => (
    <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <p>Reflix</p>
    </div>
)

export default navBar