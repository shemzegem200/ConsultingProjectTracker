import React from 'react';
import styled from 'styled-components';
import { FaSpinner, FaHourglassHalf, FaClock, FaCheckCircle} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { dwnldFileDocument } from './DownloadPage';


// const colors = [
//     "linear-gradient(to right, rgb(255, 231, 231), rgb(249, 213, 255))",
//     "linear-gradient(to right, rgb(249, 213, 255), rgb(215, 195, 254))",
//     "linear-gradient(to right, rgb(215, 195, 254), rgb(183, 179, 255))"
// ];

// const colors = [
//     "linear-gradient(to right, rgb(183, 179, 255), rgb(215, 195, 254))",
//     "linear-gradient(to right, rgb(215, 195, 254), rgb(249, 213, 255))",
//     "linear-gradient(to right, rgb(249, 213, 255), rgb(255, 231, 231))",
// ];
const colors = [
  "linear-gradient(to right, rgb(164, 159, 255), rgb(225, 174, 255))",
  "linear-gradient(to right, rgb(236, 174, 255), rgb(252, 202, 255))",
  "linear-gradient(to right, rgb(249, 213, 255), rgb(255, 208, 208))",
];


const Card = ({ colorIndex, proj }) => {
    const background = colors[colorIndex % 3];
    const navigate = useNavigate();
    
    const visitProjectPage = (proj)=>{
        navigate(`/client/project-page/${proj.id}`, {state: {proj}});
    }

    const handleClick1 = (ev)=>{
        ev.stopPropagation();
        // dwnldFileDocument(`project-${proj.id}-page-details`, `project-${proj.id}`);
    }

  return (
    <StyledWrapper background={background}>
      <div className="card" onClick={()=>visitProjectPage(proj)}>

      <div className="progress" style={{color:`${proj.progress==='Ongoing'? '#FFD700' : 'green'}`}}>{proj.progress==='Ongoing'? (<><FaHourglassHalf className="" />  Ongoing</>) : (<><FaCheckCircle  className="" />  Completed</>)}</div>
        {/* <div className="progress"><FaSpinner className="spin" />  Ongoing</div> */}
        {/* <div className="progress"><FaClock className="" />  Ongoing</div> */}

        <div className="text">
          <span>{proj.title.slice(0,50) === proj.title? `${proj.title}` : `${proj.title.slice(0,50)}...`}</span>
          <p className="subtitle">{proj.industry}</p>
          <p className="proj-desc">{proj.summary.slice(0,140)}...</p>
        </div>
        <div className="icons">
          <a className="btn" href="#" onClick={(ev)=>{handleClick1(ev)}}>
            <svg y={0} xmlns="http://www.w3.org/2000/svg" x={0} width={100} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height={100} className="svg-icon">
              <path strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" fill="none" d="M31.8,64.5a14.5,14.5,0,0,1-3.2-28.7,17.5,17.5,0,0,1-.4-4,18.2,18.2,0,0,1,36-3.6h.3a18.2,18.2,0,0,1,3.7,36M39.1,75.4,50,86.3m0,0L60.9,75.4M50,86.3V42.7">
              </path>
            </svg>
          </a>
          <a className="btn" href="#" onClick={(ev)=>ev.stopPropagation()}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411" />
            </svg>
          </a>
          <a className="btn" href="#" onClick={(ev)=>ev.stopPropagation()}>
            <svg y={0} xmlns="http://www.w3.org/2000/svg" x={0} width={100} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height={100} className="svg-icon">
              <path strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" fill="none" d="M21.9,50h0M50,50h0m28.1,0h0M25.9,50a4,4,0,1,1-4-4A4,4,0,0,1,25.9,50ZM54,50a4,4,0,1,1-4-4A4,4,0,0,1,54,50Zm28.1,0a4,4,0,1,1-4-4A4,4,0,0,1,82.1,50Z">
              </path>
            </svg>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
  .progress{
    position: absolute;
    top: 6px;
    right: 16px;
    font-size: 0.6rem;
    color: green;
  }

  .card {
    width: 100%;
    height: 200px;
    border-radius: 15px;
    background: ${({ background }) => background};
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;

    cursor: pointer;
  }

  .card::before {
    content: "";
    height: 100px;
    width: 100px;
    position: absolute;
    top: -40%;
    left: -20%;
    border-radius: 50%;
    border: 35px solid rgba(255, 255, 255, 0.102);
    transition: all .8s ease;
    filter: blur(.5rem);
  }

  .text {
  margin-top: 7px;
    flex-grow: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    // color: aliceblue;
    font-weight: 900;
    font-size: 1.1em;
    color: rgb(38, 59, 126);
  }

  .subtitle {
  margin-top:10px;
    font-size: .6em;
    font-weight: 490;
    // color: rgba(240, 248, 255, 0.691);
    color: rgb(38, 59, 126);
  }
  .proj-desc{
  margin-top: 10px;
    font-size: .6em;
    font-weight: 300;
    // color: rgba(240, 248, 255, 0.691);
    color: rgb(38, 59, 126);
  }

  .icons {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100%;
    border-radius: 0px 0px 15px 15px;
    overflow: hidden;

    cursor-events: none;   // i added ths, but its not doing anything
  }

  .btn {
    border: none;
    width: 100%;
    height: 35px;
    background-color: rgba(247, 234, 234, 0.589);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svg-icon {
    width: 25px;
    height: 25px;
    stroke: rgb(38, 59, 126);
  }

  .btn:hover {
    background-color: rgb(247, 234, 234);
  }

  .card:hover::before {
    width: 100%;
    height: 140px;
    top: -30%;
    left: 50%;
    filter: blur(0rem);
  }`;

export default Card;
