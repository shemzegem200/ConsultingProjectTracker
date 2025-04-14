import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import {FaMoneyBillAlt} from 'react-icons/fa';
import {UserContext} from '../App';

const BillingStatusModal = ({showModalSetter, val1, val2}) => {
  const {userInfo, setUserInfo} = useContext(UserContext);

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
        <FaMoneyBillAlt size={30} color='#6B8E23'/>
        <p className="_2cookieHeading">Billing Status</p>
        <p className="_2cookieDescription">
          <p><strong>Sanctioned Amount: </strong>₹{val1}</p>
          <p><strong>{userInfo.role==='user' ? `Received Amount: ` : `Credited Amount `}</strong>₹{val2}</p>
          <p><strong>{userInfo.role==='user' ? `Remaining Amount to be Received: `: `Remaining Amount to be Credited: `}</strong>₹{val1-val2}</p>
        </p>
        <div className="_2buttonContainer">
          <button className="_2acceptButton" onClick={()=>{showModalSetter(false);}}>Close</button>
          {/* <button className="_2declineButton">Decline</button> */}
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
    cursor: not-allowed;
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

export default BillingStatusModal;
