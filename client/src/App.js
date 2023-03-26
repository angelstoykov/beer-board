import './App.css';

import Content from './components/content/Content';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import BoardDetails from './components/details/BoardDetails';

import { Routes, Route } from 'react-router-dom';

import Contact from './components/contact/Contact';
import { useEffect, useState } from 'react';

import * as boardService from './components/services/BoardService';
import EditBoard from './components/edit/EditBoard';

import * as utils from './utils/utils';

function App() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardService.getAll()
            .then(response => {
                setBoards(response);
            })
    }, []);

    return (
        <div>
            <Header />

            <Routes>
                <Route path="/Contact" element={<Contact />} />
                <Route path="/" element={<Content boards={boards} />} />
                <Route path="/details/board/:id" element={<BoardDetails utils={utils} />} />
                <Route path="/edit/board/:id" element={<EditBoard utils={utils} />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
