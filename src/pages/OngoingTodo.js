import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import NavBar from "../global/nav";

function OngoingTodo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/ongoing")
            .then((response) => {
                if (response.data.message) {
                    setTodos([]);
                } else {
                    setTodos(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDone = (todoID) => {
        const confirmdone = window.confirm("Are you sure this task is done?");
        const active = 'done';
        const id = todoID;
        if(confirmdone){
            Axios.put(`http://localhost:8000/api/updateStatus/${id}`, {activeStatus : active })
                .then(response => {
                    window.alert("Tasked marked as done")
                    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoID));
                })
                .catch(error => {
                    console.error(error);
                    window.alert('There has been a problem updating the task, please try again.');
                });
            }
    };

    const handleDelete = (todoID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        
        if (confirmDelete) {
            Axios.delete(`http://localhost:8000/api/my-list/${todoID}`)
            .then(response => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoID));
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
        <OngoingContainer>
            <NavBar/>
            <TodoContainer>
                <TableHead>
                    <h1>Ongoing Todo List</h1>
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
                                <td>{formatDate(todo.created_at)}</td>
                                <td>
                                    <ActionContainer>
                                        <DoneContainer>
                                            <IoMdCheckboxOutline onClick={() => handleDone(todo.id)} />
                                            <Tooltip>Mark as done</Tooltip>
                                        </DoneContainer>
                                    
                                        <EditContainer>
                                            <a href={`edit-todo?todo_ID=${todo.id}`}><FaEdit /></a>
                                            <Tooltip>Edit todo</Tooltip>
                                        </EditContainer>
                                    
                                        <DeleteContainer>
                                            <MdDeleteForever onClick={() => handleDelete(todo.id)} />
                                            <Tooltip>Delete todo</Tooltip>
                                        </DeleteContainer>
                                    </ActionContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TodoContainer>
        </OngoingContainer>
    );
}

export default OngoingTodo;

const OngoingContainer = styled.div`
    min-height: 100vh;
    background-color: #282c34;
`;

const TableHeader = styled.td`
    text-align: center;
    color: #ffffff;
    padding: 10px;
    font-size: 21px;
    font-weight: 600;
    border: 2px solid #ffffff;
`;

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

const EditContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    a {
        svg {
            color: #ffffff;
        }
        &:hover + div {
            visibility: visible;
            opacity: 1;
        }
    }
`;

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

const DoneContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    svg {
        color: #ffffff;
        &:hover + div {
            visibility: visible;
            opacity: 1;
        }
    }
`;

const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${EditContainer} {
        margin: 0 10px 0;
    }
    ${DoneContainer} {
        margin: 0 10px 0;
    }
`;
