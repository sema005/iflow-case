import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'

const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #5e6165;
`

const Body = () => {
  return (
    <MainContainer>
        <Header />
    </MainContainer>
  )
}

export default Body