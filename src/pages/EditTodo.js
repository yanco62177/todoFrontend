import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../global/nav';
import styled from 'styled-components';

function EditTodo() {
  const [description, setDescription] = useState('');
  const [todoId, setTodoId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [todos, setTodos] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const todoIdParam = params.get('todo_ID');
    setTodoId(todoIdParam);
    axios.get(`http://localhost:8000/api/getPlaceholder/${todoIdParam}`)
            .then((response) => {
                if (response.data.message) {
                    setTodos();
                } else {
                    setTodos(response.data.data.description);
                }
            })
            .catch((error) => {
                console.log(error);
            });
  }, [location.search]);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send PUT request to update todo
      await axios.put(`http://localhost:8000/api/updateTodo/${todoId}`, {
        description: description,
      });
      window.alert('Task updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
      window.alert('There has been a problem updating the task, please try again.');
    }
  };

  return (
    <EditContainer>
      <NavBar />
      <ContentContainer>
        <h2>Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="description"
              value={description}
              placeholder={todos}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <EditButtonContainer>
            <button type="submit">Update Todo</button>
          </EditButtonContainer>
        </form>
      </ContentContainer>
    </EditContainer>
  );
}

export default EditTodo;

const EditContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  background-color: #282c34;
  margin: 100px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  textarea {
    height: 150px;
    width: 300px;
    resize: vertical;
    border-radius: 10px;
    font-size: 24px;
    padding: 10px;
  }

  h2 {
    color: #ffffff;
    font-weight: 500;
    font-size: 40px;
  }
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;
