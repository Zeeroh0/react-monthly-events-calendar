import React from "react";
import dateFns from "date-fns";

import { Calendar } from "./components";
import "./styles.scss";


// Dummy Data
const events = [
  { title: 'Event 0', date: 'Sep 30, 2018', subtitle: 'Subtitle 0', dimIcType: '1' },
  { title: 'Event 1', date: '10/01/2018', subtitle: 'Subtitle 1', dimIcType: '2' },
  { title: 'Event 2', date: '10/11/18', subtitle: 'Subtitle 2', dimIcType: '3' },
  { title: 'Event 3', date: '10/21/2018', subtitle: 'Subtitle 3', dimIcType: '4' },
  { title: 'Event 4', date: '2018-10-31T00:00:00', subtitle: 'Subtitle 4', dimIcType: '2' },
  { title: 'Event 5', date: '2018-10-31T00:00:00', subtitle: 'Subtitle 5', dimIcType: '3' },
  { title: 'Event 6', date: '2018-11-03T00:00:00', subtitle: 'Subtitle 6', dimIcType: '1' },
];

// Data preprocessing
const styledEvents = events.map(
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
      <div className='calendar-wrapper'>
        <Calendar events={styledEvents} />
      </div>
    );
  }
};

export default App;
