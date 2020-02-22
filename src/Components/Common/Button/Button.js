import React from 'react';
import './Button.css'

const STYLES = [
    "btn--primary--solid",
    "btn--secondary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--secondary--outline",
    "btn--warning--outline",
    "btn--danger--outline",
    "btn--success--outline",
]

const SIZES = [
    "btn--xs",
    "btn--sm",
    "btn--md",
    "btn--lg",
    "btn--xl"
]

const Button = ({
    children, 
    type, 
    onClick,
    btnStyle,
    btnSize
}) => {

    const customtnBtnStyle = STYLES.includes(btnStyle) 
    ? btnStyle 
    : STYLES[0];

    const customBtnSize = SIZES.includes(btnSize) ?
        btnSize :
        SIZES[0];

    return (
        <button className={`btn ${customBtnStyle} ${customBtnSize}`} onClick={onClick} type={type} >
            {children}
        </button>
    )
}

export default Button;
