import React from "react";
import dateFns from "date-fns";

import { Calendar } from "../src/components";
import "../src/styles.scss";
import './example.scss';

import data from './dummydata';


// Data preprocessing
const styledEvents = data.map(
  event => {
    
    let color; 
    if (event.dimIcType == '1') {
      color = 'red';
    } else if (event.dimIcType == '2') {
      color = 'brown';
    } else if (event.dimIcType == '3') {
      color = 'green';
    } else {
      color = 'purple';
    }

    return {
      ...event,
      style: { backgroundColor: color },
      onClick: () => alert(`Clicked on ${event.title} which occurs on ${dateFns.format(event.date, 'MMM Do')}`),
    };
  }
);

// Implementation
class App extends React.Component {
  render() {
    return (
      <div className='k-calendar-wrapper'>
        <Calendar events={styledEvents} initialSelectedDate={'6/18/19'}/>
      </div>
    );
  }
};

export default App;
