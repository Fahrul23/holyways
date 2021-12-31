import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import DonateFund from '../pages/DonateFund';
import Profile from '../pages/Profile';
import RaiseFund from '../pages/RaiseFund';
import RaiseFundForm from '../pages/RaiseFundForm';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="detail" element={<Detail />} />
                <Route path="donatefund" element={<DonateFund />} />
                <Route path="raisefund" element={<RaiseFund />} />
                <Route path="addraisefund" element={<RaiseFundForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
