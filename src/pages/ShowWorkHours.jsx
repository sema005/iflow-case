import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { Header } from "../components/Header";
import Loader from "../components/Loader";
import RegisterHours from "../components/RegisterHours";
import WorkHours from "../components/WorkHours";
import { directus } from "../services/directus.serivce";
import { ToastContainer, toast } from 'react-toastify';

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
  height: 250px;
  width: 100%;
`;

const ShowWorkHours = ({ data, setData }) => {
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");
  const [editState, setEditeState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sucessToast = () => toast.success("Timer registrert",{
    position: "bottom-center"
  })
  const errorToast = () => toast.warn("Husk å fylle inn",{
    position: "bottom-center"
  })
  const deletedToast = () => toast.success("Slettet",{
    position: "bottom-center"
  })
  const editToast = () => toast.success("Endret",{
    position: "bottom-center"
  })

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
      console.log("www");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
