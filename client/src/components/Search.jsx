import React from 'react';
import styled from 'styled-components';

const Search = ({ value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="InputContainer">
        <input placeholder="Search.." id="input" className="input" name="text" type="text" value={value} onChange={onChange} />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .InputContainer {
    width: 210px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom,rgb(227, 213, 255),rgb(255, 231, 231));
    border-radius: 30px;
    overflow: hidden;
    // cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
  }

  .input {
    width: 202px;
    height: 32px;
    border: none;
    outline: none;
    caret-color: rgb(255, 81, 0);
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    padding-left: 15px;
    // letter-spacing: 0.8px;
    color: rgb(19, 19, 19);
    font-size: 13.4px;
  }`;

export default Search;