import React, { useState } from 'react';
import Admin from '../components/Admin';
const Main = () => {
    const kide = useState(localStorage.getItem('kide'));
        return (
        <React.Fragment>
            <Admin kide={kide} />
        </React.Fragment>
    )
}

export default Main;
