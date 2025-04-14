import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FaFilter} from 'react-icons/fa';

const FilterModal = ({showModalSetter, projects, setFilterOptions}) => {
    const [industry, setIndustry] = useState('');
    const [uniqueIndustries, setUniqueIndustries] = useState([]);
    const [duration, setDuration] = useState('');
    const [year, setYear] = useState('');
    const [progress, setProgress] = useState('');
    const [minAmount, setMinAmount] = useState('');

    useEffect(() => {
      // Prevent body from scrolling
      document.body.style.overflow = 'hidden';
      setUniqueIndustries([...new Set(projects.map(p => p.industry))]);
      return () => {
        // Restore scroll when modal unmounts
        document.body.style.overflow = 'auto';
      };
    }, []);

    const handleFilter= () =>{
        console.log('imhere');
        if (minAmount !== '' && isNaN(minAmount)) {
            alert('Minimum sanctioned amount must be a number');
            return;
          }
      
        const filterObj = {
            industry: industry.trim(),  // '' means no filtering
            duration: duration ? parseInt(duration) : null,  // null = no filter
            year: year ? parseInt(year) : null,
            progress: progress,
            minAmount: minAmount ? parseFloat(minAmount) : null,
        };
      
        setFilterOptions(filterObj);
        showModalSetter(false);
        console.log(setFilterOptions);
    }


  return (
    <StyledWrapper>
      <div className="_2overlay" />
      <div className="_2card">
        <FaFilter size={30} color='grey'/>
        <p className="_2cookieHeading">Filter Options</p>
        <p className="_2cookieDescription">
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">Industry</option>
                {uniqueIndustries.map((ind, index) => (
                    <option key={index} value={ind}>
                    {ind}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Minimum Duration (months)"
                value={duration}
                min={1}
                onChange={(e) => setDuration(e.target.value)}
            />
            <input
                type="number"
                placeholder="Academic Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '10px' }} className='radio-group'>
                <label>
                    <input
                    type="radio"
                    name="progress"
                    value=""
                    checked={progress === ''}
                    onChange={(e) => setProgress(e.target.value)}
                    />
                    All
                </label>
                <label>
                    <input
                    type="radio"
                    name="progress"
                    value="Ongoing"
                    checked={progress === 'Ongoing'}
                    onChange={(e) => setProgress(e.target.value)}
                    />
                    Ongoing
                </label>
                <label>
                    <input
                    type="radio"
                    name="progress"
                    value="Completed"
                    checked={progress === 'Completed'}
                    onChange={(e) => setProgress(e.target.value)}
                    />
                    Completed
                </label>
            </div>
            <input
                type="number"
                placeholder="Min. Sanctioned Amount (₹)"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
            />
        </p>
        <div className="_2buttonContainer">
          <button className="_2acceptButton" onClick={()=>{handleFilter()}}>Apply</button>
          <button className="_2declineButton" onClick={()=>{showModalSetter(false);}}>Close</button>
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

  ._2cookieDescription .radio-group {
    display: flex;
    gap: 10px;
    font-size: 0.85em;
  }
  ._2cookieDescription .radio-group{
  margin-top: 10px;
  }
  ._2cookieDescription .radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  ._2cookieDescription select,
  ._2cookieDescription input[type="number"] {
  margin-top: 10px;
    padding: 6px 10px;
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    font-size: 0.9em;
    width: 100%;
    outline: none;
  }
  
  ._2cookieDescription input[type="number"]:focus,
  ._2cookieDescription select:focus {
    border-color: #7b57ff;
    box-shadow: 0 0 0 2px rgba(123, 87, 255, 0.2);
  }
`;

export default FilterModal;
