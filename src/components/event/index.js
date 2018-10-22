import React from 'react';


const Event = ({ title, date, onClick, className='', style={} }) => {
  
  return (
    <div
      className={`${className} event`}
      style={{ textDecoration:'italic', ...style }}
      onClick={onClick}
    >
      <div className="title">{title}</div>
    </div>
  );
};

export default Event;
