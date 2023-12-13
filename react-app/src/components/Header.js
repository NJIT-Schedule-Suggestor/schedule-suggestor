import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

// This is for the header. Each page contains the name of the page at the top left

export function Header({text, size}) {
    //ternary operator for sizes small, medium, large
    const headerSize = size === 'small' ? 'small-header' : size === 'medium' ? 'medium-header' : 'large-header';

    return (
        <div className={`header ${headerSize}`}>
            <h1> {text} </h1>
        </div>
    );
}

Header.propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.oneOf.isRequired,
}