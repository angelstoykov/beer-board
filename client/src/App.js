import './App.css';

import { AuthContext } from './contexts/AuthContext';
import { authServiceFactory } from './components/services/authService';

import Content from './components/content/Content';
import Header from './components/header/Header';
import BoardDetails from './components/details/BoardDetails';
import Login from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import Register from './components/Register/Register';
import EditBoard from './components/edit/EditBoard';
import Contact from './components/contact/Contact';
import CreateBoard from './components/Create/CreateBoard';

import { Routes, Route, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { boardServiceFactory } from './components/services/boardService';

import * as utils from './utils/utils';
import Home from './components/Home/Home';

function App() {
    const [boards, setBoards] = useState([]);
    const [auth, setAuth] = useState({});
    const authService = authServiceFactory(auth.accessToken);
    const boardService = boardServiceFactory(auth.accessToken);

    const navigate = useNavigate();

    useEffect(() => {
        boardService.getAll()
            .then(response => {
                setBoards(response);
            })
    }, []);

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/content');
        } catch (error) {
            console.log(error);
        }
    }

    const onLogout = async () => {

        //const a = await authService.logout();
        setAuth({});
        contextVlues.isAuthenticated = false;
        navigate('/');
    };

    const onRegisterSubmit = async (values) => {
        const { passwordRepeat, ...registerData } = values;
        if (passwordRepeat !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/content');
        } catch (error) {
            console.log(error);
        }
    }

    const onCreateBoardHandler = async (data) => {
        console.log('create board');
        const newBoard = await boardService.create(data);
        console.log(newBoard);
        navigate('/content');
    }

    const contextVlues = {
        onLoginSubmit,
        onLogout,
        onRegisterSubmit,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <AuthContext.Provider value={contextVlues}>
            <div>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/content" element={<Content boards={boards} />} />
                    <Route path="/details/board/:_id" element={<BoardDetails utils={utils} stateChanger={setBoards} />} />
                    <Route path="/edit/board/:_id" element={<EditBoard utils={utils} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-board" element={<CreateBoard utils={utils} onCreateBoardHandler={onCreateBoardHandler} />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
