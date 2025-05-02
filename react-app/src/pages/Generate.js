import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Generate.css';

const convertTimePrefs = (days) => {
  const prefs = {};
  days.forEach(day => {
    if (day.checked) {
      prefs[day.name] = {
        start: day.startTime,
        end: day.endTime
      };
    }
  });
  return prefs;
};


const TimeTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    const savedCourses = Cookies.get('Courses');
    const savedDays = Cookies.get('userDays');
  
    if (!savedCourses || !savedDays) {
      console.warn("No saved data in cookies.");
      return;
    }
  
    const parsedCourses = JSON.parse(savedCourses).map(c => c.Course);
    const parsedDays = JSON.parse(savedDays);
    const formattedPrefs = convertTimePrefs(parsedDays);
  
    axios.post('http://localhost:5000/generate', {
      selectedCourses: parsedCourses,
      timePreferences: formattedPrefs
    })
    .then(res => {
      const results = res.data.schedules;
      setSchedules(results);
      setSelectedSchedule(results[0]);
    })
    .catch(err => {
      console.error('Error fetching schedule:', err);
    });
  }, []);
  


  const timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];


  const renderCourseBlocks = () => {
    if (!selectedSchedule) return null;

    const dayMap = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
    };

    const toMinutes = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const baseStart = 7 * 60; // 7:00 AM
    const hourHeight = 60; // 60px per hour – adjust if your CSS grid is different

    return Object.entries(selectedSchedule).map(([course, section], index) => {
      const startMin = toMinutes(section.start);
      const endMin = toMinutes(section.end);
      const topOffset = ((startMin - baseStart) / 60) * hourHeight;
      const height = ((endMin - startMin) / 60) * hourHeight;
      const dayIndex = dayMap[section.day];

      return (
        <div
          key={index}
          className="course-block"
          style={{
            position: 'absolute',
            top: `${topOffset}px`,
            left: `${dayIndex * 100}px`, // assuming 100px per day column
            height: `${height}px`,
            width: '100px',
            backgroundColor: '#4287f5',
            color: 'white',
            padding: '4px',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '12px'
          }}
        >
          {course} - {section.section}
          <br />
          {section.start}–{section.end}
        </div>
      );
    });
  };


  return (
    <div className="schedule-container">
      <div className="time-column">
        {timeSlots.map((time, index) => (
          <div key={index} className="time-label">
            {time}
          </div>
        ))}
      </div>
      <div className="schedule-grid" style={{ position: "relative" }}>
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
                <tr className={`sv-grid-row ${index % 2 === 0 ? "even" : "odd"}`} data-time={time}>
                  {Array.from({ length: 6 }).map((_, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={`sv-grid-col sv-grid-cell sv-day-${dayIndex + 2} ${
                        dayIndex === 0 ? "sv-first-col" : ""
                      }`}
                    ></td>
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
            {/* Last dotted line row */}
            <tr className={`sv-grid-row dotted-line`} key={`dotted-line-${timeSlots.length - 1}`}>
              {Array.from({ length: 6 }).map((_, dayIndex) => (
                <td key={dayIndex} colSpan="1" className={`sv-grid-col dotted-line`}></td>
              ))}
            </tr>
          </tbody>
        </table>
  
        {/* Render course blocks over the table */}
        {renderCourseBlocks()}
      </div>
    </div>
  );
};

export default TimeTable;
