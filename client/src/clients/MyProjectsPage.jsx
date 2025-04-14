import React, { useContext, useState } from 'react';
import './MyProjectsPage.css';
import {FaFileAlt, FaCube,FaHourglassHalf, FaCheckCircle, FaMoneyBillAlt, FaTimesCircle, FaFileInvoiceDollar, FaEdit} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
import BillingStatusModal from '../components/BillingStatusModal';
import UpdateProjectModal from '../components/UpdateProjectModal';
import styled from 'styled-components';


const MyProjectsPage = () => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProj, setSelectedProj] = useState('');
    const navigate = useNavigate();
    // const projects = [
    //     {
    //       id: 1,
    //       industry: "Retail",
    //       duration: 6,
    //       title: "XR Shopping with Gamified Cart",
    //       year: "2024-25",
    //       piName: "Dr. Priya R.",
    //       piEmail: "priya.r@example.com",
    //       cpiName: "Mr. Rajesh K.",
    //       cpiEmail: "rajesh.k@example.com",
    //       amtSanct: 200000,
    //       amtRecv: 180000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "The project explores how XR technologies can redefine online shopping by introducing immersive experiences and gamified cart mechanics. Customers can interact with 3D models of products, receive real-time recommendations, and earn rewards through an interactive cart system. The consulting team developed a prototype for a major retail client to analyze shopper behavior and increase conversions. Results show an enhanced user experience and improved engagement, helping brands stay competitive in a rapidly evolving e-commerce landscape.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 2,
    //       industry: "Healthcare",
    //       duration: 4,
    //       title: "Digital Patient Engagement Portal",
    //       year: "2024-25",
    //       piName: "Dr. Karthik S.",
    //       piEmail: "karthik.s@example.com",
    //       cpiName: "Dr. Meera D.",
    //       cpiEmail: "meera.d@example.com",
    //       amtSanct: 150000,
    //       amtRecv: 150000,
    //       students: [{ name: "Divya N", email: "divya.n@example.com" }],
    //       summary: "This project involved designing a digital engagement platform for a private hospital network to streamline patient interactions. The team implemented features like appointment tracking, symptom logging, and AI-powered health advice. The platform was customized to improve patient compliance and reduce no-shows. Consulting efforts focused on understanding patient feedback and enhancing the UI/UX. Final reports indicated significant improvements in operational efficiency and patient satisfaction within the pilot hospital units.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 3,
    //       industry: "Education",
    //       duration: 3,
    //       title: "AI Tutoring Assistant for STEM Courses",
    //       year: "2023-24",
    //       piName: "Dr. Anitha G.",
    //       piEmail: "anitha.g@example.com",
    //       cpiName: "Mr. Nikhil V.",
    //       cpiEmail: "nikhil.v@example.com",
    //       amtSanct: 120000,
    //       amtRecv: 100000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //       ],
    //       summary: "The AI Tutoring Assistant project was aimed at helping a private edtech firm develop intelligent tutoring systems for STEM subjects. The system offered step-by-step guidance using NLP and tracked student performance over time. The consulting team contributed to backend logic, user testing, and evaluation metrics. Key achievements include improved student retention and engagement through adaptive learning techniques. Pilot programs were rolled out across several tutoring centers with positive feedback from students and parents alike.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 4,
    //       industry: "Manufacturing",
    //       duration: 5,
    //       title: "Predictive Maintenance with IoT",
    //       year: "2024-25",
    //       piName: "Dr. Ramesh B.",
    //       piEmail: "ramesh.b@example.com",
    //       cpiName: "Ms. Kavya P.",
    //       cpiEmail: "kavya.p@example.com",
    //       amtSanct: 250000,
    //       amtRecv: 220000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //       ],
    //       summary: "This project aimed to reduce downtime in a mid-sized manufacturing plant by introducing predictive maintenance using IoT sensors. The consulting team designed sensor configurations, implemented anomaly detection algorithms, and developed a dashboard to visualize equipment health. Real-time data helped schedule maintenance only when necessary, reducing costs and improving equipment lifespan. The firm reported a 30% drop in unplanned outages. Students worked closely with on-ground engineers to fine-tune alerts and recommendations.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 5,
    //       industry: "Logistics",
    //       duration: 3,
    //       title: "Smart Fleet Tracking System",
    //       year: "2023-24",
    //       piName: "Dr. Reema J.",
    //       piEmail: "reema.j@example.com",
    //       cpiName: "Mr. Manoj K.",
    //       cpiEmail: "manoj.k@example.com",
    //       amtSanct: 180000,
    //       amtRecv: 180000,
    //       students: [{ name: "Kiran L", email: "kiran.l@example.com" }],
    //       summary: "For a third-party logistics firm, the team created a smart fleet tracking dashboard that integrates GPS data, route optimization, and driver performance analytics. The consulting effort focused on enhancing efficiency, reducing delivery times, and identifying bottlenecks. The platform provided real-time visibility to clients and dispatchers. Student contributors helped test mobile modules and analyze fleet telemetry. The solution demonstrated improved delivery punctuality and better fuel economy across the client's vehicle fleet.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 6,
    //       industry: "Finance",
    //       duration: 6,
    //       title: "Client Risk Profiling Tool",
    //       year: "2023-24",
    //       piName: "Dr. Rohan M.",
    //       piEmail: "rohan.m@example.com",
    //       cpiName: "Ms. Sneha R.",
    //       cpiEmail: "sneha.r@example.com",
    //       amtSanct: 220000,
    //       amtRecv: 210000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "To support a wealth management firm, this project focused on building a client risk profiling tool that used behavioral data, past investment patterns, and real-time financial indicators. The consulting team ensured compliance with regulatory norms and integrated third-party APIs for market data. The interface provided actionable insights to advisors while helping clients understand risk exposure. The prototype is undergoing internal testing and is set for client rollout next quarter.",
    //       progress: "Ongoing"
    //     }
    // ];

    const openBillingModel = (ev, proj)=>{
        setShowModal(true);
        if (showModal && selectedProj?.id === proj.id) return; // Prevent re-trigger
        ev.stopPropagation();
        setSelectedProj(proj)
    }
    const updateProject = (ev, proj)=>{
      ev.stopPropagation();
      if (showEditModal && selectedProj?.id === proj.id) return; // Prevent re-trigger
      setShowEditModal(true);
      setSelectedProj(proj)
    }

  return (
    <>
    <div>
        <div className='top-title'>
            <p>My Projects</p>
        </div>

        <div className='project-details-in-page'>

            {userInfo && userInfo.projects && userInfo.projects.map((proj, idx)=>(
              <>
                <div className="my-project" onClick={ ()=>{navigate(`/client/project-page/${proj.id}`, {state: {proj}});}}>
                    {userInfo.role==='user'?
                        <FaCube className='icon-1'/>
                    :
                        <IconButton2 onClick={(ev)=>{updateProject(ev, proj)}}><FaEdit/></IconButton2>
                    }

                    <div className='project-text-content'>
                        <p className='project-text-content-title'>{proj.title}</p>
                        <p className='project-text-content-industry'>{proj.industry}</p>
                    </div>

                    <ViewBillingButton onclick={(ev)=>{openBillingModel(ev, proj)}}/>

                    <TooltipWrapper status={proj.progress}>
                        {proj.progress === 'Ongoing' ? (
                            <FaHourglassHalf size={15} />
                        ) : (
                            <FaCheckCircle size={15} />
                        )}
                    </TooltipWrapper>                 
                </div>
              </>
            ))}

        </div>
    </div>
        {showEditModal && <UpdateProjectModal editableFeilds={{industry: false, duration: false, title: false, year:false,
                                                                piName:false, piEmail:false, cpiName:false, cpiEmail:false,
                                                                amtSanct:true, amtRecv:true, students:false, summary:false, progress:true, id:false}} showModalSetter={setShowEditModal} proj={selectedProj}/>}
        {showModal && <BillingStatusModal showModalSetter={setShowModal} val1={parseFloat(selectedProj.amtSanct)} val2={parseFloat(selectedProj.amtRecv)}/>}
    </>
  )
}


const TooltipWrapper = styled.span`
  position: relative;
  display: inline-block;
  color: ${({ status }) => (status === 'Ongoing' ? '#FFFF00' : '#32de84')};

  &:hover::after {
    content: '${({ status }) => (status === 'Ongoing' ? 'Ongoing' : 'Completed')}';
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color:rgb(117, 117, 117);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.6rem;
    white-space: nowrap;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.2s ease-in-out;
    z-index: 10;
  }

  &:hover {
    cursor: default;
  }

  &::after {
    content: '';
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip {
    opacity: 1;
    transform: translateY(-110%);
    visibility: visible;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: rgb(117, 117, 117);
  color: #fff;
  font-size: 0.7rem;
  padding: 6px 8px;
  border-radius: 7px;
  white-space: nowrap;
  top: -8px;
  left: -90%;
  transform: translateX(-50%) translateY(-80%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    color: #6B8E23;
    font-size: 18px;
  }
`;

const ViewBillingButton = ({onclick}) => (
  <IconWrapper>
    <Tooltip className="tooltip">View Billing Status</Tooltip>
    <IconButton onClick={onclick}>
      <FaMoneyBillAlt />
    </IconButton>
  </IconWrapper>
);

const IconButton2 = styled.button`
  background: none;
  height: 30px;
  width: 30px;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    color: black;
    font-size: 18px;  
  }
`;

export default MyProjectsPage