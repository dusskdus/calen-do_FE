import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";


const Router = () => {
    return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    </BrowserRouter>
    );
};

export default Router;