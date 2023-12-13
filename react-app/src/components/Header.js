import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

// This is for the header. Each page contains the name of the page at the top left
export function Header(props) {
    return (
        <div className={`header ${props.size}-header`}>
            <h1> {props.text} </h1>
        </div>
    );
}

Header.propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
}