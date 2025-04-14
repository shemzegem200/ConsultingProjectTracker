import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FaMoneyBillAlt,FaCheckCircle} from 'react-icons/fa';

const ValidateDocsModal = ({showModalSetter, proj}) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      // Prevent body from scrolling
      document.body.style.overflow = 'hidden';
  
      return () => {
        // Restore scroll when modal unmounts
        document.body.style.overflow = 'auto';
      };
    }, []);

    const handleNotify = async (ev) => {
        ev.preventDefault();
        try {
          const response = await fetch('http://localhost:4000/notify-students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              project: proj,
              message,
            }),
          });
          if (!response.ok) throw new Error(response|| response.message|| "");      
          alert("Notified students successfully!");
          showModalSetter(false);
        } catch (error) {
          console.error("Failed to notify students:", error);
          alert("Something went wrong while sending notification.");
        }
    };

  return (
    <StyledWrapper>
      <div className="_2overlay" />
      <div className="_2card">
        <p className="_2cookieHeading"><FaCheckCircle size={20} color='#7b57ff'/> Document Validation</p>
        <form>
            <textarea name="" id="" placeholder='Message..' className="textarea_1" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea><br/><br/>
            <div className="_2buttonContainer">
            <button className="_2acceptButton" onClick={(ev)=>{handleNotify(ev)}}>Notify Students</button>
            <button className="_2declineButton" onClick={()=>{showModalSetter(false);}}>Cancel</button>
            </div>
        </form>
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
    height: 400px;
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
    display: flex;
    align-items: center;
    gap: 5px;
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
    width: 140px;
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
    
  .textarea_1{
    background-color: #f3f4f6;
    color: #1a202c;
    border: none;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 12px;
    transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
    
  .textarea_1:focus {
    background-color: #e5e7eb;
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
    .textarea_1 {
    height: 200px;
    width: 100%;
    margin-top: 10px;
    resize: none;
  }
`;

export default ValidateDocsModal;
