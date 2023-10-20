import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ProductManagement() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Auth with bearer
  const bearerToken = localStorage.getItem('authToken');
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };

  // Get All user data
  function getAllData() {
    axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/product/list', {
      page: currentPage ? currentPage : '1',
      search: search ? search : ''
    }, { headers })
      .then(function (response) {
        if (response.data.status === 200) {
          setData(response.data.data.adminProductList)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function toggleStatus(id, status) {
    axios.get(`https://node-product-distribution-backend.agiletechnologies.in/admin/product/activeInActive/${id}`, { headers })
      .then(function (response) {
        if (response.data.status === 200) {
          setToggle(status);
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllData();
  }, [currentPage, search, toggle]);

  console.log(data)
  return (
    <div className='App'>
      <h3>Products List </h3>
      <br />

      <div className="searchInput">
        <strong>Search : <input onChange={(e) => setSearch(e.target.value)} value={search} /> </strong>
      </div>
      <div className="addNewBtn">
        <a href="/add-new-product" className='btn btn-primary'>&#x2b; Add New Product</a>
      </div>
      <br /><br />

      {data?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped table-hover" style={{ width: "100%", textAlign: 'center', margin: '0 auto' }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Point</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr>
                <td key={index}> <img src={'https://node-product-distribution-backend.agiletechnologies.in/uploads/product/' + item.productImages[0]} width="100" alt="product image" /> </td>
                <td> {item.productName} </td>
                <td> <div dangerouslySetInnerHTML={{ __html: item.productDescription }} /> </td>
                <td> {item.productPoints} </td>
                <td> <button className={item.productStatus === true ? "btn btn-primary" : "btn btn-secondary"} onClick={() => toggleStatus(item._id, item.productStatus)}>{item.productStatus === true ? "True" : "False"}</button></td>
                <td> <a href={"/edit-product?id=" + item._id}>&#x270E; Edit</a> </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: '20px', marginBottom: '50px' }}>
        <button className='btn btn-primary' onClick={() => setCurrentPage(currentPage - 1)}>&#x21e4; Previous</button>&nbsp;&nbsp;
        <button className='btn btn-primary' onClick={() => setCurrentPage(currentPage + 1)}>Next &#x21e5;</button>
      </div>
    </div>
  )
}

export default ProductManagement
