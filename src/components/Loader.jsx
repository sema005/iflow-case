import React from 'react'
import styled from 'styled-components'
import '../App.css'


const Main = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    justify-content: center;
    align-items: center;
  background-color: #ddd0c8;

`
const Loader = () => {
  return (
    <Main>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </Main>
  )
}

export default Loader