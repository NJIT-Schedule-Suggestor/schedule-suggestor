import React from 'react';
import './SideNav.css';
import njitImage from "./Logo_of_New_Jersey_Institute_of_Technology.png";
import MuiButton from '@mui/material/Button';


export function SideNav() {
  return (
    <div className="side-nav">
      <img src={njitImage} className='njit-image'/>
      <a href="#">Home</a>
      <a href="#">Courses</a>
      <a href="#">Time Preference</a>
      <div className='generate-button'>
        <MuiButton variant="contained">Generate</MuiButton>
      </div>
    </div>
  );
}