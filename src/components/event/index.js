import React from 'react';


const Event = ({ title, date, onClick, className='', style={} }) => {
  if (title == 'Damonte Ranch') debugger;
  return (
    <div
      className={`${className} event`}
      style={style}
      onClick={onClick}
    >
      <div className="title">{title}</div>
    </div>
  );
};

export default Event;
