import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function UserManagement() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Auth with bearer
  const bearerToken = localStorage.getItem('authToken');
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };

  // Get All user data
  function getAllData() {
    axios.post('https://node-product-distribution-backend.agiletechnologies.in/admin/user/list', {
      page: currentPage ? currentPage : '1',
      limit: limit ? limit : '5',
      search: search ? search : ''
    }, { headers })
      .then(function (response) {
        if (response.data.status === 200) {
          setData(response.data.data.adminUserList)
          //console.log(response.data.data.total_records)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllData();
  }, [limit, currentPage, search]);

  return (
    <div className='App'>
      <h3>Users List </h3><br /><br />

      <div className="searchInput">
        <strong>Per page:</strong> <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>&nbsp;&nbsp;
      </div>
      <div className="addNewBtn">
        <strong>Search : <input onChange={(e) => setSearch(e.target.value)} value={search} /> </strong>&nbsp;&nbsp;
        <a href="/add-new-user" className='btn btn-primary'> &#x2b; Add New User</a>
      </div>

      {data?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped table-hover" style={{ width: "100%", textAlign: 'center', margin: '0 auto' }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Point</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr>
                <td key={index}> {item.userName} </td>
                <td> {item.mobileNo} </td>
                <td> {item.point} </td>
                <td> <a href={"/edit-user?id=" + item._id}>&#x270E; Edit</a> </td>
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

export default UserManagement
