import React from 'react';
import './Colors.css';

const ColorPicker = (props) => {
    let color = '';
    const onClick = (s) => {
        props.handleColor(color);
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <div id='colors'>
                <button className='btnN A' onClick={() => {
                    color = 'DarkViolet';
                    onClick()
                }}>
                </button>
                <button className='btnN B' onClick={() => {
                    color = 'pink';
                    onClick()
                }}>
                </button>
                <button className='btnN C' onClick={() => {
                    color = 'orange';
                    onClick()
                }}></button>
                <button className='btnN D' onClick={() => {
                    color = 'LightSkyBlue';
                    onClick()
                }}></button>
                <button className='btnN E' onClick={() => {
                    color = 'LimeGreen';
                    onClick()
                }}></button>
                <button className='btnN F' onClick={() => {
                    color = 'red';
                    onClick()
                }}></button>
                <button className='btnN G' onClick={() => {
                    color = 'Sienna';
                    onClick()
                }}></button>
                <button className='btnN H' onClick={() => {
                    color = 'blue';
                    onClick()
                }}></button>
                <button className='btnN I' onClick={() => {
                    color = 'Yellow';
                    onClick()
                }}></button>
            </div>
        </div>
    )
};

export default ColorPicker;