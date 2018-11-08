import React from "react";
import dateFns from "date-fns";

import Event from '../event';


class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader = () => {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);    // Gets month's last day
    const monthEnd = dateFns.endOfMonth(monthStart);          // Gets month's first day
    const startDate = dateFns.startOfWeek(monthStart);        // Gets the month's first week's first day
    const endDate = dateFns.endOfWeek(monthEnd);              // Gets the month's first week's last day

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    debugger;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const cellAdditionalClass = !dateFns.isSameMonth(day, monthStart) ? "disabled"
          : dateFns.isSameDay(day, selectedDate) ? "selected"
          : "";
        
        const eventComponents = this.props.events.map(
          (e, i) => dateFns.isEqual(dateFns.format(cloneDay, 'DDMMYYYY', dateFns.format(e.date, 'DDMMYYYY')) ?
            <Event
              key={i}
              title={e.title}
              date={e.date}
              onClick={e.onClick}
              className={e.className}
              style={e.style}
            />
            : null
        );

        days.push(
          <div className="col cell-wrapper">
            <div
              className={`cell ${cellAdditionalClass}`}
              key={day}
              onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              <div className="events">{eventComponents}</div>
            </div>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
};

Calendar.defaultProps = {
  events: [],
};

export default Calendar;
