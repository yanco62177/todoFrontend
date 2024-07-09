import React from 'react';
import styled from "styled-components";
import NavBar from "../global/nav";

function Login(){
    return (
    <LoginContainer>
        <NavBar/>
        <LoginForm>
        
        </LoginForm>
    </LoginContainer>
    )
}

export default Login;

const LoginContainer=styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const LoginForm=styled.div`
    max-width: 400px;
`