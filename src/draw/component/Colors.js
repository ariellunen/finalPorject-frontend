import React from 'react';
import './Colors.css';

let color = '';
const Colors = (props) => {
    const onClick = (e) => {
        props.handleColor(color, props.type, document.getElementById(color).src);
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <div id='colors'>
                <img src={`https://i.postimg.cc/mr9ZVgJL/Breadcrumbs-11.png`} alt='DarkViolet' id='DarkViolet' className='btnN DarkViolet' onClick={() => {
                    color = 'DarkViolet';
                    onClick()
                }}
                />
                <img src={`https://i.postimg.cc/CKpphHr0/Breadcrumbs-12.png`} alt='pink' id='pink' className='btnN pink' onClick={() => {
                    color = 'pink';
                    onClick()
                }}
                />
                <img src={`https://i.postimg.cc/WpYRFPYX/Breadcrumbs-13.png`} alt='orange' id='orange' className='btnN orange' onClick={() => {
                    color = 'orange';
                    onClick()
                }}
                />
                <img src={`https://i.postimg.cc/rph61XFV/Breadcrumbs-14.png`} alt='LightSkyBlue' id='LightSkyBlue' className='btnN' onClick={() => {
                    color = 'LightSkyBlue';
                    onClick()
                }}
                /><img src={`https://i.postimg.cc/Y9VJP6WT/Breadcrumbs-15.png`} alt='LimeGreen' id='LimeGreen' className='btnN' onClick={() => {
                    color = 'LimeGreen';
                    onClick()
                }}
                /><img src={`https://i.postimg.cc/g2D1pFhV/Breadcrumbs-16.png`} alt='red' id='red' className='btnN' onClick={() => {
                    color = 'red';
                    onClick()
                }}
                /><img src={`https://i.postimg.cc/BQfz1Qc5/Breadcrumbs-17.png`} alt='Sienna' id='Sienna' className='btnN' onClick={() => {
                    color = 'Sienna';
                    onClick()
                }}
                />
                <img src={`https://i.postimg.cc/CK97TmcC/Breadcrumbs-18.png`} alt='blue' id='blue' className='btnN' onClick={() => {
                    color = 'blue';
                    onClick()
                }}
                />
                <img src={`https://i.postimg.cc/4yQQcZsw/Breadcrumbs-19.png`} alt='Yellow' id='Yellow' className='btnN' onClick={() => {
                    color = 'Yellow';
                    onClick()
                }}
                />
            </div>
        </div>
    )
};

export default Colors;