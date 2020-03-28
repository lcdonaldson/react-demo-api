import React from 'react';
import './Card.css';

const STYLES = [
  "card--primary--solid",
  "card--secondary--solid",
  "card--warning--solid",
  "card--danger--solid",
  "card--success--solid",
  "card--primary--outline",
  "card--secondary--outline",
  "card--warning--outline",
  "card--danger--outline",
  "card--success--outline",
]

// const SIZES = [
//   "card--xs",
//   "card--sm",
//   "card--md",
//   "card--lg",
//   "card--xl"
// ]

const Card = (
  props,
  cardStyle,
  onClick
  // cardSize
) => {

  const customCardStyle = STYLES.includes(cardStyle) ?
    cardStyle :
    STYLES[5];

  // const customCardSize = SIZES.includes(cardSize) ?
  //   cardSize :
  //   SIZES[0];

  return (
    <div className={`card ${customCardStyle}`} >
      <ul>
        <li>{props.id}</li>
        <li>{props.name}</li>
        <li>{props.email}</li>
      </ul>
      <button className="exitBtn exitBtnColor close" onClick={props.onClick}>X</button>
    </div>
  )
}

export default Card;