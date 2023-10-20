import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    const {Component} = props
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('authToken');
        if(!login){
            navigate('/')
        }
    })

    return (
        <div className="App">
            <Component />
        </div>
    )
}
export default Protected