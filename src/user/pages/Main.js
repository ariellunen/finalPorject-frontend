import React, { useEffect, useState } from 'react';
import Admin from '../components/Admin';

const Main = () => {
    const [kide, setKide] = useState(false);
    const isKide = () => {
        setKide(true);
    }
    const notKide = () => {
        setKide(false);
    }
    console.log(kide)
    return (
        <React.Fragment>
            <Admin isKide={isKide} notKide={notKide} kide={kide} />
        </React.Fragment>
    )
}

export default Main;
