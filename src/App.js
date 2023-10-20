import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import Protected from './Protected';
import Menu from './Menu';
import AddNewUser from './components/AddNewUser';
import EditUser from './components/EditUser';
import ProductManagement from './components/ProductManagement';
import AddNewProduct from './components/AddNewProduct';
import EditProduct from './components/EditProduct';
import ChangePassword from './ChangePassword';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <BrowserRouter>
          <div className='row'>
            <div className='col-4'>
              <Menu />
            </div>

            <Routes>
                <Route path="/" element={<Login />} />
                </Routes>
            <div className='col-8'>
            <Routes>
                <Route path="dashboard" element={<Protected Component={Dashboard} />} />
                <Route path="user-management" element={<Protected Component={UserManagement} />} />
                <Route path="add-new-user" element={<Protected Component={AddNewUser} />} />
                <Route path="edit-user" element={<Protected Component={EditUser} />} />
                <Route path="product-management" element={<Protected Component={ProductManagement} />} />
                <Route path="add-new-product" element={<Protected Component={AddNewProduct} />} />
                <Route path="edit-product" element={<Protected Component={EditProduct} />} />
                <Route path="change-password" element={<Protected Component={ChangePassword} />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;