import React, {useEffect} from 'react';
import './Colors.css';

const ColorPicker = (props) => {
    let color = '';
    const onClick = (s) => {
        props.handleColor(color);
    }

    console.log(props.name.name)

    return (
        <div>
            <h1>{props.name.name}</h1>
            <div id='colors'>
                <button className='btn first' onClick={() => {
                    color = 'yellow';
                    onClick()
                }}>
                </button>
                <button className='btn second' onClick={() => {
                    color = 'red';
                    onClick()
                }}>
                </button>
                <button className='btn third' onClick={() => {
                    color = 'blue';
                    onClick()
                }}></button>
            </div>
        </div>
    )
};

export default ColorPicker;