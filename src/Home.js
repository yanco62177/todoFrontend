// Home.js
import React from 'react';
import NavBar from './global/nav';
import List from './pages/list';
import styled from 'styled-components';

function Home() {
  return (
    <HomeContainer>
      <NavBar />
      <List />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer =styled.div`
min-height: 100vh;
background-color: #282c34;
 
`