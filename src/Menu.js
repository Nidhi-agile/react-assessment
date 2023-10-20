import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.svg"
import { useNavigate } from "react-router-dom";

function Menu() {
    const navigate = useNavigate();
    const [showElement, setShowElement] = useState(localStorage.getItem('authToken'));
    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate("/");
    }

    useEffect(() => {
        const storedValue = localStorage.getItem('authToken');
        if (storedValue !== null) {
            setShowElement(storedValue);
        } else {
            setShowElement('');
        }
    }, [logout]);

    return (
        <>
        {showElement ? (
            <div className="App">
                <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", fontSize: "20px" }} className="navbar">
                    <li><img src={logo} className="App-logo" width="150px" alt="logo" /></li>
                    <li style={{ marginRight: "15px" }}><NavLink className="nav-bar-link" to="/dashboard">Dashboard</NavLink></li>
                    <li style={{ marginRight: "15px" }}><NavLink className="nav-bar-link" to="/user-management">User Management</NavLink></li>
                    <li style={{ marginRight: "15px" }}><NavLink className="nav-bar-link" to="/product-management">Product Management</NavLink></li>
                    <li style={{ marginRight: "15px" }}><NavLink className="nav-bar-link" to="/change-password">Change Password</NavLink></li>
                    <li style={{ marginRight: "15px" }}><button className="btn btn-primary" onClickCapture={logout}>Logout</button></li>
                </ul>
            </div>
            ) : ''}
        </>
    );
}

export default Menu