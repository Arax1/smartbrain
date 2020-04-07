import React from 'react';
import './RadioBar.scss';


const RadioBar = () => {

    return (
        <div class="container">
            <div class="radio">
                <input id="radio-1" name="radio" type="radio" />
                <label for="radio-1" class="radio-label"><span class="white">Image</span></label>
            </div>

            <div class="radio">
                <input id="radio-2" name="radio" type="radio" />
                <label for="radio-2" class="radio-label"><span class="white">Color</span></label>
            </div>

            <div class="radio">
                <input id="radio-3" name="radio" type="radio" />
                <label for="radio-3" class="radio-label"><span class="white">Pattern</span></label>
            </div>
        </div>
    );

}

export default RadioBar;