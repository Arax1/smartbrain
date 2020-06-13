import React from 'react';
import './ColorCard.css';

const ColorCard = ({ hexname }) => {

    const fill = {
        'backgroundColor': hexname,
    }

    return (
        <div className="card" style={fill}>
            <h3 className="title">{hexname}</h3>
        </div>
    );

}

export default ColorCard;