import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import NavBar from "../global/nav";

function DoneTodo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/done")
            .then((response) => {
                if (response.data.success) {
                    setTodos(response.data.data);
                } else {
                    setTodos([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    
        if (confirmDelete) {
            Axios.delete(`http://localhost:8000/api/my-list/${id}`)
            .then(response => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                console.log("Task deleted successfully.");
                window.alert('Task deleted successfully');
            })
            .catch(error => {
                console.error(error);
                window.alert('There has been a problem deleting the task, please try again.');
            });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <DoneContainer>
            <NavBar/>
            <TodoContainer>
                <TableHead>
                    <h1>Done Todo List</h1>
                    <AddIconContainer>
                        <a href="add-new-todo">
                            <CiSquarePlus />
                            <Tooltip>Add new todo</Tooltip>
                        </a>
                    </AddIconContainer>
                </TableHead>
                <StyledTable>
                    <tbody>
                        <tr>
                            <TableHeader>Task</TableHeader>
                            <TableHeader>Date</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{formatDate(todo.updated_at)}</td>
                                <td>
                                    <DeleteContainer>
                                        <MdDeleteForever onClick={() => handleDelete(todo.id)} /><Tooltip>Delete todo</Tooltip>
                                    </DeleteContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TodoContainer>
        </DoneContainer>
    );
}

export default DoneTodo;

const Tooltip = styled.div`
    visibility: hidden;
    opacity: 0;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.3s;
    &:after {
        content: '';
        position: absolute;
        top: 100%; /* Arrow pointing down */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }
`;
const TableHeader = styled.td`
    text-align: center;
    color: #ffffff;
    padding: 10px;
    font-size: 21px;
    font-weight: 600;
    border: 2px solid #ffffff;
`;
const DoneContainer = styled.div`
    min-height: 100vh;
    background-color: #282c34;
`
const AddIconContainer = styled.div`
    position: relative;
    left: 50px;
    a {
        position: relative;
        display: flex;
        align-items: center;
        svg {
            height: 50px;
            width: 50px;
            color: #ffffff;
        }
        &:hover div {
            visibility: visible;
            opacity: 1;
        }
    }
`;

const TableHead = styled.div`
    display: flex;
    flex-direction: row;
`;

const TodoContainer = styled.div`
    background-color: #282c34;
    margin: 100px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin: 0;
        color: #ffffff;
    }
`;

const StyledTable = styled.table`
    margin: 20px 0 0;
    border-collapse: collapse;

    tr {
        border: 2px solid #ffffff;
    }

    td {
        border: 2px solid #ffffff;
        color: #ffffff;
        padding: 10px;
        font-size: 21px;
    }
`;

const DeleteContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    svg {
        color: #FF1800;
        &:hover + div {
            visibility: visible;
            opacity: 1;
        }
    }
`;
