import React from "react";
import styled from "styled-components";


const Form = styled.div`
width: 50%;
margin: auto;
display: grid;
justify-content: center;
`

const InputLabel = styled.label`
`;

const InputField = styled.input`
`
const TextArea = styled.textarea`
`

const InputBoxes = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 1rem;
`

const AddButton = styled.button`
    width: 50%;
    height: 40px;
    background-color: #73d873b5;
    border: none;
    justify-self: center;
    border-radius: 15px;

`

const RegisterHours = ({postNewHour, setComment, setHours}) => {
  
  
  return (
    <Form>
      <InputBoxes>
        <InputLabel >Arbeidstimer</InputLabel>
        <InputField type="number" name="hours" onChange={(e) => setHours(e.target.value)} required />
      </InputBoxes>
      <InputBoxes>
        <InputLabel >Kommentar</InputLabel>
        <TextArea type="text" name="comment" onChange={(e) => setComment(e.target.value)} rows={3} cols={50} required />
      </InputBoxes>
      <AddButton onClick={() => postNewHour()}>Registrer</AddButton>
    </Form>
  );
};

export default RegisterHours;
