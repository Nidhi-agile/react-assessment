import React, { useState } from 'react'
import axios from "axios";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");

    const bearerToken = localStorage.getItem('authToken');
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
    };

    const validate = () => {
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            setMsg("All Fields are mandatory.");
            return false;
        } else if(newPassword !== confirmPassword) {
            setMsg("New password and confirm password must be same.");
            return false;
        }else {
            setMsg("");
            return true;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        let isValid = validate();
        if (isValid) {
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/changePassword', {
                _id : localStorage.getItem('userId'),
                currentPassword: currentPassword,
                newPassword: newPassword
            }, { headers })
            .then(function (response) {
                if (response.data.status === 200) {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setMsg(response.data.message);
                }
            })
            .catch(function (error) {
                setMsg(error.response.data.message);
            })
        }
    };

    return (
        <div className="App">
            <div className='container'>
                <h3>Change Password</h3>
                <div className='row chngPwd'>
                {msg && <div className="alert alert-danger" role="alert">{msg}</div>}
                <div className="mb-3">
                    <label for="currentPassword" className="form-label">Current Password * :</label>
                    <input type="password" className="form-control" name="currentPassword" id="currentPassword" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} required />
                </div>
                <div className="mb-3">
                    <label for="newPassword" className="form-label">New Password * :</label>
                    <input type="password" className="form-control" name="newPassword" id="newPassword" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
                </div>
                <div className="mb-3">
                    <label for="confirmPassword" className="form-label">Confirm Password * :</label>
                    <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                </div>
                <button className="btn btn-primary" variant="secondary" type="submit" onClick={handleSubmit}> Change </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword