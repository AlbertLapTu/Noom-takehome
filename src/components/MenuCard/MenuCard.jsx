import React from 'react';
import './MenuCard.css';

const GREEN = '#16AA00';
const YELLOW = '#FFCF04';
const RED = '#F75462';

const calculateColor = colorValue => {
  if (colorValue > 2.4) {
    return RED;
  } else if (colorValue > 1.0 && colorValue <= 2.4) {
    return YELLOW;
  } else if (colorValue <= 1.0) {
    return GREEN;
  }
};

const FoodCards = props => {
  const list = [];
  const { foods } = props;

  foods.forEach((v, i) => {
    const colorValue = v.calories / v.portion;
    const colorStyle = calculateColor(colorValue);

    list.push(
      <li className='food-card' key={i}>
        <div className='menu-card-label-container'>
          <div id='content'>
            <div>
              <span id='column-left'>Name:</span>
              <span id='column-right' style={{ color: colorStyle }}>
                {v.name}
              </span>
            </div>
            <div>
              <span id='column-left'>Brand:</span>
              <span id='column-right'>{v.brand}</span>
            </div>
            <div>
              <span id='column-left'>Calories: </span>
              <span id='column-right'>{v.calories}</span>
            </div>
            <div>
              <span id='column-left'>Portion:</span>
              <span id='column-right'>{v.portion}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <h3 className='result'>Result:</h3>
      {list}
    </div>
  );
};

export default FoodCards;
