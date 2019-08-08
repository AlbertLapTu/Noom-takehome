import React from 'react';

const FoodCards = props => {
  const list = [];
  const { foods } = props;

  foods.forEach(v => {
    list.push(
      <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
        <div>name: {v.name}</div>
        <div>brand: {v.brand}</div>
        <div>calories: {v.calories}</div>
        <div>portion: {v.portion}</div>
      </div>
    );
  });

  return (
    <div>
      <h3> Result:</h3>
      {list}
    </div>
  );
};

export default FoodCards;
