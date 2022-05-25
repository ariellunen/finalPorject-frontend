import React from 'react';
import './Colors.css';

const ColorPicker = (props) => {
    let color = '';
    const onClick = (s) => {
        // console.log(props.type)
        props.handleColor(color, props.type);
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <div id='colors'>
                <img src={`https://i.postimg.cc/mr9ZVgJL/Breadcrumbs-11.png`} alt='DarkViolet' className='btnN A' onClick={() => {
                    color = 'DarkViolet';
                    onClick()
                }} 
                />
                <img src={`https://i.postimg.cc/CKpphHr0/Breadcrumbs-12.png`} alt='pink' className='btnN' onClick={() => {
                    color = 'pink';
                    onClick()
                }} 
                />
                <img src={`https://i.postimg.cc/WpYRFPYX/Breadcrumbs-13.png`} alt='pink' className='btnN' onClick={() => {
                    color = 'pink';
                    onClick()
                }} 
                />
                <img src={`https://i.postimg.cc/rph61XFV/Breadcrumbs-14.png`} alt='LightSkyBlue' className='btnN' onClick={() => {
                    color = 'LightSkyBlue';
                    onClick()
                }} 
                /><img src={`https://i.postimg.cc/Y9VJP6WT/Breadcrumbs-15.png`} alt='LimeGreen' className='btnN' onClick={() => {
                    color = 'LimeGreen';
                    onClick()
                }} 
                /><img src={`https://i.postimg.cc/g2D1pFhV/Breadcrumbs-16.png`} alt='red' className='btnN' onClick={() => {
                    color = 'red';
                    onClick()
                }} 
                /><img src={`https://i.postimg.cc/BQfz1Qc5/Breadcrumbs-17.png`} alt='Sienna' className='btnN' onClick={() => {
                    color = 'Sienna';
                    onClick()
                }} 
                />
                <img src={`https://i.postimg.cc/CK97TmcC/Breadcrumbs-18.png`} alt='blue' className='btnN' onClick={() => {
                    color = 'blue';
                    onClick()
                }} 
                />
                <img src={`https://i.postimg.cc/4yQQcZsw/Breadcrumbs-19.png`} alt='Yellow' className='btnN' onClick={() => {
                    color = 'Yellow';
                    onClick()
                }} 
                />
            </div>
        </div>
    )
};

export default ColorPicker;