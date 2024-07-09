import React from 'react';
import styled from 'styled-components';
import { CgProfile } from "react-icons/cg";

function NavBar() {
  return (
    <NavigationContainer>
        
        <ul>
            <li>
                <h3>
                    <a href='/'>HOME</a>
                </h3>
            </li>
            <li>
                <h3>
                    <a href='/ongoing-todo'>ONGOING</a>
                </h3>
            </li>
            <li>
                <h3>
                    <a href='/done-todo'>DONE</a>
                </h3>
            </li>
        </ul>
        <ProfileContainer>
            <CgProfile />
        </ProfileContainer>
    </NavigationContainer>
  );
}

export default NavBar;


const NavigationContainer = styled.div`
    background-color: #282c34;
    padding: 20px 0 0 ;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items center;

    ul{
        display: flex;
        list-style-type: none;
        flex-direction: row;

        li{
            margin: 10px 50px 0 0;
            text-decoration: none;

            &:last-of-type{
                margin: 10px 0;
            }
        }
    }

    h3{
        margin: 0;
        font-size: 32px;
        font-weight: 400;
        color: #ffffff;
    }

    a{
        color: #ffffff;
        text-decoration: none;
    }
        
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    left: 100px;
    svg {
        height: 40px;
        width: 40px;
        color: #ffffff;
    }
`;