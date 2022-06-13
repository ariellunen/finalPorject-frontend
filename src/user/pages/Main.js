import React, { useEffect, useState } from 'react';
import Admin from '../components/Admin';
import AdminKide from '../components/AdminKide';
const Main = () => {
    // useEffect(() => {

    // }, [])
    const [kide, setKide] = useState(localStorage.getItem('kide'));
    // const isKide = () => {
    //     console.log('hiiii')
    // setKide(true);
    // }
    // const notKide = () => {
    // setKide(false);
    // }


    return (
        <React.Fragment>
            <Admin kide={kide} />
        </React.Fragment>
    )
}

export default Main;
