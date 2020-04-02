import React from 'react';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {

    return (
        <div>
            <p className='f3'>
                {'This Brain will detect faces in your pictures, give it a try!'}
            </p>
            <div className='sameline'>
                <div className='form sameline pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );

}

export default ImageLinkForm;