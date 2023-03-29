import './App.css';

import { AuthContext } from './contexts/AuthContext';
import * as authService from './components/services/authService';

import Content from './components/content/Content';
import Header from './components/header/Header';
import BoardDetails from './components/details/BoardDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EditBoard from './components/edit/EditBoard';
import Contact from './components/contact/Contact';

import { Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';

import * as boardService from './components/services/boardService';

import * as utils from './utils/utils';

function App() {
    const [boards, setBoards] = useState([]);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        boardService.getAll()
            .then(response => {
                setBoards(response);
            })
    }, []);

    const onLoginSubmit = async (data) => {
        console.log(data);
        const result = await authService.login(data);
        console.log(result);
    }

    return (
        <AuthContext.Provider value={{onLoginSubmit}}>
            <div>
                <Header />

                <Routes>
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/" element={<Content boards={boards} />} />
                    <Route path="/details/board/:_id" element={<BoardDetails utils={utils} />} />
                    <Route path="/edit/board/:_id" element={<EditBoard utils={utils} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
