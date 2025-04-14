import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FaExclamationTriangle } from 'react-icons/fa';
import { UserContext } from '../App';

const DeleteProjectModal = ({showModalSetter, proj}) => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const b2 = useRef(null);

    // cancel function
    const cancelHandle = () => {
        showModalSetter(false);
    };

    const deleteProjectHandler = async(e) => {
        e.stopPropagation();
        b2.current.style.pointerEvents = "none";
        b2.current.style.cursor = "not-allowed";
        b2.current.style.opacity = "0.5";

        const obj = {id: proj.id, students: proj.students, title: proj.title, piName: proj.piName, piEmail: proj.piEmail,cpiName: proj.cpiName, cpiEmail: proj.cpiEmail};
        try{
            const response = await fetch("http://localhost:4000/delete-project", {
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(obj)
            });
            if (!response.ok){
                console.log("Error response received:", response);  
                throw new Error(response.error || response.message || 'Something went wrong!');
            }
            const result = await response.json();
            alert("Deleted successfully! 🎉");
            setUserInfo(prev => ({...prev, projects: prev.projects.filter(p=>p.id!=proj.id)}));   
        }
        catch(err){
            console.log(err);
            alert(err.message);
        }
            finally {
            b2.current.style.pointerEvents = "auto";
            b2.current.style.cursor = "pointer";
            b2.current.style.opacity = "1";
            console.log('closing modal'); 
            setTimeout(() => showModalSetter(false), 100); // slight delay
        }
    }

    useEffect(() => {
      // Prevent body from scrolling
      document.body.style.overflow = 'hidden';
  
      return () => {
        // Restore scroll when modal unmounts
        document.body.style.overflow = 'auto';
      };
    }, []);


  return (
    <StyledWrapper>
      <div className="_2overlay" />
        <div className="_2card">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaExclamationTriangle size={20} color="red" />
            </div>
        <div style={{display:'flex', justifyContent: 'space-between'}}><p className="_2cookieHeading">Delete Project</p><span className="close-x" onClick={()=>{showModalSetter(false);}}></span></div>
        {/* <br/> */}
        <p className="_2cookieDescription">
            Are you sure?<br/>Once deleted, the project is completely lost, and can never be recovered. Click 'Yes' if you want to delete it, else click 'Cancel'.
        </p>
        <br/><br/>
        
        <div className="_2buttonContainer">
          <button className="_2acceptButton" onClick={(e)=>{deleteProjectHandler(e)}} ref={b2}>Yes</button>
          <button className="_2declineButton" onClick={cancelHandle}>Cancel</button>
        </div>
      </div>
      
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 1000;

  ._2overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  ._2card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 220px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
    gap: 13px;
    position: relative;
    overflow: hidden;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.062);
  }

  #_2cookieSvg {
    width: 50px;
  }

  #_2cookieSvg g path {
    fill: rgb(97, 81, 81);
  }

  ._2cookieHeading {
    font-size: 1.2em;
    font-weight: 800;
    color: rgb(26, 26, 26);
  }

  ._2cookieDescription {
    text-align: center;
    font-size: 0.7em;
    font-weight: 600;
    color: rgb(99, 99, 99);
  }

  ._2cookieDescription a {
    --tw-text-opacity: 1;
    color: rgb(59 130 246);
  }

  ._2cookieDescription a:hover {
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
  }

  ._2buttonContainer {
    display: flex;
    gap: 20px;
    flex-direction: row;
  }

  ._2acceptButton {
    width: 80px;
    height: 30px;
    background-color: #7b57ff;
    transition-duration: .2s;
    border: none;
    color: rgb(241, 241, 241);
    cursor: pointer;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px #977ef3, 0 2px 4px -1px #977ef3;
    transition: all .6s ease;
  }

  ._2declineButton {
    width: 80px;
    height: 30px;
    background-color: #dadada;
    transition-duration: .2s;
    color: rgb(46, 46, 46);
    border: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px #bebdbd, 0 2px 4px -1px #bebdbd;
    transition: all .6s ease;
  }

  ._2declineButton:hover {
    background-color: #ebebeb;
    box-shadow: 0 10px 15px -3px #bebdbd, 0 4px 6px -2px #bebdbd;
    transition-duration: .2s;
  }

  ._2acceptButton:hover {
    background-color: #9173ff;
    box-shadow: 0 10px 15px -3px #977ef3, 0 4px 6px -2px #977ef3;
    transition-duration: .2s;
  }
`;

export default DeleteProjectModal;
