import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
`

const NavigatorContainer = styled.div`
    width: 100vw;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
`
export const Header = () => {
  return (
    <HeaderContainer>
        <NavigatorContainer>
            <h1>Registrer jobbtimer</h1>
        </NavigatorContainer>
    </HeaderContainer>
  )
}
