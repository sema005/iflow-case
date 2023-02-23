import React, { useEffect, useState, useCallback } from "react";
import "reactjs-popup/dist/index.css";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { Header } from "../components/Header";
import Loader from "../components/Loader";
import RegisterHours from "../components/RegisterHours";
import WorkHours from "../components/WorkHours";
import { directus } from "../services/directus.serivce";
import { ToastContainer } from 'react-toastify';
import { errorToast, deletedToast, editToast, sucessToast, alertHoursToast } from "../toasts/toast";

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-height: fit-content;
  background-color: #ddd0c8;
`;

const Main = styled.div`
  min-height: 40vh;
  height: fit-content;
  max-width: 80vw;
  background-color: white;
  border-radius: 15px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
`;

const SectionWorkHours = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  justify-content: center;
  align-content: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 28px;
  text-align: center;
`;

const NewContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  display: grid;
  justify-items: center;
  box-shadow: 5px 5px 5px 5px #ddd0c8;
  border-radius: 15px;
  position: relative;
  gap: 1rem;
  width: 30%;
  margin: auto;
  padding: 1rem 0px 1rem 0px;
  margin-bottom: 1rem;
`;

const ShowWorkHours = ({ data, setData }) => {
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");
  const [editState, setEditeState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHours, setTotalHours] = useState(0)
  

  const toggleEdit = () => {
    setEditeState(!editState);
  };
  const fetchData = async () => {
    try {
      const response = await directus.graphql.items(`
      query{
        time_register {
          id,
          date_created,
          work_time
          work_comment
        }
      }
  `);
      setData(response.data.time_register);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect( () => {
    fetchData()
  }, [])

  const getTotalHours = useCallback(() => {
    const hours = []
    data.forEach(el => {
      hours.push(el.work_time)
    });
    setTotalHours(hours.reduce( (sumA, sumB) => sumA + sumB, 0))
    if(totalHours >= 100){
      alertHoursToast()
    }
  }, [data, totalHours]);
  
  useEffect( () => {
    getTotalHours()
  }, [data, getTotalHours])

  const deleteItem = async (id) => {
    await directus.items("time_register").deleteOne(id);
    await deletedToast()
    await fetchData();
  };

  const postNewHour = async () => {
    if(hours && comment){
      try {
        await directus.items("time_register").createOne({
          work_time: hours,
          work_comment: comment,
        });
        setComment("");
        setHours("");
        fetchData();
        sucessToast()
      } catch (error) {
        console.log(error);
      }
    }else{
      errorToast()
    }
  };

  const editItem = async (id, time, comment) => {
    if(comment && time){
      await directus.items("time_register").updateOne(id, {
        work_time: time,
        work_comment: comment,
      });
      await fetchData();
      toggleEdit();
      await editToast()
    }else {
      await errorToast()
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <MainContainer>
      <Header />
      <Main>
        <Title>Timeregistrering</Title>
        <NewContainer>
          <RegisterHours
            postNewHour={postNewHour}
            setHours={setHours}
            setComment={setComment}
          />
        </NewContainer>
        <Card>
        <Title>Totale timer</Title>
          <p>Totalt {totalHours}</p>
        </Card>
        <Title>Timeoversikt</Title>
        <SectionWorkHours>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <WorkHours
                  item={item}
                  deleteItem={deleteItem}
                  editItem={editItem}
                  toggleEdit={toggleEdit}
                  editState={editState}
                />
              </div>
            );
          })}
        </SectionWorkHours>
          <ToastContainer position="bottom-center" autoClose={3000} theme="dark"/>
      </Main>
    </MainContainer>
  );
};

export default ShowWorkHours;
