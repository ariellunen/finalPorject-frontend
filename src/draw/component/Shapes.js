import React from 'react';
import './Shapes.css';

let prevShape = null;
const Shapes = (props) => {
    let shape = '';
    const onClick = (s) => {
        if (prevShape === null) {
            prevShape = shape;
            document.getElementById(shape).style.border = '4px solid red';

        } else {
            document.getElementById(shape).style.border = '4px solid red';
            document.getElementById(prevShape).style.border = '4px solid transparent';
            prevShape = shape;
        }
        localStorage.setItem('shape', JSON.stringify(shape));
        props.handleShape(shape, document.getElementById(shape).src);
    }

    return (
        <div>
            <div id='shapes'>
                <img className='btn' src={'https://i.postimg.cc/tCWXndJr/Breadcrumbs-22.png'} id='circle' alt='circle' onClick={() => {
                    shape = 'circle';
                    onClick()
                }} />
                <img className='btn' alt='triangular' id='triangular' src={'https://i.postimg.cc/nLqxCBk4/Breadcrumbs-29.png'} onClick={() => { shape = 'triangular'; onClick() }} />

                <img className='btn' src={`https://i.postimg.cc/j5tfBq9T/Breadcrumbs-24.png`} alt='heart' id='heart' onClick={() => {
                    shape = 'heart';
                    onClick()
                }} />
                <img className='btn' alt='david' id='david' src={'https://i.postimg.cc/zfRHyHm8/Breadcrumbs-21.png'} onClick={() => {
                    shape = 'david';
                    onClick()
                }} />
                <img className='btn' alt='home' id='home' src={'https://i.postimg.cc/qqH5PKrR/Breadcrumbs-23.png'} onClick={() => {
                    shape = 'home';
                    onClick()
                }} />
            </div>
        </div>
    )
};

export default Shapes;