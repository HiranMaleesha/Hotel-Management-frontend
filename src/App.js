import React from 'react'
import Home from './Components/HomePage/Home'
import { Route,Routes } from 'react-router-dom';
import  UpdateUser from './Components/UpdateUser/UpdateUser';
import AddHalls from './Components/AddHalls/AddHalls';


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/userdetails/:id" element={<UpdateUser/>}/>
          <Route path="/userdetails" element={<Home/>}/>
          <Route path="/adduser" element={<AddHalls/>}/>

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App
