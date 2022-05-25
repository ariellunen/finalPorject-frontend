import React from 'react';
import './Shapes.css';

const Shapes = (props) => {
    let shape = '';
    const onClick = (s) => {
        localStorage.setItem('shape', JSON.stringify(shape));
        props.handleShape(shape);
    }

    return (
        <div>
            <div id='shapes'>
                <button className='btn' onClick={() => {
                    shape = 'circle';
                    onClick()
                }}>עיגול
                </button>
                <button className='btn' onClick={() => {
                    shape = 'triangular';
                    onClick()
                }}>משולש
                </button>
                <button className='btn' onClick={() => {
                    shape = 'heart';
                    onClick()
                }}>לב</button>
                <button className='btn' onClick={() => {
                    shape = 'david';
                    onClick()
                }}>מגן דוד</button>
                <button className='btn' onClick={() => {
                    shape = 'home';
                    onClick()
                }}>בית</button>
            </div>
        </div>
    )
};

export default Shapes;