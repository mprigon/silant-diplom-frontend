import React from "react";
import { Route, Routes } from 'react-router-dom';

import Layout from "./Layout";
import Main from "./Main";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Main />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
