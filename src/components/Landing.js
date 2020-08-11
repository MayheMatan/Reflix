import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <h1>Who's Watching?</h1>
                <div className="square-container">
                    <Link to="/catalog/matan"><div style={{backgroundColor: "blue"}} className="box">Matan</div></Link>
                    <Link to="/catalog/tal"><div style={{backgroundColor: "red"}} className="box">Tal</div></Link>
                    <Link to="/catalog/noy"><div style={{backgroundColor: "yellow"}} className="box">Noy</div></Link>
                    <Link to="/catalog/dan"><div style={{backgroundColor: "green"}} className="box">Dan</div></Link>
                </div>
            </div>
        )
    }
}

export default Landing