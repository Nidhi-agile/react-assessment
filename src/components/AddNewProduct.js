import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function AddNewProduct() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPoints, setProductPoints] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const bearerToken = localStorage.getItem('authToken');
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
    };

    const headers2 = {
        "Content-Type": "multipart/form-data",
    };

    const validate = () => {
        if (productName === '' || productDescription === '' || productPoints === '') {
            setErrMsg("All Fields are mandatory.");
            return false;
        } else {
            setErrMsg("");
            return true;
        }
    };

    // on change file upload
    const handleFileChange = (e) => {
        const imgArr = [];
        const target = [...e.target.files];
        target.forEach((file, index) => {
            imgArr.push(file);
        });
        if (imgArr !== '') {
            const formData = new FormData();
            imgArr.forEach((file, index) => {
                formData.append(`files`, file);
            });
            formData.append("module_name", 'product');
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/local-images/uploadMultipleFile',
                formData
                , { headers2 })
                .then(function (response) {
                    if (response.data.status === 200) {
                        const response1 = response.data.data;
                        const arr = [];
                        response1.forEach((file, index) => {
                            arr.push(file.name);
                        });
                        setUploadedImages(arr);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };
    const handleSubmit = e => {
        e.preventDefault();
        let isValid = validate();
        if (isValid) {
            if (Object.keys(uploadedImages).length === 0) {
                setErrMsg("All Fields are mandatory.");
                return false;
            }
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/product/create', {
                productName: productName,
                productDescription: productDescription,
                productImages: uploadedImages,
                productPoints: parseInt(productPoints)
            }, { headers })
                .then(function (response) {
                    if (response.data.status === 200) {
                        navigate("/product-management");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    return (
        <div className='App'>
            <div className='container'>
                <h3>Add New Product</h3>
                <div className='row newProd'>
                    {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
                    <div className="mb-3">
                        <label for="productName" className="form-label">Product Name * :</label>
                        <input type="text" className="form-control" name="productName" id="productName" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} value={productName} required />
                    </div>
                    <div className="mb-3">
                        <label for="productDescription" className="form-label">Product Description * :</label>
                        <input type="text" className="form-control" name="productDescription" id="productDescription" placeholder="Description" onChange={(e) => setProductDescription(e.target.value)} value={productDescription} required />
                    </div>
                    <div className="mb-3">
                        <label for="productImage" className="form-label">Product Image * :</label>
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="form-control" id="productImage"/>
                    </div>
                    <div className="mb-3">
                        <label for="productPoints" className="form-label">Product Points * :</label>
                        <input type="number" className="form-control" name="productPoints" id="productPoints" placeholder="Product Points" onChange={(e) => setProductPoints(e.target.value)} value={productPoints} required />
                    </div>
                    <button className="btn btn-primary" variant="secondary" type="submit" onClick={handleSubmit}> Add </button>
                </div>
            </div>
        </div>
    )
}

export default AddNewProduct