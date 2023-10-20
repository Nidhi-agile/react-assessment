import { useState, useEffect } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if ("authToken" in localStorage) {
            navigate("/dashboard");
        }
    });

    const validate = () => {
        if (email === '' || password === '') {
            setErrMsg("Email or password is mandatory.");
            return false;
        } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
            setErrMsg("Incorrect email format");
            return false;
        } else if (password.length < 6) {
            setErrMsg("password must be at least 6 characters");
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
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    if (response.data.status === 200) {
                        localStorage.setItem('userId', response.data.data._id);
                        localStorage.setItem('authToken', response.data.data.authToken);
                        setEmail("");
                        setPassword("");
                        navigate("/dashboard");
                    }
                })
                .catch(function (error) {
                    setErrMsg(error.response.data.message);
                })

        }
    };

    return (
        <div className="App">
            <div className="container">
                <img src={logo} className="App-logo" alt="logo" />
                <h3>Welcome to admin</h3>
                <div className='row loginPage'>
                    {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
                    <div className="mb-3">
                        <label for="email" className="form-label">Email * :</label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password * :</label>
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    <button className="btn btn-primary" variant="secondary" type="submit" onClick={handleSubmit}> Login </button>
                </div>
            </div>
        </div>
    );
}

export default Login;