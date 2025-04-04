import React from 'react'
import './SearchPage.css';
import Search from '../components/Search';
import Card from '../components/Card';

const SearchPage = () => {
    const cards = [1,2,3,4,5,6,7,8,9,0];
  return (
    <div>
        <div className='top-title'>
            <p>Search For Consulting Projects</p>
            <Search/>
        </div>

        <div className="card-container">
            {cards.map((obj, i)=>(
                <Card colorIndex={i}/>
            ))}
        </div>
        
    </div>
  )
}

export default SearchPage
