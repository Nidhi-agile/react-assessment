import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function EditProduct() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPoints, setProductPoints] = useState("");
    const [productStatus, setProductStatus] = useState("");
    const [productImages, setProductImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
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
        const uproductStatus = productStatus === 'true' ? true : false
        let isValid = validate();
        if (isValid) {
            axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/product/update', {
                _id: id,
                productName: productName,
                productDescription: productDescription,
                productImages: (Object.keys(uploadedImages).length === 0) ? removedImages : uploadedImages,
                removeImages: (Object.keys(uploadedImages).length === 0) ? [] : removedImages,
                productPoints: parseInt(productPoints),
                productStatus: Boolean(uproductStatus)
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

    useEffect(() => {
        axios.get(`https://node-product-distribution-backend.agiletechnologies.in/admin/product/get/${id}`, { headers })
            .then(function (response) {
                if (response.data.status === 200) {
                    setProductName(response.data.data.productName)
                    setProductDescription(response.data.data.productDescription)
                    setProductPoints(response.data.data.productPoints)
                    setProductStatus(response.data.data.productStatus)
                    setProductImages(response.data.data.productImages)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [id])

    return (
        <div className='App'>
            <div className="container">
                <h3>Edit Product</h3>
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
                        Existing Product Images :<br />
                        {productImages?.map((item, index) => (
                            <img src={'https://node-product-distribution-backend.agiletechnologies.in/uploads/product/' + item} width="60px" onLoad={() => setRemovedImages(current => [...current, item])} alt="product image"/>
                        ))}
                        <br /><br />
                        <label for="newProductImage" className="form-label">New Product Image * :</label>
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="form-control" id="newProductImage"/>
                    </div>
                    <div className="mb-3">
                        <label for="productPoints" className="form-label">Product Points * :</label>
                        <input type="number" className="form-control" name="productPoints" id="productPoints" placeholder="Product Points" onChange={(e) => setProductPoints(e.target.value)} value={productPoints} required />
                    </div>
                    <div className="mb-3">
                        <label for="productStatus" className="form-label">Product Status * :</label>
                        <select value={productStatus} onChange={(e) => setProductStatus(e.target.value)} className="form-control" id="productStatus">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" variant="secondary" type="submit" onClick={handleSubmit}> Edit </button>
                </div>
            </div>
        </div>
    )
}

export default EditProduct