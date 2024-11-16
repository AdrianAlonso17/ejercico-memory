import React from 'react';

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      {isFlipped ? (
        <img src={card.image} alt={card.name} />
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  );
};

export default Card;