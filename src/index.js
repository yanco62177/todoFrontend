import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home'; 
import AddNewTodo from './pages/AddNewTodo';
import EditTodo from './pages/EditTodo';
import OngoingTodo from './pages/OngoingTodo';
import DoneTodo from './pages/DoneTodo';
import Login from './pages/login';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addt-todo" element={<EditTodo />} />
        <Route path="/on-new-todo" element={<AddNewTodo />} />
        <Route path="/ongoing-todo" element={<OngoingTodo />} />
        <Route path="/done-todo" element={<DoneTodo />} />
        <Route path="/loginForm" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
