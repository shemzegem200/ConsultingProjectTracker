import React, { useContext, useState, useEffect, useRef} from 'react'
import { Navigate, useLocation, useNavigate} from 'react-router-dom'
import { FaArrowLeft, FaSpinner, FaHourglassHalf, FaClock, FaCheckCircle} from "react-icons/fa";
import './ViewProjectPage.css';
import ProfileCardSmall from '../components/ProfileCardSmall';
import DownloadPage from '../components/DownloadPage';
import {UserContext} from "../App.jsx";
import ValidateDocsModal from '../components/ValidateDocsModal.jsx';


const ViewProjectPage = () => {
  const location = useLocation();
  const { proj } = location.state || {};
  const {userInfo, setUserInfo}= useContext(UserContext);
  const [displayOtherDetails, setDisplayOtherDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  
  useEffect(() => {
    if (!proj) {
      navigate(-1);
    }
  }, [proj, navigate]);

  useEffect(() => {
    if (proj && proj.students && userInfo?.username) {
      const isUserPartOfProject = proj.students.some(
        (stud) => stud.username === userInfo.username
      );
      const isSupervisorPartOfProject = proj.piEmail===userInfo.username || proj.cpiEmail===userInfo.username;
      setDisplayOtherDetails(isUserPartOfProject ||isSupervisorPartOfProject);
    }
  }, [proj, userInfo]);
  
  if (!proj) return null;

  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank'; // open in new tab (optional)
    link.rel = 'noopener noreferrer'; // security best practice
    link.download = '';
    link.click();
  };
  
  const downloadBtnStyle = {
    all: 'unset',
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '14px',
    background: 'linear-gradient(to right, rgb(155, 150, 255), rgb(255, 194, 194))',
    marginTop: '20px',
    marginBottom: '10px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.3s ease',
  };
  

  return (
    <div>
      <div className="top-title">
        <button style={{all:'unset', display:'flex', alignItems: 'center', cursor: 'pointer'}}onClick={() => navigate(-1)}>
          <FaArrowLeft size={15} color={'black'}/>
        </button>
      </div>
      
      <div className="project-details-in-page" id={`project-${proj.id}-page-details`}>
        <h2>{proj.title}</h2>

        <div style={{display:'flex', justifyContent:'space-between',marginTop:'30px'}}>
          <p><strong>Industry:</strong> {proj.industry}</p>
          <span style={{color:`${proj.progress==='Ongoing'? '#FFD700' : 'green'}`}}>{proj.progress==='Ongoing'? (<><FaHourglassHalf className="" />  Ongoing</>) : (<><FaCheckCircle  className="" />  Completed</>)}</span>
        </div>

        <p style={{marginTop:'25px'}}><strong>Academic Year:</strong>  {proj.year}</p>
        <p style={{marginTop:'25px'}}><strong>Sanctioned Amount:</strong>  ₹ {proj.amtSanct}</p>
        {displayOtherDetails && proj.amtRecv && <p style={{marginTop:'25px'}}><strong>Received Amount:</strong>  ₹ {proj.amtRecv}</p>}
        
        <h4 style={{marginTop:'25px'}}>Project Summary:</h4>
        <p style={{marginTop:'10px', lineHeight:'1.4', color:'#696969', textAlign:'justify', paddingLeft:'10px',paddingRight:'10px'}}>{proj.summary}</p>

        <h4 style={{marginTop:'25px', marginBottom: '25px'}}>Project Members:</h4>
        <div className="profile-card-container">
          {proj.students.map((stud,i)=>(
            <>
              <ProfileCardSmall person={{ name:stud.name, email:stud.username, github: stud.github, linkedin: stud.linkedin}} colorIndex={i}/>
            </>
          ))}
        </div>

        <h4 style={{marginTop:'30px', marginBottom: '25px'}}>Principal Investigator (PI) and Co-Principal Investigator (Co-PI) Details: </h4>
        <div className="profile-card-container">
          <ProfileCardSmall person={{ name:proj.piName, email:proj.piEmail}} colorIndex={0}/>
          <ProfileCardSmall person={{ name:proj.cpiName, email:proj.cpiEmail}} colorIndex={4}/>
        </div>
        {displayOtherDetails && userInfo && userInfo.role==='supervisor' && proj.file1 && proj.file2 && <h4 style={{marginTop:'15px'}} ref={ref3}>Verify Documents:</h4>}
        {displayOtherDetails && proj.file1 && <div className="dwnld-btn-outer" ref={ref1}>
                <button 
                    onClick={()=>handleDownload(proj.file1)}
                    style={downloadBtnStyle}
                >
                    Download Signed Agreement
                </button>
        </div>}
        {displayOtherDetails && proj.file2 && <div className="dwnld-btn-outer" ref={ref2}>
                <button 
                    onClick={()=>handleDownload(proj.file2)}
                    style={downloadBtnStyle}
                >
                    Download Proof of Payment
                </button>
        </div>}
        {displayOtherDetails && userInfo.role==='supervisor' && proj.file2 && <div className="dwnld-btn-outer" ref={ref4}>
                <button 
                    onClick={()=>setOpenModal(true)}
                    style={downloadBtnStyle}
                >
                    Validate Documents
                </button>
        </div>}
        <DownloadPage pageId={`project-${proj.id}-page-details`} dwnldFileName={`project-${proj.id}`} ref1={ref1} ref2={ref2} ref3={ref3} ref4={ref4}/>


      </div>
      {userInfo && userInfo.role && userInfo.role==='supervisor' && openModal && <ValidateDocsModal showModalSetter={setOpenModal} proj={proj}/>}
    </div>
  )
}

export default ViewProjectPage
