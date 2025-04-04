import React, { useState } from "react";
import styled from "styled-components";
import FileUpload from "./FileUpload";

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
  const [count, setCount] = useState(1);

  function DecQuantity(ev){
    ev.preventDefault();
    if (count-1===0) return;
    setCount(count => count-1);
  }

  function IncQuantity(ev){
    ev.preventDefault();
    if (count+1===6) return;
    setCount(count => count+1);
  }


  return (
    <StyledFormContainer>
      <div className="form-wrapper_1">
        <h2 className="title_1">Add a New Project</h2>
        <form className="form_1">
          <input required type="text" className="input_1" placeholder="Industry Name" />
          <input required type="number" className="input_1" placeholder="Duration (in months)" min={1}/>
          <input required type="text" className="input_1" placeholder="Project Title" />
          <input required type="text" className="input_1" placeholder="Academic Year"/>


          <label>Principal Investigator (Co-PI) Details:</label>
          <input required type="text" className="input_1" placeholder="Principal Investigator (PI) Name" />
          <input required type="email" className="input_1" placeholder="Principal Investigator (PI) Email" />


          <label>Co-Principal Investigator (Co-PI)Details:</label>
          <input required type="text" className="input_1" placeholder="Co-Principal Investigator (Co-PI) Name" />
          <input required type="email" className="input_1" placeholder="Co-Principal Investigator (Co-PI) Email" />



          <label>Bill Settlement Details:</label>
          <input required type="text" className="input_1" placeholder="Amount Sanctioned"/>
          <input required type="text" className="input_1" placeholder="Amount Received"/>
          <FileUpload text="Proof of Received Payment" id="file-upload-1" />
          <FileUpload text="Signed Agreement Document upload" id="file-upload-2" />


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
            <>
            <input required key={index} className="input_1" type="text" placeholder={`Student ${index + 1} Name`} />
            <input required key={index} className="input_1 stud" type="email" placeholder={`Student ${index + 1} Email`} />
            </>
          ))}

          <textarea className="textarea_1" placeholder="Project Summary (less than 100 words)" rows="4" />

          <button type="submit" className="submit-button_1">Apply</button>
        </form>
      </div>
    </StyledFormContainer>
  );
};

export default FormDetails;
