import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import DonateFund from '../pages/DonateFund';
import Profile from '../pages/Profile';
import RaiseFund from '../pages/RaiseFund';
import RaiseFundForm from '../pages/RaiseFundForm';
import EditProfile from '../pages/Profile/edit';

function Router() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/:id" element={<Profile />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="detail/:id" element={<Detail />} />
                <Route path="donatefund/:id" element={<DonateFund />} />
                <Route path="raisefund" element={<RaiseFund />} />
                <Route path="addraisefund" element={<RaiseFundForm />} />
            </Routes>
    )
}

export default Router
