import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import FileUpload from "./FileUpload";
import { UserContext } from "../App";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  margin-top: 20px;

  .form-wrapper_1 {
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  .title_1 {
    font-size: 24px;
    font-weight: bold;
    color: #1a202c;
    margin-bottom: 16px;
    text-align: center;
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

  .submit-button_1 {
    background: linear-gradient(to right,rgb(155, 150, 255),rgb(255, 194, 194));
    color: white;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 6px;
    margin-top: 16px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  .submit-button_1:hover {
    background: linear-gradient(to right, rgb(109, 104, 196),rgb(205, 148, 148));
  }


  label{
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .stud{
    margin-bottom: 30px;
  }
`;

const FormDetails = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [count, setCount] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const b2 = useRef(null);
  const [loading, setLoading] = useState(false);

  //all variables stored through the form
  const [industry, setIndustry] = useState("");
  const [duration, setDuration] = useState('');
  const [title, setTitle]= useState("");
  const [year, setYear] = useState("");
  const [piName, setPiName] = useState("");
  const [piEmail, setPiEmail] = useState("");
  const [cpiName, setCpiName] = useState("");
  const [cpiEmail, setCpiEmail] = useState("");
  const [amtSanct, setAmtSact] = useState("");
  const [amtRecv, setAmtRecv] = useState("");
  const f1Input = useRef(null);
  const f2Input = useRef(null);
  const [students, setStudents] = useState([{ name: "", email: "" }]);
  const [summary, setSummary] = useState("");

  const DecQuantity = (ev)=>{
    ev.preventDefault();
    if (count-1===0) return;
    setCount(count => count-1);
    setStudents(prev => prev.slice(0, -1));
  }
  const IncQuantity = (ev)=>{
    ev.preventDefault();
    if (count+1===6) return;
    setCount(count => count+1);
    setStudents(prev=>[...prev, { name: "", email: "" }]);
  }

  const handleChangeStudName = (index, val)=>{
    let tempStudents = [...students];
    tempStudents[index].name = val;
    setStudents(tempStudents);
  }

  const handleChangeStudEmail = (index, val)=>{
    let tempStudents = [...students];
    tempStudents[index].username = val;
    setStudents(tempStudents);
  }

  const handleChange = (ev) => {
    const words = ev.target.value.trim().split(/\s+/);
    if (words.length <= 100) {
      setSummary(ev.target.value);
      setShowTooltip(false); // Hide tooltip when within limit
    } else {
      setShowTooltip(true); // Show tooltip when limit exceeded
    }
  };

  const clearForm = () => {
    setIndustry("");
    setDuration('');
    setTitle("");
    setYear("");
    setPiName("");
    setPiEmail("");
    setCpiName("");
    setCpiEmail("");
    setAmtSact("");
    setAmtRecv("");
    setCount(1);
    setStudents([{ name: "", email: "" }]);
    setSummary("");
    if (f1Input.current) f1Input.current.value = null;
    if (f2Input.current) f2Input.current.value = null;
  };

  const handleSubmit = async(ev)=>{
    ev.preventDefault();
    setLoading(true);
    b2.current.style.pointerEvents = "none";
    b2.current.style.cursor = "not-allowed";
    b2.current.style.opacity = "0.5";

    const obj = {title, industry, duration, year, piName, piEmail, cpiName, cpiEmail, amtSanct, amtRecv, students, summary};
    const formData = new FormData();
    if (f1Input.current?.files?.[0]) {
      formData.append("file1", f1Input.current.files[0]);
    }
    if (f2Input.current?.files?.[0]) {
      formData.append("file2", f2Input.current.files[0]);
    }
    formData.append("data", JSON.stringify(obj));

    try{
      const response = await fetch("http://localhost:4000/store-project", {
        method: 'POST',
        // headers:{'Content-Type': 'application/json'},
        body: formData
      });
      if (!response.ok){
        console.log("Error response received:", response);  
        throw new Error(response.error || response.message || 'Something went wrong!');
      }
      const result = await response.json();
      alert("Submitted successfully! 🎉");
      setUserInfo(prev => ({...prev, projects: [...prev.projects, result.data]}));  
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
    finally {
      b2.current.style.pointerEvents = "auto";
      b2.current.style.cursor = "pointer";
      b2.current.style.opacity = "1";
      setLoading(false);
      clearForm();
    }

  }

  return (
    <StyledFormContainer>
      <div className="form-wrapper_1">
        <h2 className="title_1">Add a New Project</h2>
        <form className="form_1" onSubmit={ev=>{handleSubmit(ev)}}>
          <input required type="text" className="input_1" placeholder="Industry Name" value={industry} onChange={ev=>setIndustry(ev.target.value)}/>
          <input required type="number" className="input_1" placeholder="Duration (in months)" min={1} value={duration} onChange={ev=>setDuration(ev.target.value)}/>
          <input required type="text" className="input_1" placeholder="Project Title" value={title} onChange={ev=>setTitle(ev.target.value)} />
          <input required type="text" className="input_1" placeholder="Academic Year" value={year} onChange={ev=>setYear(ev.target.value)}/>


          <label>Principal Investigator (Co-PI) Details:</label>
          <input required type="text" className="input_1" placeholder="Principal Investigator (PI) Name" value={piName} onChange={ev=>setPiName(ev.target.value)} />
          <input required type="email" className="input_1" placeholder="Principal Investigator (PI) Email" value={piEmail} onChange={ev=>setPiEmail(ev.target.value)} />


          <label>Co-Principal Investigator (Co-PI)Details:</label>
          <input required type="text" className="input_1" placeholder="Co-Principal Investigator (Co-PI) Name" value={cpiName} onChange={ev=>setCpiName(ev.target.value)} />
          <input required type="email" className="input_1" placeholder="Co-Principal Investigator (Co-PI) Email" value={cpiEmail} onChange={ev=>setCpiEmail(ev.target.value)} />



          <label>Bill Settlement Details:</label>
          <input required type="text" className="input_1" placeholder="Amount Sanctioned" value={amtSanct} onChange={ev=>setAmtSact(ev.target.value)}/>
          <input required type="text" className="input_1" placeholder="Amount Received" value={amtRecv} onChange={ev=>setAmtRecv(ev.target.value)}/>
          <FileUpload forwardRef={f1Input} text="Proof of Received Payment" id="file-upload-1" />
          <FileUpload forwardRef={f2Input} text="Signed Agreement Document upload" id="file-upload-2" />


          <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
            <label>Number of Students:</label>
            <div className="inc-dec-button" style={{display:'grid', gridTemplateColumns:'20px 20px 20px', backgroundColor:'#ccc', height:'20px', borderRadius:'5px', margin:'auto 0', width:'60px'}}>
              <button style={{display:'flex', justifyContent:'center', textAlign:'center',alignItems:'center',width:'20px', height:'20px', backgroundColor:/*'#FF033E'*/'black', color:'white', borderRadius:'5px', cursor:'pointer', fontSize:'14px', fontWeight:'bold'}} onClick={(ev)=>{DecQuantity(ev)}}>-</button>
              <div style={{textAlign:'center', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>{count}</div>
              <button style={{display:'flex', textAlign:'center', justifyContent:'center',alignItems:'center',width:'20px', height:'20px', fontSize:'14px', fontWeight:'bold',backgroundColor:/*'#32de84'*/'black', color:'white', borderRadius:'5px', cursor:'pointer'}} onClick={(ev)=>{IncQuantity(ev)}}>+</button>
            </div>
          </div>
          
          <label>Student Details:</label>
          {Array.from({ length: count }, (_, index) => (
            <React.Fragment key={index}>
              <input
                required
                className="input_1"
                type="text"
                placeholder={`Student ${index + 1} Name`}
                value={students[index]?.name || ""}
                onChange={ev => handleChangeStudName(index, ev.target.value)}
              />
              <input
                required
                className="input_1 stud"
                type="email"
                placeholder={`Student ${index + 1} Email`}
                value={students[index]?.username || ""}
                onChange={ev => handleChangeStudEmail(index, ev.target.value)}
              />
            </React.Fragment>
          ))}


          <div style={{ position: "relative", width: "100%" }}>
            <textarea 
              required
              className="textarea_1" 
              placeholder="Project Summary (less than 100 words)" 
              rows="4" 
              value={summary}
              onChange={handleChange}
            />
            { showTooltip && <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "0",
                backgroundColor: "#ffdddd",
                color: "#d00",
                padding: "5px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                whiteSpace: "nowrap"
              }}
            >
              Enter at most 100 words
            </div>}
          </div>

          <button ref={b2} type="submit" className="submit-button_1">Submit</button>
        </form>
      </div>
    </StyledFormContainer>
  );
};

export default FormDetails;
