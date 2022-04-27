import React, { useEffect } from 'react';
import './Shapes.css';

const Shapes = (props) => {
    let shape = '';
    const onClick = (s) => {
        props.handleShape(shape);
    }
    console.log(shape);

    return (
        <div>
            <div id='shapes'>
                <button className='btn one' onClick={() => {
                    shape = 'circle';
                    onClick()
                }}>circle
                </button>
                <button className='btn two' onClick={() => {
                    shape = 'triangular';
                    onClick()
                }}>triangular
                </button>
                <button className='btn tree' onClick={() => {
                    shape = 'square';
                    onClick()
                }}>square</button>
            </div>
        </div>
    )
};

export default Shapes;