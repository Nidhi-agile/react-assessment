import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function EditUser() {
    const [userName, setUserName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [point, setPoint] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');

    const bearerToken = localStorage.getItem('authToken');
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
    };

    const validate = () => {
        if (userName === '' || mobileNo === '' || point === '') {
            setErrMsg("All Fields are mandatory.");
            return false;
        } else {
            setErrMsg("");
            return true;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        let isValid = validate();
        if (isValid) {
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/user/update', {
                _id: id,
                userName: userName,
                mobileNo: mobileNo,
                point: parseInt(point)
            }, { headers })
                .then(function (response) {
                    if (response.data.status === 200) {
                        navigate("/user-management");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    return (
        <div className='App'>
            <div className="container">
                <h3>Edit User</h3>
                <div className='row newProd'>
                    {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
                    <div className="mb-3">
                        <label for="userName" className="form-label">User Name * :</label>
                        <input type="text" className="form-control" name="userName" id="userName" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} value={userName} required />
                    </div>
                    <div className="mb-3">
                        <label for="mobileNo" className="form-label">Mobile No * :</label>
                        <input type="text" className="form-control" name="mobileNo" id="mobileNo" placeholder="Mobile No" onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} required />
                    </div>
                    <div className="mb-3">
                        <label for="point" className="form-label">Point * :</label>
                        <input type="number" className="form-control" name="point" id="point" placeholder="Point" onChange={(e) => setPoint(e.target.value)} value={point} required />
                    </div>
                    <button className="btn btn-primary" variant="secondary" type="submit" onClick={handleSubmit}> Edit </button>
                </div>
            </div>
        </div>
    )
}

export default EditUser