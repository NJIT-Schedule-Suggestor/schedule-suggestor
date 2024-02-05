import React from 'react';
import './Generate.css'; // Import your stylesheet for styling

const TimeTable = () => {
  // You can customize the width, height, and other styles in your CSS file
  const timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

  return (
    <div className="schedule-container">
      <div className="time-column">
        {timeSlots.map((time, index) => (
          <div key={index} className="time-label">
            {time}
          </div>
        ))}
      </div>
      <div className="schedule-grid">
        <table>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <React.Fragment key={index}>
                <tr className={`sv-grid-row ${index % 2 === 0 ? 'even' : 'odd'}`} data-time={time}>
                  {Array.from({ length: 6 }).map((_, dayIndex) => (
                    <td key={dayIndex} className={`sv-grid-col sv-grid-cell sv-day-${dayIndex + 2} ${dayIndex === 0 ? 'sv-first-col' : ''}`}></td>
                  ))}
                </tr>
                {index !== timeSlots.length - 1 && (
                  <tr className={`sv-grid-row dotted-line`} key={`dotted-line-${index}`}>
                    {Array.from({ length: 6 }).map((_, dayIndex) => (
                      <td key={dayIndex} colSpan="1" className={`sv-grid-col dotted-line`}></td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
            {/* Add an additional row for the last solid line at the bottom */}
            <tr className={`sv-grid-row dotted-line`} key={`dotted-line-${timeSlots.length - 1}`}>
              {Array.from({ length: 6 }).map((_, dayIndex) => (
                <td key={dayIndex} colSpan="1" className={`sv-grid-col dotted-line`}></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
