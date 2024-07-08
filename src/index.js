import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home'; // Import your Home component
import AddNewTodo from './pages/AddNewTodo';
import EditTodo from './pages/EditTodo';
import OngoingTodo from './pages/OngoingTodo';
import DoneTodo from './pages/DoneTodo';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/add-new-todo" element={<AddNewTodo />} />
        <Route path="/edit-todo" element={<EditTodo />} />
        <Route path="/ongoing-todo" element={<OngoingTodo />} />
        <Route path="/done-todo" element={<DoneTodo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
