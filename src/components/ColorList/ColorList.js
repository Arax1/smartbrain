import React from 'react';
import './ColorList.css';
import ColorCard from '../ColorCard/ColorCard';

const ColorList = ({ hexlist }) => {

    return (
        <div className="container">
            {
                hexlist.map((element) => <ColorCard hexname={element.raw_hex} />)
            }
        </div>
    );

}

export default ColorList;