import React from 'react';
import './RadioBar.scss';


const RadioBar = ({ onRadioChange }) => {

    return (
        <div className="container">
            <div className="radio">
                <input id="image" name="radio" type="radio" value="image" onChange={onRadioChange} />
                <label htmlFor="image" className="radio-label"><span className="white">Image</span></label>
            </div>

            <div className="radio">
                <input id="color" name="radio" type="radio" value="color" onChange={onRadioChange} />
                <label htmlFor="color" className="radio-label"><span className="white">Color</span></label>
            </div>
        </div>
    );

}

export default RadioBar;