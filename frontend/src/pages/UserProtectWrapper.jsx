import React, { useContext, useEffect} from 'react';
//import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

    }, [ token ])

    


    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper;