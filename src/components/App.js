import React from "react";
import { Route, Routes } from 'react-router-dom';

import Layout from "./Layout";
import Main from "./Main";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import Details_v2 from "./Details_v2";
import PersonalAccount from "./PersonalAccount";
import Protected from "./Protected";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Main />} />
                    <Route path="login" element={<LoginForm />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="details" element={<Details_v2 />} />
                    <Route path="personalaccount" element=
                        {<Protected>
                            <PersonalAccount />
                        </Protected>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
