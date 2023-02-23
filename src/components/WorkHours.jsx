import React, {useState} from "react";
import styled from "styled-components";
import Edit from "../assets/images/pen.png"
import Delete from "../assets/images/delete.png"
import { directus } from "../services/directus.serivce";

const Card = styled.div`
  display: grid;
  justify-items: center;
  box-shadow: 5px 5px 5px 5px #ddd0c8;
  border-radius: 15px;
  position: relative;
  gap: 1rem;
`;

const EditButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  position: absolute;
  top: 5px;
  right: 55px;
  background: none;
`

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  position: absolute;
  top: 5px;
  right: 15px;
  background: none;
`


const Image = styled.img`
  width: 20px;
  height: 20px;
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
`
const UpdateButton = styled.button`
    width: 50%;
    height: 40px;
    background-color: #ddd0c8;
    border: none;
    justify-self: center;
    border-radius: 15px;
`

const WorkHours = ({ item, deleteItem, editItem, toggleEdit, editState }) => {
  const date = new Date(item.date_created);
  const month = date.getMonth()+1;
  const day = date.getDate();
  const year = date.getFullYear();
  const [newComment, setNewComment] = useState("")
  const [newHours, setNewHours] = useState("")
  let itemDay = day + "/" + month + "/" + year;
  
  
if (editState === true){
  return (
    <Card>
      <InputBoxes>
        <InputLabel >Arbeidstimer</InputLabel>
        <InputField type="number" name="hours" placeholder={item.work_time} onChange={(e) => setNewHours(e.target.value)} required />
      </InputBoxes>
      <InputBoxes>
        <InputLabel >Kommentar</InputLabel>
        <TextArea type="text" name="comment" placeholder={item.work_comment} onChange={(e) => setNewComment(e.target.value)} rows={3} required />
      </InputBoxes>
      <UpdateButton onClick={() => editItem(item.id, newHours, newComment)}>Oppdater</UpdateButton>
      <p>Dato: {itemDay} </p>
      <EditButton onClick={toggleEdit}><Image src={Edit} /></EditButton>
    </Card>
  )
}else {
  return (
    <Card>
      <h2>Timer: {item.work_time} </h2>
      <p>Kommentar: {item.work_comment} </p>
      <p>Dato: {itemDay} </p>
      <EditButton onClick={toggleEdit}><Image src={Edit} /></EditButton>
      <DeleteButton onClick={() => deleteItem(item.id)}><Image src={Delete} /></DeleteButton>
    </Card>
  );
}
};

export default WorkHours;
