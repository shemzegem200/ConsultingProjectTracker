import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FaMoneyBillAlt} from 'react-icons/fa';
import { UserContext } from '../App';

const UpdateProjectModal = ({editableFeilds, showModalSetter, proj}) => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {
        industry, duration, title, year,
        piName, piEmail, cpiName, cpiEmail,
        amtSanct, amtRecv, students, summary, progress, id
      } = proj;
    
    const b2 = useRef(null);
      
    // State for editable fields
    const [industryName, setIndustryName] = useState(industry);
    const [projectDuration, setProjectDuration] = useState(duration);
    const [projectTitle, setProjectTitle] = useState(title);
    const [academicYear, setAcademicYear] = useState(year);
    const [amountSanctioned, setAmountSanctioned] = useState(amtSanct);
    const [amountReceived, setAmountReceived] = useState(amtRecv);
    const [projectSummary, setProjectSummary] = useState(summary);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isCompleted, setIsCompleted] = useState(progress==='Completed'? true: false);
    console.log(students);

    // Revert function
    const revertChanges = () => {
        setIndustryName(industry);
        setProjectDuration(duration);
        setProjectTitle(title);
        setAcademicYear(year);
        setAmountSanctioned(amtSanct);
        setAmountReceived(amtRecv);
        setProjectSummary(summary);
        setIsCompleted(progress==='Completed');
    };

    const handleSummaryChange = (e) => {
        const words = e.target.value.trim().split(/\s+/);
        if (words.length <= 100) {
          setShowTooltip(false);
          setProjectSummary(e.target.value);
        } else {
          setShowTooltip(true);
        }
    };

    const updateProjectHandler = async(e) => {
        e.stopPropagation();
    b2.current.style.pointerEvents = "none";
    b2.current.style.cursor = "not-allowed";
    b2.current.style.opacity = "0.5";

    const obj = {
                 "id":id,
                 "title":projectTitle,
                 "industry":industryName, 
                 "duration":projectDuration,
                 "year":academicYear, 
                 "amtSanct":amountSanctioned,
                 "amtRecv":amountReceived,
                 "summary":projectSummary,
                 "progress": isCompleted? 'Completed':'Ongoing',
                 "students": students
                };
    try{
      const response = await fetch("http://localhost:4000/update-project", {
        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      });
      if (!response.ok){
        console.log("Error response received:", response);  
        throw new Error(response.error || response.message || 'Something went wrong!');
      }
      const result = await response.json();
      alert("Updated successfully! 🎉");
      setUserInfo(prev => ({...prev, projects: prev.projects.map(p => p.id === id ? ({...p, ...obj}) : p)}));   
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

    // useEffect(() => {
    //   // Prevent body from scrolling
    //   document.body.style.overflow = 'hidden';
  
    //   return () => {
    //     // Restore scroll when modal unmounts
    //     document.body.style.overflow = 'auto';
    //   };
    // }, []);


  return (
    <StyledWrapper>
      <div className="_2overlay" />
      <div className="_2card">
        <div style={{display:'flex', justifyContent: 'space-between'}}><p className="_2cookieHeading">Update Project</p><span className="close-x" onClick={()=>{showModalSetter(false);}}></span></div>
        <br/>
        <p className="_2cookieDescription">
        <form className='form_1'>
            <input disabled={!editableFeilds.industry} required type="text" className="input_1" value={industryName} onChange={e => setIndustryName(e.target.value)} placeholder="Industry Name" />
            <input disabled={!editableFeilds.duration} required type="number" className="input_1" value={projectDuration} min={1} onChange={e => setProjectDuration(e.target.value)} placeholder="Duration (in months)" />
            <input disabled={!editableFeilds.title} required type="text" className="input_1" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} placeholder="Project Title" />
            <input disabled={!editableFeilds.year}required type="text" className="input_1" value={academicYear} onChange={e => setAcademicYear(e.target.value)} placeholder="Academic Year" />

            <label>Principal Investigator (PI) Details:</label>
            <input disabled={!editableFeilds.piName} className="input_1" value={piName} />
            <input disabled={!editableFeilds.piEmail} className="input_1" value={piEmail} />

            <label>Co-Principal Investigator (Co-PI) Details:</label>
            <input disabled={!editableFeilds.cpiName} className="input_1" value={cpiName} />
            <input disabled={!editableFeilds.cpiEmail} className="input_1" value={cpiEmail} />

            <label>Bill Settlement Details:</label>
            <input disabled={!editableFeilds.amtSanct} required type="text" className="input_1" value={amountSanctioned} onChange={e => setAmountSanctioned(e.target.value)} placeholder="Amount Sanctioned" />
            <input disabled={!editableFeilds.amtRecv} required type="text" className="input_1" value={amountReceived} onChange={e => setAmountReceived(e.target.value)} placeholder="Amount Received" />

            <label>Number of Students: {students.length}</label>
            <label>Student Details:</label>
            {students.map((student, index) => (
            <div key={index}>
                <input disabled={!editableFeilds.students} className="input_1" value={student.name} />
                <input disabled={!editableFeilds.students} className="input_1" value={student.username} />
            </div>
            ))}

            <label>Project Summary:</label>
            <div style={{ position: 'relative', width: '100%' }}>
            <textarea
                required
                className="textarea_1"
                placeholder="Project Summary (less than 100 words)"
                rows="4"
                value={projectSummary}
                onChange={handleSummaryChange}
                disabled={!editableFeilds.summary}
            />
            {showTooltip && (
                <div style={{
                position: "absolute",
                top: "-20px",
                left: "0",
                backgroundColor: "#ffdddd",
                color: "#d00",
                padding: "5px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                whiteSpace: "nowrap"
                }}>
                Enter at most 100 words
                </div>
            )}
            </div>

            <label>
                <input
                className='input_1'
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    style={{ marginRight: '8px' }}
                    disabled={!editableFeilds.progress}
                />
                Is Project Completed?
            </label>

        </form>
        </p>
        <br/><br/>
        
        <div className="_2buttonContainer">
          <button className="_2acceptButton" onClick={(e)=>{updateProjectHandler(e)}} ref={b2}>Update</button>
          <button className="_2declineButton" onClick={revertChanges}>Revert</button>
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
    margin-top: 30px;
    width: 60%;
    margin-left: 20%;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    text-align: center;
    padding: 20px 30px;
    position: relative;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.062);
    max-height: 90vh;
    overflow-y: auto;  /* Enable vertical scroll when content overflows */
    
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }

  /* WebKit (Chrome, Safari, Edge) */
    ._2card::-webkit-scrollbar {
    width: 4px;
    }

    ._2card::-webkit-scrollbar-track {
    background: transparent;
    }

    ._2card::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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

   .form_1 {
    display: flex;
    flex-direction: column;
  }
    .input_1,
  .textarea_1,
  .file-input_1 {
    background-color: #f3f4f6;
    color: #1a202c;
    border: none;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 12px;
    transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .input_1:focus,
  .textarea_1:focus {
    background-color: #e5e7eb;
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  .textarea_1 {
    width: 100%;
    margin-top: 10px;
    resize: none;
  }
    .input_1:disabled,
    .textarea_1:disabled {
    color: #9ca3af; /* Light gray text (you can tweak this) */
    background-color: #f9fafb; /* Slightly lighter background for clarity */
    cursor: not-allowed;
}

    /* close button for the form */
.close-x{
    position: relative;
	width: 20px;
	height: 20px;
	border: 2px solid #eef5df;
	background-color: #ff5248;
	border-radius: 50%;
}
.close-x::before, .close-x::after {
	position: absolute;
	top: 7.3px;
	left: 1.9px;
	width: 13px;
	height: 3px;
	content: "";
	background-color: #eef5df;
	display: none;
	}
.close-x::before {
	-ms-transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	}
.close-x::after {
	-ms-transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
	}
.close-x:hover { cursor: pointer; }
.close-x:hover::before, .close-x:hover::after { display: block; }

`;

export default UpdateProjectModal;
