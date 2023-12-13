import React from 'react';
import './BoxContainer.css';
import { Outlet } from 'react-router';

export function BoxContainer() {
    return (
        <div className="box-container">
            <div className='page-container'>
                <Outlet/>
            </div>
        </div>
    );
}
