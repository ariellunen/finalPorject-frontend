import React from 'react';
import './Shapes.css';

const Shapes = (props) => {
    let shape = '';
    const onClick = (s) => {
        props.handleShape(shape);
    }

    return (
        <div>
            <div id='shapes'>
                <button className='btn' onClick={() => {
                    shape = 'circle';
                    onClick()
                }}>circle
                </button>
                <button className='btn' onClick={() => {
                    shape = 'triangular';
                    onClick()
                }}>triangular
                </button>
                <button className='btn' onClick={() => {
                    shape = 'heart';
                    onClick()
                }}>heart</button>
            </div>
        </div>
    )
};

export default Shapes;