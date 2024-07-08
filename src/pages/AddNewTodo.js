import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../global/nav';
import styled from 'styled-components';

function AddNewTodo() {
  const [description, setDescription] = useState('');
  const activeStatus ='active';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/my-list', { description, activeStatus });
      window.alert('Task added successfully');
      navigate('/');
    } catch (error) {
      window.alert('There has been a problem adding the task, please try again.');
    }
  };

  return (
    <AddContainer>
      <NavBar />
      <ContentContainer>
        <h2>Add New Todo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="description"
              value={description}
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <AddButtonContainer>
            <button type="submit">Add Todo</button>
          </AddButtonContainer>
        </form>
      </ContentContainer>
    </AddContainer>
  );
}

export default AddNewTodo;

const AddContainer = styled.div`
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

  input {
    height: 40px;
    width: 300px;
    border-radius: 10px;
    font-size: 24px;
    padding: 10px;
    margin-top: 10px;
  }

  h2 {
    color: #ffffff;
    font-weight: 500;
    font-size: 40px;
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;
